document.documentElement.classList.add("js");

// js/main.js
import "../css/styles.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// HERO PARALLAX: desktop only
ScrollTrigger.matchMedia({
  "(min-width: 769px)": function () {
    gsap.to(".hero-headline", {
      y: 40,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".hero-foreground img", {
      y: -30,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }
});

/* Smooth scroll */
const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1.1 });
lenis.on("scroll", ScrollTrigger.update);
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

/* Mobile navigation */
const mobileToggle = document.querySelector("[data-mobile-toggle]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
if (mobileToggle && mobilePanel) {
  const toggleNav = () => {
    const expanded = mobileToggle.getAttribute("aria-expanded") === "true";
    mobileToggle.setAttribute("aria-expanded", (!expanded).toString());
    mobilePanel.classList.toggle("open", !expanded);
  };
  mobileToggle.addEventListener("click", toggleNav);
  mobilePanel.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      mobilePanel.classList.remove("open");
      mobileToggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* Mega menu hover intent (keeps panel open) */
document.querySelectorAll("[data-mega]").forEach((wrapper) => {
  const trigger = wrapper.querySelector("[data-mega-trigger]");
  const panel = wrapper.querySelector("[data-mega-panel]");
  if (!trigger || !panel) return;

  let closeTimeout;
  const open = () => {
    clearTimeout(closeTimeout);
    panel.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  };
  const close = () => {
    closeTimeout = setTimeout(() => {
      panel.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    }, 120);
  };

  const bindHover = (el) => {
    el.addEventListener("mouseenter", open);
    el.addEventListener("mouseleave", close);
    el.addEventListener("focusin", open);
    el.addEventListener("focusout", (event) => {
      const next = event.relatedTarget;
      if (!wrapper.contains(next)) close();
    });
  };

  bindHover(trigger);
  bindHover(panel);

  trigger.addEventListener("click", (event) => {
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    event.preventDefault();
    if (panel.classList.contains("is-open")) {
      panel.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    } else {
      panel.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

/* Section reveals */
gsap.utils.toArray("section").forEach((sec) => {
  gsap.from(sec.querySelectorAll(".reveal"), {
    opacity: 0,
    y: 24,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.06,
    scrollTrigger: { trigger: sec, start: "top 75%" }
  });
});

/* Optional: number counters for pricing or stats */
const counters = document.querySelectorAll("[data-count]");
counters.forEach((el) => {
  const end = +el.dataset.count;
  gsap.fromTo(el, { innerText: 0 }, {
    innerText: end,
    duration: 1.2,
    ease: "power1.out",
    snap: { innerText: 1 },
    scrollTrigger: { trigger: el, start: "top 85%", once: true }
  });
});


gsap.utils.toArray("#team .team-photo-stack").forEach((photo, idx) => {
  gsap.from(photo, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power2.out",
    delay: idx * 0.08,
    scrollTrigger: { trigger: "#team", start: "top 75%" }
  });
});

/* Marquee autoplay (GSAP wrap to prevent snapping) */
(() => {
  const track = document.querySelector(".marquee-track");
  if (!track || track.dataset.marqueeInit === "true") return;

  const originalMarkup = track.innerHTML;

  const initMarquee = () => {
    track.innerHTML = originalMarkup + originalMarkup; // two sets
    track.dataset.marqueeInit = "true";

    const halfWidth = track.scrollWidth / 2;
    if (!halfWidth) return;

    gsap.set(track, { x: 0 });

    const tween = gsap.to(track, {
      x: -halfWidth,
      duration: 32,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (value) => `${gsap.utils.wrap(-halfWidth, 0, parseFloat(value))}px`
      }
    });

    track.addEventListener("mouseenter", () => tween.pause());
    track.addEventListener("mouseleave", () => tween.resume());
  };

  const imgs = track.querySelectorAll("img");
  if (imgs.length) {
    let loaded = 0;
    imgs.forEach((img) => {
      const done = () => { loaded++; if (loaded === imgs.length) initMarquee(); };
      if (img.complete) {
        done();
      } else if (img.decode) {
        img.decode().finally(done);
      } else {
        img.addEventListener("load", done);
        img.addEventListener("error", done);
      }
    });
  } else {
    initMarquee();
  }
})();

// ============================
// SCROLL REVEAL ANIMATION
// ============================

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
  revealObserver.observe(el);
});

// =========================================================
// CONTACT PAGE INTERACTIONS (Copy buttons + FAQ accordion)
// =========================================================
function initContactPageUI() {
  // ----- Copy buttons -----
  const copyButtons = document.querySelectorAll(".copy-btn");

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const target = btn.getAttribute("data-copy") || "";
      if (!target) return;

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(target);
        } else {
          fallbackCopy(target);
        }

        const original = btn.textContent;
        btn.textContent = "Copied!";
        btn.style.transform = "translateY(-1px)";
        setTimeout(() => {
          btn.textContent = original;
          btn.style.transform = "";
        }, 1200);
      } catch (e) {
        // If clipboard fails, just do nothing silently
      }
    });
  });

  // ----- FAQ accordion -----
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item, idx) => {
    const btn = item.querySelector(".faq-btn");
    const panel = item.querySelector(".faq-panel");
    if (!btn || !panel) return;

    // a11y
    const panelId = panel.id || `faq-panel-${idx + 1}`;
    panel.id = panelId;
    btn.setAttribute("aria-controls", panelId);
    btn.setAttribute("aria-expanded", item.dataset.open === "true" ? "true" : "false");

    btn.addEventListener("click", () => {
      const isOpen = item.dataset.open === "true";

      // optional: close others (keeps it clean)
      faqItems.forEach((other) => {
        if (other !== item) {
          other.dataset.open = "false";
          const otherBtn = other.querySelector(".faq-btn");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });

      item.dataset.open = isOpen ? "false" : "true";
      btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
  });
}

initContactPageUI();