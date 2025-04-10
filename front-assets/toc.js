var div = $("#divTOC");
var h3 = $("#h3TOC");
var ul = $("#ulTOC");
var span = $(".more-less")
var spanHeight = span.outerHeight(true);
var divFullHeight = h3.outerHeight(true) + ul.outerHeight(true) + spanHeight;


if (div.height() > 300) {
  div.addClass("expand closed");
  div.height(300 + spanHeight);
} else {
  span.remove();
}

$(".more-less").on("click", function() {  
  if(div.hasClass("closed")) {
    div.animate({
      height: divFullHeight
    }, 200);
  } else if (div.hasClass("open")) {
    div.animate({
      height: 300 + spanHeight
    }, 200);
  }
  div.toggleClass("open closed");
});