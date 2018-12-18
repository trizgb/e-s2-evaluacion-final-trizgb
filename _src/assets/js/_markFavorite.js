'use strict';

function markFavorite() {
  const items = document.querySelectorAll('.show-item');

  for (let i = 0; i< items.length; i++) {
    items[i].addEventListener('click', handleClick);
  }
}
