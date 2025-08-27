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

// ===== Referencias a vistas / nodos =====
const regionsView     = document.getElementById('regionsView');
const eliteView       = document.getElementById('eliteView');
const trainersList    = document.getElementById('trainersList');
const eliteTitle      = document.getElementById('eliteTitle');
const backBtn         = document.getElementById('backBtn');

// Vista Pokémon del entrenador
const pokemonView     = document.getElementById('pokemonView');
const pokemonTitle    = document.getElementById('pokemonTitle');
const pokemonList     = document.getElementById('pokemonList');
const backToEliteBtn  = document.getElementById('backToEliteBtn');
const crumbPath       = document.getElementById('crumbPath');

// Pager entrenadores
const prevTrainerBtn  = document.getElementById('prevTrainerBtn');
const nextTrainerBtn  = document.getElementById('nextTrainerBtn');

// Pager regiones (en Elite)
const prevRegionBtn   = document.getElementById('prevRegionBtn');
const nextRegionBtn   = document.getElementById('nextRegionBtn');

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

// Rellena tú los equipos aquí (Pokemones/<Nombre>.png)
const TRAINER_POKEMON = {
  'Lorelei': [
    'Krookodile','Feraligatr','Banette','Lapras','Glalie','Scolipede',
    'Golduck','Arbok','Chandelure','Reuniclus','Liepard','Snorlax',
    'Raichu','Metagross','Claydol','Scizor','Jolteon','Tentacruel'
  ],
  'Bruno': [
    'Sawk','Weezing','Quagsire','Lanturn','Umbreon','Altaria',
    'Tyranitar','Drifblim','Gallade','Haxorus','Magnezone','Abomasnow',
    'Golduck','Beautifly','Machamp','Exeggutor','Arcanine','Liepard'
  ],
  'Agatha': [
    'Musharna','Samurott','Lanturn','Crobat','Torterra','Charizard',
    'Heracross','Froslass','Starmie','Banette','Sharpedo','Kingler',
    'Luxray','Seviper','Mantine','Weavile','Snorlax','Scolipede'
  ],
  'Lance': [
    'Dragonite','Salamence','Garchomp','Haxorus','Kingdra','Rayquaza',
    'Altaria','Girafig','Gyarados','Umbreon','Scrafty','Weavile',
    'Glisscor','Honchkrow','Electrivire','Metagross','Vaporeon','Arcanine'
  ],
  'Blue': [
    'Scyther','Sandslash','Absol','Druddigon','Claydol','Glaceon',
    'Manectric','Camerupt','Gallade','Slowbro','Gengar','Banette',
    'Umbreon','Starmie','Skuntank','Torterra','Tentacruel','Purugly'
  ],
  'Will': [
    'Mismagius','Hypno','Gothitelle','Musharna','Espeon','Reuniclus',
    'Gardevoir','Banette','Slowking','Drifblim','Umbreon','Crobat',
    'Jolteon','Licklicky','Arbok','Gyarados','Aggron','Machamp'
  ],
  'Koga': [
    'Crobat','Ariados','Muk','Venomoth','Weezing','Skuntank',
    'Drapion','Toxicroak','Scolipede','Tentacruel','Drifblim','Parasect',
    'Liepard','Scrafty','Sharpedo','Houndoom','Cacturne','Dustox'
  ],
  'Karen': [
    'Umbreon','Houndoom','Absol','Weavile','Honchkrow','Spiritomb',
    'Toxicroak','Skuntank','Crobat','Luxray','Nidoking','Nidoqueen',
    'Banette','Gengar','Mismagius','Drifblim','Liepard','Sableyee'
  ],
  'Sidney': [
    'Houndoom','Umbreon','Cacturne','Drapion','Skuntank','Weavile',
    'Absol','Sharpedo','Luxray','Spiritomb','Sandslash','Crobat',
    'Torterra','Nidoking','Machamp','Glisscor','Breloom','Honchkrow'
  ],
  'Phoebe': [
    'Banette','Dusknor','Mismagius','Drifblim','Gengar','Spiritomb',
    'Froslass','Mismagius','Sableyee','Gothitelle','Musharna','Cacturne',
    'Arbok','Weavile','Drapion','Skuntank','Scrafty','Umbreon'
  ],
  'Glacia': [
    'Froslass','Glalie','Abomasnow','Beartic','Walrein','Articuno',
    'Vanilluxe','Lapras','Jynx','Vaporeon','Glisscor','Sandslash',
    'Crobat','Dragonite','Salamence','Frost Rotom','Glaceon','Kingdra'
  ],
  'Drake': [
    'Salamence','Dragonite','Haxorus','Garchomp','Kingdra','Altaria',
    'Druddigon','Rayquaza','Flygon','Gyarados','Aerodactyl','Hydreigon',
    'Girafig','Machamp','Arcanine','Lucario','Electrivire','Torterra'
  ],
  'Wallace': [
    'Milotic','Gyarados','Swampert','Ludicolo','Whishcash','Kingdra',
    'Empoleon','Lapras','Politoed','Tentacruel','Starmie','Seismitoad',
    'Seaking','Cloyster','Omastar','Kabutops','Huntail','Vaporeon'
  ],
  'Aaron': [
    'Beautifly','Yanmega','Dustox','Vespiquen','Scizor','Heracross',
    'Drapion','Skuntank','Cacturne','Parasect','Scyther','Accelgor',
    'Crustle','Scolipede','Galvantula','Forretres','Volcarona','Beartic'
  ],
  'Bertha': [
    'Hippowdon','Golem','Donphan','Rhyperior','Seismitoad','Sandslash',
    'Swampert','Quagsire','Gastrodon','Steelix','Camerupt','Gliscor',
    'Torterra','Roserade','Kingdra','Kabutops','Omastar','Crustle'
  ],
  'Flint': [
    'Houndoom','Magmortar','Rapidash','Charizard','Infernape','Flareon',
    'Camerupt','Arcanine','Torkoal','Emboar','Volcarona','Heat Rotom',
    'Blaziken','Ninetales','Luxray','Manectric','Scizor','Electrivire'
  ],
  'Lucian': [
    'Alakazam','Gothitelle','Musharna','Reuniclus','Gardevoir','Metagross',
    'Gallade','Jynx','Girafig','Hypno','Slowking','Slowbro',
    'Bronzong','Espeon','Mismagius','Banette','Dusknor','Claydol'
  ],
  'Cynthia': [
    'Garchomp','Togekiss','Spiritomb','Lucario','Milotic','Roserade',
    'Glaceon','Gastrodon','Staraptor','Giratina','Girafig','Umbreon',
    'Snorlax','Gengar','Heracross','Metagross','Luxray','Lopunny'
  ],
  'Shauntal': [
    'Chandelure','Banette','Dusknor','Drifblim','Mismagius','Cofagrigus',
    'Spiritomb','Gengar','Froslass','Sableyee','Golurk','Honchkrow',
    'Skuntank','Amoongus','Cacturne','Drapion','Musharna','Sigilyph'
  ],
  'Grimsley': [
    'Weavile','Honchkrow','Scrafty','Drapion','Skuntank','Cacturne',
    'Umbreon','Absol','Tyranitar','Houndoom','Krookodile','Sharpedo',
    'Sandslash','Nidoking','Electrivire','Manectric','Luxray','Spiritomb'
  ],
  'Caitlin': [
    'Reuniclus','Musharna','Gothitelle','Metagross','Espeon','Alakazam',
    'Gardevoir','Jynx','Slowbro','Slowking','Girafig','Chandelure',
    'Sigilyph','Claydol','Froslass','Mismagius','Banette','Lopunny'
  ],
  'Marshal': [
    'Machamp','Conkeldurr','Sawk','Throh','Breloom','Medicham',
    'Hariyama','Hitmonlee','Hitmonchan','Hitmontop','Gallade','Scrafty',
    'Lucario','Toxicroak','Heracross','Crobat','Krookodile','Bouffalant'
  ],
  'Alder': [
    'Volcarona','Bouffalant','Escavalier','Accelgor','Druddigon','Vanilluxe',
    'Conkeldurr','Gigalith','Haxorus','Braviary','Seismitoad','Arcanine',
    'Gyarados','Snorlax','Roserade','Glisscor','Kingdra','Torterra'
  ]
};

