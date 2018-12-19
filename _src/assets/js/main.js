'use strict';

const searchField = document.querySelector('.search-field');
const button = document.querySelector('.btn');
const showsList = document.querySelector('.shows__list');

let showResult = document.querySelector('.show-results');



function searchShow () {

  let showSearchName = searchField.value;

  fetch(`http://api.tvmaze.com/search/shows?q=${showSearchName}`)
    .then(response => response.json())
    .then(data => {
      const results = data;
      console.log(results);

      let addContent = '';

      showResult.innerHTML = results.length;
//debajo de cada tarjeta aparezcan los generos debajo del h2 genres

      for (let i = 0; i < results.length; i++) {
        const id = results[i].show.id;
        const showTitle = results[i].show.name;
        const showGenres = results[i].show.genres;
        console.log(showGenres)
        let showImage = results[i].show.image;
        let genres = '';

        for (let g = 0; g < showGenres.length; g++) {
          genres += showGenres[g];
        }

        let fav = '';

        if (arrFav.includes(id.toString())) {
          fav = 'favorite-show';
        }

        if (showImage === null){
          const contentDefault = `<li class="show-item ${fav}" id="${id}"> <img class="show-image" src="https://via.placeholder.com/210x295/cccccc/666666/?text=TV" alt="${showTitle}"><h2 class="show-title">${showTitle}</h2><p>${genres}</p></li>`;

          addContent += contentDefault;
          showsList.innerHTML = addContent;

        } else {
          const mediumImage = results[i].show.image.medium;
          const contentImage = `<li class="show-item ${fav}" id="${id}"> <img class="show-image" src="${mediumImage}" alt="${showTitle}"><h2 class="show-title">${showTitle}</h2><p>${genres}</p></li>`;

          addContent += contentImage;
          showsList.innerHTML = addContent;
        }
      }
      markFavorite();
    });
}

function handleClick (e) {
  const selectedShow = e.currentTarget;
  selectedShow.classList.toggle('favorite-show');

  if (selectedShow.classList.contains('favorite-show') === true) {
    arrFav.push(selectedShow.getAttribute('id'));

  } else {
    remove(arrFav, selectedShow.getAttribute('id'));
  }
  saveFavorite(arrFav);
}

function hideList () {

  showsList.classList.add('hide');

}

//cuando hago click resultados que no se vea la lista


button.addEventListener('click', searchShow);
showResult.addEventListener('click', hideList);
