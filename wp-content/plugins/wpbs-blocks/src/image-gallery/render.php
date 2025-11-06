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

$layout = $attributes['layout'] ?? 'simple-3col-gallery';
if ($layout === 'simple-3col-gallery') {
	include 'layouts/simple-3col-gallery.php';
} elseif ($layout === 'classic-3col-gallery') {
	include 'layouts/classic-3col-gallery.php';
} elseif ($layout === 'modern-2col-gallery') {
	include 'layouts/modern-2col-gallery.php';
} elseif ($layout === 'grid-3col-gallery') {
	include 'layouts/grid-3col-gallery.php';
} elseif ($layout === 'carousel-2col-gallery') {
	include 'layouts/carousel-2col-gallery.php';
} elseif ($layout === 'carousel-4col-gallery') {
	include 'layouts/carousel-4col-gallery.php';
} elseif ($layout === 'left-content-2slide-gallery') {
	include 'layouts/left-content-2slide-gallery.php';
} elseif ($layout === 'left-content-4slide-gallery') {
	include 'layouts/left-content-4slide-gallery.php';
} else {
	include 'layouts/simple-3col-gallery.php';
}

