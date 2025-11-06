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

// Get attributes with defaults
$post_type = isset($attributes['postType']) ? $attributes['postType'] : 'post';
$number_of_posts = isset($attributes['numberOfPosts']) ? intval($attributes['numberOfPosts']) : 3;
$display_date = isset($attributes['displayDate']) ? $attributes['displayDate'] : true;
$display_author = isset($attributes['displayAuthor']) ? $attributes['displayAuthor'] : true;
$display_excerpt = isset($attributes['displayExcerpt']) ? $attributes['displayExcerpt'] : true;
$display_featured_image = isset($attributes['displayFeaturedImage']) ? $attributes['displayFeaturedImage'] : true;
$order_by = isset($attributes['orderBy']) ? $attributes['orderBy'] : 'date';
$order = isset($attributes['order']) ? $attributes['order'] : 'desc';
$layout = isset($attributes['layout']) ? $attributes['layout'] : 'grid';

// Query posts
$query_args = array(
    'post_type' => $post_type,
    'posts_per_page' => $number_of_posts,
    'orderby' => $order_by,
    'order' => $order,
    'post_status' => 'publish'
);

$posts_query = new WP_Query($query_args);

// Only render when there are posts
if ( $posts_query->have_posts() ) {
    // sanitize layout slug and map to file
    $layout_slug = preg_replace('/[^a-z0-9_-]/', '', strtolower( (string) $layout ));
    $layout_file = __DIR__ . '/layouts/layout-' . $layout_slug . '.php';

    if ( file_exists( $layout_file ) ) {
        include $layout_file;
    } else {
        // Fallback to grid when layout not found
        include __DIR__ . '/layouts/layout-grid.php';
    }
}

// Reset post data
wp_reset_postdata();