const navLinks = document.querySelectorAll(".navbar-link");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    toggleNavbar();
    const targetId = event.currentTarget.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 50;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  });
});

const mainBtn = document.querySelector(".main-btn");

mainBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute("href");
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const offsetTop = targetElement.offsetTop - 50;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }
});

const textElement = document.querySelector(".typewriter");
const texts = [" Basketball Shoes", ", tu mejor opción."];
let textIndex = 0;
let charIndex = 0;
function type() {
  if (charIndex < texts[textIndex].length) {
    textElement.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    textElement.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, 500);
  }
}

type();
