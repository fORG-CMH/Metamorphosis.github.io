// Tema guardado en localStorage + toggle
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');

  // aplicar tema guardado si existe
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
  }

  // icono según tema actual
  function syncIcon() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '🌙' : '☀️';
  }
  syncIcon();

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    syncIcon();
  });
})();
