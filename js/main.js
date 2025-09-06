document.addEventListener('DOMContentLoaded', () => {
  // -------- Подключение include-блоков --------
  const includeHTML = async (id, url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Не удалось загрузить ${url}`);
      const html = await res.text();
      document.getElementById(id).innerHTML = html;
    } catch (err) {
      console.error(err);
    }
  };

  // Подключаем header, nav, footer
  includeHTML('header-placeholder', '../includes/header.html');
  includeHTML('nav-placeholder', '../includes/nav.html');
  includeHTML('footer-placeholder', '../includes/footer.html')
    .then(() => {
      // -------- Подставляем текущий год после загрузки футера --------
      const yearEl = document.getElementById('year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    });

  // -------- Кнопка «Наверх» --------
  const toTop = document.getElementById('toTop');
  if (toTop) {
    const toggleTop = () => {
      if (window.scrollY > 300) {
        toTop.classList.add('show');
      } else {
        toTop.classList.remove('show');
      }
    };
    window.addEventListener('scroll', toggleTop);
    toTop.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }
});
