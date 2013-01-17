/*jslint nomen: true, evil: false, browser: true, eqeqeq: false, plusplus: false */

/**
 * @author Dex One www.dexknows.com
 */
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
    /**
     * gigya Login UI parameters for social login button links inside 
     * the Log In lightbox
     */
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
    /**
     * gigya Login UI parameters for social login button links inside 
     * the Sign Up lightbox
     */
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
    /**
     * gigya Login UI parameters for social login button links on 
     * regular Sign Up page, user/signup.asp
     */
    signup_page_params = {
        showTermsLink: 'false', 
        height: 38, 
        width: 400, 
        containerID: 'signUpDiv', 
        UIConfig: '<config><body><controls><snbuttons buttonsize="38"></snbuttons></controls></body></config>', 
        autoDetectUserProviders: '', 
        facepilePosition: 'top', 
        redirectURL: targetSite
    }, 
    Lib = {
        gigyaAPIKey: "2_FYnHm3maZPs7YGHbzoN8mKjLHwkP834TcQAncOZ8aOwx6p8dutqMrDwCeFl7uWLr", 
        gigyaShareTitle: "Itto Sushi | Chicago, IL 60614 | Dexknows.com", 
        gigyaSignUpRdUrL: "http://www.dexknows.com/business_profiles/itto_sushi-b184361", 
        tagLine: " on dexknows.com and thought you might want to check it out.", 
        shareProfileDescription: "I found Itto Sushi" + this.tagLine, 
        shareCouponDescription: "I found coupons for Itto Sushi" + this.tagLine, 
        shareReviewDescription: "I just reviewed Itto Sushi" + this.tagLine
    };