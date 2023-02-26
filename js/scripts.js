const pokemonRepository = (() => {
  const pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  const searchBar = $(".form-control");
  const searchButton = $(".btn.btn-secondary");
  const pokemonListElement = $(".pokemon-list");

  searchBar.on("keyup", (event) => {
    if (event.keyCode === 8) {
      renderPokemonList(getPokemonByName(searchBar.val()));
    }
  });

  searchButton.on("input", () => {
    renderPokemonList(getPokemonByName(searchBar.val()));
  });

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("Invalid pokemon object:", pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function getPokemonByName(name) {
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  function renderPokemonList(pokemonList) {
    pokemonListElement.empty();
    pokemonList.forEach((pokemon) => {
      const listItem = $("<li>").addClass("group-list-item");
      const button = $("<button>")
        .addClass("btn btn-primary")
        .attr("data-toggle", "modal")
        .attr("data-target", "#exampleModal")
        .text(pokemon.name);
      listItem.append(button);
      pokemonListElement.append(listItem);
      button.on("click", () => showDetails(pokemon));
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((item) => {
          const pokemon = { name: item.name, detailsUrl: item.url };
          add(pokemon);
        });
      })
      .catch((error) => console.error(error));
  }

  function loadDetails(pokemon) {
    const url = pokemon.detailsUrl;
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.imageUrl2 = details.sprites.back_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
      })
      .catch((error) => console.error(error));
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => showModal(pokemon));
  }

  function showModal(pokemon) {
    const types = pokemon.types.map((type) => type.type.name).join(" ");
    const modalTitle = $(".modal-title");
    const modalBody = $(".modal-body");
    modalTitle.text(pokemon.name);
    modalBody.empty();
    modalBody.append(`<img class="modal-img" src="${pokemon.imageUrl}">`);
    modalBody.append(`<img class="modal-img" src="${pokemon.imageUrl2}">`);
    modalBody.append(`<p>Height: ${pokemon.height}</p>`);
    modalBody.append(`<p>Type: ${types}</p>`);
  }

  return {
    add,
    getAll,
    loadList,
    showDetails,
    showModal,
  };
})();

pokemonRepository.loadList().then(() => {
  const allPokemon = pokemonRepository.getAll();
  renderPokemonList(allPokemon);
});
