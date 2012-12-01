/*global $, hs */
$(".trNavEmail").click(function () {
    hs.htmlExpand(this, {contentId: "Email-html"});
});

$(".trNavSend").click(function () {
    hs.htmlExpand(this, {contentId: "Phone-html"});
});