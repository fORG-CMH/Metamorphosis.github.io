// ===== Tema dark/light (persistente) =====
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
    if (btn) btn.textContent = saved === 'dark' ? '🌙' : '☀️';
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

// ===== Vista Guía =====
const guideView         = document.getElementById('guideView');
const backToPokemonBtn  = document.getElementById('backToPokemonBtn');
const guideCrumb        = document.getElementById('guideCrumb');
const guideTitleEl      = document.getElementById('guideTitle');
const guideLeftTitleEl  = document.getElementById('guideLeftTitle');
const guideMetaEl       = document.getElementById('guideMeta');
const guideStepsEl      = document.getElementById('guideSteps');
const checkAllBtn       = document.getElementById('checkAllTeamsBtn');
const guideCard         = document.querySelector('.guide-card');

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

// ===== Helper vista =====
function showView(view){
  [regionsView, eliteView, pokemonView, guideView].forEach(v => v?.classList.remove('active'));
  view?.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Navegación entre vistas =====
function showRegions(){
  currentRegion = null;
  currentRegionIndex = -1;
  currentTrainerNames = [];
  currentTrainerIndex = -1;
  showView(regionsView);
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

  showView(eliteView);
}

function showPokemon(trainerKeyName, region){
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
    monCard.dataset.trainer = trainerKeyName;
    monCard.dataset.pokemon = monName;

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

    monCard.style.cursor = 'pointer';
    monCard.setAttribute('role', 'button');
    monCard.setAttribute('tabindex', '0');
    monCard.addEventListener('click', () => openGuide(trainerKeyName, monName));

    pokemonList.appendChild(monCard);
  });

  showView(pokemonView);
}

// ====== Abrir guía (reemplaza la vista) ======
function openGuide(trainerKey, pokemonName){
  const data = (typeof TRAINER_GUIDES !== 'undefined' && TRAINER_GUIDES?.[trainerKey]?.[pokemonName]) || null;
  const dispTrainer = displayTrainerName(trainerKey);

  guideCrumb.textContent   = `${currentRegion ?? '—'} › ${dispTrainer} › ${pokemonName}`;
  guideTitleEl.textContent = data?.title || pokemonName;
  guideLeftTitleEl.textContent = data?.title || pokemonName;
  guideMetaEl.textContent  = data?.meta  || `${dispTrainer} · ${pokemonName}`;

  // imagen del pokémon arriba del botón
  if (guideCard) {
    guideCard.querySelectorAll('.guide-pokemon-img').forEach(el => el.remove());
    const pokeImg = document.createElement('img');
    pokeImg.src = `src/Pokemones/${encodeURIComponent(pokemonName)}.gif`;
    pokeImg.alt = pokemonName;
    pokeImg.className = "guide-pokemon-img";
    guideCard.insertBefore(pokeImg, checkAllBtn);
  }

  if (data?.checkAllLabel){
    checkAllBtn.style.display = '';
    checkAllBtn.textContent = data.checkAllLabel;
    checkAllBtn.onclick = () => alert('All teams — (define acción)');
  } else {
    checkAllBtn.style.display = 'none';
    checkAllBtn.onclick = null;
  }

  // --- RENDER DE PASOS EN UNA SOLA LÍNEA ---
  guideStepsEl.innerHTML = '';
  const steps = Array.isArray(data?.steps) ? data.steps : [];

  if (!steps.length){
    const empty = document.createElement('div');
    empty.className = 'step';
    empty.innerHTML = '<div class="step-left"><div class="step-title">Sin guía disponible</div></div>';
    guideStepsEl.appendChild(empty);
  } else {
    steps.forEach(s => {
      const row = document.createElement('div');
      row.className = 'step';

      // izquierda
      const left = document.createElement('div');
      left.className = 'step-left';

      const title = document.createElement('div');
      title.className = 'step-title';

      // Formato nuevo recomendado
      if (s.leftMain || s.highlight || s.tags){
        const arrowHtml = s.arrowTo ? `<span class="arrow">→</span>` : ` <span class="arrow">--></span> `;
        title.innerHTML =
          `<strong>${s.leftMain || s.title || ''}</strong>` +
          (s.arrowTo || s.highlight ? ` ${arrowHtml} ` : ' ') +
          (s.highlight ? `<span class="highlight">${s.highlight}</span>` : '');

        if (Array.isArray(s.tags)) {
          s.tags.forEach(t => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = t;
            title.appendChild(tag);
          });
        }
      } else {
        // Fallback formato antiguo
        title.textContent = s.title || 'Step';
        if (Array.isArray(s.notes) && s.notes.length){
          const tag = document.createElement('span');
          tag.className = 'tag';
          tag.textContent = s.notes.join(' · ');
          title.appendChild(tag);
        }
      }

      left.appendChild(title);
      row.appendChild(left);

      // derecha (botón)
      const right = document.createElement('div');
      right.className = 'step-right';

      if (s.checkTeam){
        const btn = document.createElement('button');
        btn.className = 'btn tiny';
        btn.type = 'button';
        btn.textContent = s.checkTeam;

        if (Array.isArray(s.teamNums) && s.teamNums.length){
          s.teamNums.forEach(n => {
            const span = document.createElement('span');
            span.className = 'num';
            span.textContent = n;
            btn.appendChild(span);
          });
        }

        btn.addEventListener('click', () => alert('check team — (define acción)'));
        right.appendChild(btn);
      }

      row.appendChild(right);
      guideStepsEl.appendChild(row);
    });
  }

  showView(guideView);
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

backToEliteBtn?.addEventListener('click', () => showView(eliteView));
backToPokemonBtn?.addEventListener('click', () => showView(pokemonView));

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

  if (guideView && guideView.classList.contains('active')) {
    if (e.key === 'Escape') { showView(pokemonView); e.preventDefault(); return; }
  }

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
      if (e.key === 'ArrowLeft') currentRegionIndex = Math.max(0, currentRegionIndex - 1);
      else currentRegionIndex = Math.min(REGIONS.length - 1, currentRegionIndex + 1);
      showElite(REGIONS[currentRegionIndex]);
      e.preventDefault();
      return;
    }
  }
});
