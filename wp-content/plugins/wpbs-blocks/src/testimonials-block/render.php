<?php

/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
$layout = isset($attributes['layout']) ? $attributes['layout'] : 'layout-one';
$section_title = isset($attributes['sectionTitle']) ? $attributes['sectionTitle'] : '';
$section_description = isset($attributes['sectionDescription']) ? $attributes['sectionDescription'] : '';
$testimonials = isset($attributes['testimonials']) ? $attributes['testimonials'] : [];

// Get the wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'testimonials-section ' . esc_attr($layout)
]);

// Include the selected layout file
$layout_file = __DIR__ . '/layouts/' . $layout . '.php';
if (file_exists($layout_file)) {
    include $layout_file;
} else {
?>
    <div <?php echo $wrapper_attributes; ?>>
        <!-- Section Header -->
        <?php if ($section_title || $section_description) : ?>
            <div class="testimonials-section-header">
                <?php if ($section_title) : ?>
                    <h2><?php echo wp_kses_post($section_title); ?></h2>
                <?php endif; ?>
                <?php if ($section_description) : ?>
                    <p><?php echo wp_kses_post($section_description); ?></p>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <!-- Testimonials -->
        <div class="testimonials-container">
            <?php if (!empty($testimonials)) : ?>
                <?php foreach ($testimonials as $index => $testimonial) : ?>
                    <div class="testimonial-entry" data-testimonial-index="<?php echo $index; ?>">
                        <!-- Company Logo -->
                        <?php if (!empty($testimonial['companyLogo'])) : ?>
                            <div class="company-logo">
                                <img src="<?php echo esc_url($testimonial['companyLogo']); ?>" alt="Company Logo" />
                            </div>
                        <?php endif; ?>

                        <!-- Testimonial Review -->
                        <?php if (!empty($testimonial['testimonialReview'])) : ?>
                            <div class="testimonial-review">
                                <?php echo wp_kses_post($testimonial['testimonialReview']); ?>
                            </div>
                        <?php endif; ?>

                        <!-- Rating Stars for backward compatibility -->
                        <?php if (!empty($testimonial['rating'])) : ?>
                            <div class="testimonial-rating">
                                <div class="stars">
                                    <?php for ($i = 1; $i <= 5; $i++): ?>
                                        <span class="star <?php echo $i <= $testimonial['rating'] ? 'filled' : ''; ?>">★</span>
                                    <?php endfor; ?>
                                </div>
                                <span class="rating-text">(<?php echo esc_html($testimonial['rating']); ?>/5)</span>
                            </div>
                        <?php endif; ?>

                        <!-- Client Image -->
                        <?php if (!empty($testimonial['clientImage'])) : ?>
                            <div class="client-image">
                                <img src="<?php echo esc_url($testimonial['clientImage']); ?>" alt="Client" />
                            </div>
                        <?php endif; ?>

                        <!-- Client Designation/Content -->
                        <?php if (!empty($testimonial['wysiwygContent'])) : ?>
                            <div class="client-designation">
                                <?php echo wp_kses_post($testimonial['wysiwygContent']); ?>
                            </div>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            <?php else : ?>
                <!-- Fallback for single testimonial (backward compatibility) -->
                <?php
                $company_logo = isset($attributes['companyLogo']) ? $attributes['companyLogo'] : '';
                $testimonial_review = isset($attributes['testimonialReview']) ? $attributes['testimonialReview'] : '';
                $client_image = isset($attributes['clientImage']) ? $attributes['clientImage'] : '';
                $wysiwyg_content = isset($attributes['wysiwygContent']) ? $attributes['wysiwygContent'] : '';
                ?>

                <?php if ($company_logo || $testimonial_review || $client_image || $wysiwyg_content) : ?>
                    <div class="testimonial-entry">
                        <?php if ($company_logo) : ?>
                            <div class="company-logo">
                                <img src="<?php echo esc_url($company_logo); ?>" alt="Company Logo" />
                            </div>
                        <?php endif; ?>

                        <?php if ($testimonial_review) : ?>
                            <div class="testimonial-review">
                                <?php echo wp_kses_post($testimonial_review); ?>
                            </div>
                        <?php endif; ?>

                        <?php if (!empty($rating)) : ?>
                            <div class="testimonial-rating">
                                <div class="stars">
                                    <?php for ($i = 1; $i <= 5; $i++): ?>
                                        <span class="star <?php echo $i <= $rating ? 'filled' : ''; ?>">★</span>
                                    <?php endfor; ?>
                                </div>
                                <span class="rating-text">(<?php echo esc_html($rating); ?>/5)</span>
                            </div>
                        <?php endif; ?>

                        <?php if ($client_image) : ?>
                            <div class="client-image">
                                <img src="<?php echo esc_url($client_image); ?>" alt="Client" />
                            </div>
                        <?php endif; ?>

                        <?php if ($wysiwyg_content) : ?>
                            <div class="client-designation">
                                <?php echo wp_kses_post($wysiwyg_content); ?>
                            </div>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            <?php endif; ?>
        </div>
    </div>
<?php
}
