/*jslint nomen: true, evil: false, browser: true */

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
         'jquery', 
         'dexo', 
         'text', 
         'app/businessProfile', 
         'text!modules/claimBusiness.html', 
         'http://player.dexknows.com/player.js?width=640&height=360&embedCode=5jbXhoNDo45BqOnr-FYIqC0T_lxN3b6t&wmode=transparent'
        ],  
        function ($, dexo, text, businessProfile, claimBusiness, ooyala) {
    
    var myDialogue = new DEXO.ui.dialogue();
    
    /*global DEXO */
    /*global openRegHighslide */
    /*global $ */
    $(document).ready(function () {
        
        /**
         * Launch the photo gallery carousel.
         */
        
        /**
         * Wire up event handlers for the "Claim Your Business" dialogue
         * elements.
         */
        
    
        $("a.claimBusiness").click(function (event) {
            
            event.preventDefault();
            
            myDialogue.show(claimBusiness);
            
        });
    
        /** For the "Close" button. */
    
        $("div.closeButton").click(function (event) {
            
            event.preventDefault();
            
            myDialogue.reset();
    
        });
    
        /** Also close the dialogue with clicks on the darkened background. */
    
        $(".blackOverlay").click(function (event) {
    
            event.preventDefault();
            
            myDialogue.reset();
    
        });
    
        /** Also close the dialogue with the escape key. */
    
        $(document).keyup(function (event) {
    
            if (event.keyCode === 27) {
    
                myDialogue.reset();
    
            }
    
        });
    
    });

});