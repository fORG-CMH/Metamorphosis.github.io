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

// ===== Referencias a vistas / nodos =====
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

// Pager entrenadores
const prevTrainerBtn = document.getElementById('prevTrainerBtn');
const nextTrainerBtn = document.getElementById('nextTrainerBtn');

// Pager regiones (en Elite)
const prevRegionBtn = document.getElementById('prevRegionBtn');
const nextRegionBtn = document.getElementById('nextRegionBtn');

// Botón "Select Region" (topbar)
const selectRegionBtn = document.getElementById('selectRegionBtn');

// ===== Datos base =====
const REGIONS = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova"];

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

// Rellena tú los equipos (POKEMONES/<Nombre>.png)
const TRAINER_POKEMON = {
  'Lorelei': ['JetDragon','Anubis'],
  'Bruno': ['JetDragon','Anubis'],
  'Agatha': ['JetDragon','Anubis'],
  'Lance': ['JetDragon','Anubis'],
  'Blue': ['JetDragon','Anubis'],
  'Will': ['JetDragon','Anubis'],
  'Koga': ['JetDragon','Anubis'],
  'Karen': ['JetDragon','Anubis'],
  'Sidney': ['JetDragon','Anubis'],
  'Phoebe': ['JetDragon','Anubis'],
  'Glacia': ['JetDragon','Anubis'],
  'Drake': ['JetDragon','Anubis'],
  'Wallace': ['JetDragon','Anubis'],
  'Aaron': ['JetDragon','Anubis'],
  'Bertha': ['JetDragon','Anubis'],
  'Flint': ['JetDragon','Anubis'],
  'Lucian': ['JetDragon','Anubis'],
  'Cynthia': ['JetDragon','Anubis'],
  'Shauntal': ['JetDragon','Anubis'],
  'Grimsley': ['JetDragon','Anubis'],
  'Caitlin': ['JetDragon','Anubis'],
  'Marshal': ['JetDragon','Anubis'],
  'Alder': ['JetDragon','Anubis']
};

// ===== Estado =====
let currentRegion = null;
let currentRegionIndex = -1;
let currentTrainerNames = [];
let currentTrainerIndex = -1;

