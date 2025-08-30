// ===== Listado completo de Pokémon por Entrenador =====
// Usa exactamente estos nombres de archivo: src/Pokemones/<Nombre>.gif

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
    'Yanmega','Dustox'
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
    'Honchkrow','Serperior','Roserade','Bisharp','Liepard','Samurott'
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
