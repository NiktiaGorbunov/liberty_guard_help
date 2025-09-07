// -------- Telegram WebApp API --------
document.addEventListener("DOMContentLoaded", () => {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;

    // Разворачиваем WebApp на весь экран
    tg.expand();

    // Блокируем вертикальные свайпы (чтобы сайт не "сворачивался")
    tg.disableVerticalSwipes();
  }
});

// -------- Подставляем текущий год --------
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// -------- Кнопка «Наверх» --------
const toTop = document.getElementById("toTop");
if (toTop) {
  const toggleTop = () => {
    if (window.scrollY > 300) toTop.classList.add("show");
    else toTop.classList.remove("show");
  };
  window.addEventListener("scroll", toggleTop);
  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

// -------- Открытие ссылок внутри Telegram --------
function openTgLink(url) {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.openLink(url);
  } else {
    window.open(url, "_blank"); // fallback для браузера
  }
}

// Делаем функцию глобальной (чтобы можно было вызывать из HTML)
window.openTgLink = openTgLink;
