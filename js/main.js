
document.addEventListener("DOMContentLoaded", () => {

  // Use .img-svg on image to remove it with svg version
  (function () {
    $("img.img-svg").each(function () {
      var $img = $(this);
      var imgClass = $img.attr("class");
      var imgURL = $img.attr("src");
      $.get(
        imgURL,
        function (data) {
          var $svg = $(data).find("svg");
          if (typeof imgClass !== "undefined") {
            $svg = $svg.attr("class", imgClass + " replaced-svg");
          }
          $svg = $svg.removeAttr("xmlns:a");
          if (
            !$svg.attr("viewBox") &&
            $svg.attr("height") &&
            $svg.attr("width")
          ) {
            $svg.attr(
              "viewBox",
              "0 0 " + $svg.attr("height") + " " + $svg.attr("width"),
            );
          }
          $img.replaceWith($svg);
        },
        "xml",
      );
    });
  })();

  // Fix masked input cursor
  $.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

});

window.addEventListener("load", () => {

  const overlay = document.getElementById('overlay');
  const closeOverlay = document.getElementById('closeOverlay');

  const mainOverlay = document.getElementById('mainOverlay');
  const closeMainOverlay = document.getElementById('closeMainOverlay');

  let closeActives = [overlay, closeOverlay, mainOverlay, closeMainOverlay];

  closeActives.forEach(closeActive => {
    closeActive.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
      });
    });
  });

  function openModal(element) {
    overlay.classList.add('active');
    element.classList.add('active');
  }

  (function() {
    const openMegamenu = document.getElementById('openMegamenu');
    const megamenu = document.getElementById('megamenu');

    openMegamenu.addEventListener('click', () => {
      megamenu.classList.toggle('active');
    })
  })();

});