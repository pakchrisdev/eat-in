export const elements = {
    searchForm: document.querySelector('.header-form'),
    searchInput: document.querySelector('.header-form-input'),
    resultsDiv: document.querySelector('.results'),
    resultsList: document.querySelector('.results-list'),
    resultsPages: document.querySelector('.results-pages'),
    recipeDiv: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping-list'),
    likesInd: document.querySelector('.likes-ind'),
    likesList: document.querySelector('.likes-list'),
};

export const renderLoader = parent => {
    const markup = `<div class="loader"></div>`;
    parent.insertAdjacentHTML('afterbegin', markup);
};
export const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if(loader) loader.remove(); // loader.parentElement.removeChild(loader);
};