import { elements } from "./base";
import { limitTitle } from './searchView';

export const toggleFavBtn = isFavorite => {
    const iconStr = isFavorite ? 'minus' : 'plus';
    document.querySelector('.add-fav i').setAttribute('class', `fas fa-${iconStr}-circle`);
};
export const renderFavorites = fav => {
    const markup = `
        <li class="likes-list-item">
            <a href="#${fav.id}" class="likes-list-item-link">
                <figure class="likes-list-item-figure">
                    <img src="${fav.img}">
                </figure>
                <div class="likes-list-item-info">
                    <h4>${limitTitle(fav.title, 15)}</h4>
                    <p>${fav.author}</p>
                </div>
            </a>
        </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};
export const deleteFavorite = id => {
    const el = document.querySelector(`.likes-list-item-link[href*="${id}"]`);
    if(el) el.parentElement.remove();
};
export const toggleFavDiv = numFav => {
    elements.likesInd.style.visibility = numFav > 0 ? 'visible' : 'hidden';
};

// <span class="recipe-div-info-span add-fav">
//     <i class="fas fa-plus-circle"></i>
//     add to favorites
// </span>
