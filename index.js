const menu = document.querySelector(".menu");
const menuToggle = document.querySelector(".menu-toggle");

menuToggle.addEventListener("click", () => {
	const isOpen = menu.classList.toggle("is-open");
	menuToggle.setAttribute("aria-expanded", String(isOpen));
	menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});
