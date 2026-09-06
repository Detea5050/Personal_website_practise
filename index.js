const menu = document.querySelector(".menu");
const menuToggle = document.querySelector(".menu-toggle");
const gradeCards = document.querySelectorAll(".grade1, .grade2, .grade3, .grade4");
const aboutImage = document.querySelector(".about-img");
const aboutSection = document.querySelector(".about_section");
const heroImage = document.querySelector(".hero-image");
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
   About section float in animation js code
========================= */

const updateAboutImage = () => {
	if (!aboutImage) return;

	if (reducedMotion.matches) {
		aboutImage.style.opacity = "1";
		aboutImage.style.transform = "none";
		return;
	}

	const imageBounds = aboutImage.getBoundingClientRect();
	const revealProgress = Math.min(
		1,
		Math.max(0, (window.innerHeight - imageBounds.top) / (window.innerHeight * 0.75))
	);
	const floatOffset = (1 - revealProgress) * 90;

	aboutImage.style.opacity = revealProgress.toFixed(2);
	aboutImage.style.transform = `translateY(${floatOffset}px)`;
};


// =======hero img scroll effect js code
const updateHeroZoom = () => {
	if (!heroImage) return;

	if (reducedMotion.matches || !aboutSection) {
		heroImage.style.transform = "scale(1.05)";
		return;
	}

	const aboutBounds = aboutSection.getBoundingClientRect();
	const transitionProgress = Math.min(
		1,
		Math.max(0, (window.innerHeight - aboutBounds.top) / window.innerHeight)
	);
	const scale = 1.05 + transitionProgress * 0.13;

	heroImage.style.transform = `scale(${scale.toFixed(3)})`;
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
	updateAboutImage();
	updateHeroZoom();
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

