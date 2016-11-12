/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */


CKEDITOR.editorConfig = function( config ) {
    config.toolbarGroups = [
        /*{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },*/
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        /*{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },*/
        /*{ name: 'forms', groups: [ 'forms' ] },*/

        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
       /* { name: 'links', groups: [ 'links' ] },*/
        { name: 'insert' },

        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'tools', groups: [ 'tools' ] },
        /*{ name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] },*/
        '/',
       /* { name: 'myDialog' }*/
    ];
    config.removeButtons = 'Flash,SpecialChar,Iframe,PageBreak,Language,CreateDiv,ShowBlocks';

};
