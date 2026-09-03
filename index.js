const menu = document.querySelector(".menu");
const menuToggle = document.querySelector(".menu-toggle");


/* =========================
   Side lines scrolling effect js codes.
========================= */
let scrollFrame;

const updateScrollEffect = () => {
	const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
	const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;

	document.body.style.setProperty("--scroll-progress", progress.toFixed(3));
	document.body.classList.toggle("is-scrolling", window.scrollY > 12);
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
