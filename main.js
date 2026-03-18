import Swup from 'https://unpkg.com/swup@4?module';

// ─── Init Swup ───────────────────────────────────────────────────────────────
const swup = new Swup({
  containers: ['#swup'],
  animationSelector: '[class*="transition-"]',
});

// ─── Page logic ──────────────────────────────────────────────────────────────
function initPage() {
  const el = document.querySelector('#swup');
  if (!el) return;

  const page = el.dataset.swup;

  switch (page) {
    case 'home':
      initHome();
      break;
    // Add more pages here:
    // case 'about':
    //   initAbout();
    //   break;
    default:
      break;
  }
}

// ─── Page initialisers ───────────────────────────────────────────────────────
function initHome() {
  console.log('[swup] home page ready');
}

// ─── Swup lifecycle ──────────────────────────────────────────────────────────
initPage();
swup.hooks.on('page:view', initPage);
