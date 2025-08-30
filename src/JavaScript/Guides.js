// src/JavaScript/Guides.js
// Estructura de ejemplo: puedes añadir más entrenadores/pokémon
const TRAINER_GUIDES = {
  "Alder": {
    "Lucario": {
      title: "Switch Chandelure",
      meta: "Alder · Lucario",
      checkAllLabel: "check all teams",
      steps: [
        {
          // lo que va a la izquierda
          leftMain: "lock rhypherior",
          arrowTo: true,
          highlight: "hydreigon 2+2",
          tags: ["hp cannot low75%"],
          // lo que va a la derecha
          checkTeam: "check team",
          teamNums: [9]
        },
        {
          leftMain: "lock magnezone",
          arrowTo: true,
          highlight: "garchomp 2+1+2",
          tags: ["earthquake poliwrath sandslash SASH"],
          checkTeam: "check team",
          teamNums: [10,12]
        },
        {
          leftMain: "lock sandslash",
          arrowTo: true,
          highlight: "garchomp 2+1+2",
          tags: ["dual chop +earthquake magnezone"],
          checkTeam: "check team",
          teamNums: [10]
        }
      ]
    }
  }
};
