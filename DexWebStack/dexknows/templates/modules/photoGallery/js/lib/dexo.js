/*jslint nomen: true, evil: false, browser: true */
/*global DEXO, $, jQuery, trackZone, targetSite, showLB, openRegHighslide, gigya */

/**
 * @fileOverview This file defines the behavior for the
 * front-end (web stack) portion of 
 * <a href="http://www.dexknows.com">www.dexknows.com</a>.
 */

/**
 * First, check to see if the DEXO object exists already. 
 * If not, create it.
 */

if (typeof DEXO === "undefined") {
    
    var DEXO = {};
    
}

/**
 * The pairs of parentheses has the highest precedence of all operators 
 * and ensures that our class will be executed without undue delay.
 */

(function() {

    /**
     * Strict mode: <a href="http://mzl.la/VQHRRq">documentation</a> on MDN.
     */

    "use strict";

    /**
     * @scope _global_
     * @class
     * @constructor
     */

    var Dex = DEXO || function () {
        
        this.prototype = {}; 
        
    };

    /**
     * @class General miscellaneous utilities.
     * @constructor
     */

    Dex.etc = function() {

        var testObject,

        /** 
         * Create an html element so we can use it to test 
         * the DOM API and figure out the browser with 
         * which we're interacting.
         */

        testElement = document.createElement("body"),

            /**
             * We return this if we find we are on a browser that
             * follows the W3C-sepc DOM API.
             */

            standard = {

                /**
                 * Use the <pre>classList</pre> (W3C standard) object.
                 */

                getClassCount: function(element) {
                    return element.classList.length;
                }
            },

            /**
             * We return this if we find we are on a browser that
             * follows a non-standard DOM API (pre-10 IE).
             */

            ie = {

                /**
                 * Use the <pre>className</pre> (IE) object.
                 */

                getClassCount: function(element) {
                    return element.className.length;
                }
            };

        this.prototype = {};

        try {

            /**
             * Check to see if we comply with the open
             * standard DOM API.
             */

            testObject = standard.getClassCount(testElement);
            return standard;
            
        } catch (e) {

            testObject = ie.getClassCount(testElement);
            return ie;
            
        }

    };

    /*global DEXO */
    if (typeof DEXO === "undefined") {
        
        var DEXO = {};
        
    }

    DEXO.social = function () {
        this.prototype = {};
    };

    /*global $ */
    /*global gigya */
    DEXO.social.gigya = function () {
        
        this.prototype = {};
        
        this.adjustTweetBox = function (theWidth, theDelay) {
            
            if (typeof theWidth === "undefined") {
                theWidth = "80px";
            }
            
            setTimeout(function (theDelay) {
                $("div.gig-button-container-twitter-tweet > div > iframe").css("width", theWidth);
            }, theDelay);
            
        };
    };

    /*******************************************************************************
     * @returns {DEXO.social.gigya.settings}
     ******************************************************************************/
    /*global logo_url */
    /*global gigya */
    /*global profileurl */
    DEXO.social.gigya.settings = function () {
        
        this.prototype = {};

        var browser = navigator.appVersion, 
        delay = 1000, 
        tweetBoxWidth = "80px", 
        ua = new gigya.services.socialize.UserAction(), 
        myContext = {
                share_type: "profile"
            }, 
        feed = {
                width: 315,
                height: 245,
                shareButtons: "share",
                containerID: "friendsFeedList",
                initialTab: "friends",
                tabOrder: "friends"
            }, 
        shareBar = { 
                userAction: ua,
                shareButtons: "facebook-like,twitter-tweet,email",
                containerID: "gigyaShare", 
                operationMode: "autoDetect",
                showMoreButton: "false",
                context: myContext,
                onSendDone: write_to_feed_callback
            }, 
        mediaItem = {
                type: "image",
                src: logo_url,
                href: "http://" + document.domain + profileurl
            };

        if (browser.match("MSIE 8") || browser.match("MSIE 7")) {
            delay = 2000;
            tweetBoxWidth = "82px";
        }
        
        this.getDelay = function () {
            return delay;
        };

        /** Give IE extra time to load everything before we adjust the appearance. */
        this.setDelay = function (timePeriod) {
            delay = timePeriod;
        };
        
        this.getFeed = function () {
            return feed;
        };
        
        this.setFeed = function (myFeed) {
            feed = myFeed;
        };
        
        this.getShareBar = function () {
            return shareBar;
        };
        
        this.setShareBar = function (myShareBar) {
            shareBar = myShareBar;
        };
        
        this.getMediaItem = function (key) {
            
            if (typeof key === "undefined") {
                return mediaItem;
            } else {
                return mediaItem[key];
            }
        };
        
        this.setMediaItem = function (key, myMediaItem) {
            mediaItem[key] = myMediaItem;
        };
        
        this.getTweetBoxWidth = function () {
            return tweetBoxWidth;
        };
        
        this.setTweetBoxWidth = function (newWidth) {
            tweetBoxWidth = newWidth;
        };
        
        return this;

    };

    /**
     * @class Represents the graphical user interface.
     * @constructor
     */

    Dex.gui = function() {

        this.prototype = {};

        /**
         * Shows DOM elements matching the selector string 
         * @param {String} theSelector The selector that targets what to show.
         * @requires jQuery
         */

        this.show = function(target) {
            $(target).css("display", "block");
        };

        /**
         * Hides DOM elements
         * @param {String} theSelector The selector that targest what to hide.
         * @requires jQuery
         */

        this.hide = function(target) {
            $(target).css("display", "none");
        };
    
    };

    /**
     * @class The dialogue GUI component.
     * @constructor
     */

    Dex.gui.dialogue = function() {

        var gui = new Dex.gui(), 

            /**
             * @private {Object} selectors contains CSS-style
             * element selector statements to target 
             * the various parts of the dialogue.
             */

            selectors = {
                closeButton: "div.closeButton",
                overlay: "div.blackOverlay,div.litContent",
                formInput: "form > input",
                self: "div.litContent > div",
                errorAlert: "#errorAlert",
                logInForm: ".logInFormEmail",
                signUpMenu: "div.signUpMenu",
                emailSignUpForm: "div.emailSignUpForm",
                emailLogInForm: "div.logInFormEmail",
                litContent: ".litContent"
            };

        this.prototype = {};

        /**
         * Reset the the initial view-state.
         */

        this.reset = function() {

            this.hideOverlay();
            this.showSignUpMenu();
            this.hideEmailSignUpForm();
            this.resetAllForms();

        };

        /**
         * Resets the page to its initial load view.
         * @requires jQuery
         */

        this.resetAllForms = function() {
            $(selectors.formInput).val("");
        };

        /**
         * Post an alert message.
         * @param {String} message The message to display.
         * @requires jQuery
         */

        this.inform = function(message) {
            $(selectors.errorAlert).html(message);
        };

        /** Display the overlay element */

        this.showOverlay = function() {
            gui.show(selectors.overlay);
        };

        /** Hide the overlay. */

        this.hideOverlay = function() {
            gui.hide(selectors.overlay);
        };

        /** Display close button */

        this.showCloseButton = function() {
            gui.show(selectors.closeButton);
        };

        /** Hide close button */

        this.hideCloseButton = function() {
            gui.hide(selectors.closeButton);
        };

        /** Hide the log-in view. */

        this.hideLogInView = function() {
            gui.hide(selectors.logInForm);
        };

        /** Display the initial view sign-up menu. */

        this.showSignUpMenu = function() {
            gui.show(selectors.signUpMenu);
        };

        /** Hide the initial view sign-up menu. */

        this.hideSignUpMenu = function() {
            gui.hide(selectors.signUpMenu);
        };

        /** Shows the second-tier e-mail sign-up form. */

        this.showEmailSignUpForm = function() {
            gui.show(selectors.emailSignUpForm);
            return this;
        };

        /** Hides the second-tier e-mail sign-up form. */

        this.hideEmailSignUpForm = function() {
            gui.hide(selectors.emailSignUpForm);
        };

        /**
         * @param {String} dialogueName The name to use for the dialogue.
         * @param {Number} [whereX]
         * @returns {Boolean}
         * @requires jQuery
         * Displays the dialogue using a light box effect.
         */

        this.showDialogue = function(dialogueName, whereX) {

            gui.show(selectors.overlay);
            gui.hide(".formRoot:not(." + dialogueName + ")");
            gui.show(selectors.self);
            gui.show(selectors.closeButton);

            if ($.isNumeric(whereX) === false) {
                whereX = "50px";
            }

            $(selectors.litContent).css("top", whereX);

            return false;

        };

        /** 
         * Hide the dialogue.
         * @static
         */

        this.hideDialogue = function() {
            gui.hide(selectors.self);
        };

        /**
         * @requires //scripts/desktop/user-reg.js
         * @param {Element} myReferrer
         * @returns showLB()
         * @deprecated Can't find this used anywhere.
         */

        this.emailSignUp = function(myReferrer) {

            trackZone("x.mw.nav.15", myReferrer.href, targetSite);
            return showLB("signUpReview");

        };

        /**
         * @param {Element} myReferrer
         * Opens the legacy e-mail login dialogue.
         */

        this.legacyLogin = function(myReferrer) {

            trackZone("x.mw.nav.16", myReferrer.href, targetSite);
            openRegHighslide('gigyaDex');

        };

        /**
         * Wrapper which opens the legacy Facebook login dialogue.
         */

        this.fbLogin = function() {
            gigya.services.socialize.plugins.login.providerClick("gigyaInner", "facebook");
        };

    };

    /**
     * @class
     * @constructor
     * @requires jQuery
     */

    Dex.gui.dialogue.form = function() {

        var data = {
            displayname: $("#displayname").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            confpass: $("#password").val(),
            action: "add_ajax"
        },
            formDataValues;

        this.prototype = {};

        this.postSettings = {
            url: "/service/accountProxy.asp",
            type: "POST",
            data: data,
            cache: false,
            async: true,
            dataType: "json",
            error: this.failResponse,
            success: this.successResponse
        };

        this.successResponse = function(response) {
            var errMsg;

            if (response.status === "0") {
                window.location.href = response.dest;
            } else {
                errMsg = "Log-in failed.";

                if (response.status === "105") {
                    errMsg = 'Your account has not been activated.<br /> Please check your email for activation link.<br/>You may also generate a new activation link <a href="/user/resend.asp">here</a>.';
                } else if (response.status !== "") {
                    errMsg = 'The email address or password is incorrect.';
                }

                Dex.gui.dialogue.inform(errMsg);
            }
        };

        /**
         * @param {String} theResponse The message contained in the response.
         */

        this.failResponse = function(theResponse) {
            if (typeof theResponse === "undefined") {
                theResponse = "Unknown error";
            }
        };

        /**
         * Hides the second-tier e-mail sign-up form. The form
         * submission requires four items: email, displayname,
         * password, confpass
         * @requires jQuery
         * @returns {JSON} the response object {"status":status,
         *          "mgs":msg,"dest":dest;}
         */

        this.submit = function() {

            $.ajax(this.postSettings);

            return this;

        };

        /**
         * @param {Object} theForm
         * @returns {Boolean}
         * Performs a simple validation of account credentials.
         */

        this.isLogInValid = function() {

            if (this.isEmailValid(formDataValues.email)) {
                return (this.isPasswordValid(formDataValues.password));
            } else {
                return false;
            }

        };

        /**
         * @returns {Boolean}
         * Performs a simple validation of account credentials.
         */

        this.isSignUpValid = function() {

            var errorMessage = "Error";

            if (this.isNameValid(formDataValues.displayname)) {
                if (this.isEmailValid(formDataValues.email)) {
                    if (this.isPasswordValid(formDataValues.password)) {
                        return true;
                    } else {
                        formDataValues.password = errorMessage;
                        return false;
                    }
                } else {
                    formDataValues.email = errorMessage;
                    return false;
                }
            } else {
                formDataValues.displayname = errorMessage;
                return false;
            }
        };

        /**
         * @param {String} userPassword
         * @returns {Boolean}
         * Performs a simple password length validation.
         */

        this.isPasswordValid = function(userPassword) {
            return (userPassword.length > 5);
        };

        /**
         * @param {String} userName
         * @returns {Boolean}
         * Performs a simple validation of user names.
         */

        this.isNameValid = function(name) {

            return (name.length > 0);

        };

        /**
         * @param {String} emailAddress
         * @returns {Boolean}
         * Performs a RegEx e-mail address pattern match.
         */

        this.isEmailValid = function(emailAddress) {

            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

            return reg.test(emailAddress);

        };

    };

    /**
     * A gui component to display a media gallery (aka a slideshow).
     * @class
     * @constructor
     * @returns {Dex.gui.gallery}
     */

    Dex.gui.gallery = function() {

        /**
         * HTML/CSS class names.
         */

        this.cssStyles = {
            hidden: "hidden",
            cloaked: "cloaked",
            selected: "selected"
        };

        /**
         * Selectors used to target the various gui elements.
         */

        this.selectors = {

            /**
             * @property {String} viewfinder
             */

            self: ".photoGallery > .viewfinder ",

            /**
             * @property {String} nav Access the navigation controlss.
             */

            nav: {

                /** 
                 * @property {String} previous The control element to move backwards through the gallery. 
                 */

                goBack: ".photoGallery > .viewfinder > .controls > .previous",

                /**
                 * @property {String} next The control element move forwards through the gallery.
                 */

                goForward: ".photoGallery > .viewfinder > .controls > .next",

                /** 
                 * @property {String} controls Both control elements. 
                 */

                controls: ".photoGallery > .viewfinder > .controls"
            },

            /**
             * @property {String} media Media-related elements.
             */

            media: {

                /**
                 * @property {String} display The display for the View Finder.
                 */

                display: ".photoGallery > .viewfinder > .display",

                /**
                 * @property {String} all All the media in the gallery
                 */

                all: ".photoGallery > .viewfinder > .display > a",

                /** 
                 * @property {String} selected The wrapper for the currently displayed media asset.
                 */

                selected: ".photoGallery > .viewfinder > .display > a.selected",

                /**
                 * @property {String} selectedImage The currently displayed media asset.
                 */

                selectedImage: ".photoGallery > .viewfinder > .display > a.selected > img",

                /**
                 * @property {String} caption The caption for the displayed media asset.
                 */

                caption: ".photoGallery > .viewfinder > .caption",

                /**
                 * @property {String} galleryIndex The text that indicates the current 
                 * position in the gallery.
                 */

                galleryIndex: ".photoGallery > .viewfinder > .caption > .galleryIndex"
            }
        };
    };

    Dex.gui.gallery.prototype = {

        /**
         * Change the value of the display property style to "none".
         * @static
         * @param {String} target A CSS-type selector pattern.
         * @requires jQuery
         */

        cloak: function(target) {
            $(target).addClass(this.cssStyles.cloaked);
        },

        /**
         * Change the value of the display property to "block".
         * @static
         * @param {String} target A CSS-type selector pattern.
         * @requires jQuery
         */

        reveal: function(target) {
            $(target).removeClass(this.cssStyles.cloaked);
        },

        /**
         * Change the value of the visibility property to "hidden". Similar to 
         * cloak(), but element retains its box dimensions.
         * @static
         * @param {String} target A CSS-type selector pattern.
         * @requires jQuery
         */

        hide: function(target) {
            $(target).addClass(this.cssStyles.hidden);
        },

        /**
         * Change the value of the visibility property to "visible". Similar to 
         * reveal(), but element retains its box dimensions.
         * @static
         * @param {String} target A CSS-type selector pattern.
         * @requires jQuery
         */

        show: function(target) {
            $(target).removeClass(this.cssStyles.hidden);
        },

        /**
         * Instantiate the gallery on the page.
         */

        create: function() {

            var myViewFinder = new Dex.gui.gallery.viewfinder();

            myViewFinder.create();

        }
    };

    /**
     * @class
     * @constructor
     */

    Dex.gui.gallery.viewfinder = function() {
            
        /**
         * The horizontal and vertical dimensions of the view finder.
         */

        this.dimensions = {
            theHeight: 385,
            theWidth: 660
        };
        
        this.showFrame = function (id) {
            var myGallery = new Dex.gui.gallery();
            
            myGallery.hide(".selected");
        };
        
        this.target = function () {
            var myHash = window.location;
            
            
        };
       
        /**
         * Adjust the horizontal margin for narrow images.
         * @param {String} selectedImage The target of the adjustment.
         * @param {Number} maximumHeight The target height to adjust against.
         */

        this.adjustMargin = function(selectedImage, maximumHeight) {
            var topMargin, imageHeight;

            imageHeight = $(selectedImage).height();
            topMargin = maximumHeight - imageHeight;
            topMargin = topMargin / 2;
            
            $(selectedImage).css("margin-top", topMargin.toString() + "px");            
        };

        /**
         * @param {String} selectedImage Selector for the image.
         * @param {String} maximumHeight The target height.
         * @requires jQuery
         */

        this.adjustHeight = function(selectedImage, maximumHeight) {
            
            $(selectedImage).css("height", maximumHeight + "px");
            
        };

        /**
         * Updates the gallery navigation controls based on the state of the gallery.
         * @static
         */

        this.renderControls = function() {
            var myGallery = new Dex.gui.gallery(),
                goBack = myGallery.selectors.nav.goBack,
                goForward = myGallery.selectors.nav.goForward,
                selected = myGallery.selectors.media.selected;

            if ($(selected).prev().length) {
                myGallery.show(goBack);
            } else {
                myGallery.hide(goBack);
            }

            if ($(selected).next().length) {
                myGallery.show(goForward);
            } else {
                myGallery.hide(goForward);
            }
        };

        /**
         * Make necessary adjustments to displayed media.
         * @static
         */

        this.renderImage = function () {            
            
            var myGallery = new Dex.gui.gallery(),
            selectedImage = myGallery.selectors.media.selectedImage,
            imageHeight = $(selectedImage).height(),
            maximumHeight = this.dimensions.theHeight,
            myViewFinder = new Dex.gui.gallery.viewfinder();
            
            if (imageHeight < 20 || imageHeight > maximumHeight) {
                 myViewFinder.adjust("height");
            } else {
                myViewFinder.adjust("margin");
            }          
        };

        /**
         * Prepare all the event handlers we'll need.
         * @static
         */

        this.wireEvents = function() {

            /**
             * We need to store the this reference as a variable
             * because its context (meaning) changes when placed inside 
             * jQuery closures.
             */

            var myGallery = new Dex.gui.gallery(),
                myViewFinder = new Dex.gui.gallery.viewfinder(),
                selectors = myGallery.selectors;

            $(selectors.nav.goBack).click(function(event) {
                event.preventDefault();
                myViewFinder.move("previous");
            });

            $(selectors.nav.goForward).click(function(event) {
                event.preventDefault();
                myViewFinder.move();
            });

            $(selectors.self).hover(

            function() {
                myGallery.show(selectors.media.caption);
            }, function() {
                myGallery.hide(selectors.media.caption);
            });
        };
    };

    Dex.gui.gallery.viewfinder.prototype = {

        /**
         * Instantiate the gallery widget on the page.
         * @static
         */

        create: function() {
            this.wireEvents();
            this.renderControls();
            this.target();
            this.renderImage();
        },

        /**
         * 
         * @param subsystem Which gui module subsystem to render.
         */

        render: function(subsystem) {
            switch (subsystem) {
            case "controls":
                this.renderControls();
                break;
            case "image":
                this.renderImage();
                break;
            default:
                break;
            }
        },

        /**
         * Show the navigation controls.
         * @static
         */

        showControls: function() {
            var myGallery = new Dex.gui.gallery();
            
            myGallery.show(myGallery.selectors.nav.controls);
        },

        /**
         * Hide the navigation controls.
         * @static 
         */

        hideControls: function() {
            var myGallery = new Dex.gui.gallery();

            myGallery.hide(myGallery.selectors.nav.controls);
        },

        /**
         * @param {String} subsystem Possible values are caption, margin, or height.
         */

        adjust: function(subsystem) {
            var myGallery = new Dex.gui.gallery(),
                selectedImage = myGallery.selectors.media.selectedImage,
                maximumHeight = this.dimensions.theHeight;

            switch (subsystem) {
           
            case "margin":
                this.adjustMargin(selectedImage, maximumHeight);
                break;
            case "height":
                this.adjustHeight(selectedImage, maximumHeight);
                break;
            default:
                break;
            }
        },

        /**
         * Show a different media item in the gallery. This consists of hiding the 
         * initially visible element, then revealing its successor.
         * the media gallery.
         * @static
         * @param {String} direction
         * @requires jQuery
         */

        move: function (direction) {
                    
            var myGallery = new Dex.gui.gallery(),
            selectedElement = myGallery.selectors.media.selected,
            selectedStyle = myGallery.cssStyles.selected;

            if ($(selectedElement).attr('style')) {         
                $(selectedElement).removeAttr("style");   // removed inline style added by fadeIn(). 
            }
            
            if (direction === "previous") {     
                
                $(selectedElement).removeClass(selectedStyle).prev().addClass(selectedStyle);
                
            } else {               
                    
                $(selectedElement).removeClass(selectedStyle).next().addClass(selectedStyle);
                
            }               
        
            this.render("controls");
            this.render("image");
            this.updateCount();
        }, 

        /**
         * Update the value for the index position in the caption.
         * @static
         * @requires jQuery
         */

        updateCount: function() {
            var indexPosition = this.getPosition(),
                myGallery = new Dex.gui.gallery(),
                galleryIndex = myGallery.selectors.media.galleryIndex,
                caption = myGallery.selectors.media.caption;

            $(galleryIndex).text(indexPosition);

            this.refresh(caption);
        },

        /**
         * Refresh a UI component by quickly hiding and showing it.
         */

        refresh: function(selector) {

            var myGallery = new Dex.gui.gallery();

            myGallery.hide(selector);
            myGallery.show(selector);

            return this;

        },

        /**
         * Get the current position in the gallery.
         * @requires jQuery
         */

        getPosition: function() {
            var helper = new Dex.etc(),
                myGallery = new Dex.gui.gallery(),
                mediaElements = $(myGallery.selectors.media.all),
                counter = 0;

            for (counter; counter < mediaElements.length; counter = counter + 1) {

                if (helper.getClassCount(mediaElements[counter])) {
                    return counter + 1;
                }
            }
        }
    };

}());