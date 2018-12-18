'use strict';

const searchField = document.querySelector('.search-field');
const button = document.querySelector('.btn');
const showsList = document.querySelector('.shows__list');
let arrFav = getFavorite();

function searchShow () {

  let showSearchName = searchField.value;

  fetch(`http://api.tvmaze.com/search/shows?q=${showSearchName}`)
    .then(response => response.json())
    .then(data => {
      const results = data;
      let addContent = '';

      for (let i = 0; i < results.length; i++) {
        const id = results[i].show.id;
        const showTitle = results[i].show.name;
        let showImage = results[i].show.image;
        let fav = '';

        if (arrFav.includes(id.toString())) {
          fav = 'favorite-show';
        }

        if (showImage === null){
          const contentDefault = `<li class="show-item ${fav}" id="${id}"> <img class="show-image" src="https://via.placeholder.com/210x295/cccccc/666666/?text=TV" alt="${showTitle}"><h2 class="show-title">${showTitle}</h2></li>`;

          addContent += contentDefault;
          showsList.innerHTML = addContent;

        } else {
          const mediumImage = results[i].show.image.medium;
          const contentImage = `<li class="show-item ${fav}" id="${id}"> <img class="show-image" src="${mediumImage}" alt="${showTitle}"><h2 class="show-title">${showTitle}</h2></li>`;

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

function remove (array, element) {

  const index = array.indexOf(element);

  if (index !== -1) {
    array.splice(index, 1);
  }
}

function markFavorite() {
  const items = document.querySelectorAll('.show-item');

  for (let i = 0; i< items.length; i++) {
    items[i].addEventListener('click', handleClick);
  }
}

function saveFavorite (favorites){
  localStorage.setItem('favShows', JSON.stringify(favorites));
}

function getFavorite (){
  const f = JSON.parse(localStorage.getItem('favShows'));

  if (f === null) {
    return [];
  } else {
    return f;
  }
}

button.addEventListener('click', searchShow);
