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
import { useState } from 'react';
import { useBlockProps, MediaUpload, MediaUploadCheck, InspectorControls, RichText } from '@wordpress/block-editor';
import { Button, PanelBody, PanelRow, ToggleControl, TextControl, ColorPalette } from '@wordpress/components';

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

const pluginUrl = window.WPBS_BLOCKS.pluginUrl;

const layouts = [
    { name: 'layout-one', label: 'Layout One', img: `${pluginUrl}/src/testimonials-block/images/layout-one.png` },
    { name: 'layout-two', label: 'Layout Two', img: `${pluginUrl}/src/testimonials-block/images/layout-two.png` },
    { name: 'layout-three', label: 'Layout Three', img: `${pluginUrl}/src/testimonials-block/images/layout-three.png` },
    { name: 'layout-four', label: 'Layout Four', img: `${pluginUrl}/src/testimonials-block/images/layout-four.png` },
    { name: 'layout-five', label: 'Layout Five', img: `${pluginUrl}/src/testimonials-block/images/layout-five.png` },
    { name: 'layout-six', label: 'Layout Six', img: `${pluginUrl}/src/testimonials-block/images/layout-six.png` },
];

export default function Edit({ attributes, setAttributes, isSelected }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const {
        layout,
        sectionTitle,
        sectionDescription,
        companyLogo,
        testimonialReview,
        clientImage,
        wysiwygContent
    } = attributes;

    const onChangeLayout = (newLayout) => {
        setAttributes({ layout: newLayout });
    };

    const testimonials = attributes.testimonials || [];

    return (
        <div {...useBlockProps()}>

            <InspectorControls>
                <PanelBody title={__('Layout Settings', 'wpbs-blocks')} initialOpen={true}>
                    <PanelRow>
                        <div className="layout-selector">
                            {layouts.map((layoutOption) => (
                                <div
                                    key={layoutOption.name}
                                    className={`layout-option${layout === layoutOption.name ? ' selected' : ''}`}
                                    onClick={() => onChangeLayout(layoutOption.name)}
                                    style={{
                                        border: layout === layoutOption.name ? '2px solid #007cba' : '2px solid transparent',
                                        background: layout === layoutOption.name ? '#e7f2ff' : '#fff',
                                        borderRadius: '8px',
                                        padding: '6px',
                                        cursor: 'pointer',
                                        boxShadow: layout === layoutOption.name ? '0 0 0 2px #b3e0ff' : 'none',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        minWidth: '90px',
                                        marginRight: '8px',
                                    }}
                                >
                                    <img src={layoutOption.img} alt={layoutOption.label} style={{ width: '48px', height: '48px', borderRadius: '6px', marginBottom: '4px', border: layout === layoutOption.name ? '2px solid #007cba' : '1px solid #eee', background: '#f8f8f8' }} />
                                    <span style={{ fontSize: '13px', color: layout === layoutOption.name ? '#007cba' : '#333', fontWeight: layout === layoutOption.name ? 600 : 400 }}>{layoutOption.label}</span>
                                </div>
                            ))}
                        </div>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>

            {/* NEW: Section Title and Description RichText fields */}
            <div className="testimonials-section-header" style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                <RichText
                    tagName="h2"
                    placeholder={__('Add section title...', 'testimonials-block')}
                    value={attributes.sectionTitle || ''}
                    onChange={(value) => setAttributes({ sectionTitle: value })}
                    style={{ marginBottom: '10px', fontSize: '1.5em', fontWeight: 'bold' }}
                />
                <RichText
                    tagName="p"
                    placeholder={__('Add section description...', 'testimonials-block')}
                    value={attributes.sectionDescription || ''}
                    onChange={(value) => setAttributes({ sectionDescription: value })}
                    style={{ fontSize: '1em', color: '#666' }}
                />
            </div>

            {testimonials.length > 1 && (
                <div className="testimonial-nav">
                    {testimonials.map((item, idx) => (
                        <Button
                            key={idx}
                            isPrimary={idx === activeIndex}
                            onClick={() => setActiveIndex(idx)}
                            style={{
                                marginRight: '6px',
                                background: idx === activeIndex ? '#007cba' : '#eee',
                                color: idx === activeIndex ? '#fff' : '#111'
                            }}
                        >
                            {__('Testimonial', 'testimonials-block')} {idx + 1}
                        </Button>
                    ))}
                </div>
            )}

            {/* Show only active testimonial */}
            {testimonials[activeIndex] && (
                <div className="testimonial-entry" style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => {
                                const updated = [...testimonials];
                                updated[activeIndex].companyLogo = media.url;
                                setAttributes({ testimonials: updated });
                            }}
                            allowedTypes={['image']}
                            value={testimonials[activeIndex].companyLogo}
                            render={({ open }) => (
                                <Button
                                    onClick={open}
                                    style={{ marginTop: '8px', borderRadius: '10px', border: 'solid #000 2px' }}>
                                    {testimonials[activeIndex].companyLogo ? <img src={testimonials[activeIndex].companyLogo} alt="Company Logo" style={{ maxHeight: '60px' }} /> : __('Upload Logo', 'testimonials-block')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    <RichText
                        style={{ margin: '1rem 0px' }}
                        tagName="div"
                        placeholder={__('Review', 'testimonials-block')}
                        value={testimonials[activeIndex].testimonialReview}
                        onChange={(value) => {
                            const updated = [...testimonials];
                            updated[activeIndex].testimonialReview = value;
                            setAttributes({ testimonials: updated });
                        }}
                    />

                    {/* 5-Star Rating Option */}
                    <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>{__('Rating:', 'testimonials-block')}</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => {
                                        const updated = [...testimonials];
                                        updated[activeIndex].rating = star;
                                        setAttributes({ testimonials: updated });
                                    }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '24px',
                                        color: star <= (testimonials[activeIndex].rating || 0) ? '#ffc107' : '#ddd',
                                        transition: 'color 0.2s ease',
                                        padding: '2px'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!testimonials[activeIndex].rating) {
                                            e.target.style.color = '#ffc107';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!testimonials[activeIndex].rating) {
                                            e.target.style.color = '#ddd';
                                        }
                                    }}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        {testimonials[activeIndex].rating && (
                            <span style={{ fontSize: '14px', color: '#666', marginLeft: '8px' }}>
                                ({testimonials[activeIndex].rating}/5)
                            </span>
                        )}
                        {testimonials[activeIndex].rating && (
                            <Button
                                isSmall
                                isDestructive
                                onClick={() => {
                                    const updated = [...testimonials];
                                    delete updated[activeIndex].rating;
                                    setAttributes({ testimonials: updated });
                                }}
                                style={{ marginLeft: '10px', fontSize: '12px', padding: '4px 8px' }}
                            >
                                {__('Clear', 'testimonials-block')}
                            </Button>
                        )}
                    </div>

                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => {
                                const updated = [...testimonials];
                                updated[activeIndex].clientImage = media.url;
                                setAttributes({ testimonials: updated });
                            }}
                            allowedTypes={['image']}
                            value={testimonials[activeIndex].clientImage}
                            render={({ open }) => (
                                <Button
                                    onClick={open}
                                    style={{ marginTop: '8px', borderRadius: '10px', border: 'solid #000 2px' }}>
                                    {testimonials[activeIndex].clientImage ? <img src={testimonials[activeIndex].clientImage} alt="Client" style={{ maxHeight: '60px', borderRadius: '50%' }} /> : __('Upload Image', 'testimonials-block')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    <RichText
                        tagName="div"
                        multiline="p"
                        placeholder={__('Client Designation', 'testimonials-block')}
                        value={testimonials[activeIndex].wysiwygContent}
                        onChange={(value) => {
                            const updated = [...testimonials];
                            updated[activeIndex].wysiwygContent = value;
                            setAttributes({ testimonials: updated });
                        }}
                    />
                </div>
            )}

            {/* Add/Remove buttons */}
            <Button
                style={{ marginTop: '8px', borderRadius: '10px', background: '#3858e9', color: '#fff' }}
                onClick={() => setAttributes({
                    testimonials: [...testimonials, {
                        sectionTitle: '',
                        sectionDescription: '',
                        companyLogo: '',
                        testimonialReview: '',
                        clientImage: '',
                        wysiwygContent: '',
                    }]
                })}
            >
                {__('Add Testimonial', 'testimonials-block')}
            </Button>

            {testimonials.length > 1 && (
                <Button
                    style={{ margin: '8px 0px 0px 10px', borderRadius: '10px', background: '#dc3545', color: '#fff' }}
                    isDestructive
                    onClick={() => {
                        const updated = testimonials.filter((_, idx) => idx !== activeIndex);
                        setAttributes({ testimonials: updated });
                        setActiveIndex(Math.max(0, activeIndex - 1));
                    }}
                >
                    {__('Remove', 'testimonials-block')}
                </Button>
            )}
        </div>
    );
}