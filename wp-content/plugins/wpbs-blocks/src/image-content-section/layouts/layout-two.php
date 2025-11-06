<?php

/**
 * Image + Content section layout
 * Image section full width covered layout. Title, contents and buttons aligned left.
 */
?>

<div class="image_content_wrapper image-content-section-layout-two alignfull" <?php echo $wrapper_attributes; ?> style="background-image: url('<?php echo esc_url($image_url); ?>');">
    <div class="ims-two-content-image-wrapper">
        <div class="content_wraper">
            <?php if ($title) : ?>
                <h1><?php echo wp_kses_post($title); ?></h1>
            <?php endif; ?>

            <?php if ($content) : ?>
                <p><?php echo wp_kses_post($content); ?></p>
            <?php endif; ?>

            <?php if ($show_buttons && !empty($buttons)) : ?>
                <div class="image-content-section-button-wrapper">
                    <?php
                    $hover_styles = [];

                    foreach ($buttons as $index => $button) {
                        $hover_bg  = ! empty($button['hoverBgColor']) ? $button['hoverBgColor'] : '#fff';
                        $hover_txt = ! empty($button['hoverTextColor']) ? $button['hoverTextColor'] : '#000';

                        $hover_styles[] = sprintf(
                            'a.ims-two-href-%1$d:hover { background:%2$s; color:%3$s; }',
                            $index,
                            esc_attr($hover_bg),
                            esc_attr($hover_txt)
                        );
                    }

                    if ($hover_styles) :
                        printf('<style>%s</style>', implode("\n", $hover_styles));
                    endif;

                    foreach ($buttons as $index => $button) :
                        $btn_name       = isset($button['name']) ? $button['name'] : '';
                        $btn_url        = isset($button['url']) ? $button['url'] : '';
                        $target_attr    = !empty($button['newTab']) ? ' target="_blank" rel="noopener noreferrer"' : '';
                        $btn_color      = !empty($button['color']) ? $button['color'] : '#007cba';
                        $btn_text_color = !empty($button['textColor']) ? $button['textColor'] : '#000';

                        // Skip if both name and URL missing
                        if (! $btn_name && ! $btn_url) {
                            continue;
                        }
                    ?>
                        <a
                            class="ims-two-href-<?php echo esc_attr($index); ?>"
                            href="<?php echo esc_url($btn_url); ?>"
                            style="background:<?php echo esc_attr($btn_color); ?>;color:<?php echo esc_attr($btn_text_color); ?>;"
                            <?php echo $target_attr; ?>>
                            <?php echo esc_html($btn_name ?: __('Button', 'image-content-section')); ?>
                        </a>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>