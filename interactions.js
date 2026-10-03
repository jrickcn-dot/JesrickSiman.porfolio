const progressBar = document.querySelector("#scrollProgress");
const pointerGlow = document.querySelector(".pointer-glow");
const heroArt = document.querySelector("[data-tilt]");
const navigationAnchors = Array.from(document.querySelectorAll(".nav-links a"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateScrollProgress() {
    if (!progressBar) {
        return;
    }

    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

if (!reducedMotion && pointerGlow && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (event) => {
        pointerGlow.style.left = `${event.clientX}px`;
        pointerGlow.style.top = `${event.clientY}px`;
    }, { passive: true });
} else {
    pointerGlow?.remove();
}

if (!reducedMotion && heroArt && window.matchMedia("(pointer: fine)").matches) {
    heroArt.addEventListener("pointermove", (event) => {
        const bounds = heroArt.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        heroArt.style.setProperty("--tilt-x", `${y * -5}deg`);
        heroArt.style.setProperty("--tilt-y", `${x * 6}deg`);
    });
    heroArt.addEventListener("pointerleave", () => {
        heroArt.style.setProperty("--tilt-x", "0deg");
        heroArt.style.setProperty("--tilt-y", "0deg");
    });
}

if (navigationAnchors.length > 0 && "IntersectionObserver" in window) {
    const sections = navigationAnchors
        .map((anchor) => document.querySelector(anchor.getAttribute("href")))
        .filter((section) => section instanceof HTMLElement);

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navigationAnchors.forEach((anchor) => {
                const isActive = anchor.getAttribute("href") === `#${entry.target.id}`;
                anchor.classList.toggle("is-active", isActive);
                if (isActive) {
                    anchor.setAttribute("aria-current", "location");
                } else {
                    anchor.removeAttribute("aria-current");
                }
            });
        });
    }, { rootMargin: "-25% 0px -60% 0px" });

    sections.forEach((section) => sectionObserver.observe(section));
}

const revealItems = document.querySelectorAll(".reveal");
if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
}
