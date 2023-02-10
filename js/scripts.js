let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Balbasure", type: ["grass", "poison"], height: "71.1 cm" },
    { name: "Eve", type: ["water", "speed"], height: "30.5 cm" },
    { name: "Charzard", type: ["fire", "flying"], height: "1.7 m" },
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
  };
})();
pokemonRepository.add({ name: "Squirtle", type: "water", height: "50.8 cm" });

pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(pokemon.name + ", " + pokemon.height + "<br>");
});
