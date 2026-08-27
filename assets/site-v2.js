(function () {
  "use strict";

  var carouselContent = {
    en: [
      {
        title: "Schedule on iPhone",
        description: "Plan birthdays, holidays, anniversaries and important dates in one clear schedule.",
        alt: "KindMoment schedule on iPhone",
      },
      {
        title: "Schedule on Android",
        description: "Keep the same calm flow and full control on your Android phone.",
        alt: "KindMoment schedule on Android",
      },
      {
        title: "Get reminded on time",
        description: "A local notification can alert you even when KindMoment is closed. Open it, review the greeting and make it yours.",
        alt: "KindMoment reminder on an iPhone lock screen",
      },
      {
        title: "KindMoment Premium",
        description: "Thoughtful greetings, contextual replies and reliable reminders all year long.",
        alt: "KindMoment Premium annual plan",
      },
    ],
    hr: [
      {
        title: "Raspored na iPhoneu",
        description: "Planiraj rođendane, blagdane, godišnjice i važne datume u jednom preglednom rasporedu.",
        alt: "KindMoment raspored na iPhoneu",
      },
      {
        title: "Raspored na Androidu",
        description: "Isti miran tijek i potpuna kontrola sada su dostupni i na Android telefonu.",
        alt: "KindMoment raspored na Androidu",
      },
      {
        title: "Podsjetnik na vrijeme",
        description: "Lokalna obavijest može stići i kada je KindMoment zatvoren. Otvori je, pregledaj čestitku i prilagodi je sebi.",
        alt: "KindMoment podsjetnik na zaključanom zaslonu",
      },
      {
        title: "KindMoment Premium",
        description: "Pažljive čestitke, odgovori prema kontekstu i pouzdani podsjetnici tijekom cijele godine.",
        alt: "Godišnji plan KindMoment Premium",
      },
    ],
    de: [
      {
        title: "Zeitplan auf dem iPhone",
        description: "Plane Geburtstage, Feiertage, Jahrestage und wichtige Termine in einem übersichtlichen Zeitplan.",
        alt: "KindMoment-Zeitplan auf dem iPhone",
      },
      {
        title: "Zeitplan auf Android",
        description: "Derselbe ruhige Ablauf und die volle Kontrolle sind jetzt auch auf Android verfügbar.",
        alt: "KindMoment-Zeitplan auf Android",
      },
      {
        title: "Rechtzeitig erinnert",
        description: "Eine lokale Mitteilung kann dich auch bei geschlossener App informieren. Öffne sie, prüfe den Gruß und passe ihn an.",
        alt: "KindMoment-Erinnerung auf dem Sperrbildschirm",
      },
      {
        title: "KindMoment Premium",
        description: "Persönliche Grüße, kontextbezogene Antworten und zuverlässige Erinnerungen für das ganze Jahr.",
        alt: "Jahresplan von KindMoment Premium",
      },
    ],
  };

  function initializeCarousel(carousel) {
    var locale = (document.documentElement.lang || "en").split("-")[0];
    var content = carouselContent[locale] || carouselContent.en;
    var slides = Array.prototype.slice.call(carousel.querySelectorAll(".app-tour-slide"));
    var track = carousel.querySelector(".app-tour-track");
    var phone = carousel.querySelector(".app-tour-phone");
    var previous = carousel.querySelector(".app-tour-arrow-previous");
    var next = carousel.querySelector(".app-tour-arrow-next");
    var dots = Array.prototype.slice.call(carousel.querySelectorAll(".app-tour-dots button"));
    var counter = carousel.querySelector(".app-tour-meta-topline span");
    var title = carousel.querySelector(".app-tour-status strong");
    var description = carousel.querySelector(".app-tour-status p");
    var activeIndex = 0;
    var gesture = null;

    if (!track || !phone || !slides.length) {
      return;
    }

    function show(index) {
      activeIndex = (index + slides.length) % slides.length;
      track.style.transform = "translateX(-" + activeIndex * 100 + "%)";

      slides.forEach(function (slide, slideIndex) {
        var isActive = slideIndex === activeIndex;
        var image = slide.querySelector("img");
        slide.setAttribute("aria-hidden", isActive ? "false" : "true");
        if (image) {
          image.alt = isActive && content[slideIndex] ? content[slideIndex].alt : "";
        }
      });

      dots.forEach(function (dot, dotIndex) {
        if (dotIndex === activeIndex) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });

      if (counter) {
        counter.textContent = String(activeIndex + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
      }
      if (title && content[activeIndex]) {
        title.textContent = content[activeIndex].title;
      }
      if (description && content[activeIndex]) {
        description.textContent = content[activeIndex].description;
      }
    }

    if (previous) {
      previous.addEventListener("click", function () {
        show(activeIndex - 1);
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        show(activeIndex + 1);
      });
    }

    dots.forEach(function (dot, dotIndex) {
      dot.addEventListener("click", function () {
        show(dotIndex);
      });
    });

    carousel.addEventListener("keydown", function (event) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        show(activeIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        show(activeIndex + 1);
      }
    });

    phone.addEventListener("pointerdown", function (event) {
      if (!event.isPrimary || event.button !== 0) {
        return;
      }
      gesture = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
      };
    });

    phone.addEventListener("pointerup", function (event) {
      if (!gesture || gesture.id !== event.pointerId) {
        return;
      }

      var deltaX = event.clientX - gesture.x;
      var deltaY = event.clientY - gesture.y;
      gesture = null;

      if (Math.abs(deltaX) >= 42 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        show(activeIndex + (deltaX > 0 ? -1 : 1));
      }
    });

    phone.addEventListener("pointercancel", function () {
      gesture = null;
    });

    show(0);
  }

  function initialize() {
    Array.prototype.forEach.call(document.querySelectorAll(".app-tour"), initializeCarousel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
