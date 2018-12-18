'use strict';

const searchField = document.querySelector('.search-field');
const button = document.querySelector('.btn');
const showsList = document.querySelector('.shows__list');
let arrFav = getFavorite();
// let arrFav es el array de las peliculas favoritas

// Al hacer click sobre el btn, la app debe conectase al urlApi
function searchShow () {

  // Para construir la URL se necesita recoger el texto escrito en el input
  let showSearchName = searchField.value;

  fetch(`http://api.tvmaze.com/search/shows?q=${showSearchName}`)
    .then(response => response.json())
    .then(data => {
      const results = data;
      let addContent = '';

      // Por cada show contenido en el resultado de la búsqueda, se debe pintar una tarjeta donde se muestra imagen de la serie y el título
      for (let i = 0; i < results.length; i++) {
        const id = results[i].show.id;
        const showTitle = results[i].show.name;
        let showImage = results[i].show.image;
        let fav = '';

        //si el array de favoritos tiene el id que estamos buscando fav le ponemos el valor de la clase que pone el background darkpink
        if (arrFav.includes(id)) {
          fav = 'favorite-show';
        }

        // Algunas series no tienen cartel, en este caso se debe mostrar una imagen de relleno
        if (showImage === null){
          const contentDefault = `<li class="show-item ${fav}" id="${id}"> <img class="show-image" src="https://via.placeholder.com/210x295/cccccc/666666/?text=TV" alt="${showTitle}"><h2 class="show-title">${showTitle}</h2></li>`;

          // Cuando hacemos una nueva búsqueda que no se añada a lo anterior, sino que lo sobreescriba
          addContent += contentDefault;
          showsList.innerHTML = addContent;

        } else {
          const mediumImage = results[i].show.image.medium;
          const contentImage = `<li class="show-item ${fav}" id="${id}"> <img class="show-image" src="${mediumImage}" alt="${showTitle}"><h2 class="show-title">${showTitle}</h2></li>`;

          // Cuando hacemos una nueva búsqueda que no se añada a lo anterior, sino que lo sobreescriba
          addContent += contentImage;
          showsList.innerHTML = addContent;
        }
      }
      markFavorite();
    });
}

// Una vez aparecen los resultados de búsqueda, indicar cuáles son nuestros favoritos. Al hacer click sobre el resultado cambia de color de fondo y se pone un borde alrededor de la tarjeta
function handleClick (e) {
  const selectedShow = e.currentTarget;
  selectedShow.classList.toggle('favorite-show');

  if (selectedShow.classList.contains('favorite-show') === true) {
    arrFav.push(selectedShow.getAttribute('id'));

  } else {
    remove(arrFav, selectedShow.getAttribute('id'));
  }
  // Función que guarda en el localStorage el array de favoritos
  saveFavorite(arrFav);
}

// Función que borra un elemento del array, el cual pasas por parámetro
function remove (array, element) {

  //Devuelve la posición en el array del objeto buscado
  const index = array.indexOf(element);

  //Si un elemento no está dentro del array te devuelve un -1
  if (index !== -1) {
    // El 1 borra un elemento nada más del índice
    array.splice(index, 1);
  }
}

function markFavorite() {
  const items = document.querySelectorAll('.show-item');

  for (let i = 0; i< items.length; i++) {
    items[i].addEventListener('click', handleClick);
  }
}

// Todos los favoritos en un array si se desclickla se borra y si se agregan nuevos se suman


// Almacenar la información de favoritos en localStorage
function saveFavorite (favorites){
  localStorage.setItem('favShows', JSON.stringify(favorites));
}


// Recoge las peliculas favoritas del localStorage, si no hay nada guardado (null) devuelve un array vacío y si ya tenemos guardado algo devuelve las peliculas
function getFavorite (){
  const f = localStorage.getItem('favShows');

  if (f === null) {
    return [];
  } else {
    return f;
  }
}

button.addEventListener('click', searchShow);
