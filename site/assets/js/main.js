const navToggle = document.querySelector(".nav-toggle");
const body = document.body;
const nav = document.querySelector(".site-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const setupHeroSlider = () => {
  const slider = document.querySelector(".hero-slider");
  if (!slider) {
    return;
  }
  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  if (!slides.length) {
    return;
  }
  let index = 0;
  slides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === 0);
  });
  if (prefersReducedMotion) {
    return;
  }
  const interval = Number(slider.dataset.interval) || 6000;
  setInterval(() => {
    slides[index].classList.remove("is-active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("is-active");
  }, interval);
};

const setupGallerySlider = () => {
  const slider = document.querySelector(".gallery-slider");
  if (!slider) {
    return;
  }
  const track = slider.querySelector(".gallery-track");
  const slides = Array.from(slider.querySelectorAll(".gallery-slide"));
  if (!track || !slides.length) {
    return;
  }
  let index = 0;
  const setIndex = (next) => {
    index = (next + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  };
  setIndex(0);
  const prevButton = slider.querySelector("[data-gallery-prev]");
  const nextButton = slider.querySelector("[data-gallery-next]");
  if (prevButton) {
    prevButton.addEventListener("click", () => setIndex(index - 1));
  }
  if (nextButton) {
    nextButton.addEventListener("click", () => setIndex(index + 1));
  }
  if (prefersReducedMotion) {
    return;
  }
  const interval = Number(slider.dataset.interval) || 5000;
  setInterval(() => setIndex(index + 1), interval);
};

setupHeroSlider();
setupGallerySlider();

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", expanded ? "false" : "true");
    const targetId = button.getAttribute("aria-controls");
    const target = targetId ? document.getElementById(targetId) : null;
    if (target) {
      target.hidden = expanded;
    }
  });
});

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});
