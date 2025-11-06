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
import { InspectorControls, useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button } from '@wordpress/components';

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

// Map layout values to frontend class names
const layoutClassMap = {
	'simple-3col-gallery': 'simple_3col_image_gallery gallery_3',
	'classic-3col-gallery': 'classic_3col_image_gallery gallery_5',
	'modern-2col-gallery': 'modern_2col_image_gallery gallery_8',
	'grid-3col-gallery': 'grid_3col_image_gallery gallery_10',
	'carousel-2col-gallery': 'carousel_2col_image_gallery gallery_16',
	'carousel-4col-gallery': 'carousel_4col_image_gallery gallery_19',
	'left-content-2slide-gallery': 'left_content_2slide_image_gallery gallery_26',
	'left-content-4slide-gallery': 'left_content_4slide_image_gallery gallery_27',
};

export default function Edit({ attributes, setAttributes }) {
	const { title, description, images = [], layout } = attributes;

	const onSelectImages = (newImages) => {
		setAttributes({
			images: newImages.map((img) => ({
				id: img.id,
				url: img.url,
				alt: img.alt,
			})),
		});
	};

	// Get mapped frontend class for backend preview
	const layoutClass = layoutClassMap[layout] || 'simple_3col_image_gallery';

	const blockProps = useBlockProps({
		className: `wp-block-create-block-image-gallery image_gallery ${layoutClass}`,
	});

	return (
		<>
			{/* Sidebar Settings */}
			<InspectorControls>
				<PanelBody title={__('Image Gallery Layout Settings', 'wpbs-blocks')}>
					<SelectControl
						label={__('Select Layout', 'wpbs-blocks')}
						value={layout}
						options={[
							{ label: __('Simple 3 Column Gallery', 'wpbs-blocks'), value: 'simple-3col-gallery' },
							{ label: __('Classic 3 Column Gallery', 'wpbs-blocks'), value: 'classic-3col-gallery' },
							{ label: __('Modern 2 Column Gallery', 'wpbs-blocks'), value: 'modern-2col-gallery' },
							{ label: __('Grid 3 Column Gallery', 'wpbs-blocks'), value: 'grid-3col-gallery' },
							{ label: __('Carousel 2 Column Gallery', 'wpbs-blocks'), value: 'carousel-2col-gallery' },
							{ label: __('Carousel 4 Column Gallery', 'wpbs-blocks'), value: 'carousel-4col-gallery' },
							{ label: __('Left Content – 2 Image Slider Gallery', 'wpbs-blocks'), value: 'left-content-2slide-gallery' },
							{ label: __('Left Content – 4 Image Slider Gallery', 'wpbs-blocks'), value: 'left-content-4slide-gallery' },
						]}
						onChange={(value) => setAttributes({ layout: value })} // ✅ fixed here
					/>
				</PanelBody>
			</InspectorControls>

			{/* Editor Content */}
			<div {...blockProps}>
				<div className="image_gallery">
					<div className="heading_wrap">
						<RichText
							tagName="h2"
							value={title}
							onChange={(val) => setAttributes({ title: val })}
							placeholder="Enter gallery title..."
						/>
						<RichText
							tagName="p"
							value={description}
							onChange={(val) => setAttributes({ description: val })}
							placeholder="Enter gallery description..."
						/>
					</div>

					<div className="gallery_wrap">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectImages}
								allowedTypes={['image']}
								multiple
								gallery
								value={images.map((img) => img.id)}
								render={({ open }) => (
									<Button onClick={open} variant="primary">
										{images.length ? 'Edit Gallery' : 'Add Images'}
									</Button>
								)}
							/>
						</MediaUploadCheck>

						{images.length > 0 && (
							<div className="gallery_preview">
								{images.map((img) => (
									<img
										key={img.id}
										src={img.url}
										alt={img.alt}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
