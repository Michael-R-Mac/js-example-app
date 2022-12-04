// Wrap the variable in a IIFE to prevent conflicts
const pokemonrepository = (function poke() {
  // array of objects that contains pokemons and their caracteretics \n
  const pokemonlist = [];
  // variable to 'get' the data from the api
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  // function that enables to add pokemons to the variable and check for valid input
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonlist.push(pokemon);
      return '';
    }
    return 'Please add a pokemon.';
  }
  // function that enables to show all pokemons in the variable
  function getAll() {
    return pokemonlist;
  }
  // function to insert information in the modal
  function showModal(pokemon) {
    const modalheader = $('.modal-header');
    const modalbody = $('.modal-body');
    modalheader.empty();
    modalbody.empty();
    const name = $(`<h1>${pokemon.name}</h1>`);
    const image = $('<img class ="img-fluid" style="width:60%" >');
    image.attr('src', pokemon.imageUrl);
    const height = $(`<p> Height: ${pokemon.height}</p>`);
    const types = $(`<p> Type: ${pokemon.types}</p>`);
    modalheader.append(name);
    modalbody.append(height);
    modalbody.append(image);
    modalbody.append(types);
  }
  // function that enables the button to show pokemons of the variable in a modal
  function showDetails(pokemon) {
    pokemonrepository.loadDetails(pokemon).then(() => showModal(pokemon));
  }
  // function that creates a button for all pokemons and enables search
  function addListItem(pokemon) {
    pokemonrepository.loadDetails(pokemon).then(() => {
      const pokemonul = $('.row');
      const listitem = $('<li class="col-6"></li>');
      const imagelist = $(
        '<img class="img-fluid" style="width:20%" alt="pokemonimage" >',
      );
      imagelist.attr('src', pokemon.imageUrl);
      const pokemonbutton = $(
        `<button type="button" class="btn btn-dark" data-toggle="modal" data-target="#pokemonbtn" style="width:100%">${
          pokemon.name}</button>`,
      );
      pokemonul.append(listitem);
      listitem.append(pokemonbutton);
      pokemonbutton.append(imagelist);
      pokemonbutton.on('click', () => {
        showDetails(pokemon);
      });
      const searchbar = document.getElementById('mySearch');
      searchbar.onkeyup = () => {
        const input = document.getElementById('mySearch');
        const filter = input.value.toUpperCase();
        const ul = document.getElementById('myMenu');
        const li = ul.getElementsByTagName('li');
        for (let i = 0; i < li.length; i += 1) {
          const a = li[i].getElementsByTagName('button')[0];
          if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
          } else {
            li[i].style.display = 'none';
          }
        }
      };
    });
  }
  // function that loads the data from the api and adds it to the pokemonlist
  function loadList() {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
  }
  // function that adds the details to the item
  function loadDetails(item) {
    const url = item.detailsUrl;
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        // eslint-disable-next-line no-param-reassign
        item.imageUrl = details.sprites.front_default;
        // eslint-disable-next-line no-param-reassign
        item.height = details.height;
        // eslint-disable-next-line no-param-reassign
        item.types = [];
        for (let i = 0; i < details.types.length; i += 1) {
          item.types.push(details.types[i].type.name);
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
  }
  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showModal,
  };
}());

// for loop to write the pokemons in the DOM
pokemonrepository.loadList().then(() => {
  pokemonrepository.getAll().forEach((pokemon) => {
    pokemonrepository.addListItem(pokemon);
  });
});
