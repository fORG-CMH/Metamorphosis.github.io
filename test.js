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
