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

// Pager (anterior / siguiente) entrenadores
const prevTrainerBtn = document.getElementById('prevTrainerBtn');
const nextTrainerBtn = document.getElementById('nextTrainerBtn');

// Botones para cambiar de región
const prevRegionBtn = document.getElementById('prevRegionBtn');
const nextRegionBtn = document.getElementById('nextRegionBtn');

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

// Rellena tú los equipos aquí (POKEMONES/<Nombre>.png)
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

// ===== Estado de navegación actual =====
let currentRegion = null;
let currentRegionIndex = -1;
let currentTrainerNames = [];
let currentTrainerIndex = -1;

// ===== Funciones de navegación =====
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
  currentRegion = region;
  currentRegionIndex = REGIONS.indexOf(region);

  eliteTitle.textContent = region;
  const ids   = REGION_IMAGES[region] || [];
  const names = REGION_NAMES[region]  || [];

  currentTrainerNames = names.slice();
  currentTrainerIndex = -1;

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

  pokemonTitle.textContent = `Team ${trainerName}`;
  if (crumbPath) crumbPath.textContent = `${region} › ${trainerName}`;

  if (currentTrainerIndex < 0) {
    currentTrainerIndex = currentTrainerNames.indexOf(trainerName);
  }
  updateTrainerPagerButtons();

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

    monCard.appendChild(nameBar);
    monCard.appendChild(portrait);
    pokemonList.appendChild(monCard);
  });

  eliteView.classList.remove('active');
  regionsView.classList.remove('active');
  pokemonView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Eventos =====
document.getElementById('selectRegionBtn').addEventListener('click', showRegions);

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

// Teclas ← → en vista de Pokémon para cambiar de entrenador
document.addEventListener('keydown', (e) => {
  if (pokemonView && pokemonView.classList.contains('active')) {
    if (e.key === 'ArrowLeft' && currentTrainerIndex > 0) {
      currentTrainerIndex--;
      const name = currentTrainerNames[currentTrainerIndex];
      showPokemon(name, currentRegion);
    } else if (e.key === 'ArrowRight' && currentTrainerIndex < currentTrainerNames.length - 1) {
      currentTrainerIndex++;
      const name = currentTrainerNames[currentTrainerIndex];
      showPokemon(name, currentRegion);
    }
  } else if (regionsView && regionsView.classList.contains('active')) {
    if (e.key === 'ArrowLeft') {
      // ir a región anterior
      if (currentRegionIndex > 0) {
        currentRegionIndex--;
        showElite(REGIONS[currentRegionIndex]);
      }
    } else if (e.key === 'ArrowRight') {
      // ir a región siguiente
      if (currentRegionIndex < REGIONS.length - 1) {
        currentRegionIndex++;
        showElite(REGIONS[currentRegionIndex]);
      }
    }
  }
});
