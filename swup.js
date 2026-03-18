import Swup from 'https://unpkg.com/swup@4?module';
import { initHome } from './pages/home.js';

console.log('[main] swup.js chargé');

// ─── Page router ─────────────────────────────────────────────────────────────
function initPage(nav) {
  const el = document.querySelector('#swup');
  console.log('[initPage] #swup:', el, '| data-swup:', el?.dataset.swup);
  if (!el) return;

  switch (el.dataset.swup) {
    case 'home': initHome(nav); break;
    // case 'about': initAbout(); break;
  }
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function initNav() {
  const mainNav    = document.querySelector('#mainNav');
  const accordion  = document.querySelector('.nav-accordion');
  const inner      = document.querySelector('.nav-inner');
  const plusTop    = document.querySelector('#plusTop');
  const plusBottom = document.querySelector('#plusBottom');

  if (!mainNav || !accordion || !inner) return;

  const EASE = 'cubic-bezier(.19,1,.22,1)';
  accordion.style.transition = `max-height 300ms ${EASE}`;

  let open = false;

  function closeNav() {
    accordion.style.maxHeight = '0';
    if (plusTop)    plusTop.style.transform    = '';
    if (plusBottom) plusBottom.style.transform = '';
    open = false;
  }

  mainNav.addEventListener('click', () => {
    if (!open) {
      accordion.style.maxHeight = inner.scrollHeight + 'px';
      if (plusTop)    plusTop.style.transform    = 'translateY(1.5px)';
      if (plusBottom) plusBottom.style.transform = 'translateY(-1.5px)';
      open = true;
    } else {
      closeNav();
    }
  });

  document.addEventListener('click', (e) => {
    if (open && !mainNav.contains(e.target) && !accordion.contains(e.target)) {
      closeNav();
    }
  });

  function openNav() {
    accordion.style.maxHeight = inner.scrollHeight + 'px';
    if (plusTop)    plusTop.style.transform    = 'translateY(1.5px)';
    if (plusBottom) plusBottom.style.transform = 'translateY(-1.5px)';
    open = true;
  }

  return { openNav, closeNav };
}

// ─── Init ─────────────────────────────────────────────────────────────────────
export function initSwup() {
  console.log('[initSwup] démarrage');
  const swup = new Swup({
    containers: ['#swup'],
    animationSelector: '[class*="transition-"]',
  });

  const nav = initNav();
  initPage(nav);
  swup.hooks.on('page:view', () => initPage(nav));
}
