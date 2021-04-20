
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

  if (window.innerWidth < 480) {
    const searchFiled = document.getElementById('search');
    searchFiled.setAttribute('placeholder', '');
  }

  const overlay = document.getElementById('overlay');
  const closeOverlay = document.getElementById('closeOverlay');

  const mainOverlay = document.getElementById('mainOverlay');
  // const closeMainOverlay = document.getElementById('closeMainOverlay');

  let closeActives = [overlay, closeOverlay, mainOverlay];

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

  // Open/close hamb menu
  (function() {
    const hambMenu = document.getElementById('hambMenu');
    const openHambMenu = document.querySelector('.openHambMenu');

    const closeHambMenu = document.getElementById('closeHambMenu');

    if (hambMenu && openHambMenu) {
      openHambMenu.addEventListener('click', () => {
        openModal(hambMenu);
      });
      closeHambMenu.addEventListener('click', () => {
        hambMenu.classList.remove('active');
        overlay.classList.remove('active');
      });
    }
  })();

  // Open Megamenu
  (function() {
    const openMegamenu = document.getElementById('openMegamenu');
    const megamenu = document.getElementById('megamenu');

    openMegamenu.addEventListener('click', () => {
      if (megamenu.classList.contains('active')) {
        megamenu.classList.remove('active');
        mainOverlay.classList.remove('active');
      } else {
        megamenu.classList.add('active');
        mainOverlay.classList.add('active');
        mainOverlay.addEventListener('click', () => {
          megamenu.classList.remove('active');
          mainOverlay.classList.remove('active');
        })
      }
    })
  })();

  // Open Modal Consult
  (function() {
    const openConsults = document.querySelectorAll('.openConsult');
    const modalConsult = document.querySelector('#modalConsult');
    const closeConsult = document.querySelector('#closeConsult');

    if (openConsults.length && modalConsult && closeConsult) {
      openConsults.forEach(openConsult => {
        openConsult.addEventListener('click', () => {
          overlay.classList.add('active');
          modalConsult.classList.add('active');
        });
      })
    }
  })();

  // Custom range input
  (function() {
    addEventListener('input', e => {
      let _t = e.target;
      _t.parentNode.style.setProperty(`--${_t.id}`, +_t.value)
    }, false);
  })();

  // Fix z-index on hover
  function hideShow(triggerElementSelector, hideElementSelector, showElementSelector) {
    const triggerElement = document.querySelector(triggerElementSelector);
    const hideElement = document.querySelector(hideElementSelector);
    const showElement = document.querySelector(showElementSelector);
    if (triggerElement && hideElement && showElement) {
      triggerElement.addEventListener('mouseover', () => {
        hideElement.style.zIndex = '-1';
      });
      triggerElement.addEventListener('mouseout', () => {
        hideElement.style.zIndex = '1';
      });
    }
  }

  hideShow('header .contacts .wrapper .addresses div', 'header .manage', 'header .contacts .wrapper .addresses div .sublist');

});