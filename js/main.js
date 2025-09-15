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

/* ====== Marquee Infinite Scroll (Working Version) ====== */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("marqueeTrack");
  if (!track) return;

  const logos = Array.from(track.children);

  // Clone all logos once for seamless loop
  logos.forEach(logo => {
    const clone = logo.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  let x = 0;
  const speed = 0.3;

  function animate() {
    x -= speed;

    // Reset after first full group (not full scrollWidth!)
    const resetPoint = track.scrollWidth / 2;
    if (Math.abs(x) >= resetPoint) {
      x = 0;
    }

    track.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(animate);
  }

  animate();
});

document.addEventListener("DOMContentLoaded", () => {
  const expandButtons = document.querySelectorAll('.expand-btn');

  expandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.service-card');
      card.classList.toggle('expanded');
      btn.textContent = card.classList.contains('expanded') ? 'Show Less' : 'Show More';
    });
  });
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