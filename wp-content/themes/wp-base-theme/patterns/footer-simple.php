<?php
/**
 * Title: Footer - Simple Newsletter & Links
 * Slug: wpbs-blocks/footer-simple
 * Categories: footer
 * Block Types: core/template-part/footer
 * Description: A footer with newsletter subscription and navigation links
 *
 * @package WordPress
 * @subpackage WP_Base_Theme
 * @since WP Base Theme 1.0
 */
?>

<!-- wp:group {"tagName":"footer","className":"footer","layout":{"type":"constrained"},"style":{"spacing":{"padding":{"top":"60px","bottom":"60px"}}}} -->
<footer class="footer" style="padding-top:60px;padding-bottom:60px">

	<!-- wp:columns {"className":"footer-container"} -->
	<div class="wp-block-columns footer-container">

		<!-- Column 1 -->
		<!-- wp:column {"width":"30%","className":"footer-col"} -->
		<div class="wp-block-column footer-col" style="flex-basis:30%">
			<!-- wp:site-logo {"width":120} /-->

			<!-- wp:paragraph -->
			<p><?php esc_html_e('Subscribe to our newsletter', 'wpbs-blocks'); ?></p>
			<!-- /wp:paragraph -->

			<!-- Newsletter Form -->
			<!-- wp:html -->
            <form class="newsletter">
                <input type="email" placeholder="<?php esc_attr_e('Enter your email', 'wpbs-blocks'); ?>" required />
                <button type="submit"><?php esc_html_e('Subscribe', 'wpbs-blocks'); ?></button>
            </form>
            <!-- /wp:html -->
             <!-- wp:paragraph -->
			<p><?php esc_html_e('By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company.', 'wpbs-blocks'); ?></p>
			<!-- /wp:paragraph -->

		</div>
		<!-- /wp:column -->

		<!-- Column 2 -->
		<!-- wp:column {"width":"20%","className":"footer-col"} -->
		<div class="wp-block-column footer-col" style="flex-basis:20%">
            <!-- wp:heading {"level":3} -->
			<h3><?php esc_html_e('Column One', 'wpbs-blocks'); ?></h3>
			<!-- /wp:heading -->
            <!-- wp:navigation {"ref":"1865"} /-->
		</div>
		<!-- /wp:column -->

		<!-- Column 3 -->
		<!-- wp:column {"width":"20%","className":"footer-col"} -->
		<div class="wp-block-column footer-col" style="flex-basis:20%">
			<!-- wp:heading {"level":3} -->
			<h3><?php esc_html_e('Column Two', 'wpbs-blocks'); ?></h3>
			<!-- /wp:heading -->
            <!-- wp:navigation {"ref":"1868"} /-->
		</div>
		<!-- /wp:column -->

		<!-- Column 4 -->
		<!-- wp:column {"width":"30%","className":"footer-col"} -->
		<div class="wp-block-column footer-col" style="flex-basis:30%">
			
			<!-- wp:heading {"level":3} -->
			<h3><?php esc_html_e('Follow us', 'wpbs-blocks'); ?></h3>
			<!-- /wp:heading -->

			<!-- wp:group {"className":"socials","layout":{"type":"flex","orientation":"vertical","gap":"10px"}} -->
                <div class="footer_social_icons">
                    <!-- wp:pattern {"slug":"wpbs-blocks/social-icons"} /-->
                </div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

	</div>
	<!-- /wp:columns -->

	<!-- Divider -->
	<!-- wp:separator {"opacity":"20"} -->
	<hr class="wp-block-separator has-opacity-20" />
	<!-- /wp:separator -->

	<!-- Footer Bottom -->
	<!-- wp:group {"className":"footer-bottom","layout":{"type":"flex","justifyContent":"space-between","flexWrap":"wrap"}} -->
	<div class="footer-bottom wp-block-group">

		<!-- wp:paragraph -->
		<p><?php printf(esc_html__('© %d %s. All rights reserved.', 'wpbs-blocks'), date('Y'), esc_html__('Designly', 'wpbs-blocks')); ?></p>
		<!-- /wp:paragraph -->

		<!-- wp:group {"className":"bottom-links","layout":{"type":"flex","flexWrap":"wrap","gap":"10px"}} -->
		<div class="bottom-links wp-block-group">
			<!-- wp:navigation {"ref":"1884","layout":{"type":"flex","justifyContent":"center"}} /-->
		</div>
		<!-- /wp:group -->

	</div>
	<!-- /wp:group -->

</footer>
<!-- /wp:group -->
