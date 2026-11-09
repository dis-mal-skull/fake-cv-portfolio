(function () {
  "use strict";

  /* ---- Live local clock (Montreal-style time display in the reference) ---- */
  var clock = document.getElementById("clock");
  function tick() {
    if (!clock) return;
    var now = new Date();
    var h = String(now.getHours()).padStart(2, "0");
    var m = String(now.getMinutes()).padStart(2, "0");
    var s = String(now.getSeconds()).padStart(2, "0");
    var suffix = now.getHours() >= 12 ? "PM" : "AM";
    clock.textContent = h + ":" + m + ":" + s + " " + suffix;
  }
  tick();
  setInterval(tick, 1000);

  /* ---- Menu toggle ---- */
  var menuBtn = document.getElementById("menuBtn");
  var menuPanel = document.getElementById("menuPanel");

  function closeMenu() {
    if (!menuPanel || !menuBtn) return;
    menuPanel.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
  }

  if (menuBtn && menuPanel) {
    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!open));
      menuPanel.hidden = open;
    });

    menuPanel.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });

    document.addEventListener("click", function (e) {
      if (!menuPanel.hidden && !menuPanel.contains(e.target) && e.target !== menuBtn) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- Scroll reveal ---- */
  var revealTargets = document.querySelectorAll(
    ".about__statement, .thumbstrip, .offer__body, .process__head, .process__grid, .experience__title, .timeline-card, .awards__title, .education, .contact__title, .contact__grid"
  );

  if ("IntersectionObserver" in window && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealTargets.forEach(function (el) {
      io.observe(el);
    });
  }
})();
