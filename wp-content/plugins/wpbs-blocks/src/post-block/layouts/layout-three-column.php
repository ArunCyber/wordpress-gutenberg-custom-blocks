<?php
/**
 * Three-column layout for Post Block
 */

$wrapper_class = 'post-block-wrapper post-layout-3-column';
?>
<section class="<?php echo esc_attr($wrapper_class); ?>">
    <div class="posts-grid three-column">
        <?php while ($posts_query->have_posts()) : $posts_query->the_post(); ?>
            <article id="post-<?php the_ID(); ?>" class="blog-card layout-3-column">
                <?php if ($display_featured_image && has_post_thumbnail()) : ?>
                    <div class="post-image">
                        <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'medium')); ?>" alt="<?php echo esc_attr(get_the_title()); ?>">
                    </div>
                <?php endif; ?>

                <div class="blog-content">
                    <div class="post-title"><a href="<?php echo esc_url(get_permalink()); ?>"><?php the_title(); ?></a></div>
                    <?php if ($display_excerpt) : ?>
                        <div class="blog-desc"><?php if (has_excerpt()) { echo wp_trim_words(get_the_excerpt(), 20, '...'); } else { echo wp_trim_words(get_the_content(), 20, '...'); } ?></div>
                    <?php endif; ?>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</section>
