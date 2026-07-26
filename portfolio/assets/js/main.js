(() => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.addEventListener('load', () => body.classList.add('loaded'), { once: true });
  window.setTimeout(() => body.classList.add('loaded'), 1200);

  document.getElementById('year').textContent = new Date().getFullYear();

  const updateScrollUI = () => {
    const scrollTop = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? scrollTop / max : 0;
    progress.style.transform = `scaleX(${ratio})`;
    header.classList.toggle('scrolled', scrollTop > 12);

    let current = '';
    sections.forEach(section => {
      if (scrollTop >= section.offsetTop - 160) current = section.id;
    });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };
  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav?.addEventListener('click', event => {
    if (event.target.matches('a')) {
      body.classList.remove('menu-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    }
  });

  if (reduceMotion) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  document.querySelectorAll('[data-delay]').forEach(el => {
    el.style.setProperty('--delay', `${Number(el.dataset.delay) || 0}ms`);
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
})();
