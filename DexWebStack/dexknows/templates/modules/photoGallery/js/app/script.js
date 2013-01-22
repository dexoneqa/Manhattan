/*jslint nomen: true, evil: false, browser: true, eqeqeq: false, plusplus: false */

/**
 * @fileOverview This file defines a new "gallery" user interface
 * object. The gallery is used to display a collection of media assets 
 * (e.g. image or video files).
 */

/** Check to see if DEXO already exists */
/*global DEXO */
if (typeof DEXO === "undefined") {
    /**
     * @class DEXO object
     */
    var DEXO = {};
    
    /** 
     * Check to see if DEXO.ui has been defined already.
     */
    if (typeof DEXO.ui === "undefined") {
        /**
         * @namespace
         */
        DEXO.ui = {};
    }
}

/**
 * A UI component to display a media gallery (aka a slideshow).
 * @class Represents a media gallery.
 * @constructor
 * @param {String} name The name for the gallery.
 * @param {Object} conf A configuration object customizing the
 * gallery's settings.
 * @returns {DEXO.ui.gallery}
 */
DEXO.ui.gallery = function (name, conf) {
    /**
     * @property {Object} conf A simple dictionary object containing the gallery 
     * configuration settings.
     */
    this.conf = conf;
    
    /**
     * @property {String} name The name of the gallery.
     */
    this.name = name;
    
    this.dimensions = {
            height: 385, 
            width: 615
        };

    /**
     * HTML/CSS class names.
     */
    this.style = {
            hidden: "hidden", 
            cloaked: "cloaked", 
            selected: "selected"
        };
    
    /**
     * Selectors used to target the various UI elements.
     */
    this.selectors = {
            /**
             * @property {String} viewFinder
             */
            viewFinder: ".photoGallery > .viewFinder ", 
            /**
             * @property {String} nav Access the navigation controlss.
             */
            nav: {
                /** 
                 * @property {String} previous The control element to move backwards through the gallery. 
                 */
                previous: ".photoGallery > .viewFinder > .controls > .previous", 
                /**
                 * @property {String} next The control element move forwards through the gallery.
                 */
                next: ".photoGallery > .viewFinder > .controls > .next", 
                controls: ".photoGallery > .viewFinder > .controls"
            }, 
            /**
             * @property {String} media Media-related elements.
             */
            media: {
                /** 
                 * @property {String} selected The currently displayed media asset.
                 */
                selected: ".photoGallery > .viewFinder > .display > a.selected", 
                selectedImage: ".photoGallery > .viewFinder > .display > a.selected > img", 
                caption: ".photoGallery > .viewFinder > .caption"
            }
        };
    
    /**
     * Change the value of the display property style to "none".
     * @static
     * @param {String} target A jQuery/CSS style selector pattern.
     * @requires jQuery
     */
    /*global $ */
    this.cloak = function (target) {
        $(target).addClass(this.style.cloaked);
    };
    
    /**
     * Change the value of the display property to "block".
     * @static
     * @param {String} target A jQuery/CSS style selector pattern.
     * @requires jQuery
     */
    /*global $ */
    this.reveal = function (target) {
        $(target).removeClass(this.style.cloaked);
    };
    
    /**
     * Change the value of the visibility property to "hidden". Similar to 
     * cloak(), but element retains its box dimensions.
     * @static
     * @param {String} target A jQuery/CSS style selector pattern.
     * @requires jQuery
     */
    /*global $ */
    this.hide = function (target) {
        $(target).addClass(this.style.hidden);
    };
    
    /**
     * Change the value of the visibility property to "visible". Similar to 
     * reveal(), but element retains its box dimensions.
     * @static
     * @param {String} target A jQuery/CSS style selector pattern.
     * @requires jQuery
     */
    /*global $ */
    this.show = function (target) {
        $(target).removeClass(this.style.hidden);
    };

    /**
     * Instantiate the gallery on the page.
     */
    this.create = function () {

        var myViewFinder = new DEXO.ui.gallery.viewFinder();
        
        myViewFinder.create();
            
    };
};

