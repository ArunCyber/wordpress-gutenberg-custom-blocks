<?php
/**
 * Single post layout for Post Block
 * Displays only the first post from the query as a featured item.
 */

$wrapper_class = 'post-block-wrapper post-layout-single';
?>
<section class="<?php echo esc_attr($wrapper_class); ?>">
    <?php if ($posts_query->have_posts()) : $posts_query->the_post(); ?>
        <article id="post-<?php the_ID(); ?>" class="blog-card layout-single">
            <?php if ($display_featured_image && has_post_thumbnail()) : ?>
                <div class="post-image">
                    <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'large')); ?>" alt="<?php echo esc_attr(get_the_title()); ?>">
                </div>
            <?php endif; ?>

            <div class="blog-content">
                <div class="post-title"><a href="<?php echo esc_url(get_permalink()); ?>"><?php the_title(); ?></a></div>
                <?php if ($display_excerpt) : ?>
                    <div class="blog-desc"><?php if (has_excerpt()) { echo wp_trim_words(get_the_excerpt(), 40, '...'); } else { echo wp_trim_words(get_the_content(), 40, '...'); } ?></div>
                <?php endif; ?>
            </div>
        </article>
    <?php endif; ?>
</section>
