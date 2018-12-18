'use strict';

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
