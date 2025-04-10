var toc = $(".toc");
var span = $(".more-less")
var spanHeight = span[0].scrollHeight
var fullHeight = toc[0].scrollHeight + 2*spanHeight;


if (toc.height() > 300) {
  toc.addClass("expand closed");
  toc.height(300 + spanHeight);
} else {
  span.remove();
}

$(".more-less").on("click", function() {  
  if(toc.hasClass("closed")) {
    toc.animate({
      height: fullHeight
    }, 200);
  } else if (toc.hasClass("open")) {
    toc.animate({
      height: 300 + spanHeight
    }, 200);
  }
  toc.toggleClass("open closed");
});