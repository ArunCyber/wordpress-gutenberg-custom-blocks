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
import { useBlockProps, MediaUpload, InspectorControls, RichText } from '@wordpress/block-editor';

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

import { Button, PanelBody, PanelRow, ToggleControl, TextControl, ColorPalette } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const pluginUrl = window.WPBS_BLOCKS.pluginUrl;

const layouts = [
    { name: 'layout-one', label: 'Layout One', img: `${pluginUrl}/src/image-content-section/images/layout-one.png` },
    { name: 'layout-two', label: 'Layout Two', img: `${pluginUrl}/src/image-content-section/images/layout-two.png` },
    { name: 'layout-three', label: 'Layout Three', img: `${pluginUrl}/src/image-content-section/images/layout-three.png` },
    { name: 'layout-four', label: 'Layout Four', img: `${pluginUrl}/src/image-content-section/images/layout-four.png` },
    { name: 'layout-five', label: 'Layout Five', img: `${pluginUrl}/src/image-content-section/images/layout-five.png` },
];

export default function Edit({ attributes, setAttributes }) {
    const { layout, title, content, imageUrl, showButtons, buttons = [] } = attributes;
    const blockProps = useBlockProps({ className: `wpbs-blocks ${layout}` });

    const onSelectImage = (media) => {
        setAttributes({ imageUrl: media.url });
    };

    const onChangeTitle = (newTitle) => {
        setAttributes({ title: newTitle });
    };

    const onChangeContent = (newContent) => {
        setAttributes({ content: newContent });
    };

    const onChangeLayout = (newLayout) => {
        setAttributes({ layout: newLayout });
    };

    const onAddButton = () => {
        setAttributes({
            buttons: [
                ...buttons,
                { name: '', url: '', newTab: false, color: '#007cba' }
            ]
        });
    };

    const onRemoveButton = (index) => {
        const newButtons = [...buttons];
        newButtons.splice(index, 1);
        setAttributes({ buttons: newButtons });
    };

    const onChangeButton = (index, field, value) => {
        const newButtons = buttons.map((btn, i) =>
            i === index ? { ...btn, [field]: value } : btn
        );
        setAttributes({ buttons: newButtons });
    };

    return (
        <Fragment>
            {/* ===== Sidebar Controls ===== */}
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
                <PanelBody title={__('Image Settings', 'wpbs-blocks')} initialOpen={false}>
                    <MediaUpload
                        onSelect={onSelectImage}
                        allowedTypes={['image']}
                        value={imageUrl}
                        render={({ open }) => (
                            <Button
                                onClick={open}
                                className={imageUrl ? 'editor-post-featured-image__preview' : 'editor-post-featured-image__toggle'}
                            >
                                {imageUrl ? __('Change Image', 'wpbs-blocks') : __('Add Image', 'wpbs-blocks')}
                            </Button>
                        )}
                    />
                </PanelBody>
            </InspectorControls>

            {/* ===== Block Content ===== */}
            <div {...blockProps}>
                <div className="ics-block-main-grid">
                    <div className="content_wrapper">
                        <RichText
                            tagName="h3"
                            value={title}
                            onChange={onChangeTitle}
                            placeholder={__('Enter title...', 'wpbs-blocks')}
                            className="ics-title"
                        />
                        <RichText
                            tagName="p"
                            value={content}
                            onChange={onChangeContent}
                            placeholder={__('Enter content...', 'wpbs-blocks')}
                            className="ics-content"
                        />
                        <ToggleControl
                            label={__('Show Buttons', 'wpbs-blocks')}
                            checked={!!showButtons}
                            onChange={(checked) => setAttributes({ showButtons: checked })}
                            className="ics-toggle-buttons"
                            style={{ margin: '16px 0' }}
                        />
                        {showButtons && (
                            <div className="ics-buttons-repeatable">
                                {/* Always show one set of button fields by default when toggle is enabled, even if buttons is empty */}
                                {buttons.length === 0 && (
                                    <div className="ics-button-fields" style={{ marginBottom: '1em', border: '1px solid #eee', padding: '15px', borderRadius: '6px', background: '#fafbfc' }}>
                                        {/* Row 1: Button Name & URL */}
                                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
                                            <RichText
                                                tagName="span"
                                                label={__('Button Name', 'wpbs-blocks')}
                                                value={''}
                                                onChange={(val) => setAttributes({ buttons: [{ name: '', url: '', newTab: false, color: '#007cba' }] })}
                                                placeholder={__('Button Name', 'wpbs-blocks')}
                                                style={{ flex: 1, minWidth: 0 }}
                                                className="ics-btn-name"
                                            />
                                            <RichText
                                                tagName="span"
                                                label={__('Button URL', 'wpbs-blocks')}
                                                value={''}
                                                onChange={(val) => setAttributes({ buttons: [{ name: '', url: '', newTab: false, color: '#007cba' }] })}
                                                placeholder={__('Button URL', 'wpbs-blocks')}
                                                style={{ flex: 1, minWidth: 0 }}
                                                className="ics-btn-url"
                                            />
                                            <ToggleControl
                                                label={__('Open in new tab', 'wpbs-blocks')}
                                                checked={false}
                                                onChange={() => setAttributes({ buttons: [{ name: '', url: '', newTab: false, color: '#007cba' }] })}
                                            />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px' }}>
                                            <div style={{ display: 'flex', gap: '25px', alignItems: 'flex-end' }}>
                                                {/* Row 2: Color */}
                                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                    {/* Add heading before ColorPalette */}
                                                    <span style={{ fontWeight: 600, marginBottom: '20px' }}>{__('Button Normal', 'wpbs-blocks')}</span>
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <ColorPalette
                                                            value={'#007cba'}
                                                            onChange={() => setAttributes({ buttons: [{ name: '', url: '', newTab: false, color: '#007cba' }] })}
                                                            colors={[
                                                                { name: 'Blue', color: '#007cba' },
                                                                { name: 'Red', color: '#d63638' },
                                                                { name: 'Black', color: '#222' },
                                                                { name: 'White', color: '#fff' },
                                                            ]}
                                                            disableCustomColors={false}
                                                            clearable={false}
                                                            style={{ minWidth: 80 }}
                                                        />
                                                        {/* New ColorPalette: Text Color */}
                                                        <ColorPalette
                                                            value={'#d63638'}
                                                            onChange={() => setAttributes({ buttons: [{ name: '', url: '', newTab: false, color: '#007cba' }] })}
                                                            colors={[
                                                                { name: 'Purple', color: '#7e5bef' },
                                                                { name: 'Pink', color: '#e83e8c' },
                                                                { name: 'Gray', color: '#6c757d' },
                                                                { name: 'White', color: '#fff' },
                                                            ]}
                                                            disableCustomColors={false}
                                                            clearable={false}
                                                            label={__('Text Color', 'wpbs-blocks')}
                                                            style={{ minWidth: 80 }}
                                                        />
                                                    </div>
                                                </div>
                                                {/* New Section: Button Hover */}
                                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                    <span style={{ fontWeight: 600, marginBottom: '20px' }}>
                                                        {__('Button Hover', 'wpbs-blocks')}
                                                    </span>
                                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                        <ColorPalette
                                                            value={'#007cba'}
                                                            onChange={() => {/* handle hover background color change */ }}
                                                            colors={[
                                                                { name: 'Blue', color: '#007cba' },
                                                                { name: 'Red', color: '#d63638' },
                                                                { name: 'Black', color: '#222' },
                                                                { name: 'White', color: '#fff' },
                                                            ]}
                                                            disableCustomColors={false}
                                                            clearable={false}
                                                            label={__('Hover BG', 'wpbs-blocks')}
                                                            style={{ minWidth: 80 }}
                                                        />
                                                        <ColorPalette
                                                            value={'#d63638'}
                                                            onChange={() => {/* handle hover text color change */ }}
                                                            colors={[
                                                                { name: 'Purple', color: '#7e5bef' },
                                                                { name: 'Pink', color: '#e83e8c' },
                                                                { name: 'Gray', color: '#6c757d' },
                                                                { name: 'White', color: '#fff' },
                                                            ]}
                                                            disableCustomColors={false}
                                                            clearable={false}
                                                            label={__('Hover Text', 'wpbs-blocks')}
                                                            style={{ minWidth: 80 }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Row 3: Add Button */}
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <Button isPrimary onClick={() => setAttributes({ buttons: [{ name: '', url: '', newTab: false, color: '#007cba' }] })}>
                                                {__('Add Button', 'wpbs-blocks')}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                {buttons.map((button, idx) => (
                                    <div key={idx} className="ics-button-fields" style={{ marginBottom: '1em', border: '1px solid #eee', padding: '15px', borderRadius: '6px', background: '#fafbfc' }}>
                                        {/* Row 1: Button Name & URL */}
                                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
                                            <RichText
                                                tagName="span"
                                                label={__('Button Name', 'wpbs-blocks')}
                                                value={button.name}
                                                onChange={(val) => onChangeButton(idx, 'name', val)}
                                                placeholder={__('Button Name', 'wpbs-blocks')}
                                                style={{ flex: 1, minWidth: 0 }}
                                                className="ics-btn-name"
                                            />
                                            <RichText
                                                tagName="span"
                                                label={__('Button URL', 'wpbs-blocks')}
                                                value={button.url}
                                                onChange={(val) => onChangeButton(idx, 'url', val)}
                                                placeholder={__('Button URL', 'wpbs-blocks')}
                                                style={{ flex: 1, minWidth: 0 }}
                                                className="ics-btn-url"
                                            />
                                            <ToggleControl
                                                label={__('Open in new tab', 'wpbs-blocks')}
                                                checked={!!button.newTab}
                                                onChange={(val) => onChangeButton(idx, 'newTab', val)}
                                            />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px' }}>
                                            <div style={{ display: 'flex', gap: '25px', alignItems: 'flex-end' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                    <span style={{ fontWeight: 600, marginBottom: '20px' }}>{__('Button Normal', 'wpbs-blocks')}</span>
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <ColorPalette
                                                            value={button.color || '#007cba'}
                                                            onChange={(val) => onChangeButton(idx, 'color', val)}
                                                            colors={[
                                                                { name: 'Blue', color: '#007cba' },
                                                                { name: 'Red', color: '#d63638' },
                                                                { name: 'Black', color: '#222' },
                                                                { name: 'White', color: '#fff' },
                                                            ]}
                                                            disableCustomColors={false}
                                                            clearable={false}
                                                            style={{ minWidth: 80 }}
                                                        />
                                                        <ColorPalette
                                                            value={button.textColor || '#d63638'}
                                                            onChange={(val) => onChangeButton(idx, 'textColor', val)}
                                                            colors={[
                                                                { name: 'Purple', color: '#7e5bef' },
                                                                { name: 'Pink', color: '#e83e8c' },
                                                                { name: 'Gray', color: '#6c757d' },
                                                                { name: 'White', color: '#fff' },
                                                            ]}
                                                            disableCustomColors={false}
                                                            clearable={false}
                                                            label={__('Text Color', 'wpbs-blocks')}
                                                            style={{ minWidth: 80 }}
                                                        />
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                    <span style={{ fontWeight: 600, marginBottom: '20px' }}>{__('Button Hover', 'wpbs-blocks')}</span>
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <ColorPalette
                                                            value={button.hoverBgColor || '#007cba'}
                                                            onChange={(val) => onChangeButton(idx, 'hoverBgColor', val)}
                                                            colors={[
                                                                { name: 'Blue', color: '#007cba' },
                                                                { name: 'Red', color: '#d63638' },
                                                                { name: 'Black', color: '#222' },
                                                                { name: 'White', color: '#fff' },
                                                            ]}
                                                            disableCustomColors={false}
                                                            clearable={false}
                                                            label={__('Hover BG', 'wpbs-blocks')}
                                                            style={{ minWidth: 80 }}
                                                        />
                                                        <ColorPalette
                                                            value={button.hoverTextColor || '#d63638'}
                                                            onChange={(val) => onChangeButton(idx, 'hoverTextColor', val)}
                                                            colors={[
                                                                { name: 'Purple', color: '#7e5bef' },
                                                                { name: 'Pink', color: '#e83e8c' },
                                                                { name: 'Gray', color: '#6c757d' },
                                                                { name: 'White', color: '#fff' },
                                                            ]}
                                                            disableCustomColors={false}
                                                            clearable={false}
                                                            label={__('Hover Text', 'wpbs-blocks')}
                                                            style={{ minWidth: 80 }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Row 3: Clear & Remove */}
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <Button onClick={() => { onChangeButton(idx, 'name', ''); onChangeButton(idx, 'url', ''); }}>
                                                {__('Clear', 'wpbs-blocks')}
                                            </Button>
                                            <Button isDestructive onClick={() => onRemoveButton(idx)}>
                                                {__('Remove', 'wpbs-blocks')}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {buttons.length > 0 && (
                                    <Button isPrimary onClick={onAddButton} style={{ marginTop: '8px', borderRadius: '10px' }}>
                                        {__('Add Button', 'wpbs-blocks')}
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="image_wrapper">
                        {imageUrl && <img src={imageUrl} alt={title || __('Block Image', 'wpbs-blocks')} />}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

