const menu = document.querySelector(".menu");
const menuToggle = document.querySelector(".menu-toggle");
const gradeCards = document.querySelectorAll(".grade1, .grade2, .grade3, .grade4");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");


/* =========================
   Grade card float in animation js code
========================= */
let scrollFrame;

const updateGradeCards = () => {
	if (reducedMotion.matches) {
		gradeCards.forEach((card) => {
			card.style.opacity = "1";
			card.style.transform = "none";
		});
		return;
	}

	gradeCards.forEach((card, index) => {
		const cardBounds = card.getBoundingClientRect();
		const revealProgress = Math.min(
			1,
			Math.max(0, (window.innerHeight - cardBounds.top) / (window.innerHeight * 0.65))
		);
		const horizontalOffset = (1 - revealProgress) * 780;

		card.style.opacity = revealProgress.toFixed(2);
		card.style.transform = `translateX(${horizontalOffset}px)`;
	});
};


/* =========================
   Side lines scrolling effect js codes.
========================= */

const updateScrollEffect = () => {
	const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
	const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;

	document.body.style.setProperty("--scroll-progress", progress.toFixed(3));
	document.body.classList.toggle("is-scrolling", window.scrollY > 12);
	updateGradeCards();
	scrollFrame = undefined;
};

window.addEventListener("scroll", () => {
	if (scrollFrame === undefined) {
		scrollFrame = window.requestAnimationFrame(updateScrollEffect);
	}
}, { passive: true });

updateScrollEffect();

/* =========================
  Menu Toggle js codes
========================= */

menuToggle.addEventListener("click", () => {
	const isOpen = menu.classList.toggle("is-open");
	menuToggle.setAttribute("aria-expanded", String(isOpen));
	menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

