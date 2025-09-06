// Устанавливаем год в футере
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Кнопка «наверх»
const toTop = document.getElementById("toTop");
if (toTop) {
  const toggleTop = () => {
    if (window.scrollY > 300) {
      toTop.classList.add("show");
    } else {
      toTop.classList.remove("show");
    }
  };
  window.addEventListener("scroll", toggleTop);
  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}
