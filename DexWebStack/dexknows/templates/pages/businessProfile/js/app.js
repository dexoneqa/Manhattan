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
         'http://player.dexknows.com/player.js?width=640&height=360&embedCode=5jbXhoNDo45BqOnr-FYIqC0T_lxN3b6t&wmode=transparent', 
         'http://cdn.gigya.com/js/socialize.js?apiKey=2_FYnHm3maZPs7YGHbzoN8mKjLHwkP834TcQAncOZ8aOwx6p8dutqMrDwCeFl7uWLr'
        ],  
        function ($, dexo, text, businessProfile, claimBusiness, ooyala, bigGigya) {
         'http://player.dexknows.com/player.js?width=640&height=360&embedCode=5jbXhoNDo45BqOnr-FYIqC0T_lxN3b6t&wmode=transparent'
    
            var myDialogue = new DEXO.ui.dialogue();
            
            /*global DEXO */
            /*global openRegHighslide */
            /*global $ */
            $(document).ready(function () {
                
                window.console.log("DOM ready fired.");
                
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
                
                var gigyaShareTitle = 'Le Colonial | Chicago, IL 60611 | Dexknows.com\u2122', 
                gigyaAPIKey = '2_FYnHm3maZPs7YGHbzoN8mKjLHwkP834TcQAncOZ8aOwx6p8dutqMrDwCeFl7uWLr', 
                profileurl = 'index.html', 
                shareProfileDescription = 'I found Le Colonial on dexknows.com and thought you might want to check it out. Find business information, reviews, maps, coupons, driving directions and more.', 
                logo_url = 'http://images.dexknows.com/logo/927805.jpg?d=1278484359710', 
                couponUrl = '/business_profiles/le_colonial-b927805/coupons', 
                currPageUrl = 'http://www.dexknows.com/business_profiles/le_colonial-b927805', 
                shareCouponDescription = 'I found coupons for Le Colonial on dexknows.com and thought you might want to check it out. Find business information, reviews, maps, coupons, driving directions and more.', 
                businessname = 'Le Colonial', 
                shareCouponDescription = 'I found coupons for Le Colonial on dexknows.com and thought you might want to check it out. Find business information, reviews, maps, coupons, driving directions and more.', 
                targetSite = "http://dexwebstack";

                /*global targetSite */
                /*global gigyaAPIKey */
                var conf = {
                        APIKey: gigyaAPIKey,
                        enabledProviders: 'facebook,google,yahoo,twitter,aol,messenger'
                    }, 
                    share_review_conf = {
                        APIKey: gigyaAPIKey,
                        enabledProviders: 'facebook,twitter,yahoo,messenger,google,linkedin'
                    }, 
                    /*******************************************************************************
                     * gigya Login UI parameters for social login button links inside 
                     * the Log In lightbox
                     ******************************************************************************/
                    reglogin_params = {
                        showTermsLink: 'false',
                        hideGigyaLink: true,
                        height: 95,
                        width: 300,
                        containerID: 'gigyaInner',
                        UIConfig: '<config><body><controls><snbuttons buttonsize="35"></snbuttons></controls></body></config>',
                        buttonsStyle: 'fullLogo',
                        autoDetectUserProviders: '',
                        facepilePosition: 'none'
                    }, 
                    /*******************************************************************************
                     * gigya Login UI parameters for social login button links inside 
                     * the Sign Up lightbox
                     ******************************************************************************/
                    regsignup_params = {
                        showTermsLink: 'false',
                        hideGigyaLink: true,
                        height: 95,
                        width: 300,
                        containerID: 'gigyaInnerSignUp',
                        UIConfig: '<config><body><controls><snbuttons buttonsize="35"></snbuttons></controls></body></config>',
                        buttonsStyle: 'fullLogo',
                        autoDetectUserProviders: '',
                        facepilePosition: 'none'
                    }, 
                    /*******************************************************************************
                     * gigya Login UI parameters for social login button links on 
                     * regular Sign Up page, user/signup.asp
                     ******************************************************************************/
                    signup_page_params = {
                        showTermsLink: 'false',       
                        height: 38,
                        width: 400,
                        containerID: 'signUpDiv',
                        UIConfig: '<config><body><controls><snbuttons buttonsize="38"></snbuttons></controls></body></config>',
                        autoDetectUserProviders: '',
                        facepilePosition: 'top',
                        redirectURL: targetSite
                    };

                /*global gigyaShareTitle */
                /*global gigya */
                /*global shareProfileDescription */
                /*global logo_url */
                /*global profileurl */
                function loadGigyaShareBar() {
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
                        iconsOnly: 'true', 
                        showCounts: 'none'      
                    };

                    gigya.services.socialize.showShareBarUI(conf, params);
                }
                
                if(document.getElementById('gigyaShareBarButtons')) {
                    $(document).ready(function() {
                        loadGigyaShareBar();
                    });
                }

            
            });
        
        });
