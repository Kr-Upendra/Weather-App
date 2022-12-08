const btn = document.querySelector(".changeLocation");
const input = document.querySelector(".input")

btn.addEventListener("click", () => {
    input.focus();
    input.style.background = "#B6FFCE";
});