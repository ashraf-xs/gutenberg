import Base from '../../base';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { useState,Fragment } = wp.element;
const { RichText, InspectorControls, InspectorAdvancedControls,  ColorPalette, MediaUpload, InnerBlocks, BlockControls, AlignmentToolbar} = wp.blockEditor;
const { PanelBody, IconButton, RangeControl, ToggleControl } = wp.components

export default class Gutenberg_Test_Price extends Base {

    get_attributes() {
        return {
            titleColor: {
                type: 'string',
                default: null
            },

            visibleOnMobile:{ 
                type: 'boolean',
                default: true,
            }
        }
    }

    addAttributes( settings ) {


        //check if object exists for old Gutenberg version compatibility
        if( typeof settings.attributes !== 'undefined' ){
        
            settings.attributes = Object.assign( settings.attributes, {
                visibleOnMobile:{ 
                    type: 'boolean',
                    default: true,
                }
            });
        
        }
    
        return settings;
    }

    applyExtraClass( extraProps, blockType, attributes ) {

        const { visibleOnMobile } = attributes;
        
        //check if attribute exists for old Gutenberg version compatibility
        //add class only when visibleOnMobile = false
        if ( typeof visibleOnMobile !== 'undefined' && !visibleOnMobile ) {
            extraProps.className = classnames( extraProps.className, 'mobile-hidden' );   
        }
    

        console.log(extraProps)

        return extraProps;
    }

    withAdvancedControls(BlockEdit) {
        return ( props ) => {

            const {
                attributes,
                setAttributes,
                isSelected,
            } = props;
    
            const {
                visibleOnMobile,
            } = attributes;
            
            
            return (
                <Fragment>
                    <BlockEdit {...props} />
                    { isSelected &&
                        <InspectorAdvancedControls>
                            <ToggleControl
                                label={ __( 'Mobile Devices Visibity' ) }
                                checked={ !! visibleOnMobile }
                                onChange={ () => setAttributes( {  visibleOnMobile: ! visibleOnMobile } ) }
                                help={ !! visibleOnMobile ? __( 'Showing on mobile devices.' ) : __( 'Hidden on mobile devices.' ) }
                            />
                        </InspectorAdvancedControls>
                    }
    
                </Fragment>
            );
        };
    }

    get_controls({ attributes, setAttributes }) {
        const [ hasFixedBackground, setHasFixedBackground ] = useState( false );
        return (
            <Fragment>
                <InspectorControls style={{ marginBottom: '40px' }}>
                    <PanelBody title={ 'Font Color Settings' }>
                        <ToggleControl
                            label="Fixed Background"
                            help={
                                hasFixedBackground
                                    ? 'Has fixed background.'
                                    : 'No fixed background.'
                            }
                            checked={ hasFixedBackground }
                            onChange={ () => {
                                setHasFixedBackground( ( state ) => ! state );
                            } }
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        )
    }

    get_block_controls({ attributes, setAttributes }) {
        return (
            <>
                <h1>Hello world</h1>
            </>
        )
    }

    get_edit({ attributes, setAttributes }) {

        return (
            <Fragment>
                

            </Fragment>
        );
    }

    get_save({ attributes }) {
       return this.container(
            <Fragment>
                <h1>Hello world</h1>
            </Fragment>
        ) 
    }

}