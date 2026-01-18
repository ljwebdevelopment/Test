/* script.js
   The Perk Café — minimal JS for multi-page GitHub Pages site
   Features:
   - Mobile nav toggle (works with data-nav-toggle + data-nav)
   - Auto-updates footer year (data-year)
   - Small UX improvements (close nav on link click, close on Esc, close on resize)
*/

(function () {
  "use strict";

  // --- Footer year ---
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // --- Mobile navigation toggle ---
  const toggleBtn = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (!toggleBtn || !nav) return;

  const openNav = () => {
    nav.classList.add("is-open");
    toggleBtn.setAttribute("aria-expanded", "true");
    document.documentElement.classList.add("nav-open"); // optional hook for CSS
  };

  const closeNav = () => {
    nav.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("nav-open");
  };

  const isOpen = () => nav.classList.contains("is-open");

  toggleBtn.addEventListener("click", () => {
    if (isOpen()) closeNav();
    else openNav();
  });

  // Close menu when a nav link is clicked (useful on mobile)
  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    // Only auto-close on small screens (optional heuristic)
    if (window.matchMedia("(max-width: 900px)").matches) closeNav();
  });

  // Close menu on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeNav();
  });

  // Close menu when resizing up to desktop breakpoint
  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 900px)").matches && isOpen()) closeNav();
  });

  // If you ever add in-page anchor links (e.g., #order), this helps ensure
  // the menu isn't stuck open after navigation on mobile.
  window.addEventListener("hashchange", () => {
    if (isOpen()) closeNav();
  });
})();
