const includeHTML = async (id, url) => {
      const res = await fetch(url);
      const html = await res.text();
      document.getElementById(id).innerHTML = html;
    }

    includeHTML('header-placeholder', '../includes/header.html');
    includeHTML('nav-placeholder', '../includes/nav.html');
    includeHTML('footer-placeholder', '../includes/footer.html');

    // Подставляем текущий год
    document.addEventListener('DOMContentLoaded', () => {
      const yearEl = document.getElementById('year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    });
