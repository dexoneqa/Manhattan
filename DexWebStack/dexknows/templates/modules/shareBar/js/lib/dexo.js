/*jslint nomen: true, evil: false, browser: true, eqeqeq: false, plusplus: false */

/*******************************************************************************
 * @author Dex One www.dexknows.com
 */

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