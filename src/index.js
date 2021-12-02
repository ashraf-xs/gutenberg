import Gutenberg_Test_Heading from "./blocks/heading"
import Gutenberg_Test_Price from "./blocks/pricing";

const { __ } = wp.i18n;
const block_list = [
    {
        block   : Gutenberg_Test_Heading,
        config  : {
            name    : 'heading',
            title   : __('Heading Gutenberg Test', 'gutenberg-test'),
            icon    : 'heading',
            category: 'common',
            keywords: ['heading', 'gutenberg-test'],
        }
    },
    {
        block   : Gutenberg_Test_Price,
        config  : {
            name    : 'price',
            title   : __('Price Gutenberg Test', 'gutenberg-test'),
            icon    : 'heart',
            category: 'common',
            keywords: ['price', 'gutenberg-test'],
        }
    }
]

block_list.map( item => {
    new item.block(item.config);
} )
