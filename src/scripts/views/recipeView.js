import { elements } from "./base";

export const clearRecipe = () => { elements.recipeDiv.innerHTML = '' };

const renderIngredient = ingred => `
    <li class="recipe-div-ingredients-item">
        ${ingred}
    </li>
`;
export const renderRecipe = (recipe, isFavorite) => {
    const m1 = `<span>add</span>`;
    const m2 = `<span>remove</span>`;
    const markup = `
        <div class="recipe-div">
            <figure class="recipe-div-figure">
                <img src="${recipe.image}" alt="${recipe.title}" onerror="this.onerror=null;this.src='images/notfound.jpg';">
                <h3 class="recipe-div-title">${recipe.title}</h3>
            </figure>
            <div class="recipe-div-info">
                <span class="recipe-div-info-span time">
                    <i class="far fa-clock"></i>
                    ${recipe.time} minutes
                </span>
                <span class="recipe-div-info-span servings">
                    <i class="fas fa-users"></i>
                    ${recipe.servings} servings
                </span>
                <span class="recipe-div-info-span add-fav">
                    <i class="fas fa-${isFavorite ? 'minus' : 'plus'}-circle"></i>
                    favorite
                </span>
            </div>

            <div class="recipe-div-ingredients">
                <h4>ingredients</h4>
                <ul>
                    ${recipe.ingredients.map(el => renderIngredient(el)).join('')}
                </ul>
                <div class="add-shopping">
                    <i class="fas fa-cart-plus"></i>
                    add to shopping list
                </div>
            </div>

            <div class="recipe-div-link">
                <h4>get cook(in)</h4>
                <p class="recipe-div-link-text">compiled and tested by <span>${recipe.author}</span></p>
                <a href="${recipe.url}" target="_blank">directions</a>
            </div>
        </div>
    `;
    elements.recipeDiv.insertAdjacentHTML('afterbegin', markup);
};