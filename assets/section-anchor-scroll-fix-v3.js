(() => {
  const sectionIds = new Set(["experience", "privacy", "premium"]);

  const cleanUrl = () =>
    `${window.location.pathname}${window.location.search}`;

  const scrollToSection = (target) => {
    const topbar = document.querySelector(".topbar");
    const topbarHeight = topbar
      ? Math.ceil(topbar.getBoundingClientRect().height)
      : 0;
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - topbarHeight;

    window.history.replaceState(window.history.state, "", cleanUrl());
    window.scrollTo(0, Math.max(0, targetTop));
  };

  document.addEventListener(
    "click",
    (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      const source =
        event.target instanceof Element
          ? event.target.closest('a[href^="#"]')
          : null;
      const href = source?.getAttribute("href");
      const sectionId = href?.slice(1);

      if (!sectionId || !sectionIds.has(sectionId)) {
        return;
      }

      const target = document.getElementById(sectionId);

      if (!target) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      scrollToSection(target);
    },
    { capture: true },
  );

  const initialSectionId = window.location.hash.slice(1);

  if (sectionIds.has(initialSectionId)) {
    const target = document.getElementById(initialSectionId);

    if (target) {
      window.requestAnimationFrame(() => scrollToSection(target));
    }
  }
})();
