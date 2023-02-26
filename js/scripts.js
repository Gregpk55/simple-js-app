let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  let searchButton = $(".btn btn-secondary");
  searchButton.on("click", () => {
    let pokemonList = $(".pokemon-list");
    pokemonList.empty();
    getByName($(".form-control").val()).forEach(pokemon => addListItem(pokemon));
  });


  let searchBar = $(".form-control");
  searchBar.on("keypress keyup", event => {
    let pokemonList = $(".pokemon-list");
    pokemonList.empty();
    if (event.keyCode === 8 || event.keyCode === 46) {
      // backspace or delete key was pressed
      getByName($(".form-control").val()).forEach(pokemon => addListItem(pokemon));
    } else {
      // any other key was pressed
      getByName($(".form-control").val()).forEach(pokemon => addListItem(pokemon));
    }
  });

  function getByName(search) {
    return pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
  }

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    listpokemon.classList.add("group-list-item");

    let button = document.createElement("button");
    button.classList.add(["btn", "btn-primary"]);
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    button.innerText = pokemon.name;

    listpokemon.append(button);
    pokemonList.appendChild(listpokemon);

    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  function loadList(pokemon) {
    return fetch(apiUrl)
      .then(response => response.json())
      .then(json => {
        json.results.forEach(item => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(e => {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(response => response.json())
      .then(details => {
        // Now we add the details to the pokemon
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.imageUrl2 = details.sprites.back_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
      })
      .catch(e => {
        console.error(e);
      });
  }

  //modal
  function showModal(pokemon) {
    let types = "";
    pokemon.types.forEach(type => {
      types += type.type.name + " ";
    });

    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");
    modalTitle.empty();
    modalBody.empty();

    modalTitle.append(pokemon.name);
    modalBody.append(`<img class = "modal-img" src = ${pokemon.imageUrl}>`);
    modalBody.append(`<img class = "modal-img" src = ${pokemon.imageUrl2}>`);
    modalBody.append(`<p>Height : ${pokemon.height}</p>`);
    modalBody.append(`<p>Type : ${types}</p>`);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(pokemon)
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
