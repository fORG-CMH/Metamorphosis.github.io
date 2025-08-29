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
  // Muestra sin sufijo _1 / _2, etc.
  return typeof key === 'string' ? key.replace(/_(\d+)$/, '') : key;
}

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
  Kanto:  ['Lorelei', 'Bruno_1', 'Agatha', 'Lance_1', 'Blue'],
  Johto:  ['Will', 'Koga', 'Bruno_2', 'Karen', 'Lance_2'],
  Hoenn:  ['Sidney', 'Phoebe', 'Glacia', 'Drake', 'Wallace'],
  Sinnoh: ['Aaron', 'Bertha', 'Flint', 'Lucian', 'Cynthia'],
  Unova:  ['Shauntal', 'Grimsley', 'Caitlin', 'Marshal', 'Alder']
};

// Rellena tú los equipos aquí (Pokemones/<Nombre>.png)
const TRAINER_POKEMON = {
  'Lorelei': [
    'Exeggutor','Magnezone','Golduck','Mantine','Nidoking','Lapras',
    'Togekiss','Jynx','Hariyama','Nidoqueen','Bronzong','Weavile',
    'Dragonite','Lucario','Articuno','Claydol','Slowbro','Raichu',
    'Vileplume','Chansey'
  ],
  'Bruno_1': [
    'Lucario','Slowbro','Muk','Ursaring','Steelix','Staraptor',
    'Machamp','Darmanitan','Torterra','Blastoise','Eelektross','Metagross',
    'Hitmonlee','Gliscor','Electivire','Aggron','Hitmonchan','Salamence',
    'Seismitoad','Infernape','Rhyperior','Heracross','Krookodile','Hitmontop'
  ],
  'Bruno_2': [
    'Lucario','Slowbro','Muk','Ursaring','Steelix','Staraptor',
    'Machamp','Darmanitan','Torterra','Blastoise','Eelektross','Metagross',
    'Hitmonlee','Gliscor','Electivire','Aggron','Hitmonchan','Salamence',
    'Seismitoad','Krookodile','Hitmontop','Poliwrath','Golem',
    'Luxray','Blaziken','Heracross','Kangaskhan'
  ],
  'Agatha': [
    'Golduck','Lucario','Muk','Seismitoad','Krookodile','Gyarados',
    'Rotom Horno','Shiftry','Gengar','Alakazam','Hydreigon','Arbok',
    'Rotom Lavadora','Umbreon','Marowak','Toxicroak','Mandibuzz','Houndoom',
    'Rotom Ventilador','Crobat'
  ],
  'Lance_1': [
    'Lapras','Dragonite','Lucario','Steelix','Eelektross','Metagross',
    'Electivire','Infernape','Gyarados','Hydreigon','Arbok','Charizard',
    'Scrafty','Feraligatr','Kingdra','Scizor','Tyranitar','Ampharos',
    'Arcanine','Aerodactyl','Garchomp','Haxorus'
  ],
  'Lance_2': [
    'Lapras','Dragonite','Lucario','Steelix','Eelektross','Metagross',
    'Electivire','Infernape','Gyarados','Hydreigon','Arbok','Charizard',
    'Scrafty','Feraligatr','Kingdra','Scizor','Tyranitar','Ampharos',
    'Arcanine','Aerodactyl','Garchomp','Haxorus','Flygon','Kangaskhan'
  ],
  'Blue': [
    'Exeggutor','Magnezone','Nidoking','Machamp','Blastoise','Electivire',
    'Rhyperior','Gyarados','Alakazam','Umbreon','Charizard','Kingdra',
    'Scizor','Tyranitar','Arcanine','Pidgeot','Espeon','Jolteon',
    'Sandslash','Venusaur','Skarmory','Leafeon','Flareon','Poliwrath',
    'Politoed','Vaporeon','Golem','Ninetales'
  ],
  'Will': [
    'Exeggutor','Magnezone','Golduck','Mantine','Jynx','Bronzong',
    'Lucario','Claydol','Slowbro','Chansey','Electivire','Umbreon',
    'Espeon','Jolteon','Flareon','Absol','Golurk','Empoleon',
    'Altaria','Gardevoir','Liepard','Typhlosion','Girafarig','Clefable',
    'Xatu','Hypno','Grumpig'
  ],
  'Koga': [
    'Nidoking','Lapras','Nidoqueen','Lucario','Muk','Gliscor',
    'Rhyperior','Gengar','Crobat','Scizor','Skarmory','Ninetales',
    'Tentacruel','Sharpedo','Lanturn','Starmie','Bisharp','Samurott',
    'Forretress','Skuntank','Ferrothorn','Tangrowth','Parasect','Magmortar',
    'Hypno','Ariados','Ditto','Venomoth','Stunfisk','Swalot',
    'Weezing','Electrode'
  ],
  'Karen': [
    'Weavile','Lucario','Slowbro','Vileplume','Blastoise','Salamence',
    'Rhyperior','Gyarados','Gengar','Hydreigon','Umbreon','Mismagius',
    'Houndoom','Feraligatr','Tyranitar','Garchomp','Leafeon','Flareon',
    'Flareon','Sableye','Absol','Luxray','Excadrill','Honchkrow','Gallade',
    'Quagsire','Electrode','Primeape','Victreebel'
  ],
  'Sidney': [
    'Magnezone','Hariyama','Darmanitan','Metagross','Electivire','Aggron',
    'Salamence','Gyarados','Shiftry','Toxicroak','Mandibuzz','Scrafty',
    'Scizor','Garchomp','Sableye','Absol','Tentacruel','Luxray',
    'Cacturne','Golurk','Mightyena','Spiritomb','Mienshao','Huntail',
    'Excadrill','Crawdaunt','Scolipede','Sharpedo'
  ],
  'Phoebe': [
    'Banette','Lucario','Raichu','Hydreigon','Rotom Lavadora','Umbreon',
    'Mismagius','Mandibuzz','Houndoom','Arcanine','Ninetales','Sableye',
    'Luxray','Mawile','Froslass','Dusknoir','Regice','Chandelure',
    'Meganium','Honchkrow'
  ],
  'Glacia': [
    'Togekiss','Hariyama','Nidoqueen','Metagross','Mismagius','Skarmory',
    'Mienshao','Froslass','Abomasnow','Walrein','Lanturn','Serperior',
    'Vanilluxe','Gallade','Altaria','Glalie','Blissey','Beartic'
  ],
  'Drake': [
    'Nidoking','Lapras','Lucario','Eelektross','Metagross','Aggron',
    'Salamence','Krookodile','Feraligatr','Kingdra','Ampharos','Haxorus',
    'Empoleon','Gallade','Altaria','Regirock','Torkoal','Seviper',
    'Floatzel','Sceptile','Flygon'
  ],
  'Wallace': [
    'Togekiss','Dragonite','Eelektross','Metagross','Gyarados','Tentacruel',
    'Mienshao','Empoleon','Walrein','Lanturn','Serperior','Altaria',
    'Swampert','Registeel','Milotic','Seaking','Roserade','Wailord',
    'Starmie','Ludicolo','Whiscash','Gardevoir'
  ],
  'Aaron': [
    'Steelix','Gliscor','Heracross','Drapion','Scizor','Tyranitar',
    'Kingler','Crawdaunt','Sceptile','Flygon','Volcarona','Escavalier',
    'Vespiquen','Omastar','Durant','Kabutops','Forretress','Skuntank',
    'Crustle','Octillery','Scyther','Gastrodon','Ferrothorn','Beautifly',
    'Yanmega','Dustox',
  ],
  'Bertha': [
    'Nidoking','Bronzong','Cloyster','Steelix','Blastoise','Gliscor',
    'Seismitoad','Rhyperior','Gengar','Skarmory','Golem','Sableye',
    'Absol','Walrein','Whiscash','Druddigon','Durant','Forretress',
    'Tangrowth','Camerupt','Quagsire','Emboar','Sudowoodo','Parasect',
    'Hippowdon','Amoonguss','Donphan'
  ],
  'Flint': [
    'Bronzong','Dragonite','Lucario','Steelix','Salamence','Infernape',
    'Rotom Horno','Houndoom','Charizard','Arcanine','Haxorus','Flareon',
    'Ninetales','Cacturne','Ludicolo','Drifblim','Entei','Conkeldurr',
    'Medicham','Bouffalant','Camerupt','Magmortar','Rapidash',
    'Maractus','Lopunny','Typhlosion','Blaziken'
  ],
  'Lucian': [
    'Golduck','Bronzong','Dragonite','Lucario','Raichu','Metagross',
    'Alakazam','Hydreigon','Mismagius','Espeon','Ninetales','Absol',
    'Empoleon','Gallade','Gardevoir','Sigilyph','Medicham','Noctowl',
    'Girafarig','Kecleon','Stantler'
  ],
  'Cynthia': [
    'Lapras','Togekiss','Nidoqueen','Bronzong','Lucario','Eelektross',
    'Metagross','Heracross','Umbreon','Mismagius','Tyranitar','Arcanine',
    'Aerodactyl','Garchomp','Glaceon','Spiritomb','Excadrill','Chandelure',
    'Serperior','Altaria','Milotic','Roserade','Jellicent',
    'Braviary','Gastrodon','Lickilicky','Bastiodon','Clefable',
    'Rayquaza'
  ],
  'Shauntal': [
    'Bronzong','Banette','Dragonite','Lucario','Eelektross','Gengar',
    'Hydreigon','Rotom Lavadora','Umbreon','Mismagius','Toxicroak','Jolteon',
    'Absol','Luxray','Golurk','Froslass','Chandelure','Milotic','Milotic',
    'Purugly','Bisharp','Drifblim','Liepard'
  ],
  'Grimsley': [
    'Staraptor','Salamence','Krookodile','Gyarados','Mismagius','Houndoom',
    'Crobat','Scrafty','Kingdra','Tyranitar','Garchomp','Haxorus',
    'Espeon','Absol','Luxray','Spiritomb','Sharpedo','Chandelure',
    'Honchkrow','Serperior','Roserade','Bisharp','Liepard',
    'Samurott'
  ],
  'Caitlin': [
    'Togekiss','Nidoqueen','Bronzong','Raichu','Staraptor','Metagross',
    'Alakazam','Umbreon','Houndoom','Jolteon','Leafeon',
    'Vaporeon','Absol','Mienshao','Slowking','Snorlax','Cinccino',
    'Sigilyph','Reuniclus','Emolga','Entei','Gothitelle','Musharna'
  ],
  'Marshal': [
    'Magnezone','Lucario','Machamp','Metagross','Gliscor','Electivire',
    'Aggron','Salamence','Seismitoad','Krookodile','Gyarados','Toxicroak',
    'Tyranitar','Haxorus','Skarmory','Luxray','Golurk','Mienshao',
    'Crawdaunt','Dusknoir','Carracosta','Conkeldurr','Sawk','Throh',
    'Breloom','Medicham'
  ],
  'Alder': [
    'Dragonite','Lucario','Seismitoad','Krookodile','Feraligatr','Sandslash',
    'Vaporeon','Excadrill','Chandelure','Vanilluxe','Floatzel','Samurott',
    'Reuniclus','Conkeldurr','Druddigon','Archeops','Volcarona','Manectric',
    'Bouffalant','Latias','Escavalier','Latios','Accelgor','Gigalith',
    'Braviary'
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

const POKEMON_BADGES = {
  "Abomasnow": { text: "Leyenda", color: "amarillo" },
  "Dragonite": { text: "Trick thunderbolt chandelure 2+2", color: "amarillo" },
  "Vileplume": { text: "Leyenda", color: "amarillo" },
  "Hariyama": { text: "Leyenda", color: "amarillo" },
  "Steelix": { text: "Leyenda", color: "amarillo" },
  "Staraptor": { text: "Leyenda", color: "amarillo" },
  "Darmanitan": { text: "Leyenda", color: "amarillo" },
  "Eelektross": { text: "Leyenda", color: "amarillo" },
  "Shiftry": { text: "Leyenda", color: "amarillo" },
  "Marowak": { text: "Leyenda", color: "amarillo" },
  "Rotom Lavadora": { text: "Leyenda", color: "amarillo" },
  "Rotom Horno": { text: "Leyenda", color: "amarillo" },
  "Rotom Ventilador": { text: "Leyenda", color: "amarillo" },
  "Mandibuzz": { text: "Leyenda", color: "amarillo" },
  "Ampharos": { text: "Leyenda", color: "amarillo" },
  "Blastoise": { text: "Leyenda", color: "amarillo" },
  "Electivire": { text: "Leyenda", color: "amarillo" },
  "Pidgeot": { text: "Leyenda", color: "amarillo" },
  "Venusaur": { text: "Leyenda", color: "amarillo" },
  "Skarmory": { text: "Leyenda", color: "amarillo" },
  "Golem": { text: "Leyenda", color: "amarillo" },
  "Typhlosion": { text: "Leyenda", color: "amarillo" },
  "Girafarig": { text: "Leyenda", color: "amarillo" },
  "Clefable": { text: "Leyenda", color: "amarillo" },
  "Xatu": { text: "Leyenda", color: "amarillo" },
  "Grumpig": { text: "Leyenda", color: "amarillo" },
  "Bisharp": { text: "Leyenda", color: "amarillo" },
  "Ferrothorn": { text: "Leyenda", color: "amarillo" },
  "Tangrowth": { text: "Leyenda", color: "amarillo" },
  "Ditto": { text: "Leyenda", color: "amarillo" },
  "Venomoth": { text: "Leyenda", color: "amarillo" },
  "Stunfisk": { text: "Leyenda", color: "amarillo" },
  "Swalot": { text: "Leyenda", color: "amarillo" },
  "Electrode": { text: "Leyenda", color: "amarillo" },
  "Poliwrath": { text: "Leyenda", color: "amarillo" },
  "Kangaskhan": { text: "Leyenda", color: "amarillo" },
  "Blaziken": { text: "Leyenda", color: "amarillo" },
  "Leafeon": { text: "Leyenda", color: "amarillo" },
  "Excadrill": { text: "Leyenda", color: "amarillo" },
  "Sableye": { text: "Leyenda", color: "amarillo" },
  "Primeape": { text: "Leyenda", color: "amarillo" },
  "Mightyena": { text: "Leyenda", color: "amarillo" },
  "Mienshao": { text: "Leyenda", color: "amarillo" },
  "Crawdaunt": { text: "Leyenda", color: "amarillo" },
  "Scolipede": { text: "Leyenda", color: "amarillo" },
  "Mawile": { text: "Leyenda", color: "amarillo" },
  "Dusknoir": { text: "Leyenda", color: "amarillo" },
  "Regice": { text: "Leyenda", color: "amarillo" },
  "Meganium": { text: "Leyenda", color: "amarillo" },
  "Serperior": { text: "Leyenda", color: "amarillo" },
  "Blissey": { text: "Leyenda", color: "amarillo" },
  "Regirock": { text: "Leyenda", color: "amarillo" },
  "Sceptile": { text: "Leyenda", color: "amarillo" },
  "Floatzel": { text: "Leyenda", color: "amarillo" },
  "Wailord": { text: "Leyenda", color: "amarillo" },
  "Whiscash": { text: "Leyenda", color: "amarillo" },
  "Durant": { text: "Leyenda", color: "amarillo" },
  "Octillery": { text: "Leyenda", color: "amarillo" },
  "Sudowoodo": { text: "Leyenda", color: "amarillo" },
  "Amoonguss": { text: "Leyenda", color: "amarillo" },
  "Donphan": { text: "Leyenda", color: "amarillo" },
  "Entei": { text: "Leyenda", color: "amarillo" },
  "Maractus": { text: "Leyenda", color: "amarillo" },
  "Noctowl": { text: "Leyenda", color: "amarillo" },
  "Girafarig": { text: "Leyenda", color: "amarillo" },
  "Kecleon": { text: "Leyenda", color: "amarillo" },
  "Stantler": { text: "Leyenda", color: "amarillo" },
  "Jellicent": { text: "Leyenda", color: "amarillo" },
  "Lickilicky": { text: "Leyenda", color: "amarillo" },
  "Bastiodon": { text: "Leyenda", color: "amarillo" },
  "Clefable": { text: "Leyenda", color: "amarillo" },
  "Cinccino": { text: "Leyenda", color: "amarillo" },
  "Emolga": { text: "Leyenda", color: "amarillo" },
  "Carracosta": { text: "Leyenda", color: "amarillo" },
  "Archeops": { text: "Leyenda", color: "amarillo" },
  "Latias": { text: "Leyenda", color: "amarillo" },
  "Latios": { text: "Leyenda", color: "amarillo" },
  "Ursaring": { text: "Leyenda", color: "amarillo" },
  "Chansey": { text: "Leyenda", color: "amarillo" },
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
  "Beedrill": { text: "Leyenda", color: "amarillo" },
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
  "Forretress": { text: "Leyenda", color: "amarillo" },
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
  "Groudon": { text: "Leyenda", color: "celeste" },
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
  "Karen": { text: "Leyenda", color: "morado" },
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
    const keyName = names[idx] || `entrenador${id}`;
    const displayName = displayTrainerName(keyName);

    const card = document.createElement('div');
    card.className = 'trainer';
    // dataset guarda el nombre "clave" (con _1/_2) para buscar equipos e imágenes
    card.dataset.trainer = keyName;
    card.dataset.region = region;
    card.dataset.index = String(idx);

    const portrait = document.createElement('div');
    portrait.className = 'portrait';

    const img = document.createElement('img');
    img.src = `src/Entrenadores/${encodeURIComponent(keyName)}.png`; // usa el nombre con sufijo para el archivo
    img.alt = displayName;

    const info = document.createElement('div');
    info.className = 'info';

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = displayName; // muestra sin _1/_2

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

  // Mostrar título y breadcrumb sin sufijo
  const displayName = displayTrainerName(trainerKeyName);
  pokemonTitle.textContent = `Team ${displayName}`;
  if (crumbPath) crumbPath.textContent = `${region} › ${displayName}`;

  // Índice del entrenador (para pager/teclas)
  if (currentTrainerIndex < 0) {
    currentTrainerIndex = currentTrainerNames.indexOf(trainerKeyName);
  }
  updateTrainerPagerButtons();

  // Render Pokémon
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
    const trainerKeyName = card.dataset.trainer; // con sufijo
    const idx = Number(card.dataset.index);
    if (!Number.isNaN(idx)) currentTrainerIndex = idx;
    if (trainerKeyName) showPokemon(trainerKeyName, currentRegion);
  });
  trainersList.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.trainer');
    if (!card) return;
    e.preventDefault();
    const trainerKeyName = card.dataset.trainer; // con sufijo
    const idx = Number(card.dataset.index);
    if (!Number.isNaN(idx)) currentTrainerIndex = idx;
    if (trainerKeyName) showPokemon(trainerKeyName, currentRegion);
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
