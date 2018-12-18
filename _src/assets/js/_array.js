'use strict';

let arrFav = getFavorite();

function remove (array, element) {

  const index = array.indexOf(element);

  if (index !== -1) {
    array.splice(index, 1);
  }
}
