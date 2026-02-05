gsap.registerPlugin(ScrollTrigger);

const cursorGlow = document.querySelector(".cursor-glow");
const floatingHearts = document.querySelector(".floating-hearts");
const glowParticles = document.querySelector(".glow-particles");

const createParticles = (container, count, emojiList) => {
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.textContent = emojiList[i % emojiList.length];
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.fontSize = `${12 + Math.random() * 18}px`;
    container.appendChild(particle);
  }
};

createParticles(floatingHearts, 26, ["❤", "✨", "💗", "🌸"]);
createParticles(glowParticles, 22, ["✨", "💞", "🌟"]);

const updateCursor = (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.opacity = "1";
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
};

window.addEventListener("pointermove", updateCursor);

const heroQuote = document.querySelectorAll("#heroQuote span");

const introTimeline = gsap.timeline({ delay: 0.4 });
introTimeline
  .from(".hero__intro", { opacity: 0, y: 20, duration: 1 })
  .from(".hero__title", { opacity: 0, y: 30, duration: 1 }, "<0.2")
  .from(
    ".hero__visual",
    { opacity: 0, scale: 0.9, duration: 1.2, ease: "power2.out" },
    "<0.2"
  )
  .from(heroQuote, { opacity: 0, y: 20, duration: 1, stagger: 0.6 }, "<0.2");

ScrollTrigger.batch(".bubble", {
  start: "top 80%",
  onEnter: (batch) =>
    gsap.from(batch, {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
    }),
});

ScrollTrigger.batch(".memory-card", {
  start: "top 82%",
  onEnter: (batch) =>
    gsap.from(batch, {
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 0.9,
      ease: "power3.out",
    }),
});

ScrollTrigger.batch(".poem-line", {
  start: "top 75%",
  onEnter: (batch) =>
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.4,
      duration: 1,
      ease: "power2.out",
    }),
});

ScrollTrigger.create({
  trigger: ".finale",
  start: "top 75%",
  onEnter: () => {
    gsap.fromTo(
      ".finale__photo",
      { scale: 0.9, opacity: 0.6 },
      { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" }
    );
  },
});

const parallaxItems = document.querySelectorAll(".photo-frame, .finale__photo");
window.addEventListener("mousemove", (event) => {
  const { innerWidth, innerHeight } = window;
  const offsetX = (event.clientX / innerWidth - 0.5) * 10;
  const offsetY = (event.clientY / innerHeight - 0.5) * 10;
  parallaxItems.forEach((item) => {
    gsap.to(item, {
      x: offsetX,
      y: offsetY,
      duration: 0.6,
      ease: "power2.out",
    });
  });
});

const floatParticles = (selector) => {
  const items = document.querySelectorAll(`${selector} .particle`);
  items.forEach((item, index) => {
    gsap.to(item, {
      y: () => -20 - Math.random() * 40,
      x: () => (index % 2 === 0 ? -10 : 10) * Math.random(),
      duration: 3 + Math.random() * 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
};

floatParticles(".floating-hearts");
floatParticles(".glow-particles");
