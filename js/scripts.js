// Wrap the variable in a IIFE to prevent conflicts
let pokemonrepository = (function () {
  // array of objects that contains pokemons and their caracteretics
  let pokemonlist = [];
  // variable to 'get' the data from the api
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // function that enables to add pokemons to the variable
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonlist.push(pokemon);
    }
    else {
      console.log('Please add a pokemon.');
    }
  }

  // function that enables to show all pokemons in the variable
  function getAll() {
    return pokemonlist;
  }

  // function that enables the button to show pokemons of the variable in a modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {

      let modalContainer = document.querySelector('#modal-container');

      function showModal(title, text, img) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');
    
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
    
        let titleElement = document.createElement('h1');
        titleElement.innerText = title;
    
        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        let myImage = document.createElement('img');
        myImage.src = img;
    
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(myImage);
        modalContainer.appendChild(modal);
        
        
        modalContainer.classList.add('is-visible');
      }
    
      function hideModal() {
        modalContainer.classList.remove('is-visible');
      }
    
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });
      
      modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
    
      showModal(pokemon.name, 'Height: ' + pokemon.height, pokemon.imageUrl);
      
    });
  }

  // function that creates a button for all pokemons
  function addListItem(pokemon) {
    let pokemonul = document.querySelector('.page-pokemon-list');
    let listitem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('page-pokemon-button');
    listitem.appendChild(button);
    pokemonul.appendChild(listitem);
    button.addEventListener('click', function (ev) {
      showDetails(pokemon);
    });
  }

  // function that loads the data from the api and adds it to the pokemonlist
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // function that adds the details to the item
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

// for loop to write the pokemons in the DOM
pokemonrepository.loadList().then(function () {
  pokemonrepository.getAll().forEach(function (pokemon) {
    pokemonrepository.addListItem(pokemon);
  });
});
