<?php
/**
 * Grid layout for Post Block
 * Expects these variables in scope: $posts_query, $display_featured_image, $display_excerpt,
 * $display_author, $display_date, $post_type
 */

$wrapper_class = 'post-block-wrapper post-layout-grid';
?>
<section class="<?php echo esc_attr($wrapper_class); ?>">
    <div class="posts-grid">
        <?php while ($posts_query->have_posts()) : $posts_query->the_post(); ?>
            <article id="post-<?php the_ID(); ?>" class="blog-card layout-grid">
                <?php if ($display_featured_image && has_post_thumbnail()) : ?>
                    <div class="post-image">
                        <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'medium')); ?>" alt="<?php echo esc_attr(get_the_title()); ?>">
                    </div>
                <?php endif; ?>

                <div class="blog-content">
                    <?php
                    if ($post_type === 'post') {
                        $categories = get_the_category();
                        if (!empty($categories)) {
                            echo '<div class="category">' . esc_html($categories[0]->name) . '</div>';
                        }
                    } else {
                        $taxonomies = get_object_taxonomies($post_type, 'objects');
                        if (!empty($taxonomies)) {
                            $first_taxonomy = array_key_first($taxonomies);
                            $terms = get_the_terms(get_the_ID(), $first_taxonomy);
                            if (!empty($terms) && !is_wp_error($terms)) {
                                echo '<div class="category">' . esc_html($terms[0]->name) . '</div>';
                            }
                        }
                    }
                    ?>

                    <div class="post-title">
                        <a href="<?php echo esc_url(get_permalink()); ?>"><?php the_title(); ?></a>
                    </div>

                    <?php if ($display_excerpt) : ?>
                        <div class="blog-desc">
                            <?php
                            if (has_excerpt()) {
                                echo wp_trim_words(get_the_excerpt(), 20, '...');
                            } else {
                                echo wp_trim_words(get_the_content(), 20, '...');
                            }
                            ?>
                        </div>
                    <?php endif; ?>

                    <?php if ($display_author || $display_date) : ?>
                        <div class="author">
                            <?php if ($display_author) : ?>
                                <?php echo get_avatar(get_the_author_meta('ID'), 40, '', '', array('class' => '')); ?>
                            <?php endif; ?>
                            <div class="author-info">
                                <?php if ($display_author) : ?>
                                    <strong><?php the_author(); ?></strong>
                                <?php endif; ?>
                                <?php if ($display_date) : ?>
                                    <span class="date"><?php echo get_the_date('j M Y'); ?></span>
                                <?php endif; ?>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</section>