DEXO.ui.gallery.viewFinder = function () {
    var myGallery = new DEXO.ui.gallery();
    
    /**
     * Instantiate the gallery widget on the page.
     * @static
     * @requires jQuery
     */
    /*global $ */
    this.create = function () {
        this.wireEvents();
        this.renderImage();
        this.renderControls();
    };
    
    /**
     * 
     * @param subsystem Which UI module subsystem to render.
     */
    this.render = function (subsystem) {
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
    };

    /**
     * Updates the gallery navigation controls based on the state of the gallery.
     * @requires jQuery
     */
    /*global $ */
    /*global selectors */
    this.renderControls = function () {
        var previous = myGallery.selectors.nav.previous, 
        next = myGallery.selectors.nav.next, 
        selected = myGallery.selectors.media.selected;
        
        if ($(selected).prev().length) {
            myGallery.show(previous);
        } else {
            myGallery.hide(previous);
        }
    
        if ($(selected).next().length) {
            myGallery.show(next);
        } else {
            myGallery.hide(next);
        }
    };
    
    /**
     * Make necessary adjustments to displayed media.
     * @static
     */
    this.renderImage = function () {
        var selectedImage = myGallery.selectors.media.selectedImage, 
        maximumHeight = myGallery.dimensions.height;
        
        this.adjustHeight(selectedImage, maximumHeight);
        this.adjustMargin(selectedImage, maximumHeight);
        this.adjustCaption(selectedImage, maximumHeight);
    };
    
    this.wireEvents = function () {
        /**
         * We need to store the this reference as a variable
         * because its context (meaning) changes when placed inside 
         * jQuery closures.
         */
        var myViewFinder = this, 
        selectors = myGallery.selectors;
        
        $(selectors.nav.previous).click(function () {
            myViewFinder.move("previous");
        });
        
        $(selectors.nav.next).click(function () {
            myViewFinder.move();
        });
        
        $(selectors.viewFinder).hover(function () {
            myGallery.show(selectors.media.caption);
        }, 
        function () {
            myGallery.hide(selectors.media.caption);
        });
    };
    
    /**
     * Show the navigation controls.
     * @static
     */
    this.showControls = function () {
        myGallery.show(myGallery.selectors.nav.controls);
    };
    
    /**
     * Hide the navigation controls.
     * @static 
     */
    this.hideControls = function () {
        myGallery.hide(myGallery.selectors.nav.controls);
    };
    
    /**
     * @param {String} selectedImage The target for the caption.
     * @param {String} maximumHeight The maximum viewable height.
     */
    this.adjustCaption = function (selectedImage, maximumHeight) {
        var bottomMargin;
        
        bottomMargin = $("a.selected > img").css("margin-top");
        
        $(myGallery.selectors.media.caption).css("margin-bottom", bottomMargin + "px");
        
        console.log(bottomMargin);
    };
    
    /**
     * Adjust the margin for narrow images.
     * @param {String} selectedImage The target of the adjustment.
     * @param {String} maximumHeight The target height to adjust against.
     */
    this.adjustMargin = function (selectedImage, maximumHeight) {
        var topMargin, imageHeight;
        
        imageHeight = $(selectedImage).height();
        topMargin = maximumHeight - imageHeight;
        topMargin = topMargin / 2;
        
        if ($(selectedImage).height() < maximumHeight) {
            $(selectedImage).css("margin-top", topMargin + "px");
        }
    };
    
    /**
     * @param {String} selectedImage Selector for the image.
     * @param {String} maximumHeight The target height.
     * @requires jQuery
     */
    /*global $ */
    this.adjustHeight = function (selectedImage, maximumHeight) {
        if ($(selectedImage).height() > maximumHeight) {
            $(selectedImage).css("height", maximumHeight + "px");
        } 
    };
    
    /**
     * Show a different media item in the gallery. This consists of hiding the 
     * initially visible element, then revealing its successor.
     * the media gallery.
     * @static
     * @param {String} direction
     * @requires jQuery
     */
    /*global $ */
    this.move = function (direction) {
        var selectedElement = myGallery.selectors.media.selected, 
        selectedStyle = myGallery.style.selected;
        
        if (direction === "previous") {
            $(selectedElement).removeClass(selectedStyle).prev().addClass(selectedStyle);
        } else {
            $(selectedElement).removeClass(selectedStyle).next().addClass(selectedStyle);
        }
    
        this.renderControls();
        this.renderImage();
    };
};