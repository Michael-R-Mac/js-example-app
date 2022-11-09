// Wrap the variable in a IIFE to prevent conflicts
let pokemonrepository = (function () {
  // array of objects that contains pokemons and their caracteretics
  let pokemonlist = [{name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
  {name: 'Venusaur', height: 2.0, types: ['grass', 'poison']},
  {name: 'Charizard', height: 1.7, types: ['fire', 'flying']}];

  // function that enables to add pokemons to the variable
  function add(pokemon) {
    if (typeof pokemon === 'object' && Object.keys(pokemon).length === 3) {
      pokemonlist.push(pokemon);
    }
    else {
      return 'Please add a pokemon with name, height and type.'
    }
  }

  // function that enables to show all pokemons in the variable
  function getAll() {
    return pokemonlist;
  }

  // function that enables the button to show pokemons of the variable in the console
  function showDetails(pokemon) {
    console.log(pokemon)
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

  return {
    add: add,
    getAll: getAll,
    addListItem : addListItem
  };
})();

// for loop to write the pokemons in the DOM
pokemonrepository.getAll().forEach(function (pokemon) {
  pokemonrepository.addListItem(pokemon);
});
