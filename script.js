const slides = Array.from(document.querySelectorAll(".hero-panel"));
const dots = Array.from(document.querySelectorAll(".slider-dots button"));
const nextButton = document.querySelector(".slider-arrow.next");
const prevButton = document.querySelector(".slider-arrow.prev");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector("#modal-title");
const modalCopy = document.querySelector("#modal-copy");
const modalWa = document.querySelector("#modal-wa");
const modalClose = document.querySelector(".modal-close");
const carButtons = Array.from(document.querySelectorAll(".car-card button"));

let currentSlide = 0;
let slideTimer = window.setInterval(showNextSlide, 5200);

function setSlide(index) {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentSlide);
  });
}

function restartTimer() {
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(showNextSlide, 5200);
}

function showNextSlide() {
  setSlide(currentSlide + 1);
}

nextButton.addEventListener("click", () => {
  showNextSlide();
  restartTimer();
});

prevButton.addEventListener("click", () => {
  setSlide(currentSlide - 1);
  restartTimer();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    setSlide(index % slides.length);
    restartTimer();
  });
});

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

carButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const carName = button.dataset.car;
    modalTitle.textContent = carName;
    modalCopy.textContent = `${carName} tersedia untuk rental harian, mingguan, dan bulanan. Klik tombol di bawah untuk cek jadwal dan paket harga.`;
    modalWa.href = `https://wa.me/6281234567890?text=${encodeURIComponent(`Halo RentCar, saya ingin tanya detail ${carName}`)}`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

const observedSections = Array.from(document.querySelectorAll("main section[id], header[id]"));
const navLinks = Array.from(document.querySelectorAll(".main-nav a"));

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] }
);

observedSections.forEach((section) => observer.observe(section));
