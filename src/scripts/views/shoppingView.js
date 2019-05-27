import { elements } from "./base";

export const renderItem = item => {
    const markup = `
        <li class="shopping-list-item" data-id="${item.id}">
            <span>${item.ingred}</span>
            <span class="shopping-list-item-remove"><i class="fas fa-times-circle"></i></span>
        </li>
    `;
    elements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-id="${id}"]`);
    if(item) item.parentElement.removeChild(item);
};
export const toggleShopDiv = list => {
    elements.shoppingDiv.style.visibility = list > 0 ? 'visible' : 'hidden';
    elements.shoppingDiv.style.display = list > 0 ? 'block' : 'none';
};