import { elements } from './base';

const renderRecipe = recipe => {
    const markup = `
        <li class="results-list-item">
            <a class="results-list-item-link" href="#${recipe.recipe_id}">
                <figure class="results-list-item-figure">
                    <img src="${recipe.image_url}" alt="${recipe.title}" onerror="this.onerror=null;this.src='images/notfound.jpg';">
                </figure>
                <div class="results-list-item-data">
                    <h4 class="results-list-item-title">${limitTitle(recipe.title, 23)}</h4>
                    <p class="results-list-item-author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.resultsList.insertAdjacentHTML('beforeend', markup);
};

export const getInput = () => elements.searchInput.value;
export const clearInput = () => { elements.searchInput.value = '' };
export const clearResults = () => {
    elements.resultsList.innerHTML = '';
    elements.resultsPages.innerHTML = '';
};

export const limitTitle = (title, limit = 20) => {
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((accum, curr)=>{
            if(accum + curr.length <= limit) newTitle.push(curr);
            return accum + curr.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

const renderButton = (pg, type) => `
    <button class="results-pages-btn ${type}" data-goto="${type === 'prev' ? pg - 1 : pg + 1}">
        <span>page ${type === 'prev' ? pg - 1 : pg + 1}</span>
        <i class="fas fa-chevron-circle-${type === 'prev' ? 'left' : 'right'}"></i>
    </button>
`;
const renderButtons = (pg, totRes, perPg) => {
    const pages = Math.ceil(totRes / perPg);
    let button;
    if(pg === 1 && pages > 1){
        button = renderButton(pg, 'next'); // only go to next pg
    } else if(pg < pages){
        // both btns
        button = `
            ${renderButton(pg, 'prev')}
            ${renderButton(pg, 'next')}
        `;
    } else if(pg === pages && pages > 1){
        button = renderButton(pg, 'prev'); // only go to prev pg
    } else{
        button = '';
        button = `<h2 class="result-error">no results were found, please enter another search term</h2>`;
        setTimeout(()=>{ document.querySelector('.result-error').remove() }, 2000);
    }
    elements.resultsPages.insertAdjacentHTML('afterbegin', button);
};

export const renderRecipes = (recipes, pg = 1, perPg = 5) => {
    const start = (pg - 1) * perPg;
    const end = pg * perPg;
    recipes.slice(start, end).forEach( renderRecipe );
    renderButtons(pg, recipes.length, perPg);
};