/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * WordPress dependencies
 */
import { 
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		postType,
		numberOfPosts,
		displayDate,
		displayAuthor,
		displayExcerpt,
		displayFeaturedImage,
		orderBy,
		order,
		layout
	} = attributes;

	// Get available post types
	const postTypes = useSelect((select) => {
		const { getPostTypes } = select('core');
		const availablePostTypes = getPostTypes({ per_page: -1 }) || [];
		return availablePostTypes
			.filter((type) => type.viewable && type.slug !== 'attachment')
			.map((type) => ({
				label: type.name,
				value: type.slug
			}));
	}, []);

	// Get posts for preview
	const posts = useSelect((select) => {
		const { getEntityRecords } = select('core');
		return getEntityRecords('postType', postType, {
			per_page: numberOfPosts,
			orderby: orderBy,
			order: order,
			_embed: true
		});
	}, [postType, numberOfPosts, orderBy, order]);

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Layout Settings', 'post-block')}>
					<SelectControl
						label={__('Layout Type', 'post-block')}
						value={layout}
						options={[
							{ label: __('Grid Layout', 'post-block'), value: 'grid' },
							{ label: __('Slider Layout', 'post-block'), value: 'slider' },
							{ label: __('2 Column Layout', 'post-block'), value: '2-column' },
							{ label: __('3 Column Layout', 'post-block'), value: '3-column' },
							{ label: __('Single Post', 'post-block'), value: 'single' },
							{ label: __('List Layout', 'post-block'), value: 'list' }
						]}
						onChange={(value) => setAttributes({ layout: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Post Settings', 'post-block')}>
					<SelectControl
						label={__('Post Type', 'post-block')}
						value={postType}
						options={postTypes}
						onChange={(value) => setAttributes({ postType: value })}
					/>
					<RangeControl
						label={__('Number of Posts', 'post-block')}
						value={numberOfPosts}
						onChange={(value) => setAttributes({ numberOfPosts: value })}
						min={1}
						max={10}
					/>
					<SelectControl
						label={__('Order By', 'post-block')}
						value={orderBy}
						options={[
							{ label: __('Date', 'post-block'), value: 'date' },
							{ label: __('Title', 'post-block'), value: 'title' },
							{ label: __('Menu Order', 'post-block'), value: 'menu_order' },
							{ label: __('Random', 'post-block'), value: 'rand' }
						]}
						onChange={(value) => setAttributes({ orderBy: value })}
					/>
					<SelectControl
						label={__('Order', 'post-block')}
						value={order}
						options={[
							{ label: __('Descending', 'post-block'), value: 'desc' },
							{ label: __('Ascending', 'post-block'), value: 'asc' }
						]}
						onChange={(value) => setAttributes({ order: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Display Options', 'post-block')}>
					<ToggleControl
						label={__('Display Featured Image', 'post-block')}
						checked={displayFeaturedImage}
						onChange={(value) => setAttributes({ displayFeaturedImage: value })}
					/>
					<ToggleControl
						label={__('Display Date', 'post-block')}
						checked={displayDate}
						onChange={(value) => setAttributes({ displayDate: value })}
					/>
					<ToggleControl
						label={__('Display Author', 'post-block')}
						checked={displayAuthor}
						onChange={(value) => setAttributes({ displayAuthor: value })}
					/>
					<ToggleControl
						label={__('Display Excerpt', 'post-block')}
						checked={displayExcerpt}
						onChange={(value) => setAttributes({ displayExcerpt: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="post-block-editor">
					<h3>{__('Post Block Preview', 'post-block')}</h3>
					<p>{__('Post Type:', 'post-block')} <strong>{postType}</strong></p>
					<p>{__('Number of Posts:', 'post-block')} <strong>{numberOfPosts}</strong></p>
					<p>{__('Layout:', 'post-block')} <strong>{layout}</strong></p>
					
					{posts && posts.length > 0 ? (
						<div className={`posts-preview posts-layout-${layout}`}>
							{posts.map((post) => (
								<div key={post.id} className="post-preview">
									{displayFeaturedImage && post._embedded?.['wp:featuredmedia'] && (
										<div className="post-image">
											<img 
												src={post._embedded['wp:featuredmedia'][0]?.source_url} 
												alt={post.title.rendered}
												style={{ width: '100px', height: '70px', objectFit: 'cover' }}
											/>
										</div>
									)}
									<div className="post-content">
										<h4>{post.title.rendered}</h4>
										{displayDate && <p><em>{new Date(post.date).toLocaleDateString()}</em></p>}
										{displayAuthor && post._embedded?.author && (
											<p><strong>{__('By:', 'post-block')} {post._embedded.author[0]?.name}</strong></p>
										)}
										{displayExcerpt && post.excerpt && (
											<div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.substring(0, 100) + '...' }} />
										)}
									</div>
								</div>
							))}
						</div>
					) : (
						<p>{__('No posts found.', 'post-block')}</p>
					)}
				</div>
			</div>
		</>
	);
}
