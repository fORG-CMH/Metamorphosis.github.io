// ===== Guías por Entrenador y Pokémon =====
// Paleta (puedes usar estos nombres o #HEX directo en cada guía)
const GUIDE_COLORS = {
  verde:   "#2e7d32",
  amarillo:"#b38f00",
  rojo:    "#b71c1c",
  gris:    "#37474f",
  marron:  "#5d4037",
  morado:  "#6a1b9a",
  azul:    "#1565c0",
  celeste: "#0277bd",
  rosado:  "#ad1457",
};

// Acceso de color: nombre de paleta o #HEX
function getGuideColor(keyOrHex){
  if(!keyOrHex) return "#1f2937"; // fallback
  return GUIDE_COLORS[keyOrHex] || keyOrHex;
}

// Estructura de datos:
//
// POKEMON_GUIDES[trainerKeyOrName][pokemonName] = {
//   left:   { text: "texto del panel izquierdo", color: "verde|...|#HEX" },
//   header: { title: "Entrenador · Pokémon", subtitle: "opcional" },
//   steps: [
//     { title: "Paso 1", note: "detalle / guía", count: 2, sub: [
//        { title: "Subpaso A", note: "detalle" },
//        { title: "Subpaso B", note: "detalle" },
//     ]},
//     { title: "Paso 2", note: "detalle" },
//   ]
// }
//
// Nota: si el entrenador tiene sufijo (_1/_2), úsalo tal cual: "Bruno_1", "Lance_2", etc.
// App.js ya soporta que también definas sin sufijo (por ejemplo, "Bruno") y hará fallback.

const POKEMON_GUIDES = {
  // =========================
  // =========================
  'Alder': {
    'Lucario': {
      left:   { text: "☆  switch chandelure", color: "verde" },
      header: { title: "Alder · Lucario", subtitle: "" },
      steps: [
        { title: "Close Combat", note: "→ trick lock stone edge , scrafty 3", count: 2 },
        { title: "High Jump Kick", note: "→ trick", count: 4, sub: [
          { title: "Crunch",              note: "→ see chandelure whether fainted" },
          { title: "Chandelure No Faint", note: "→ scrafty 5 or 3x atk, / beat up kill excadrill" },
          { title: "Chandelure Killed",   note: "→ send out metagross trick , lock excadrill , cloyster 4 lucario stay , then trick one time" },
        ]},
        { title: "Final Gambit",   note: "→ trick change item , scrafty 2. / drain punch (absorb) kill sandslash", count: 7 },
        { title: "Faced Krookodile", note: "→ cloyster 4, ice kill lucario", count: 2 },
      ]
    },
  },

  // =========================
  // Ejemplos adicionales (puedes editarlos/liberarlos)
  // =========================
  'Bruno_1': {
    'Lucario': {
      left:   { text: "☆  open with intimidate", color: "#1b5e20" },
      header: { title: "Bruno · Lucario", subtitle: "game plan" },
      steps: [
        { title: "Swords Dance", note: "→ taunt first if needed", count: 1 },
        { title: "Close Combat", note: "→ switch to ghost or trick choice", count: 3 },
        { title: "Bullet Punch", note: "→ bring rotom heat, punish with overheat" },
      ]
    },
    'Machamp': {
      left:   { text: "⭐ avoid dynamic punch", color: "marron" },
      header: { title: "Bruno · Machamp", subtitle: "" },
      steps: [
        { title: "No Guard check", note: "→ use status or burn", count: 2 },
        { title: "Psychic users",  note: "→ safe switch, finish quickly" },
      ]
    }
  },

  'Lance_2': {
    'Dragonite': {
      left:   { text: "☆  lead with ice shard", color: "celeste" },
      header: { title: "Lance · Dragonite", subtitle: "multiscale beware" },
      steps: [
        { title: "Break Multiscale", note: "→ chip first (rocks / priority)" },
        { title: "Ice coverage",     note: "→ cloyster or mamoswine preferred", count: 2 },
      ]
    }
  },

  // =========================
  // Añade aquí más entrenadores y pokémon
  // Ejemplo de plantilla:
  //
  // 'Karen': {
  //   'Weavile': {
  //     left:   { text: "☆  pressure stall option", color: "gris" },
  //     header: { title: "Karen · Weavile", subtitle: "" },
  //     steps: [
  //       { title: "Fake Out + Ice Shard", note: "→ scout choice item", count: 2 },
  //       { title: "Fighting counter",     note: "→ brick break or close combat" },
  //     ]
  //   }
  // }
  // =========================
};
