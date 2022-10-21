const navEl = document.querySelector('.nav');
const navAnchorEls = document.querySelectorAll('.nav a');
const sectionEls = document.querySelectorAll('.section');

// 메뉴 클릭 이벤트
function animationAnchor(e) {
  navAnchorEls.forEach((el) => el.classList.remove('current'));
  e.target.classList.add('current');
}

// 메뉴 스크롤 이벤트
function animationNav() {
  const windowOffset = window.scrollY;
  navEl.style.top = windowOffset + 300 + 'px';
}

// 텍스트 타이핑
function animationTyping() {
  let typingBool = false;
  let typingIdx = 0;
  let typingEl = document.querySelector('.typing');
  let typingText = document.querySelector('.typing').dataset.set;
  typingText = typingText.split('');

  if (typingBool === false) {
    typingBool = true;

    const typingLoop = setInterval(() => {
      if (typingIdx < typingText.length) {
        typingEl.append(typingText[typingIdx]);
        typingIdx++;
      } else {
        clearInterval(typingLoop);
      }
    }, 100);
  }
}

// IntersectionObserver
function activeObserver() {
  const updateNav = (entries, observer) => {
    const matchingIds = entries
      .filter((e) => e.isIntersecting)
      .map((e) => `#${e.target.id}`);

    if (matchingIds.length !== 0) {
      const current = matchingIds[0];
      navAnchorEls.forEach((link) => {
        link.classList.remove('current');
        if (link.getAttribute('href') === current) {
          link.classList.add('current');
        }
      });
      sectionEls.forEach((el) => {
        el.classList.remove('current');
        if ('#' + el.getAttribute('id') === current) {
          el.classList.add('current');
        }
      });
    }
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.66,
  };

  const observer = new IntersectionObserver(updateNav, options);
  sectionEls.forEach((el) => observer.observe(el));
}

function init() {
  navEl.style.top = window.scrollY + 300 + 'px';
  navAnchorEls.forEach((el) => el.addEventListener('click', animationAnchor));
  animationTyping();
  activeObserver();
  window.addEventListener('scroll', animationNav, { passive: true });
}
init();
