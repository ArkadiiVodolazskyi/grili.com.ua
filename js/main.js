
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

  // Smooth anchors scroll
  (function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
    });
  })();

});

window.addEventListener("load", () => {

  if (window.innerWidth < 480) {
    const searchField = document.getElementById('searchField');
    searchField.setAttribute('placeholder', '');
  }

  const body = document.body;
  const header = document.querySelector('header');

  const overlay = document.getElementById('overlay');
  const closeOverlay = document.getElementById('closeOverlay');

  const mainOverlay = document.getElementById('mainOverlay');
  const closeMainOverlay = document.getElementById('closeMainOverlay');

  let closeActives = [overlay, closeOverlay, mainOverlay, closeMainOverlay];

  closeActives.forEach(closeActive => {
    if (closeActive) {
      closeActive.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.active').forEach(element => {
          element.classList.remove('active');
          body.classList.remove('discroll');
        });
      });
    }
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

    if (openMegamenu && megamenu) {
      openMegamenu.addEventListener('click', (e) => {
        if (megamenu.classList.contains('active')) {
          megamenu.classList.remove('active');
          mainOverlay.classList.remove('active');
          body.classList.remove('discroll');
        } else {
          megamenu.classList.add('active');
          mainOverlay.classList.add('active');
          body.classList.add('discroll');
          mainOverlay.addEventListener('click', (e) => {
            megamenu.classList.remove('active');
            mainOverlay.classList.remove('active');
            body.classList.remove('discroll');
          })
          header.addEventListener('click', (e) => {
            if (e.target !== openMegamenu) {
              megamenu.classList.remove('active');
              mainOverlay.classList.remove('active');
              body.classList.remove('discroll');
            }
          })
        }
      })

      // `New: Open Megamenu submenu's on mobile`
      const mainLinks = megamenu.querySelectorAll('.item > .title');
      const subLinks = megamenu.querySelectorAll('.item > .submenu');

      for (let i = 0; i < mainLinks.length; i++) {
        mainLinks[i].addEventListener('click', (e) => {
          e.stopPropagation();
          if (subLinks[i].classList.contains('active')) {
            subLinks[i].classList.remove('active');
          } else {
            subLinks.forEach(subLink => {
              subLink.classList.remove('active');
            })
            subLinks[i].classList.add('active');
          }

        });
      }
    }
  })();

  // Open searchResults
  (function() {
    const searchField = document.getElementById('searchField');
    const searchResults = document.getElementById('searchResults');

    if (searchField && searchResults) {
      searchField.addEventListener('focus', () => {
        mainOverlay.classList.add('active');
        body.classList.add('discroll');
      });
      searchField.addEventListener('input', () => {
        searchResults.classList.add('active');
      });
      searchField.addEventListener('blur', () => {
        mainOverlay.classList.remove('active');
        searchResults.classList.remove('active');
        body.classList.remove('discroll');
      });
    }
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
  (function() {
    function hideShow(triggerElementSelector, hideElementSelector, withIndex, showElementSelector) {
      const triggerElement = document.querySelector(triggerElementSelector);
      const hideElement = document.querySelector(hideElementSelector);
      const showElement = document.querySelector(showElementSelector);
      if (triggerElement && hideElement && showElement) {
        triggerElement.addEventListener('mouseover', () => {
          hideElement.style.zIndex = '-1';
        });
        triggerElement.addEventListener('mouseout', () => {
          hideElement.style.zIndex = `${withIndex}`;
        });
      }
    }

    hideShow('header .contacts .wrapper .addresses div', 'header .manage', 1, 'header .contacts .wrapper .addresses div .sublist');
    hideShow('header .contacts .wrapper .addresses div', 'main', 0, 'header .contacts .wrapper .addresses div .sublist');
  })();

  // Open/close filters
  (function() {
    const filters = document.getElementById('filters');
    const openFilters = document.getElementById('openFilters');
    const closeFilters = document.getElementById('closeFilters');
    const main = document.querySelector('main');

    if (filters && openFilters && closeFilters) {
      openFilters.addEventListener('click', () => {
        mainOverlay.classList.add('active');
        filters.classList.add('active');
        main.style.overflow = 'hidden';
      });
      closeFilters.addEventListener('click', () => {
        mainOverlay.classList.remove('active');
        filters.classList.remove('active');
        main.style.overflow = 'visible';
      });
    }
  })();

  // Input labels interaction
  (function() {
    const fields = document.querySelectorAll('.field');

    if (fields.length) {
      fields.forEach(field => {
        const input = field.querySelector('input, textarea');
        input.addEventListener('blur', () => {
          if (input.value != '') {
            input.classList.add('filled');
          } else {
            input.classList.remove('filled');
          }
        });
      });
    }
  })();

  // page-ordering - show/hide fields with radio buttons
  (function() {

    // User
    const toRegister = document.querySelectorAll('section.cart .user .toRegister input');
    const isRegisterFields = document.querySelectorAll('section.cart .user .info .isRegister');

    if (toRegister.length && isRegisterFields.length) {
      toRegister.forEach(radio => {
        radio.addEventListener('change', () => {
          if (radio.value == 'on' && radio.id === 'register_yes') {
            isRegisterFields.forEach(isRegisterField => {
              isRegisterField.classList.remove('hidden');
            });
          } else {
            isRegisterFields.forEach(isRegisterField => {
              isRegisterField.classList.add('hidden');
            });
          }
        });
      })
    }

    // Payment
    const payment = document.querySelectorAll('section.cart .payment > label input');
    const isPaymentInstallment = document.querySelector('section.cart .payment .installment');

    if (payment.length && isPaymentInstallment) {
      payment.forEach(radio => {
        radio.addEventListener('change', () => {
          if (radio.value == 'on' && radio.id === 'installment') {
            isPaymentInstallment.classList.remove('hidden');
          } else {
            isPaymentInstallment.classList.add('hidden');
          }
        });
      })
    }

    // Delivery
    const delivery = document.querySelectorAll('section.cart .delivery > label input');
    const isDeliveryInstallment = document.querySelector('section.cart .delivery .pickup');

    if (delivery.length && isDeliveryInstallment) {
      delivery.forEach(radio => {
        radio.addEventListener('change', () => {
          if (radio.value == 'on' && radio.id === 'pickup') {
            isDeliveryInstallment.classList.remove('hidden');
          } else {
            isDeliveryInstallment.classList.add('hidden');
          }
        });
      })
    }

  })();

  // page-brands - change search letters
  (function() {
    const alphabets = document.querySelectorAll('section.allBrands .alphabet .letters');

    if (alphabets.length) {
      alphabets.forEach(alphabet => {
        const letters = alphabet.querySelectorAll('button');
        letters.forEach(letter => {
          letter.addEventListener('click', () => {
            letters.forEach(letter => {
              letter.classList.remove('active');
            });
            letter.classList.add('active');
          });
        });
      });
    }
  })();

  // page-contacts - init galleries | init maps
  (function() {
    const cards = document.querySelectorAll('section.contacts .cards .card');

    if (cards.length) {

      const mapCoords = [
        [50.47032475221495, 30.502784727084233],
        [48.42691860894034, 35.03351088507678],
        [47.78819093088163, 35.238837340879904],
        [49.933267850643816, 36.26488214093906]
      ];

      const galleries = document.querySelectorAll('section.contacts .cards .gallery');
      const maps = document.querySelectorAll('section.contacts .cards .map');
      const toggleMaps = document.querySelectorAll('section.contacts .cards .toggleMap');

      for (let i = 0; i < cards.length; i++) {

        // Init galleries
        $(galleries[i]).not(".slick-initialized").slick({
          arrows: true,
          draggable: false,
          touchThreshold: 300,
          focusOnSelect: false,
          infinite: false,
          autoplay: false,
          dots: false,
          variableWidth: true,
          vertical: false,
          verticalSwiping: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: `
            <button type="button">
              <i class="fas fa-chevron-left"></i>
            </button>
          `,
          nextArrow: `
            <button type="button">
              <i class="fas fa-chevron-right"></i>
            </button>
          `,
          responsive: [
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                draggable: true,
                touchThreshold: 300,
                dots: false
              },
            },
          ],
        });

        // Init maps
        const coordinates = {
          lat: mapCoords[i][0],
          lng: mapCoords[i][1]
        };
        const map = new google.maps.Map(maps[i], {
          center: coordinates,
          zoom: 17,
          disableDefaultUI: false,
          scrollwheel: false,
        });
        const marker = new google.maps.Marker({
          position: coordinates,
          map: map,
        });

        // Toggle map
        toggleMaps[i].addEventListener('click', () => {
          if (maps[i].classList.contains('active')) {
            maps[i].classList.remove('active');
            toggleMaps[i].innerText = 'Показать на google maps';
          } else {
            maps[i].classList.add('active');
            toggleMaps[i].innerText = 'Спрятать карту';
          }
        });

      }
    }
  })();

  // Init landing slicks
  (function() {
    $("section.examples .cards").not(".slick-initialized").slick({
      arrows: true,
      draggable: false,
      touchThreshold: 300,
      focusOnSelect: false,
      infinite: false,
      autoplay: false,
      dots: false,
      variableWidth: true,
      vertical: false,
      verticalSwiping: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: `
        <button type="button">
          <i class="fas fa-chevron-left"></i>
        </button>
      `,
      nextArrow: `
        <button type="button">
          <i class="fas fa-chevron-right"></i>
        </button>
      `,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            draggable: true,
            touchThreshold: 300,
          },
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            draggable: true,
            touchThreshold: 300,
            dots: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            draggable: true,
            touchThreshold: 300,
            dots: false
          },
        },
      ],
    });
  })();

});