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

// Nueva vista: Pokémon del entrenador
const pokemonView  = document.getElementById('pokemonView');
const pokemonTitle = document.getElementById('pokemonTitle');
const pokemonList  = document.getElementById('pokemonList');
const backToEliteBtn = document.getElementById('backToEliteBtn');
const crumbPath = document.getElementById('crumbPath');

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

if (backToEliteBtn) {
  backToEliteBtn.addEventListener('click', () => {
    // Volver desde Pokémon a la lista de entrenadores
    pokemonView.classList.remove('active');
    eliteView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Mapeo de imágenes por región (IDs 1..25) =====
const REGION_IMAGES = {
  Kanto:  [1, 2, 3, 4, 5],
  Johto:  [6, 7, 8, 9, 10],
  Hoenn:  [11, 12, 13, 14, 15],
  Sinnoh: [16, 17, 18, 19, 20],
  Unova:  [21, 22, 23, 24, 25]
};

// ===== Nombres de entrenadores por región =====
const REGION_NAMES = {
  Kanto:  ['Lorelei', 'Bruno', 'Agatha', 'Lance', 'Blue'],
  Johto:  ['Will', 'Koga', 'Bruno', 'Karen', 'Lance'],
  Hoenn:  ['Sidney', 'Phoebe', 'Glacia', 'Drake', 'Wallace'],
  Sinnoh: ['Aaron', 'Bertha', 'Flint', 'Lucian', 'Cynthia'],
  Unova:  ['Shauntal', 'Grimsley', 'Caitlin', 'Marshal', 'Alder']
};

/**
 * ===== PON TÚ LOS EQUIPOS AQUÍ =====
 * - Clave: nombre exacto del entrenador (como aparece en pantalla)
 * - Valor: array de nombres de Pokémon (como se llamará el PNG en /POKEMON)
 * - Ejemplo:
 *   TRAINER_POKEMON['Lorelei'] = ['Dewgong','Cloyster','Slowbro','Jynx','Lapras'];
 *   (esto cargará: POKEMON/Dewgong.png, ... )
 */
const TRAINER_POKEMON = {
  // Kanto
  'Lorelei': [],
  'Bruno':   [],
  'Agatha':  [],
  'Lance':   [],
  'Blue':    [],
  // Johto
  'Will':    [],
  'Koga':    [],
  'Karen':   [],
  // Bruno y Lance ya declarados arriba
  // Hoenn
  'Sidney':  [],
  'Phoebe':  [],
  'Glacia':  [],
  'Drake':   [],
  'Wallace': [],
  // Sinnoh
  'Aaron':   [],
  'Bertha':  [],
  'Flint':   [],
  'Lucian':  [],
  'Cynthia': [],
  // Unova
  'Shauntal':[],
  'Grimsley':[],
  'Caitlin': [],
  'Marshal': [],
  'Alder':   []
};

// ===== Navegación =====
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
    card.setAttribute('data-trainer', nameText);
    card.setAttribute('data-region', region);

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

    // 🔗 Click en el entrenador -> abrir sus Pokémon
    card.addEventListener('click', () => {
      showPokemon(nameText, region);
    });
  });

  regionsView.classList.remove('active');
  if (pokemonView) pokemonView.classList.remove('active');
  eliteView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPokemon(trainerName, region){
  if (!pokemonView) {
    alert('Falta agregar la sección #pokemonView en tu HTML.');
    return;
  }

  // Migas/crumbs y título
  pokemonTitle.textContent = trainerName;
  crumbPath.textContent = `${region} › ${trainerName}`;

  // Lista de Pokémon desde tu tabla
  const mons = TRAINER_POKEMON[trainerName] || [];

  pokemonList.innerHTML = '';

  if (!mons.length){
    // Mensaje de ayuda si aún no llenas
    const help = document.createElement('div');
    help.style.color = 'var(--muted)';
    help.style.textAlign = 'center';
    help.style.gridColumn = '1 / -1';
    help.style.padding = '10px 0 6px';
    help.innerHTML = `
      <strong>Sin equipo aún.</strong><br/>
      Edita <code>TRAINER_POKEMON['${trainerName}'] = ['Pikachu','Charizard',...]</code>
      y asegúrate de tener las imágenes en <code>POKEMON/&lt;Nombre&gt;.png</code>
    `;
    pokemonList.appendChild(help);
  }

  // Render de cards
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

  // Mostrar vista Pokémon
  eliteView.classList.remove('active');
  regionsView.classList.remove('active');
  pokemonView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
