<?php

/**
 * Testimonial layout
 * Single testimonial layout style.
 */
?>

<div class="testimonial_wrap testimonial-block-layout-one">
    <?php if (!empty($testimonials)) : ?>
        <div class="testimonial_content">
            <?php foreach ($testimonials as $index => $testimonial) : ?>
                <div class="testimonial_item" data-testimonial-index="<?php echo $index; ?>">
                    <?php if (!empty($testimonial['companyLogo'])) : ?>
                        <img src="<?php echo esc_url($testimonial['companyLogo']); ?>" alt="Company Logo" />
                    <?php endif; ?>

                    <?php if (!empty($testimonial['testimonialReview'])) : ?>
                        <h5><?php echo wp_kses_post($testimonial['testimonialReview']); ?></h5>
                    <?php endif; ?>

                    <div class="testimonial_name_wraper">
                        <?php if (!empty($testimonial['clientImage'])) : ?>
                            <img src="<?php echo esc_url($testimonial['clientImage']); ?>" alt="Client" />
                        <?php endif; ?>

                        <?php if (!empty($testimonial['wysiwygContent'])) : ?>
                            <?php echo wp_kses_post($testimonial['wysiwygContent']); ?>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>