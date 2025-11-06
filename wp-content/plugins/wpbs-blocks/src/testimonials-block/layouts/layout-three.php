<?php

/**
 * Testimonial layout
 * Single testimonial layout style with star ratings.
 */
?>

<div class="testimonial_wrap testimonial-block-layout-three">
    <?php if (!empty($testimonials)) : ?>
        <div class="testimonial_content">
            <?php foreach ($testimonials as $index => $testimonial) : ?>
                <div class="testimonial_item" data-testimonial-index="<?php echo $index; ?>">

                    <?php if (!empty($testimonial['rating'])) : ?>
                        <div class="testimonial_star_rating">
                            <div class="stars">
                                <?php for ($i = 1; $i <= 5; $i++): ?>
                                    <span class="star <?php echo $i <= $testimonial['rating'] ? 'filled' : ''; ?>">★</span>
                                <?php endfor; ?>
                            </div>
                            <?php /* <span class="rating-text">(<?php echo esc_html($testimonial['rating']); ?>/5)</span> */ ?>
                        </div>
                    <?php endif; ?>

                    <?php if (!empty($testimonial['testimonialReview'])) : ?>
                        <h5><?php echo wp_kses_post($testimonial['testimonialReview']); ?></h5>
                    <?php endif; ?>

                    <div class="testimonial_name_wraper">
                        <div class="testimonial_rating">
                            <?php if (!empty($testimonial['clientImage'])) : ?>
                                <img src="<?php echo esc_url($testimonial['clientImage']); ?>" alt="Client" />
                            <?php endif; ?>

                            <?php if (!empty($testimonial['wysiwygContent'])) : ?>
                                <?php echo wp_kses_post($testimonial['wysiwygContent']); ?>
                            <?php endif; ?>
                        </div>

                        <?php if (!empty($testimonial['companyLogo'])) : ?>
                            <img src="<?php echo esc_url($testimonial['companyLogo']); ?>" alt="Company Logo" />
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>