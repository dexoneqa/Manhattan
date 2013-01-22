/*jslint nomen: true, evil: false, browser: true, eqeqeq: false, plusplus: false */

/***********************************************************************
 * @fileOverview JavaScript library/toolkit for Dex One, Inc.
 **********************************************************************/

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

DEXO.adverts = function () {
    
    this.prototype = {};
    
    /*******************************************************************************
     * @param {String} searchQuery Usually uses a global variable called 
     * googleAdSearch which is set inline in /business_profiles/index.asp using 
     * server-side data @param {String} pageType The page type ID number; used 
     * to look up the corresponding channel ID number.
     * @param {String} containerID The html element id attribute value by which the 
     * advert is targeted.
     ******************************************************************************/
    this.injectAdsense = function (searchQuery, pageType, containerID) {
        
        if (typeof searchQuery === "undefined") {
            searchQuery = googleAdSearch;
        }
        
        if (typeof pageType === "undefined") {
            pageType = 2;
        }
        
        if (typeof containerID === "undefined") {
            containerID = 'adcontainer1';
        }
        
        var channels = {
                2: '8650638072', 
                3: '1951998301', 
                6: '2420409821', 
                7: '8355495747', 
                17: '1487029258'
        }, 
        pageOptions = {
              'pubId': 'pub-5933009780392968',
              'query': searchQuery,
               'channel': channels[pageType],
              'hl': 'en'
        }, 
        adblock1 = {
              'container': containerID,
              'fontSizeTitle': '16px',
              'fontSizeDescription': '12px',
              'colorTitleLink': '0066CC',
              'colorText': '000000',
              'colorDomainLink': '0066CC',
              'colorBackground': 'FFFFFF'
        };

        new google.ads.search.Ads(pageOptions, adblock1);
        
    };
    
};

/*global $ */
DEXO.ui = {
        parts: {
            closeButton: "div.closeButton", 
            overlay: "div.blackOverlay,div.litContent", 
            formInput: "form > input", 
            dialogue: "div.litContent > div", 
            errorAlert: "#errorAlert", 
            logInForm: ".logInFormEmail", 
            signUpMenu: "div.signUpMenu", 
            emailSignUpForm: "div.emailSignUpForm", 
            emailLogInForm: "div.logInFormEmail", 
            litContent: ".litContent"
        }, 
        
        /***********************************************************************
         * @param {String} theSelector selector targeting what to show
         * Shows DOM elements matching the selector string 
         **********************************************************************/
        show: function (target) {
            $(target).css("display", "block");
        }, 
        
        /***********************************************************************
         * @param {String} theSelector selector targeting what to hide
         * Hides DOM elements
         **********************************************************************/
        hide: function (target) {
            $(target).css("display", "none");
        }
};

DEXO.ui.dialogue = function () {
    
    var userInterface = DEXO.ui, 
    selectors = DEXO.ui.parts;

    /***********************************************************************
     * Reset the the initial view-state.
     **********************************************************************/
    this.reset = function () {

        this.hideOverlay();
        this.showSignUpMenu();
        this.hideEmailSignUpForm();
        this.resetAllForms();

    };

    /***********************************************************************
     * Resets the page to its initial load view.
     **********************************************************************/

    this.resetAllForms = function () {
        $(selectors.formInput).val("");
    };

    /***********************************************************************
     * Post an alert message.
     * @param {String} message The message to display.
     **********************************************************************/
    this.inform = function (message) {
        $(selectors.errorAlert).html(message);
    };

    /** Display the overlay element */
    this.showOverlay = function () {
        userInterface.show(selectors.overlay);
    };

    /** Hide the overlay. */
    this.hideOverlay = function () {
        userInterface.hide(selectors.overlay);
    };
    
    /** Display close button */
    this.showCloseButton = function () {
        userInterface.show(selectors.closeButton);
    };
    
    /** Hide close button */
    this.hideCloseButton = function () {
        userInterface.hide(selectors.closeButton);
    };

    /** Hide the log-in view. */
    this.hideLogInView = function () {
        userInterface.hide(selectors.logInForm);
    };
    
    /** Display the initial view sign-up menu. */
    this.showSignUpMenu = function () {
        userInterface.show(selectors.signUpMenu);
    };

    /** Hide the initial view sign-up menu. */
    this.hideSignUpMenu = function () {
        userInterface.hide(selectors.signUpMenu);
    };

    /** Shows the second-tier e-mail sign-up form. */
    this.showEmailSignUpForm = function () {
        userInterface.show(selectors.emailSignUpForm);
        return this;
    };

    /** Hides the second-tier e-mail sign-up form. */
    this.hideEmailSignUpForm = function () {
        userInterface.hide(selectors.emailSignUpForm);
    };
    
    /***********************************************************************
     * @param {String} dialogueName
     * @param {Number} [whereX]
     * Displays the dialogue using a light box effect.
     **********************************************************************/
    
    this.show = function (contents, whereX) {
        
        /* TODO: Check to see if the dialogue has already been loaded once. */
        /* TODO: Check to see if a dialogue is already being displayed. */
        
        
        this.showOverlay();
        
        this.showCloseButton();
        
        $(contents).insertBefore(".blackOverlay");
        
    }
    

    /***********************************************************************
     * @param {String} dialogueName
     * @param {Number} [whereX]
     * @returns {Boolean}
     * Displays the dialogue using a light box effect.
     **********************************************************************/

    this.showDialogue = function (dialogueName, whereX) {

        userInterface.show(selectors.overlay);
        userInterface.hide(".formRoot:not(." + dialogueName + ")");
        userInterface.show(selectors.dialogue);
        userInterface.show(selectors.closeButton);
        
        if ($.isNumeric(whereX) === false) {
            whereX = "50px";
        }

        $(selectors.litContent).css("top", whereX);

        return false;

    };

    /** Hide the dialogue. */
    this.hideDialogue = function () {
        userInterface.hide(selectors.dialogue);
    };

    /***********************************************************************
     * @requires //scripts/desktop/user-reg.js
     * @param {Element} myReferrer
     * @returns showLB()
     * Possibly deprecated -- can't find
     **********************************************************************/
    /*global targetSite */
    /*global trackZone */
    /*global showLB */
    this.emailSignUp = function (myReferrer) {
        
        trackZone("x.mw.nav.15", myReferrer.href, targetSite);
        return showLB("signUpReview");

    };

    /***********************************************************************
     * @param {Element} myReferrer
     * Opens the legacy e-mail login dialogue.
     **********************************************************************/
    /*global targetSite */
    /*global trackZone */
    /*global openRegHighslide */
    this.legacyLogin = function (myReferrer) {

        trackZone("x.mw.nav.16", myReferrer.href, targetSite);
        openRegHighslide('gigyaDex');

    };

    /***********************************************************************
     * Wrapper which opens the legacy Facebook login dialogue.
     **********************************************************************/
    /*global gigya */
    this.fbLogin = function () {
        gigya.services.socialize.plugins.login.providerClick("gigyaInner",
                "facebook");
    };

};

