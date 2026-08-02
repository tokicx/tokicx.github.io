(function () {
  "use strict";

  var carouselContent = {
    en: [
      {
        title: "Schedule",
        description: "Plan birthdays, holidays, anniversaries and important dates in one clear schedule.",
        alt: "KindMoment app screen tour",
      },
      {
        title: "Get reminded on time.",
        description: "A local notification can alert you even when KindMoment is closed. Open it, review the greeting and make it yours.",
        alt: "KindMoment reminder on an iPhone lock screen",
      },
      {
        title: "Your greeting is ready",
        description: "Review and personalize it before sending.",
        alt: "Your greeting is ready. Review and personalize it before sending.",
      },
      {
        title: "KindMoment Premium",
        description: "Thoughtful greetings, smart replies and reminders all year long.",
        alt: "KindMoment Premium. Thoughtful greetings, smart replies and reminders all year long.",
      },
    ],
    hr: [
      {
        title: "Raspored",
        description: "Planiraj rođendane, blagdane, godišnjice i važne datume u jednom preglednom rasporedu.",
        alt: "Pregled zaslona aplikacije KindMoment",
      },
      {
        title: "Primi podsjetnik na vrijeme.",
        description: "Lokalna obavijest može stići i kada je KindMoment zatvoren. Otvori je, pregledaj čestitku i prilagodi je sebi.",
        alt: "KindMoment podsjetnik na zaključanom zaslonu",
      },
      {
        title: "Tvoja čestitka je spremna",
        description: "Pregledaj je i prilagodi prije slanja.",
        alt: "Tvoja čestitka je spremna. Pregledaj je i prilagodi prije slanja.",
      },
      {
        title: "KindMoment Premium",
        description: "Pažljive čestitke, pametni odgovori i podsjetnici tijekom cijele godine.",
        alt: "KindMoment Premium. Pažljive čestitke, pametni odgovori i podsjetnici tijekom cijele godine.",
      },
    ],
    de: [
      {
        title: "Zeitplan",
        description: "Plane Geburtstage, Feiertage, Jahrestage und wichtige Termine in einem übersichtlichen Zeitplan.",
        alt: "Tour durch die KindMoment-App",
      },
      {
        title: "Werde rechtzeitig erinnert.",
        description: "Eine lokale Mitteilung kann dich auch bei geschlossener App informieren. Öffne sie, prüfe den Gruß und passe ihn an.",
        alt: "KindMoment-Erinnerung auf dem Sperrbildschirm",
      },
      {
        title: "Dein Gruß ist bereit",
        description: "Prüfe und personalisiere ihn vor dem Senden.",
        alt: "Dein Gruß ist bereit. Prüfe und personalisiere ihn vor dem Senden.",
      },
      {
        title: "KindMoment Premium",
        description: "Persönliche Grüße, smarte Antworten und Erinnerungen für das ganze Jahr.",
        alt: "KindMoment Premium. Persönliche Grüße, smarte Antworten und Erinnerungen für das ganze Jahr.",
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

    phone.style.touchAction = "pan-y pinch-zoom";

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
      gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
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
