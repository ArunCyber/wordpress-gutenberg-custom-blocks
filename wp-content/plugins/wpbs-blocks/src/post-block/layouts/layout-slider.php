<?php
/**
 * Slider layout for Post Block
 * Uses a horizontal track and slider controls.
 * Expects $posts_query and display variables in scope.
 */

$wrapper_class = 'post-block-wrapper post-layout-slider';
?>
<section class="<?php echo esc_attr($wrapper_class); ?>" data-slider="true">
    <div class="post-slider">
        <div class="slider-track">
            <?php while ($posts_query->have_posts()) : $posts_query->the_post(); ?>
                <article id="post-<?php the_ID(); ?>" class="blog-card layout-slider">
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

        <div class="slider-controls">
            <button class="slider-prev" aria-label="Previous">‹</button>
            <button class="slider-next" aria-label="Next">›</button>
        </div>
        <div class="slider-dots"></div>
    </div>
</section>