/*global errMsg */
/*global $ */
DEXO.ui.dialogue.form = function () {
    
    var data = {
        displayname: $("#displayname").val(), 
        email: $("#email").val(), 
        password: $("#password").val(), 
        confpass: $("#password").val(), 
        action: "add_ajax"
    };

    this.postSettings = {
        url : "/service/accountProxy.asp",
        type : "POST",
        data : data,
        cache : false,
        async : true,
        dataType : "json",
        error : this.failResponse,
        success : this.successResponse
    };
    
    this.successResponse = function (response) {                    
        if (response.status === "0") {                  
            window.location.href = response.dest;
        } else {
            errMsg = "Log-in failed.";
            
            if (response.status === "105") {
                errMsg = 'Your account has not been activated.<br /> Please check your email for activation link.<br/>You may also generate a new activation link <a href="/user/resend.asp">here</a>.';
            } else if (response.status !== "") {
                errMsg = 'The email address or password is incorrect.';
            }
            
            DEXO.ui.dialogue.inform(errMsg);
        }
    };
    
    this.failResponse = function (response) {
        window.console.log("AJAX fail.");
    };

    /***********************************************************************
     * @returns {JSON} the response object {"status":status,
     *          "mgs":msg,"dest":dest;}
     * Hides the second-tier e-mail sign-up form. The form
     *              submission requires four items: email, displayname,
     *              password, confpass
     **********************************************************************/

    this.submit = function () {

        $.ajax(this.postSettings);
        
        return this;

    };
    
    /***********************************************************************
     * @param {Object} theForm
     * @returns {Boolean}
     * Performs a simple validation of account credentials.
     **********************************************************************/

    this.isLogInValid = function () {

        if (this.isEmailValid(formDataValues.email)) {
            return (this.isPasswordValid(formDataValues.password));
        } else {
            return false;
        }

    };

    /***********************************************************************
     * @returns {Boolean}
     * Performs a simple validation of account credentials.
     **********************************************************************/

    this.isSignUpValid = function () {
        
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

    /***********************************************************************
     * @param {String} userPassword
     * @returns {Boolean}
     * Performs a simple password length validation.
     **********************************************************************/

    this.isPasswordValid = function (userPassword) {
        return (userPassword.length > 5);
    };

    /***********************************************************************
     * @param {String} userName
     * @returns {Boolean}
     * Performs a simple validation of user names.
     **********************************************************************/

    this.isNameValid = function (name) {

        return (name.length > 0);

    };
    
    /***********************************************************************
     * @param {String} emailAddress
     * @returns {Boolean}
     * Performs a RegEx e-mail address pattern match.
     **********************************************************************/

    this.isEmailValid = function (emailAddress) {

        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        return reg.test(emailAddress);

    };
    
};

DEXO.utils = function () {
    
    /***********************************************************************
     * @returns {Boolean}
     * Tests a URL to see if it matches the pattern for a free or 
     * paid business profile listing. 
     **********************************************************************/
    this.checkURI = function (address) {
        
        var myPattern = /\/business_profiles\/[a-z_]*[\-][^b]/;
        
        if (typeof address === "undefined") {
            
            address = window.location.href;
            
        }
        
        return (address.match(myPattern) !== null);

    };
    
};