// ======= BADGES DE POKÉMON (texto + color) =======
// Colores permitidos: verde, amarillo, rojo, gris, marron, morado, azul, celeste, rosado
const BADGE_COLORS = {
  verde:   "#000000",
  amarillo:"#000000",
  rojo:    "#000000",
  gris:    "#000000",
  marron:  "#000000",
  morado:  "#000000",
  azul:    "#000000",
  celeste: "#000000",
  rosado:  "#000000",
};

// Configura aquí el texto y color por Pokémon (ejemplos)
const POKEMON_BADGES = {
  "Abomasnow": { text: "Leyenda", color: "amarillo" },
  "Absol": { text: "Leyenda", color: "marron" },
  "Accelgor": { text: "Leyenda", color: "marron" },
  "Aerodactyl": { text: "Leyenda", color: "rojo" },
  "Aggron": { text: "Leyenda", color: "azul" },
  "Alakazam": { text: "Leyenda", color: "celeste" },
  "Altaria": { text: "Leyenda", color: "rosado" },
  "Amoongus": { text: "Leyenda", color: "marron" },
  "Arbok": { text: "Leyenda", color: "marron" },
  "Arcanine": { text: "Leyenda", color: "gris" },
  "Ariados": { text: "Leyenda", color: "morado" },
  "Articuno": { text: "Leyenda", color: "celeste" },
  "Banette": { text: "Leyenda", color: "marron" },
  "Beartic": { text: "Leyenda", color: "verde" },
  "Beautifly": { text: "Leyenda", color: "gris" },
  "Beedrill": { text: "Leyenda", color: "amarillo" }, // (si no está en tus sprites, ignóralo)
  "Bouffalant": { text: "Leyenda", color: "celeste" },
  "Braviary": { text: "Leyenda", color: "morado" },
  "Breloom": { text: "Leyenda", color: "amarillo" },
  "Bronzong": { text: "Leyenda", color: "rosado" },
  "Cacturne": { text: "Leyenda", color: "marron" },
  "Camerupt": { text: "Leyenda", color: "marron" },
  "Charizard": { text: "Leyenda", color: "celeste" },
  "Chandelure": { text: "Leyenda", color: "rosado" },
  "Claydol": { text: "Leyenda", color: "verde" },
  "Cloyster": { text: "Leyenda", color: "rojo" },
  "Cofagrigus": { text: "Leyenda", color: "azul" },
  "Conkeldurr": { text: "Leyenda", color: "celeste" },
  "Crobat": { text: "Leyenda", color: "celeste" },
  "Crustle": { text: "Leyenda", color: "morado" },
  "Drapion": { text: "Leyenda", color: "rojo" },
  "Drifblim": { text: "Leyenda", color: "celeste" },
  "Druddigon": { text: "Leyenda", color: "verde" },
  "Dustox": { text: "Leyenda", color: "marron" },
  "Dusknor": { text: "Leyenda", color: "morado" },
  "Electrivire": { text: "Leyenda", color: "marron" },
  "Emboar": { text: "Leyenda", color: "azul" },
  "Empoleon": { text: "Leyenda", color: "rojo" },
  "Escavalier": { text: "Leyenda", color: "gris" },
  "Espeon": { text: "Leyenda", color: "celeste" },
  "Exeggutor": { text: "Leyenda", color: "azul" },
  "Feraligatr": { text: "Leyenda", color: "gris" },
  "Flareon": { text: "Leyenda", color: "azul" },
  "Flygon": { text: "Leyenda", color: "rojo" },
  "Forretres": { text: "Leyenda", color: "amarillo" },
  "Froslass": { text: "Leyenda", color: "gris" },
  "Frost Rotom": { text: "Leyenda", color: "rosado" },
  "Gallade": { text: "Leyenda", color: "celeste" },
  "Galvantula": { text: "Leyenda", color: "azul" },
  "Garchomp": { text: "Leyenda", color: "celeste" },
  "Gardevoir": { text: "Leyenda", color: "amarillo" },
  "Gastrodon": { text: "Leyenda", color: "celeste" },
  "Gengar": { text: "Leyenda", color: "amarillo" },
  "Gigalith": { text: "Leyenda", color: "rojo" },
  "Girafig": { text: "Leyenda", color: "marron" },
  "Giratina": { text: "Leyenda", color: "marron" },
  "Glaceon": { text: "Leyenda", color: "rojo" },
  "Glalie": { text: "Leyenda", color: "marron" },
  "Gliscor": { text: "Leyenda", color: "gris" },
  "Glisscor": { text: "Leyenda", color: "marron" },
  "Golduck": { text: "Leyenda", color: "marron" },
  "Golurk": { text: "Leyenda", color: "marron" },
  "Gothitelle": { text: "Leyenda", color: "gris" },
  "Groudon": { text: "Leyenda", color: "celeste" }, // (si no está en sprites, ignóralo)
  "Gyarados": { text: "Leyenda", color: "marron" },
  "Haxorus": { text: "Leyenda", color: "azul" },
  "Heat Rotom": { text: "Leyenda", color: "rojo" },
  "Heracross": { text: "Leyenda", color: "marron" },
  "Hitmonchan": { text: "Leyenda", color: "morado" },
  "Hitmonlee": { text: "Leyenda", color: "verde" },
  "Hitmontop": { text: "Leyenda", color: "azul" },
  "Hippowdon": { text: "Leyenda", color: "rojo" },
  "Honchkrow": { text: "Leyenda", color: "celeste" },
  "Houndoom": { text: "Leyenda", color: "celeste" },
  "Huntail": { text: "Leyenda", color: "verde" },
  "Hydreigon": { text: "Leyenda", color: "rosado" },
  "Hypno": { text: "Leyenda", color: "marron" },
  "Infernape": { text: "Leyenda", color: "rosado" },
  "Jolteon": { text: "Leyenda", color: "amarillo" },
  "Jynx": { text: "Leyenda", color: "rojo" },
  "Kabutops": { text: "Leyenda", color: "azul" },
  "Karen": { text: "Leyenda", color: "morado" }, // (si aparece, lo puedes quitar)
  "Kingdra": { text: "Leyenda", color: "marron" },
  "Kingler": { text: "Leyenda", color: "morado" },
  "Krookodile": { text: "Leyenda", color: "azul" },
  "Lanturn": { text: "Leyenda", color: "gris" },
  "Lapras": { text: "Leyenda", color: "morado" },
  "Liepard": { text: "Leyenda", color: "celeste" },
  "Licklicky": { text: "Leyenda", color: "amarillo" },
  "Lopunny": { text: "Leyenda", color: "verde" },
  "Lucario": { text: "Leyenda", color: "rosado" },
  "Ludicolo": { text: "Leyenda", color: "rojo" },
  "Luxray": { text: "Leyenda", color: "celeste" },
  "Machamp": { text: "Leyenda", color: "celeste" },
  "Magmortar": { text: "Leyenda", color: "celeste" },
  "Manectric": { text: "Leyenda", color: "marron" },
  "Mantine": { text: "Leyenda", color: "rojo" },
  "Magnezone": { text: "Leyenda", color: "azul" },
  "Medicham": { text: "Leyenda", color: "morado" },
  "Metagross": { text: "Leyenda", color: "gris" },
  "Milotic": { text: "Leyenda", color: "verde" },
  "Mismagius": { text: "Leyenda", color: "verde" },
  "Muk": { text: "Leyenda", color: "celeste" },
  "Musharna": { text: "Leyenda", color: "rojo" },
  "Nidoking": { text: "Leyenda", color: "amarillo" },
  "Nidoqueen": { text: "Leyenda", color: "rojo" },
  "Ninetales": { text: "Leyenda", color: "marron" },
  "Omastar": { text: "Leyenda", color: "rojo" },
  "Parasect": { text: "Leyenda", color: "rojo" },
  "Politoed": { text: "Leyenda", color: "marron" },
  "Purugly": { text: "Leyenda", color: "amarillo" },
  "Quagsire": { text: "Leyenda", color: "azul" },
  "Raichu": { text: "Leyenda", color: "rosado" },
  "Rapidash": { text: "Leyenda", color: "marron" },
  "Rayquaza": { text: "Leyenda", color: "marron" },
  "Reuniclus": { text: "Leyenda", color: "rojo" },
  "Rhyperior": { text: "Leyenda", color: "amarillo" },
  "Roserade": { text: "Leyenda", color: "verde" },
  "Sableyee": { text: "Leyenda", color: "rojo" },
  "Salamence": { text: "Leyenda", color: "celeste" },
  "Samurott": { text: "Leyenda", color: "rosado" },
  "Sandslash": { text: "Leyenda", color: "celeste" },
  "Sawk": { text: "Leyenda", color: "azul" },
  "Scizor": { text: "Leyenda", color: "azul" },
  "Scrafty": { text: "Leyenda", color: "amarillo" },
  "Scyther": { text: "Leyenda", color: "gris" },
  "Seaking": { text: "Leyenda", color: "rosado" },
  "Seismitoad": { text: "Leyenda", color: "rojo" },
  "Seviper": { text: "Leyenda", color: "celeste" },
  "Sharpedo": { text: "Leyenda", color: "morado" },
  "Sigilyph": { text: "Leyenda", color: "rosado" },
  "Skuntank": { text: "Leyenda", color: "verde" },
  "Slowbro": { text: "Leyenda", color: "marron" },
  "Slowking": { text: "Leyenda", color: "amarillo" },
  "Snorlax": { text: "Leyenda", color: "marron" },
  "Spiritomb": { text: "Leyenda", color: "gris" },
  "Starmie": { text: "Leyenda", color: "marron" },
  "Swampert": { text: "Leyenda", color: "rojo" },
  "Tentacruel": { text: "Leyenda", color: "celeste" },
  "Throh": { text: "Leyenda", color: "azul" },
  "Togekiss": { text: "Leyenda", color: "morado" },
  "Torkoal": { text: "Leyenda", color: "rosado" },
  "Torterra": { text: "Leyenda", color: "verde" },
  "Toxicroak": { text: "Leyenda", color: "rojo" },
  "Tyranitar": { text: "Leyenda", color: "amarillo" },
  "Umbreon": { text: "Leyenda", color: "azul" },
  "Vanilluxe": { text: "Leyenda", color: "marron" },
  "Vaporeon": { text: "Leyenda", color: "rosado" },
  "Vespiquen": { text: "Leyenda", color: "celeste" },
  "Volcarona": { text: "Leyenda", color: "morado" },
  "Walrein": { text: "Leyenda", color: "celeste" },
  "Weavile": { text: "Leyenda", color: "celeste" },
  "Weezing": { text: "Leyenda", color: "azul" },
  "Whishcash": { text: "Leyenda", color: "celeste" },
  "Yanmega": { text: "Leyenda", color: "gris" }
};


