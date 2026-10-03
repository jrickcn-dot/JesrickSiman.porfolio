const carousel = document.querySelector(".carousel");
const track = document.querySelector("#carouselTrack");
const previousButton = document.querySelector(".carousel-btn.prev");
const nextButton = document.querySelector(".carousel-btn.next");
const dotsContainer = document.querySelector("#carouselDots");

if (carousel && track && previousButton && nextButton && dotsContainer) {
    const cards = Array.from(track.querySelectorAll(".experience-card"));
    let currentIndex = 0;
    let visibleCards = 1;

    function updateCarousel() {
        if (cards.length === 0) {
            return;
        }

        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        visibleCards = Math.max(
            1,
            Math.floor((carousel.clientWidth + gap + 1) / (cardWidth + gap))
        );
        const lastIndex = Math.max(0, cards.length - visibleCards);
        currentIndex = Math.min(currentIndex, lastIndex);

        track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
        previousButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === lastIndex;

        dotsContainer.replaceChildren();
        for (let index = 0; index <= lastIndex; index += 1) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "carousel-dot";
            dot.setAttribute("aria-label", `Show experience ${index + 1}`);
            dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
            if (index === currentIndex) {
                dot.classList.add("active");
            }
            dot.addEventListener("click", () => {
                currentIndex = index;
                updateCarousel();
            });
            dotsContainer.append(dot);
        }
    }

    previousButton.addEventListener("click", () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
    });

    nextButton.addEventListener("click", () => {
        currentIndex = Math.min(cards.length - visibleCards, currentIndex + 1);
        updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
}
