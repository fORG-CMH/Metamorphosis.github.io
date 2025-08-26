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

// ===== Navegación SPA =====
const regionsView = document.getElementById('regionsView');
const eliteView    = document.getElementById('eliteView');
const trainersList = document.getElementById('trainersList');
const eliteTitle   = document.getElementById('eliteTitle');
const backBtn      = document.getElementById('backBtn');

// Vista Pokémon del entrenador
const pokemonView  = document.getElementById('pokemonView');
const pokemonTitle = document.getElementById('pokemonTitle');
const pokemonList  = document.getElementById('pokemonList');
const backToEliteBtn = document.getElementById('backToEliteBtn');
const crumbPath = document.getElementById('crumbPath');

// Botón "Select Region" vuelve a regiones
document.getElementById('selectRegionBtn').addEventListener('click', showRegions);

// Click en "View Elite Four" de cada región
document.querySelectorAll('.view-elite').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const region = a.dataset.region || 'Region';
    showElite(region);
  });
});

backBtn.addEventListener('click', showRegions);
if (backToEliteBtn) {
  backToEliteBtn.addEventListener('click', () => {
    pokemonView.classList.remove('active');
    eliteView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Datos base =====
const REGION_IMAGES = {
  Kanto:  [1, 2, 3, 4, 5],
  Johto:  [6, 7, 8, 9, 10],
  Hoenn:  [11, 12, 13, 14, 15],
  Sinnoh: [16, 17, 18, 19, 20],
  Unova:  [21, 22, 23, 24, 25]
};

const REGION_NAMES = {
  Kanto:  ['Lorelei', 'Bruno', 'Agatha', 'Lance', 'Blue'],
  Johto:  ['Will', 'Koga', 'Bruno', 'Karen', 'Lance'],
  Hoenn:  ['Sidney', 'Phoebe', 'Glacia', 'Drake', 'Wallace'],
  Sinnoh: ['Aaron', 'Bertha', 'Flint', 'Lucian', 'Cynthia'],
  Unova:  ['Shauntal', 'Grimsley', 'Caitlin', 'Marshal', 'Alder']
};

// Rellena tú los equipos aquí (se usan POKEMON/<Nombre>.png)
const TRAINER_POKEMON = {
  'Lorelei': [], 'Bruno': [], 'Agatha': [], 'Lance': [], 'Blue': [],
  'Will': [], 'Koga': [], 'Karen': [],
  'Sidney': [], 'Phoebe': [], 'Glacia': [], 'Drake': [], 'Wallace': [],
  'Aaron': [], 'Bertha': [], 'Flint': [], 'Lucian': [], 'Cynthia': [],
  'Shauntal': [], 'Grimsley': [], 'Caitlin': [], 'Marshal': [], 'Alder': []
};

// ===== Vistas =====
function showRegions(){
  if (pokemonView) pokemonView.classList.remove('active');
  eliteView.classList.remove('active');
  regionsView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showElite(region){
  eliteTitle.textContent = region;

  const ids   = REGION_IMAGES[region] || [];
  const names = REGION_NAMES[region]  || [];

  trainersList.innerHTML = '';

  ids.forEach((id, idx) => {
    const nameText = names[idx] || `entrenador${id}`;

    const card = document.createElement('div');
    card.className = 'trainer';
    card.dataset.trainer = nameText;
    card.dataset.region = region;

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

    // Accesibilidad: cursor y role botón
    card.style.cursor = 'pointer';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    trainersList.appendChild(card);
  });

  regionsView.classList.remove('active');
  if (pokemonView) pokemonView.classList.remove('active');
  eliteView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ✅ Delegación de eventos: captura cualquier click dentro de trainersList
// (más robusto que asignar un listener por card)
trainersList.addEventListener('click', (e) => {
  const card = e.target.closest('.trainer');
  if (!card) return;
  const trainerName = card.dataset.trainer;
  const region = card.dataset.region;
  if (trainerName) showPokemon(trainerName, region);
});

// También permite Enter/Espacio con el foco
trainersList.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const card = e.target.closest('.trainer');
  if (!card) return;
  e.preventDefault();
  const trainerName = card.dataset.trainer;
  const region = card.dataset.region;
  if (trainerName) showPokemon(trainerName, region);
});

function showPokemon(trainerName, region){
  if (!pokemonView) return;

  pokemonTitle.textContent = trainerName;
  if (crumbPath) crumbPath.textContent = `${region} › ${trainerName}`;

  const mons = TRAINER_POKEMON[trainerName] || [];

  pokemonList.innerHTML = '';

  if (!mons.length){
    const help = document.createElement('div');
    help.style.color = 'var(--muted)';
    help.style.textAlign = 'center';
    help.style.gridColumn = '1 / -1';
    help.style.padding = '10px 0 6px';
    help.innerHTML = `
      <strong>Sin equipo aún.</strong><br/>
      Edita <code>TRAINER_POKEMON['${trainerName}'] = ['Pikachu','Charizard',...]</code>
      y pon las imágenes en <code>POKEMON/&lt;Nombre&gt;.png</code>
    `;
    pokemonList.appendChild(help);
  }

  mons.forEach(monName => {
    const monCard = document.createElement('div');
    monCard.className = 'pokemon-card';

    const portrait = document.createElement('div');
    portrait.className = 'portrait';

    const img = document.createElement('img');
    img.src = `POKEMON/${encodeURIComponent(monName)}.png`;
    img.alt = monName;

    portrait.appendChild(img);

    const pname = document.createElement('div');
    pname.className = 'pname';
    pname.textContent = monName;

    monCard.appendChild(portrait);
    monCard.appendChild(pname);

    pokemonList.appendChild(monCard);
  });

  eliteView.classList.remove('active');
  regionsView.classList.remove('active');
  pokemonView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
