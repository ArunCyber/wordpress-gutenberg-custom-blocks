<?php

/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content.
 * @var WP_Block $block      Block instance.
 */

// Get the attributes
$title = isset($attributes['title']) ? $attributes['title'] : '';
$content = isset($attributes['content']) ? $attributes['content'] : '';
$image_url = isset($attributes['imageUrl']) ? $attributes['imageUrl'] : '';
$layout = isset($attributes['layout']) ? $attributes['layout'] : 'layout-one';
$show_buttons = isset($attributes['showButtons']) ? $attributes['showButtons'] : false;
$buttons = isset($attributes['buttons']) && is_array($attributes['buttons']) ? $attributes['buttons'] : [];

// Get the wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'image-content-section ' . esc_attr($layout)
]);

// Include the selected layout file
$layout_file = __DIR__ . '/layouts/' . $layout . '.php';
if (file_exists($layout_file)) {
    include $layout_file;
} else {
    // Fallback layout if the layout file doesn't exist
?>
    <div <?php echo $wrapper_attributes; ?>>
        <div class="content_wrapper">
            <?php if ($title) : ?>
                <h3><?php echo wp_kses_post($title); ?></h3>
            <?php endif; ?>

            <?php if ($content) : ?>
                <div class="content"><?php echo wp_kses_post($content); ?></div>
            <?php endif; ?>
        </div>

        <?php if ($image_url) : ?>
            <div class="image_wrapper">
                <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($title); ?>" />
            </div>
        <?php endif; ?>

        <?php if ($show_buttons && !empty($buttons)) : ?>
            <div class="image-content-section-button-wrapper">
                <?php
                $hover_styles = [];

                foreach ($buttons as $index => $button) {
                    $hover_bg  = ! empty($button['hoverBgColor']) ? $button['hoverBgColor'] : '#fff';
                    $hover_txt = ! empty($button['hoverTextColor']) ? $button['hoverTextColor'] : '#000';

                    $hover_styles[] = sprintf(
                        'a.ims-one-href-%1$d:hover { background:%2$s; color:%3$s; }',
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
                        class="ims-one-href-<?php echo esc_attr($index); ?>"
                        href="<?php echo esc_url($btn_url); ?>"
                        style="background:<?php echo esc_attr($btn_color); ?>;color:<?php echo esc_attr($btn_text_color); ?>;"
                        <?php echo $target_attr; ?>>
                        <?php echo esc_html($btn_name ?: __('Button', 'image-content-section')); ?>
                    </a>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
<?php
}
?>