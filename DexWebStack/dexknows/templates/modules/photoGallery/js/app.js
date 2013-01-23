/*jslint nomen: true, evil: false, browser: true */
/*global DEXO, openRegHighslide, $ */

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});



// Start the main app logic.
requirejs(
        [
         'http://cdn1.dxstatic.com.localhost/desktop/scripts/custom/dexo-full.js', 
         'app/script'
        ], 
        function (dexlib, photoGallery) {
            
            $(document).ready(function () {

                var myGallery = new DEXO.gui.gallery();
                
                myGallery.create();
                
            });
        
});