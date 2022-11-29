// Wrap the variable in a IIFE to prevent conflicts
let pokemonrepository = (function () {
  // array of objects that contains pokemons and their caracteretics
  let pokemonlist = [];

  // variable to 'get' the data from the api
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // function that enables to add pokemons to the variable and check for valid input
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
    pokemonrepository.loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  // function to insert information in the modal
  function showModal(pokemon) {
    let modalheader = $('.modal-header');
    let modalbody = $('.modal-body');

    modalheader.empty();
    modalbody.empty();

    let name = $('<h1>' + pokemon.name + '</h1>');
    let image = $('<img class ="img-fluid" style="width:60%" >');
    image.attr('src', pokemon.imageUrl)
    let height = $('<p> Height: ' + pokemon.height + '</p>');
    let types = $('<p> Type: ' + pokemon.types + '</p>');


    modalheader.append(name);
    modalbody.append(height);
    modalbody.append(image);
    modalbody.append(types);
  }

  // function that creates a button for all pokemons and enables search
  function addListItem(pokemon) {
    pokemonrepository.loadDetails(pokemon).then(function() {
      let pokemonul = $('.row');
      let listitem = $('<li class="col-6"></li>');
      let imagelist = $('<img class="img-fluid" style="width:20%" alt="pokemonimage" >');
      imagelist.attr('src', pokemon.imageUrl)
      let pokemonbutton = $('<button type="button" class="btn btn-dark" data-toggle="modal" data-target="#pokemonbtn" style="width:100%">'
      + pokemon.name + '</button>');
      pokemonul.append(listitem);
      listitem.append(pokemonbutton);
      pokemonbutton.append(imagelist)
      pokemonbutton.on ('click' , () => {
        showDetails(pokemon);
      });
      let searchbar = document.getElementById("mySearch");
      searchbar.onkeyup = () => {
        var input, filter, ul, li, a, i;
        input = document.getElementById("mySearch");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myMenu");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
          a = li[i].getElementsByTagName("button")[0];
          if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
          } else {
            li[i].style.display = "none";
          }
        }
      };
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
      item.types = [];
      for (var i = 0; i < details.types.length; i++) {
        item.types.push(details.types[i].type.name);
      }
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal : showModal
  };
})();

// for loop to write the pokemons in the DOM
pokemonrepository.loadList().then(function () {
  pokemonrepository.getAll().forEach(function (pokemon) {
    pokemonrepository.addListItem(pokemon);
  });
});
