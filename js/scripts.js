let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  
  
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

    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function loadList(pokemon) {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the pokemon
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.imageUrl = details.sprites.back_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  
  //modal
  function showModal(pokemon) {
    
    let modalTitle = document.querySelector(".modal-title");
    modalTitle.innerText = pokemon.name;
  
    let modalBody = document.querySelector(".modal-body");
    modalBody.innerText = ("Height : " + pokemon.height);

    modalBody = document.querySelector("modal-body");
    modalBody.innerText("type : " + pokemon.types);
  
    modalTitle.empty();
    modalBody.empty();

    modalBody.append(pokemon.name);

    modalBody.append(pokemon.types);
    
    
    //img
    let myImage = document.createElement("img");
    myImage.src = pokemon.imageUrl;
    
    modalBody.appendChild(myImage.src);
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(myImage);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    modalBody.append(details)

  }
  

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
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


