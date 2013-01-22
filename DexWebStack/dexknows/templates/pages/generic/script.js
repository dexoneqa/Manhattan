/*jslint nomen: true, evil: false, browser: true */

/*global DEXO */
var DEXO = DEXO || {};

DEXO.track= function (mySelector, pageZone) {
	
	/*global gtc */
	$(mySelector).click(function () {
		
		event.preventDefault();
		
		if (typeof pageZone === "undefined") {
			thePageZone = this.attr("data-pagezone");
		}
		
		theHref = this.attr("href");
		
		gtc(false, thePageZone, theHref);
	});
};

DEXO.pageZone = function () {
	this.selectors = {
			TOP_CITIES_LINKS: "div.globalFooter > div.content > div.topCities > ul > li > a", 
			TOP_CATEGORIES_LINKS: "div.globalFooter > div.content > div.topCategories > ul > li > a", 
			ABOUT_COLUMN_LINKS: "div.globalFooter > div.content > div.aboutColumn > ul > li > a", 
			GET_LOCAL_LINKS: "div.globalFooter > div.content > div.aboutColumn > ul > li > a" 
	}
};

/*global $ */
function addAttributes() {
	var allDivs = $("div"), 
	myText = "";
	
	$.each(allDivs, function (key, value) {
		
		myText = "<p><b>" + $(value).attr("class") + ":</b> " + $(value).css("width") + "</p>";
		
		$(value).append(myText);
		
	});		

}

/*global DEXO */
$(document).ready(function () {
	
	var myDex = new DEXO(), 
		thePageZone = "", 
		theHref = "", 
		select = DEXO.pageZone.selectors;
		
	/** 
	 * Event handlers for homebrew click tracking in the Global Page Footer.
	 */
	myDex.track(select.GET_LOCAL_LINKS);
	myDex.track(select.ABOUT_COLUMN_LINKS);
	myDex.track(select.TOP_CITIES_LINKS, "1.mw.nav.7");
	myDex.track(select.TOP_CATEGORIES_LINKS, "1.mw.nav.8");
	
	//	addAttributes();

});