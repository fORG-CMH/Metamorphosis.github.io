// ===== Tema dark/light (persistente) =====
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
    btn.textContent = saved === 'dark' ? '🌙' : '☀️';
  }
  btn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    btn.textContent = next === 'dark' ? '🌙' : '☀️';
  });
})();

// ===== Util =====
function displayTrainerName(key){
  return typeof key === 'string' ? key.replace(/_(\d+)$/, '') : key;
}

function buildBadge(trainerKey, pokemonName){
  const t = TRAINER_BADGES[trainerKey];
  if(!t) return null;
  const cfg = t[pokemonName];
  if(!cfg) return null;
  const el = document.createElement("div");
  el.className = "poke-badge";
  el.textContent = cfg.text;
  el.style.backgroundColor = BADGE_COLORS[cfg.color] ?? BADGE_COLORS.azul;
  return el;
}

// ===== Referencias a vistas / nodos =====
const regionsView     = document.getElementById('regionsView');
const eliteView       = document.getElementById('eliteView');
const trainersList    = document.getElementById('trainersList');
const eliteTitle      = document.getElementById('eliteTitle');
const backBtn         = document.getElementById('backBtn');

const pokemonView     = document.getElementById('pokemonView');
const pokemonTitle    = document.getElementById('pokemonTitle');
const pokemonList     = document.getElementById('pokemonList');
const backToEliteBtn  = document.getElementById('backToEliteBtn');
const crumbPath       = document.getElementById('crumbPath');

const prevTrainerBtn  = document.getElementById('prevTrainerBtn');
const nextTrainerBtn  = document.getElementById('nextTrainerBtn');

const prevRegionBtn   = document.getElementById('prevRegionBtn');
const nextRegionBtn   = document.getElementById('nextRegionBtn');

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
  Kanto:  ['Lorelei', 'Bruno_1', 'Agatha', 'Lance_1', 'Blue'],
  Johto:  ['Will', 'Koga', 'Bruno_2', 'Karen', 'Lance_2'],
  Hoenn:  ['Sidney', 'Phoebe', 'Glacia', 'Drake', 'Wallace'],
  Sinnoh: ['Aaron', 'Bertha', 'Flint', 'Lucian', 'Cynthia'],
  Unova:  ['Shauntal', 'Grimsley', 'Caitlin', 'Marshal', 'Alder']
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
  pokemonView?.classList.remove('active');
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
    const keyName = names[idx] || `entrenador${id}`;
    const displayName = displayTrainerName(keyName);

    const card = document.createElement('div');
    card.className = 'trainer';
    card.dataset.trainer = keyName;
    card.dataset.region = region;
    card.dataset.index = String(idx);

    const portrait = document.createElement('div');
    portrait.className = 'portrait';

    const img = document.createElement('img');
    img.src = `src/Entrenadores/${encodeURIComponent(keyName)}.png`;
    img.alt = displayName;

    const info = document.createElement('div');
    info.className = 'info';

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = displayName;

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
  pokemonView?.classList.remove('active');
  eliteView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPokemon(trainerKeyName, region){
  if (!pokemonView) return;

  const displayName = displayTrainerName(trainerKeyName);
  pokemonTitle.textContent = `Team ${displayName}`;
  if (crumbPath) crumbPath.textContent = `${region} › ${displayName}`;

  if (currentTrainerIndex < 0) {
    currentTrainerIndex = currentTrainerNames.indexOf(trainerKeyName);
  }
  updateTrainerPagerButtons();

  const mons = TRAINER_POKEMON[trainerKeyName] || [];
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
    img.src = `src/Pokemones/${encodeURIComponent(monName)}.gif`;
    img.alt = monName;
    portrait.appendChild(img);

    monCard.appendChild(nameBar);
    monCard.appendChild(portrait);

    const __badge = buildBadge(trainerKeyName, monName);
    if(__badge) monCard.appendChild(__badge);

    pokemonList.appendChild(monCard);
  });

  eliteView.classList.remove('active');
  regionsView.classList.remove('active');
  pokemonView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Listeners =====
selectRegionBtn?.addEventListener('click', showRegions);

document.querySelectorAll('.view-elite').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const region = a.dataset.region || 'Region';
    showElite(region);
  });
});

backBtn?.addEventListener('click', showRegions);

backToEliteBtn?.addEventListener('click', () => {
  pokemonView.classList.remove('active');
  eliteView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

if (trainersList) {
  trainersList.addEventListener('click', (e) => {
    const card = e.target.closest('.trainer');
    if (!card) return;
    const trainerKeyName = card.dataset.trainer;
    const idx = Number(card.dataset.index);
    if (!Number.isNaN(idx)) currentTrainerIndex = idx;
    if (trainerKeyName) showPokemon(trainerKeyName, currentRegion);
  });
  trainersList.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.trainer');
    if (!card) return;
    e.preventDefault();
    const trainerKeyName = card.dataset.trainer;
    const idx = Number(card.dataset.index);
    if (!Number.isNaN(idx)) currentTrainerIndex = idx;
    if (trainerKeyName) showPokemon(trainerKeyName, currentRegion);
  });
}

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
      const keyName = currentTrainerNames[currentTrainerIndex];
      showPokemon(keyName, currentRegion);
    }
  });
  nextTrainerBtn.addEventListener('click', () => {
    if (currentTrainerIndex < currentTrainerNames.length - 1) {
      currentTrainerIndex++;
      const keyName = currentTrainerNames[currentTrainerIndex];
      showPokemon(keyName, currentRegion);
    }
  });
}

prevRegionBtn?.addEventListener('click', () => {
  if (currentRegionIndex > 0) {
    const target = REGIONS[currentRegionIndex - 1];
    showElite(target);
  }
});
nextRegionBtn?.addEventListener('click', () => {
  if (currentRegionIndex < REGIONS.length - 1) {
    const target = REGIONS[currentRegionIndex + 1];
    showElite(target);
  }
});

document.addEventListener('keydown', (e) => {
  const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || e.metaKey || e.ctrlKey || e.altKey) return;

  if (pokemonView && pokemonView.classList.contains('active')) {
    if (e.key === 'ArrowLeft' && currentTrainerIndex > 0) {
      currentTrainerIndex--;
      const keyName = currentTrainerNames[currentTrainerIndex];
      showPokemon(keyName, currentRegion);
      e.preventDefault();
      return;
    } else if (e.key === 'ArrowRight' && currentTrainerIndex < currentTrainerNames.length - 1) {
      currentTrainerIndex++;
      const keyName = currentTrainerNames[currentTrainerIndex];
      showPokemon(keyName, currentRegion);
      e.preventDefault();
      return;
    }
  }

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
