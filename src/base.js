const { registerBlockType } = wp.blocks;
const { addFilter } = wp.hooks

export default class Base {

    stylesheetVariable = {};


    constructor( props ) {
        this.props  = props;
        registerBlockType( 'gutenberg-test'.concat('/', props.name), {
            title       : props.title,
            icon        : props.icon,
            category    : props.category,
            keywords    : props.keywords,
            attributes  : this.get_attributes(),
            edit        : this.callEditMethod.bind(this),
            save        : this.get_save.bind(this),
        }); 

        if( typeof this.addAttributes === 'function' ) {
            addFilter(
                'blocks.registerBlockType',
                'gutenberg-test'.concat('/', props.name),
                this.addAttributes
            );
        }

        if( typeof this.withAdvancedControls === 'function' ) {
            addFilter(
                'editor.BlockEdit',
                'gutenberg-test'.concat('/', props.name),
                this.withAdvancedControls
            );
        }

        if( typeof this.applyExtraClass === 'function' ) {
            addFilter(
                'blocks.getSaveContent.extraProps',
                'gutenberg-test'.concat('/', props.name),
                this.applyExtraClass
            );
        }        

    }



    callEditMethod({ attributes, setAttributes }) {
        this.prepareStyleSheet( attributes )
        return (
            <>
                { this.get_controls({ attributes, setAttributes }) }
                { this.get_block_controls({ attributes, setAttributes }) }
                { this.get_edit({ attributes, setAttributes }) }
            </>
        )
    }

    prepareStyleSheet( attributes ) {
        Object.keys( attributes ).map( attr => {
            if( attr.startsWith('_') ) {
                this.stylesheetVariable = {
                    ...this.stylesheetVariable,
                    ['--'.concat(this.props.name, attr)] : attributes[attr]
                }
            }
        } );
    }

    container({props}) {
        return (
            <div className="gutenberg-test-wrapper-block">
                { props.children }
            </div>
        )
    }
}