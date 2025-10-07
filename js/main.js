/* ====== This code is property of Devin J. Monsen any unconsented redistribution or use of this code is unlawful under copyright law. ====== */

/* ====== Mobile Nav Toggle ====== */
const hamburger = document.querySelector('.hamburger');
const drawer = document.getElementById('mobileMenu');
if (hamburger && drawer) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!open));
    drawer.classList.toggle('open', !open);
  });
}

/* ====== Footer Year ====== */
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

/* ====== Marquee Infinite Scroll ====== */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("marqueeTrack");
  if (!track) return;

  const logos = Array.from(track.children);
  logos.forEach(logo => {
    const clone = logo.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  let x = 0;
  const speed = 0.3;

  function animate() {
    x -= speed;
    const resetPoint = track.scrollWidth / 2;
    if (Math.abs(x) >= resetPoint) {
      x = 0;
    }
    track.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(animate);
  }

  animate();
});

// === Modal Toggle Logic ===
document.addEventListener("DOMContentLoaded", () => {
  const openButtons = document.querySelectorAll(".modal-btn");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close-modal");

  openButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.dataset.modal;
      const modal = document.getElementById(`modal-${modalId}`);
      if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach((modal) => modal.classList.remove("active"));
      document.body.style.overflow = "auto";
    }
  });
});

// === FAQ Toggle Logic ===
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const parent = question.closest(".faq-item");
      parent.classList.toggle("open");
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== parent) item.classList.remove("open");
      });
    });
  });

  const searchInput = document.getElementById("faqSearch");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();
      document.querySelectorAll(".faq-item").forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? "" : "none";
      });
    });
  }
});

// === Bio Toggle Logic ===
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".bio-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const bio = button.closest(".team-bio");
      const isOpen = bio.classList.toggle("open");
      button.textContent = isOpen ? "Show less" : "Read more";
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });
});


/* ====== This code is property of Devin J. Monsen any unconsented redistribution or use of this code is unlawful under copyright law. ====== */