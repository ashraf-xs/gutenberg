import Base from '../../base';
const { RichText, InspectorControls, ColorPalette, MediaUpload, InnerBlocks, BlockControls, AlignmentToolbar} = wp.blockEditor;
const { PanelBody, IconButton, RangeControl } = wp.components

import { Tabs, Image  } from 'antd';

const { TabPane } = Tabs;
const ALLOWED_BLOCKS = [ 'core/button' ];

export default class Gutenberg_Test_Heading extends Base {

    get_attributes() {
        return {
            title: {
                type: 'string',
                source: 'html',
                selector: 'h2',
            },
    
            titleColor: {
                type: 'string',
                default: 'black'
                
            },

            backgroundImage: {
                type: 'string',
                default: null,
            },

            overlayColor: {
                type: 'string',
                default: 'black'
            },
            
            overlayOpacity: {
                type: 'number',
                default: 0.3
            },
            
            body: {
                type: 'string',
                srouce: 'html',
                selector: 'p'
            },

            alignment: {
                type: 'string',
                default: 'none'
            }
        }
    }

    get_controls({ attributes, setAttributes }) {
        return (
            <>
                <InspectorControls style={{ marginBottom: '40px' }}>
                    <PanelBody title={ 'Font Color Settings' }>
                        <Tabs type="line">     

                            <TabPane tab="Color" key="1">
                                <ColorPalette 
                                    value={ attributes._titleColor }
                                    onChange={ _titleColor => setAttributes({ _titleColor }) }
                                />
                            </TabPane>

                            <TabPane tab="Background" key="2">
                                <p><strong>Background Image</strong></p>
                                <Image width={200}  src={attributes.backgroundImage}/>
                                <MediaUpload 
                                    type="image"
                                    value={ attributes.backgroundImage }
                                    render={({ open }) => {
                                        return (
                                            <IconButton onClick={ open } icon="upload" className="editor-media-placeholder__button is-button is-default is-large"> 
                                                Background Image 
                                            </IconButton>
                                        )
                                    }}
                                    onSelect={ val => setAttributes({ backgroundImage: val.sizes.full.url }) }
                                />
                                <p><strong>Overlay Color</strong></p>
                                 <ColorPalette 
                                    value={ attributes.overlayColor }
                                    onChange={ overlayColor => setAttributes({ overlayColor }) }
                                />
                                 <p><strong>Overlay Opacity</strong></p>
                                 <RangeControl
                                    label="Overlay Opacity"
                                    value={ attributes.overlayOpacity }
                                    min={ 0 }
                                    max={ 1 }
                                    step={ 0.05 }
                                    onChange={ overlayOpacity => setAttributes({overlayOpacity}) }
                                 />

                            </TabPane>
                            <TabPane tab="Typography" key="3">
                                    
                            </TabPane>
                        </Tabs>
                    </PanelBody>
                </InspectorControls>
            </>
        )
    }

    get_block_controls({ attributes, setAttributes }) {
        return (
            <>
                <BlockControls>
                    <AlignmentToolbar value={ attributes.alignment }/>
                </BlockControls>
            </>
        )
    }

    get_edit({ attributes, setAttributes }) {

        return (
            <>
                <RichText 
                    key="editable"
                    tagName="h2"
                    placeholder="Wpmet Team"
                    value={attributes.title}
                    style={{color: attributes._titleColor}}
                    onChange={ title => setAttributes({ title }) }
                />

                <RichText 
                    key="editable"
                    tagName="p"
                    placeholder="Today, we’ll explain the difference between HTML, Rich Text and Plain Text email formats and which one you should use."
                    value={attributes.body}
                    onChange={ body => setAttributes({ body }) }
                />
                <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS }/>

            </>
        );
    }

    get_save({ attributes }) {
       return this.container(
            <>
                <h2>{attributes.title}</h2>
                <RichText.Content tagName="p" value={attributes.body}/>
                <InnerBlocks.Content/>
            </>
        ) 
    }

}