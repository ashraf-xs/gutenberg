<?php 
/*
Plugin Name: Gutenberg Test
Version: 1.0.0
Author: Ashraf
License: GPLv2 or later
Text Domain: gutenberg-test
*/

class Gutenberg_Test {

    const VERSION = '1.0.0';

    public function __construct() {
        add_action( 'plugins_loaded', [$this, 'plugin_init' ] );
    }

    public static function plugin_url() {
        return trailingslashit( plugins_url( '/', __FILE__ ) );
    }
    
    public static function plugin_path() {
        return trailingslashit( plugin_dir_path( __FILE__ ) );
    }

    public function plugin_init() {

        add_action('enqueue_block_editor_assets', [$this, 'block_editor_assets']);
        add_action('admin_enqueue_scripts', [$this, 'admin_scripts']);
        add_action('wp_enqueue_scripts', [$this, 'frontend_scripts']);

        add_action( 'init', [$this, 'default_colors' ] );
        add_action( 'init', [$this, 'register_blocks' ] );

    }

    public function default_colors() {
        // add_theme_support('editor-color-palette', array(
        //     [
        //         'name' => 'Deep Red Color',
        //         'slug' => 'red',
        //         'color'=> '#CA1135'
        //     ],
        //     [
        //         'name' => 'Solid Black Color',
        //         'slug' => 'black',
        //         'color'=> '#000000'
        //     ]
        // ));

        // add_theme_support('editor-font-sizes', array(
        //     [
        //         'name' => 'Regular Size',
        //         'slug' => 'regular',
        //         'size' => 20,
        //     ],
        //     [
        //         'name' => 'Large Size',
        //         'slug' => 'large',
        //         'size' => 34,
        //     ],
        // ));
    }  

   
    public function admin_scripts() {
        wp_enqueue_script('gutenberg-test-editor', self::plugin_url() . '/js/editor.js', self::VERSION, true);
        wp_enqueue_style('gutenberg-test-editor', self::plugin_url() . '/css/editor.css', self::VERSION, true);
    }
    
    public function frontend_scripts() {
       wp_enqueue_script('gutenberg-test-frontend', self::plugin_url() . '/js/frontend.js', self::VERSION, true);
       wp_enqueue_style('gutenberg-test-frontend', self::plugin_url() . '/css/frontend.css', self::VERSION, true);
    }

    public function block_editor_assets() {
        wp_enqueue_script('gutenberg-test-plugin-starter', self::plugin_url() . '/build/index.js', array(
            'wp-blocks',
            'wp-editor',
            'wp-i18n',
            'wp-element',
            'wp-components',
            'wp-data'
        ), self::VERSION, true);
    }

    public function register_blocks() {
        
        register_block_type( 'gutenberg-test/block', array(
            'style'             => 'gutenberg-test-frontend',
            'editor_style'      => 'gutenberg-test-editor',
            'editor_scripts'    => 'gutenberg-test-plugin-starter'
        ) );
        
    } 
}

new Gutenberg_Test();