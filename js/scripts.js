let pokemonList = [
  { name: "balbasure", type: ["grass", "poison"], height: "7" },
  { name: "eve", type: ["water", "speed"], height: "2" },
  { name: "charzard", type: ["fire", "flying"], height: "8" },
];

pokemonList.forEach(function (pokemon) {
  document.write(pokemon.name + pokemon.height + "<br>");
});
