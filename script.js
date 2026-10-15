(() => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  if (toggle && menu) {
    const openMenu = () => {
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
    };
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    };
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });
    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        toggle.focus();
      }
    });
    window.addEventListener('resize', closeMenu);
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // Optioneel: zet je YouTube-video-ID in data-youtube-id op het video-frame.
  const videoFrame = document.querySelector('[data-video-frame]');
  if (videoFrame) {
    const videoId = videoFrame.dataset.youtubeId;
    if (videoId && videoId !== 'VOEG_VIDEO_ID_TOE') {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`;
      iframe.title = 'Cartel La Cima video';
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      videoFrame.replaceChildren(iframe);
    }
  }
})();
