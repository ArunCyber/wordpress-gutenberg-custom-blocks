<?php
/**
 * Title: Simple Header - Logo, Menu, Button
 * Slug: wpbs-blocks/header-simple
 * Categories: headers
 * Block Types: core/template-part/header
 * Description: A simple clean header with logo, nav menu and action button.
 *
 * @package WordPress
 * @subpackage WP_Base_Theme
 */
?>

<!-- wp:group {"tagName":"header","className":"site-header","layout":{"type":"flex","justifyContent":"space-between","alignItems":"center"}} -->
<header class="site-header wp-block-group">

	<!-- wp:group {"className":"logo","layout":{"type":"flex","alignItems":"center"}} -->
	<div class="logo wp-block-group">
		<!-- wp:site-logo {"width":120} /-->
	</div>
	<!-- /wp:group -->
    <!-- wp:navigation {"ref":"1857","layout":{"type":"flex","justifyContent":"center"}} /-->

	<!-- wp:buttons {"className":"header-buttons"} -->
	<div class="wp-block-buttons header-buttons">
		<!-- wp:button {"className":"book-btn"} -->
		<div class="wp-block-button book-btn"><a class="wp-block-button__link"><?php esc_html_e('Button', 'wpbs-blocks'); ?></a></div>
		<!-- /wp:button -->

		<!-- wp:button {"className":"book-btn"} -->
		<div class="wp-block-button book-btn"><a class="wp-block-button__link"><?php esc_html_e('Button', 'wpbs-blocks'); ?></a></div>
		<!-- /wp:button -->
	</div>
	<!-- /wp:buttons -->

	

</header>
<!-- /wp:group -->
