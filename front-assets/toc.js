var toc = $(".toc");
var spanHeight = $(".more-less")[0].scrollHeight
var fullHeight = toc[0].scrollHeight+spanHeight;


if (toc.height() > 300) {
  toc.addClass("expand closed");
  toc.height(300);
}

$(".more-less").on("click", function() {  
  if(toc.hasClass("closed")) {
    toc.animate({
      height: fullHeight
    }, 200);
  } else if (toc.hasClass("open")) {
    toc.animate({
      height: "300px"
    }, 200);
  }
  toc.toggleClass("open closed");
});