const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];

function setMenu(open) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
  const label = menuButton.querySelector('.sr-only');
  if (label) label.textContent = open ? 'Close navigation' : 'Open navigation';
}

menuButton?.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 820) setMenu(false);
});

if ('IntersectionObserver' in window && navLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navLinks.forEach((link) => {
      const matches = link.getAttribute('href') === `#${visible.target.id}`;
      link.classList.toggle('is-current', matches);
      if (matches) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, .2, .5] });

  sections.forEach((section) => observer.observe(section));
}
