const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const yearElement = document.querySelector("#year");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}