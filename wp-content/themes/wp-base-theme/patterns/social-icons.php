<?php
/**
 * Title: Social Icons
 * Slug: wpbs-blocks/social-icons
 * Categories: social, buttons
 * Description: A collection of social icons with custom styling.
 */

$wpbs_social_settings = pods('wpbs_social_settings');
$facebook_url = $wpbs_social_settings->field('facebook_url');
$instagram_url = $wpbs_social_settings->field('instagram_url');
$twitter_url = $wpbs_social_settings->field('twitter_url');
$linkedin_url = $wpbs_social_settings->field('linkedin_url');
$youtube_url = $wpbs_social_settings->field('youtube_url');
?>

<ul class="wp-block-social-links social-icons">
    <?php if ($facebook_url) : ?>
        <li>
            <a href="<?php echo esc_url($facebook_url); ?>" target="_blank">
            <img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/assets/images/facebook.svg'); ?>" alt="Facebook logo" />
            <?php esc_html_e('Facebook', 'wpbs-blocks'); ?>
            </a>
        </li>
    <?php endif; ?>
    <?php if ($instagram_url) : ?>
        <li>
            <a href="<?php echo esc_url($instagram_url); ?>" target="_blank">
                <img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/assets/images/insta.svg'); ?>" alt="Instagram logo" />
                <?php esc_html_e('Instagram', 'wpbs-blocks'); ?>
            </a>
        </li>
    <?php endif; ?>
    <?php if ($twitter_url) : ?>
        <li>
            <a href="<?php echo esc_url($twitter_url); ?>" target="_blank">
                <img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/assets/images/twiter.svg'); ?>" alt="Twitter logo" />
                <?php esc_html_e('Twitter', 'wpbs-blocks'); ?>
            </a>
        </li>
    <?php endif; ?>
    <?php if ($linkedin_url) : ?>
        <li>
            <a href="<?php echo esc_url($linkedin_url); ?>" target="_blank">
                <img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/assets/images/linkedin.svg'); ?>" alt="LinkedIn logo" />
                <?php esc_html_e('LinkedIn', 'wpbs-blocks'); ?>
            </a>
        </li>
    <?php endif; ?>
    <?php if ($youtube_url) : ?>
        <li>
            <a href="<?php echo esc_url($youtube_url); ?>" target="_blank">
                <img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/assets/images/youtube.svg'); ?>" alt="YouTube logo" />
                <?php esc_html_e('YouTube', 'wpbs-blocks'); ?>
            </a>
        </li>
    <?php endif; ?>
</ul>