// ===== Navegación entre vistas =====
function showRegions(){
  currentRegion = null;
  currentRegionIndex = -1;
  currentTrainerNames = [];
  currentTrainerIndex = -1;

  if (pokemonView) pokemonView.classList.remove('active');
  eliteView.classList.remove('active');
  regionsView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showElite(region){
  // Fija región e índice
  currentRegion = region;
  currentRegionIndex = REGIONS.indexOf(region);

  // Título
  eliteTitle.textContent = region;

  const ids   = REGION_IMAGES[region] || [];
  const names = REGION_NAMES[region]  || [];

  currentTrainerNames = names.slice();
  currentTrainerIndex = -1;

  // Render entrenadores
  trainersList.innerHTML = '';
  ids.forEach((id, idx) => {
    const nameText = names[idx] || `entrenador${id}`;

    const card = document.createElement('div');
    card.className = 'trainer';
    card.dataset.trainer = nameText;
    card.dataset.region = region;
    card.dataset.index = String(idx);

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

function showPokemon(trainerName, region){
  if (!pokemonView) return;

  // Título: Team <Entrenador>
  pokemonTitle.textContent = `Team ${trainerName}`;

  // Breadcrumb
  if (crumbPath) crumbPath.textContent = `${region} › ${trainerName}`;

  // Índice del entrenador (para pager/teclas)
  if (currentTrainerIndex < 0) {
    currentTrainerIndex = currentTrainerNames.indexOf(trainerName);
  }
  updateTrainerPagerButtons();

  // Render Pokémon
  const mons = TRAINER_POKEMON[trainerName] || [];
  pokemonList.innerHTML = '';

  if (!mons.length){
    const help = document.createElement('div');
    help.style.color = 'var(--muted)';
    help.style.textAlign = 'center';
    help.style.gridColumn = '1 / -1';
    help.style.padding = '10px 0 6px';
    help.innerHTML = `<strong>Sin equipo aún.</strong>`;
    pokemonList.appendChild(help);
  }

  mons.forEach(monName => {
    const monCard = document.createElement('div');
    monCard.className = 'pokemon-card';

    const nameBar = document.createElement('div');
    nameBar.className = 'pname';
    nameBar.textContent = monName;

    const portrait = document.createElement('div');
    portrait.className = 'portrait';

    const img = document.createElement('img');
    img.src = `POKEMONES/${encodeURIComponent(monName)}.png`;
    img.alt = monName;

    portrait.appendChild(img);

    monCard.appendChild(nameBar);   // nombre arriba
    monCard.appendChild(portrait);  // imagen debajo
    pokemonList.appendChild(monCard);
  });

  eliteView.classList.remove('active');
  regionsView.classList.remove('active');
  pokemonView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Listeners base =====

// Botón "Select Region" (header)
if (selectRegionBtn) {
  selectRegionBtn.addEventListener('click', showRegions);
}

// Click en "View Elite Four" de cada región
document.querySelectorAll('.view-elite').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const region = a.dataset.region || 'Region';
    showElite(region);
  });
});

// Back a regiones
if (backBtn) {
  backBtn.addEventListener('click', showRegions);
}

// Back a Elite desde Pokémon
if (backToEliteBtn) {
  backToEliteBtn.addEventListener('click', () => {
    pokemonView.classList.remove('active');
    eliteView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Delegación: click y teclado en lista de entrenadores
if (trainersList) {
  trainersList.addEventListener('click', (e) => {
    const card = e.target.closest('.trainer');
    if (!card) return;
    const trainerName = card.dataset.trainer;
    const idx = Number(card.dataset.index);
    if (!Number.isNaN(idx)) currentTrainerIndex = idx;
    if (trainerName) showPokemon(trainerName, currentRegion);
  });
  trainersList.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.trainer');
    if (!card) return;
    e.preventDefault();
    const trainerName = card.dataset.trainer;
    const idx = Number(card.dataset.index);
    if (!Number.isNaN(idx)) currentTrainerIndex = idx;
    if (trainerName) showPokemon(trainerName, currentRegion);
  });
}

// ===== Pager entrenadores (botones) =====
function updateTrainerPagerButtons(){
  if (!prevTrainerBtn || !nextTrainerBtn) return;
  const total = currentTrainerNames.length;
  prevTrainerBtn.disabled = currentTrainerIndex <= 0;
  nextTrainerBtn.disabled = currentTrainerIndex >= total - 1;
}

if (prevTrainerBtn && nextTrainerBtn) {
  prevTrainerBtn.addEventListener('click', () => {
    if (currentTrainerIndex > 0) {
      currentTrainerIndex--;
      const name = currentTrainerNames[currentTrainerIndex];
      showPokemon(name, currentRegion);
    }
  });
  nextTrainerBtn.addEventListener('click', () => {
    if (currentTrainerIndex < currentTrainerNames.length - 1) {
      currentTrainerIndex++;
      const name = currentTrainerNames[currentTrainerIndex];
      showPokemon(name, currentRegion);
    }
  });
}

// ===== Pager regiones (botones en Elite) =====
if (prevRegionBtn) {
  prevRegionBtn.addEventListener('click', () => {
    if (currentRegionIndex > 0) {
      const target = REGIONS[currentRegionIndex - 1];
      showElite(target);
    }
  });
}
if (nextRegionBtn) {
  nextRegionBtn.addEventListener('click', () => {
    if (currentRegionIndex < REGIONS.length - 1) {
      const target = REGIONS[currentRegionIndex + 1];
      showElite(target);
    }
  });
}

// ===== Teclas ← / → =====
document.addEventListener('keydown', (e) => {
  // no interferir si algún día agregas inputs/textarea
  const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || e.metaKey || e.ctrlKey || e.altKey) return;

  // Vista Pokémon: ←/→ cambia de entrenador
  if (pokemonView && pokemonView.classList.contains('active')) {
    if (e.key === 'ArrowLeft' && currentTrainerIndex > 0) {
      currentTrainerIndex--;
      const name = currentTrainerNames[currentTrainerIndex];
      showPokemon(name, currentRegion);
      e.preventDefault();
      return;
    } else if (e.key === 'ArrowRight' && currentTrainerIndex < currentTrainerNames.length - 1) {
      currentTrainerIndex++;
      const name = currentTrainerNames[currentTrainerIndex];
      showPokemon(name, currentRegion);
      e.preventDefault();
      return;
    }
  }

  // Vista Elite: ←/→ cambia de región
  if (eliteView && eliteView.classList.contains('active')) {
    if (e.key === 'ArrowLeft' && currentRegionIndex > 0) {
      showElite(REGIONS[currentRegionIndex - 1]);
      e.preventDefault();
      return;
    } else if (e.key === 'ArrowRight' && currentRegionIndex < REGIONS.length - 1) {
      showElite(REGIONS[currentRegionIndex + 1]);
      e.preventDefault();
      return;
    }
  }

  // Vista Regiones: ←/→ salta región y entra a Elite
  if (regionsView && regionsView.classList.contains('active')) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      if (currentRegionIndex < 0) currentRegionIndex = 0;
      if (e.key === 'ArrowLeft') {
        currentRegionIndex = Math.max(0, currentRegionIndex - 1);
      } else {
        currentRegionIndex = Math.min(REGIONS.length - 1, currentRegionIndex + 1);
      }
      showElite(REGIONS[currentRegionIndex]);
      e.preventDefault();
      return;
    }
  }
});
