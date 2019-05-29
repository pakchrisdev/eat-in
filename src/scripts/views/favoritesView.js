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
                    <img src="${fav.img}" onerror="this.onerror=null;this.src='images/notfound.jpg';">
                </figure>
                <div class="likes-list-item-info">
                    <h4>${limitTitle(fav.title, 18)}</h4>
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
    elements.likesInd.style.display = numFav > 0 ? 'inline-block' : 'none';
};