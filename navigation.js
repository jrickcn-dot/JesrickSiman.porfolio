const navigationToggle = document.querySelector("#navToggle");
const navigationLinks = document.querySelector("#navLinks");

if (navigationToggle && navigationLinks) {
    navigationToggle.addEventListener("click", () => {
        const isExpanded = navigationToggle.getAttribute("aria-expanded") === "true";
        navigationToggle.setAttribute("aria-expanded", String(!isExpanded));
        navigationToggle.setAttribute(
            "aria-label",
            isExpanded ? "Open navigation" : "Close navigation"
        );
        navigationLinks.classList.toggle("is-open", !isExpanded);
    });

    navigationLinks.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            navigationToggle.setAttribute("aria-expanded", "false");
            navigationToggle.setAttribute("aria-label", "Open navigation");
            navigationLinks.classList.remove("is-open");
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            navigationToggle.setAttribute("aria-expanded", "false");
            navigationToggle.setAttribute("aria-label", "Open navigation");
            navigationLinks.classList.remove("is-open");
        }
    });
}
