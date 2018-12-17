'use strict';

// console.log('Te va a salir, ya verás :)');

const searchField = document.querySelector('.search-field');
const button = document.querySelector('.btn');
const showsList = document.querySelector('.shows__list');


// Al hacer click sobre el btn, la app debe conectase al urlApi
function searchShow () {

  // Para construir la URL se necesita recoger el texto escrito en el input
  let showSearchName = searchField.value;
  // console.log(showName);

  fetch(`http://api.tvmaze.com/search/shows?q=${showSearchName}`)
    .then(response => response.json())
    .then(data => {
      const results = data;

      // Por cada show contenido en el resultado de la búsqueda, se debe pintar una tarjeta donde se muestra imagen de la serie y el título
      for (let i = 0; i < results.length; i++) {
        const showTitle = results[i].show.name;
        const showImage = results[i].show.image.medium;
        let addContent = `<li class="series-item"> <img src="${showImage}" alt="${showTitle}"><h2 class="series-title">${showTitle}</h2></li>`;
        // console.log(showTitle);
        // console.log(image);


        showsList.innerHTML += addContent;
      }
    });
}

// Nos devuelve un JSON con datos
// Algunas series no tienen cartel, en este caso se debe mostrar una imagen de relleno (if), la imagen de relleno será https://via.placeholder.com/210x295/cccccc/666666/?text=TV
// Una vez aparecen los resultados de busqueda, indicar cuales son nuestros favoritos. Al hacer click sobre el resultado cambia de color de fondo y se pone un borde alrededor de la tarjeta
// Almacenar la información de favoritos en localStorage

button.addEventListener('click', searchShow);
