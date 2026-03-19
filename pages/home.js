export function initHome(nav) {
  const video = document.querySelector('video');
  if (!video) return;

  const EASE = 'cubic-bezier(.19,1,.22,1)';
  video.style.transition = `opacity 300ms ${EASE}, filter 300ms ${EASE}, transform 300ms ${EASE}`;

  const headline = document.querySelector('#heroHeadline');
  let revealHeadline = () => {};
  if (headline) {
    const originalText = headline.textContent;
    headline.innerHTML = [...originalText].map(
      ch => `<span style="opacity:0;transition:opacity 150ms ease">${ch}</span>`
    ).join('');
    headline.style.opacity = '1';
    revealHeadline = (onDone) => {
      const spans = [...headline.querySelectorAll('span')];
      spans.forEach((span, i) => {
        setTimeout(() => { span.style.opacity = '1'; }, i * 8);
      });
      const done = (spans.length - 1) * 8 + 150;
      setTimeout(() => {
        headline.textContent = originalText;
        if (onDone) onDone();
      }, done);
    };
  }

function onReady() {
    video.style.opacity = '1';
    video.play();
    if (nav) setTimeout(() => {
      nav.openNav();
      revealHeadline(() => {
        video.style.filter    = 'blur(0px)';
        video.style.transform = 'scale(1)';
      });
    }, 300);
  }

  if (video.readyState >= 2) {
    onReady();
  } else {
    video.addEventListener('canplay', onReady, { once: true });
  }
}
