'use strict';

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
      // console.log(results);
      let addContent = '';

      // Por cada show contenido en el resultado de la búsqueda, se debe pintar una tarjeta donde se muestra imagen de la serie y el título
      for (let i = 0; i < results.length; i++) {
        const showTitle = results[i].show.name;
        let showImage = results[i].show.image;

        console.log(showTitle);
        console.log(showImage);

        // Algunas series no tienen cartel, en este caso se debe mostrar una imagen de relleno
        if (showImage === null){
          const contentDefault = `<li class="show-item"> <img class="show-image" src="https://via.placeholder.com/210x295/cccccc/666666/?text=TV" alt="${showTitle}"><h2 class="show-title">${showTitle}</h2></li>`;

          // Cuando hacemos una nueva búsqueda que no se añada a lo anterior, sino que lo sobreescriba
          addContent += contentDefault;
          showsList.innerHTML = addContent;

        } else {
          const mediumImage = results[i].show.image.medium;
          const contentImage = `<li class="show-item"> <img class="show-image" src="${mediumImage}" alt="${showTitle}"><h2 class="show-title">${showTitle}</h2></li>`;

          // Cuando hacemos una nueva búsqueda que no se añada a lo anterior, sino que lo sobreescriba
          addContent += contentImage;
          showsList.innerHTML = addContent;
        }
      }
      favoriteShow();
    });
}

// Una vez aparecen los resultados de búsqueda, indicar cuáles son nuestros favoritos. Al hacer click sobre el resultado cambia de color de fondo y se pone un borde alrededor de la tarjeta
function handleClick (e) {
  const culpable = e.currentTarget;
  culpable.classList.toggle('favorite-show');
}

function favoriteShow() {
  const items = document.querySelectorAll('.show-item');

  for (let i = 0; i< items.length; i++) {
    items[i].addEventListener('click', handleClick);
  }
}

// Almacenar la información de favoritos en localStorage

button.addEventListener('click', searchShow);
