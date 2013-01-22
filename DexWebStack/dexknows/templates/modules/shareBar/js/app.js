/*jslint nomen: true, evil: false, browser: true, eqeqeq: false, plusplus: false */

/**
 * @author Dex One www.dexknows.com
 */

/*global requirejs */
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
/*global Lib */
requirejs(['jquery', Lib.socialize, 'dexo', 'app/shareBar'], function ($, socialize, dexo, shareBar) {
    //jQuery, modernizr, html5shiv, and the app/sub module are all
    //loaded and can be used here now.
    
    /*global DEXO */
    if (typeof DEXO.vanity === "undefined") {
        DEXO.vanity = {};
    }
    
    DEXO.vanity = function () {
        url = "http://cdn.gigya.com/js/socialize.js?apiKey=2_FYnHm3maZPs7YGHbzoN8mKjLHwkP834TcQAncOZ8aOwx6p8dutqMrDwCeFl7uWLr", 
        /*global gigyaShareTitle */
        /*global gigya */
        /*global shareProfileDescription */
        /*global logo_url */
        /*global profileurl */
        /*global conf */
        /*global write_to_feed_callback */
        /*global onLoginHandler */
        /*global reglogin_params */
        /*global regsignup_params */
        loadShareBar = function () {
            var ua = new gigya.services.socialize.UserAction(), 
            my_context, 
            params;

            ua.setLinkBack("http://" + document.domain + profileurl);
            ua.setTitle(gigyaShareTitle);
            ua.setDescription(shareProfileDescription);

            ua.addMediaItem({
                type: 'image', 
                src: logo_url, 
                href: "http://" + document.domain + profileurl
            });

            my_context = { 
                share_type: 'profile'
            };
             
            params = { 
                userAction: ua, 
                shareButtons: 'facebook,twitter,email,google-plusone', 
                containerID: 'gigyaShareBarButtons', 
                showMoreButton: 'false',    
                context: my_context, 
                onSendDone: write_to_feed_callback, 
                iconsOnly: 'true', 
                showCounts: 'none'      
            };

            gigya.services.socialize.showShareBarUI(conf, params);
        }, 
        /*global gigya */
        Init = function () {
            gigya.services.socialize.showLoginUI(conf, reglogin_params);         
            gigya.services.socialize.showLoginUI(conf, regsignup_params); 
            gigya.services.socialize.addEventHandlers(conf, {onLogin: onLoginHandler});
        };
    };

    /*global $, loadGigyaShareBar */
    $(document).ready(function () {
        
        var myData = DEXO.vanity();
        
        if (document.getElementById('gigyaShareBarButtons')) {
            myData.loadGigyaShareBar();
        }
        
        myData.Init();
        
    });
    
});