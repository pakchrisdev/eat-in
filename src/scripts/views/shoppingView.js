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