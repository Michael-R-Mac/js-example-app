// Wrap the variable in a IIFE to prevent conflicts 
let pokemonrepository = (function () {
  // array of objects that contains pokemons and their caracteretics
  let pokemonlist = [{name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
  {name: 'Venusaur', height: 2.0, types: ['grass', 'poison']},
  {name: 'Charizard', height: 1.7, types: ['fire', 'flying']}];

  function add(pokemon) {
    if (typeof pokemon === "object")
    pokemonlist.push(pokemon);
  }

  function getAll() {
    return pokemonlist;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

// for loop to write the pokemons and height in the DOM
function loopwrite(pokemon) {
  document.write('<p>The pokemon ' + pokemon.name + ' has a height of '
  + pokemon.height + ' m.</p>');

  // conditional for bigger pokemons
  if(pokemon.height >= 2) {
    document.write('<p>The ' + pokemon.name + ' pokemon is big.' + '</p>');
  }
}
pokemonrepository.getAll().forEach(loopwrite);
