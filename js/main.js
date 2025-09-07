document.addEventListener('DOMContentLoaded', () => {
  // -------- Telegram WebApp init (безопасно) --------
  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (tg) {
    try { if (typeof tg.expand === 'function') tg.expand(); } catch (e) { console.warn('tg.expand:', e); }

    // безопасно вызываем disableVerticalSwipes() только если доступно
    const canDisableSwipes =
      (typeof tg.isVersionAtLeast === 'function' && tg.isVersionAtLeast('7.7')) ||
      (typeof tg.disableVerticalSwipes === 'function');

    if (canDisableSwipes) {
      try { tg.disableVerticalSwipes(); } catch (e) { console.warn('disableVerticalSwipes:', e); }
    } else {
      console.info('disableVerticalSwipes not available in this Telegram client (version:', tg.version || 'unknown', ')');
    }
  }

  // -------- Подставляем текущий год --------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -------- Кнопка «Наверх» --------
  const toTop = document.getElementById('toTop');
  if (toTop) {
    const toggleTop = () => {
      if (window.scrollY > 300) toTop.classList.add('show');
      else toTop.classList.remove('show');
    };
    window.addEventListener('scroll', toggleTop);
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // -------- Универсальная функция открытия ссылок --------
  function openTgLink(url) {
    try {
      // делаем абсолютный URL относительно текущей страницы
      const abs = new URL(url, location.href).href;
      const isSameOrigin = abs.startsWith(location.origin);

      if (isSameOrigin) {
        // внутренняя страница сайта — навигация в текущем WebView
        window.location.href = abs;
        return;
      }

      // внешняя ссылка — пытаемся открыть через Telegram WebApp API
      if (tg && typeof tg.openLink === 'function') {
        tg.openLink(abs);
      } else {
        // fallback — новое окно/вкладка
        window.open(abs, '_blank', 'noopener');
      }
    } catch (err) {
      console.error('openTgLink error:', err);
      // на всякий случай — просто открываем
      window.open(url, '_blank', 'noopener');
    }
  }

  // Экспортируем в глобальную область, чтобы можно было вызвать из HTML onclick
  window.openTgLink = openTgLink;
});
