(function initTheme() {
  if (localStorage.theme === undefined) {
    localStorage.setItem(
      "theme",
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark"
    );
  }

  document.documentElement.classList.add(
    localStorage.theme === "light" ? "light" : "dark"
  );
})();
