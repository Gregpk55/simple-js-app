let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Balbasure", type: ["grass", "poison"], height: "71.1 cm" },
    { name: "Eve", type: ["water", "speed"], height: "30.5 cm" },
    { name: "Charzard", type: ["fire", "flying"], height: "1.7 m" },
    { name: "Squirtle", type: "water", height: "50.8 cm" },
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

//(pokemon.name + ", " + pokemon.height + "<br>")
