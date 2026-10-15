/* CARTEL LA CIMA — Websiteconfiguratie */
const CONFIG = {
  discordUrl: "https://discord.gg/J8NvURpN7F",
  youtubeVideoId: "KcJ9idXWCos"
};

/* Discord-links instellen op alle pagina's */
document.querySelectorAll(".discord-link").forEach((link) => {
  link.href = CONFIG.discordUrl;
});

/* YouTube-video laden indien aanwezig */
const videoFrame = document.querySelector("[data-video-frame], #videoFrame");

if (videoFrame && CONFIG.youtubeVideoId.trim()) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(CONFIG.youtubeVideoId.trim())}`;
  iframe.title = "Cartel La Cima YouTube-video";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  videoFrame.replaceChildren(iframe);
}

/* Hamburger-/dropdownmenu: openen, sluiten en toegankelijkheid */
const menuToggle = document.querySelector("[data-menu-toggle], #menuToggle");
const siteNav = document.querySelector("[data-nav-menu], #siteNav");

if (menuToggle && siteNav) {
  const openMenu = () => {
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Menu sluiten");
    siteNav.classList.add("is-open", "open");
    siteNav.setAttribute("aria-hidden", "false");
  };

  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menu openen");
    siteNav.classList.remove("is-open", "open");
    siteNav.setAttribute("aria-hidden", "true");
  };

  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });

  /* Sluit het menu nadat een pagina is gekozen */
  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* Sluit het menu als je buiten het menu klikt */
  document.addEventListener("click", (event) => {
    if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  /* Sluit met Escape */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });
}

/* Automatisch het huidige jaartal invullen */
document.querySelectorAll("[data-year], #year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
