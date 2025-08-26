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

// ===== Mapeo de imágenes por región (IDs 1..25) =====
const REGION_IMAGES = {
  Kanto:  [1, 2, 3, 4, 5],
  Johto:  [6, 7, 8, 9, 10],
  Hoenn:  [11, 12, 13, 14, 15],
  Sinnoh: [16, 17, 18, 19, 20],
  Unova:  [21, 22, 23, 24, 25]
};

// ===== Nombres de entrenadores (del 1 al 25) =====
const REGION_NAMES = {
  Kanto:  ['Lorelei', 'Bruno', 'Agatha', 'Lance', 'Blue'],
  Johto:  ['Will', 'Koga', 'Bruno', 'Karen', 'Lance'],
  Hoenn:  ['Sidney', 'Phoebe', 'Glacia', 'Drake', 'Wallace'],
  Sinnoh: ['Aaron', 'Bertha', 'FLint', 'Lucian', 'Cynthia'],
  Unova:  ['Shauntal', 'Grimsley', 'Caitlin', 'Marshal', 'Alder']
};

function showRegions(){
  eliteView.classList.remove('active');
  regionsView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showElite(region){
  // Título con mayúscula tal cual en el botón
  eliteTitle.textContent = region;

  const ids   = REGION_IMAGES[region] || [];
  const names = REGION_NAMES[region]  || [];

  trainersList.innerHTML = '';

  ids.forEach((id, idx) => {
    const nameText = names[idx] || `entrenador${id}`;

    const card = document.createElement('div');
    card.className = 'trainer';

    // ---- Card visual (con overlay interno) ----
    const portrait = document.createElement('div');
    portrait.className = 'portrait';

    const img = document.createElement('img');
    img.src = `ENTRENADORES/${encodeURIComponent(nameText)}.png`;
    img.alt = nameText;

    const info = document.createElement('div');
    info.className = 'info';

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = nameText;

    const role = document.createElement('div');
    role.className = 'role';
    role.textContent = (idx === 4) ? 'Champion' : 'Elite-Four';

    info.appendChild(name);
    info.appendChild(role);

    portrait.appendChild(img);
    portrait.appendChild(info);

    card.appendChild(portrait);
    trainersList.appendChild(card);
  });

  regionsView.classList.remove('active');
  eliteView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
