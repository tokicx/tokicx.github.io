import { r as interop } from "./rolldown-runtime-QTnfLwEv.js";
import { i as jsxRuntime, r as framework } from "./framework-B5gSXtEp.js";

var React = interop(jsxRuntime(), 1);
var jsx = framework();

var copy = {
  en: {
    carousel: "Explore KindMoment app screens",
    previous: "Previous app screen",
    next: "Next app screen",
    hint: "Swipe or use the arrows",
    show: "Show",
    roleDescription: "carousel",
  },
  hr: {
    carousel: "Pregled zaslona aplikacije KindMoment",
    previous: "Prethodni zaslon aplikacije",
    next: "Sljedeći zaslon aplikacije",
    hint: "Povuci ili koristi strelice",
    show: "Prikaži",
    roleDescription: "klizni pregled",
  },
  de: {
    carousel: "KindMoment-App-Bildschirme entdecken",
    previous: "Vorheriger App-Bildschirm",
    next: "Nächster App-Bildschirm",
    hint: "Wischen oder Pfeile verwenden",
    show: "Anzeigen",
    roleDescription: "Karussell",
  },
};

function AppTourCarousel({ locale, slides }) {
  let [activeIndex, setActiveIndex] = React.useState(0);
  let gesture = React.useRef(null);
  let labels = copy[locale];

  React.useEffect(() => {
    if (activeIndex >= slides.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, slides.length]);

  let activeSlide = slides[activeIndex] ?? slides[0];

  if (!activeSlide) {
    return null;
  }

  let showPrevious = () => {
    setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  };

  let showNext = () => {
    setActiveIndex((index) => (index + 1) % slides.length);
  };

  let clearGesture = (event) => {
    if (gesture.current?.id === event.pointerId) {
      gesture.current = null;
    }
  };

  return jsx.jsxs("div", {
    className: "app-tour",
    role: "region",
    "aria-roledescription": labels.roleDescription,
    "aria-label": labels.carousel,
    tabIndex: 0,
    onKeyDown: (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    },
    children: [
      jsx.jsxs("div", {
        className: "app-tour-phone-wrap",
        children: [
          jsx.jsx("div", {
            className: "app-tour-phone",
            onPointerDown: (event) => {
              if (!event.isPrimary || event.button !== 0) {
                return;
              }

              gesture.current = {
                id: event.pointerId,
                x: event.clientX,
                y: event.clientY,
              };

              // Capturing a touch pointer immediately can block native vertical
              // scrolling in iOS Safari. Mouse and pen input still benefit from
              // capture when the pointer leaves the phone frame.
              if (event.pointerType !== "touch") {
                event.currentTarget.setPointerCapture(event.pointerId);
              }
            },
            onPointerUp: (event) => {
              let start = gesture.current;

              if (start === null || start.id !== event.pointerId) {
                return;
              }

              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }

              let deltaX = event.clientX - start.x;
              let deltaY = event.clientY - start.y;
              gesture.current = null;

              // A swipe must be both long enough and primarily horizontal.
              // Vertical gestures are always left to native page scrolling.
              if (
                Math.abs(deltaX) < 42 ||
                Math.abs(deltaX) <= Math.abs(deltaY) * 1.2
              ) {
                return;
              }

              if (deltaX > 0) {
                showPrevious();
              } else {
                showNext();
              }
            },
            onPointerCancel: clearGesture,
            onLostPointerCapture: clearGesture,
            children: jsx.jsx("div", {
              className: "app-tour-track",
              style: {
                transform: `translateX(-${activeIndex * 100}%)`,
              },
              children: slides.map((slide, index) =>
                jsx.jsx(
                  "figure",
                  {
                    className: "app-tour-slide",
                    "aria-hidden": index !== activeIndex,
                    children: jsx.jsx("img", {
                      src: slide.src,
                      width: slide.width,
                      height: slide.height,
                      alt: index === activeIndex ? slide.alt : "",
                      loading: index === 0 ? "eager" : "lazy",
                      decoding: "async",
                      draggable: false,
                    }),
                  },
                  slide.src,
                ),
              ),
            }),
          }),
          jsx.jsx("button", {
            className: "app-tour-arrow app-tour-arrow-previous",
            type: "button",
            onClick: showPrevious,
            "aria-label": labels.previous,
            children: jsx.jsx("span", {
              "aria-hidden": "true",
              children: "←",
            }),
          }),
          jsx.jsx("button", {
            className: "app-tour-arrow app-tour-arrow-next",
            type: "button",
            onClick: showNext,
            "aria-label": labels.next,
            children: jsx.jsx("span", {
              "aria-hidden": "true",
              children: "→",
            }),
          }),
        ],
      }),
      jsx.jsxs("div", {
        className: "app-tour-meta",
        children: [
          jsx.jsxs("div", {
            className: "app-tour-status",
            role: "status",
            "aria-atomic": "true",
            children: [
              jsx.jsxs("div", {
                className: "app-tour-meta-topline",
                children: [
                  jsx.jsxs("span", {
                    children: [
                      String(activeIndex + 1).padStart(2, "0"),
                      " /",
                      " ",
                      String(slides.length).padStart(2, "0"),
                    ],
                  }),
                  jsx.jsx("small", {
                    children: labels.hint,
                  }),
                ],
              }),
              jsx.jsx("strong", {
                children: activeSlide.title,
              }),
              jsx.jsx("p", {
                children: activeSlide.description,
              }),
            ],
          }),
          jsx.jsx("div", {
            className: "app-tour-dots",
            role: "group",
            "aria-label": labels.carousel,
            children: slides.map((slide, index) =>
              jsx.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveIndex(index),
                  "aria-label": `${labels.show}: ${slide.title}`,
                  "aria-current": index === activeIndex ? "true" : undefined,
                  children: jsx.jsx("span", {
                    "aria-hidden": "true",
                  }),
                },
                slide.src,
              ),
            ),
          }),
        ],
      }),
    ],
  });
}

export { AppTourCarousel };
