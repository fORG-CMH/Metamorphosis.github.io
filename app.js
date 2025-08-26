// ===== Tema dark/light (persistente) =====
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
    btn.textContent = saved === 'dark' ? '🌙' : '☀️';
  }
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    btn.textContent = next === 'dark' ? '🌙' : '☀️';
  });
})();

// ===== Navegación SPA: Regiones -> Elite Four =====
const regionsView = document.getElementById('regionsView');
const eliteView    = document.getElementById('eliteView');
const trainersList = document.getElementById('trainersList');
const eliteTitle   = document.getElementById('eliteTitle');
const backBtn      = document.getElementById('backBtn');

// Botón "Select Region" vuelve a regiones
document.getElementById('selectRegionBtn').addEventListener('click', () => {
  showRegions();
});

// Click en "View Elite Four" de cada región
document.querySelectorAll('.view-elite').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const region = a.dataset.region || 'Region';
    showElite(region);
  });
});

backBtn.addEventListener('click', showRegions);

// Mapeo de imágenes por región
const REGION_IMAGES = {
  Kanto:  [1, 2, 3, 4, 5],
  Johto:  [6, 7, 8, 9, 10],
  Hoenn:  [11, 12, 13, 14, 15],
  Sinnoh: [16, 17, 18, 19, 20],
  Unova:  [21, 22, 23, 24, 25],
};

function showRegions(){
  eliteView.classList.remove('active');
  regionsView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showElite(region){
  // 🔹 Mostrar nombre de la región respetando mayúscula
  eliteTitle.textContent = region;

  // Obtener rango según región
  const ids = REGION_IMAGES[region] || [];
  trainersList.innerHTML = '';

  // Generar 5 tarjetas
  ids.forEach((id, idx) => {
    const card = document.createElement('div');
    card.className = 'trainer';

    const portrait = document.createElement('div');
    portrait.className = 'portrait';
    const img = document.createElement('img');
    img.src = `ENTRENADORES/entrenador${id}.png`;
    img.alt = `entrenador ${id}`;
    portrait.appendChild(img);

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = `entrenador${id}`;

    const role = document.createElement('div');
    role.className = 'role';
    role.textContent = (idx === 4) ? 'Champion' : 'Elite-Four';

    card.appendChild(portrait);
    card.appendChild(name);
    card.appendChild(role);
    trainersList.appendChild(card);
  });

  regionsView.classList.remove('active');
  eliteView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
