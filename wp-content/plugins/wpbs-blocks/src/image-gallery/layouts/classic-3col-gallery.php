<?php
/**
 * Classic 3-Column Image Gallery.
*/

$title       = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$images      = $attributes['images'] ?? [];
$align       = isset( $attributes['align'] ) ? 'align' . $attributes['align'] : '';
?>

<div class="wp-block-create-block-image-gallery image_gallery classic_3col_image_gallery gallery_5 <?php echo esc_attr( $align ); ?>">
	<div class="heading_wrap">
		<?php if ( $title ) : ?>
			<h2><?php echo esc_html( $title ); ?></h2>
		<?php endif; ?>

		<?php if ( $description ) : ?>
			<p><?php echo esc_html( $description ); ?></p>
		<?php endif; ?>
	</div>

	<?php if ( ! empty( $images ) ) : ?>
		<div class="gallery_wrap">
			<?php foreach ( $images as $img ) : ?>
				<div class="gallery_item">
					<img src="<?php echo esc_url( $img['url'] ); ?>" alt="<?php echo esc_attr( $img['alt'] ); ?>">
				</div>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>
</div>