function buildBadge(pokemonName){
  const cfg = POKEMON_BADGES[pokemonName];
  if(!cfg) return null;
  const el = document.createElement("div");
  el.className = "poke-badge";
  el.textContent = cfg.text;
  el.style.backgroundColor = BADGE_COLORS[cfg.color] ?? BADGE_COLORS.azul;
  return el;
}

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
    const nameText = names[idx] || `entrenador${id}`;

    const card = document.createElement('div');
    card.className = 'trainer';
    card.dataset.trainer = nameText;
    card.dataset.region = region;
    card.dataset.index = String(idx);

    const portrait = document.createElement('div');
    portrait.className = 'portrait';

    const img = document.createElement('img');
    img.src = `src/Entrenadores/${encodeURIComponent(nameText)}.png`;
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
  pokemonView?.classList.remove('active');
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
    img.src = `src/Pokemones/${encodeURIComponent(monName)}.gif`;
    img.alt = monName;

    portrait.appendChild(img);

    monCard.appendChild(nameBar);   // nombre arriba
    monCard.appendChild(portrait);  // imagen debajo
    const __badge = buildBadge(monName);
    if(__badge) monCard.appendChild(__badge);
    pokemonList.appendChild(monCard);
  });

  eliteView.classList.remove('active');
  regionsView.classList.remove('active');
  pokemonView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Listeners base =====

// Botón "Select Region" (header)
selectRegionBtn?.addEventListener('click', showRegions);

// Click en "View Elite Four" de cada región
document.querySelectorAll('.view-elite').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const region = a.dataset.region || 'Region';
    showElite(region);
  });
});

// Back a regiones
backBtn?.addEventListener('click', showRegions);

// Back a Elite desde Pokémon
backToEliteBtn?.addEventListener('click', () => {
  pokemonView.classList.remove('active');
  eliteView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

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
