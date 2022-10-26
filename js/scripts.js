// array of objects that contains pokemons and their caracteretics
const pokemonlist = [{name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
{name: 'Venusaur', height: 2.0, types: ['grass', 'poison']},
{name: 'Charizard', height: 1.7, types: ['fire', 'flying']}];

// variable for the lenght of the array to be used in the for loop
let len = pokemonlist.length

// for loop to write the pokemons and height in the DOM
for(let i=0; i < len; i++) {
  document.write('<p>The pokemon ' + pokemonlist[i].name + ' has a height of '
  + pokemonlist[i].height + ' m.</p>');

  // conditional for bigger pokemons
  if(pokemonlist[i].height >= 2) {
    document.write('<p>The ' + pokemonlist[i].name + ' pokemon is big.' + '</p>');
  }
}
