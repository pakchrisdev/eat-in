import '../styles/main.scss';

import Search from './models/searchModel';
import Recipe from './models/recipeModel';
import Shopping from './models/shoppingModel';
import Favorites from './models/favoritesModel';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingView from './views/shoppingView';
import * as favoritesView from './views/favoritesView';

const state = {}; // contains search obj, curr recipe obj, shopping list obj, liked recipes

// SEARCH CONTROLLER
const controlSearch = async () => {
    const query = searchView.getInput(); // query from view
    if(query){
        state.search = new Search(query); // add new search obj to state
        searchView.clearInput(); // prepare ui for results
        searchView.clearResults();
        renderLoader(elements.resultsDiv);
        try{
            await state.search.getRecipes(); // perform search; getRecipe() is async, so this returns a promise... needs to be await
            // console.log(state.search.recipes) // render results on ui
            console.log(state.search.getRecipes().length)
            clearLoader();
            searchView.renderRecipes(state.search.recipes);
        } catch(err){
            console.log('controlSearch issue: ' + err);
            clearLoader();
        }
    }
};
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
elements.resultsPages.addEventListener('click', e => {
    const btn = e.target.closest('.results-pages-btn');
    if(btn){
        const goto = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderRecipes(state.search.recipes, goto);
    }
});

// RECIPE CONTROLLER
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', ''); // get id from url
    if(id){ // prepare ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipeDiv);
        if(state.search) searchView.highlightSelected(id);
        state.recipe = new Recipe(id); // create new recipe obj
        try{
            await state.recipe.getRecipe();  // get recipe data

            // state.recipe.parseIngredients();
            
            state.recipe.calcServings(); // calc servings time
            state.recipe.calcTime();
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.favorites.isFavorite(id));
        } catch(err){ console.log('controlRecipe issue: ' + err) }
    }
};
// window.addEventListener('hashchange', controlRecipe);
['hashchange', 'load'].forEach(event => { window.addEventListener(event, controlRecipe) });

// SHOPPING CONTROLLER
const controlShopping = () => {
    if(!state.shopping) state.shopping = new Shopping();
    state.recipe.ingredients.forEach(el => {
        const item = state.shopping.addItem(el);
        shoppingView.renderItem(item);
    });
};

// FAVORITES CONTROLLER
const controlFavorites = () => {
    if(!state.favorites) state.favorites = new Favorites();
    const currId = state.recipe.id;
    if(!state.favorites.isFavorite(currId)){ // not liked
        const newFav = state.favorites.addFavorite(
            currId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.image
        ); // add fav to state
        favoritesView.toggleFavBtn(true); // toggle button
        favoritesView.renderFavorites(newFav); // add to ui list
    } else{ // liked
        state.favorites.deleteFavorite(currId); // remove fav from state
        favoritesView.toggleFavBtn(false); // toggle btn
        favoritesView.deleteFavorite(currId); // remove to ui list
    }
    favoritesView.toggleFavDiv(state.favorites.getNumFavorites());
};

window.addEventListener('load', () => {
    state.favorites = new Favorites();
    state.favorites.getFromLS();
    favoritesView.toggleFavDiv(state.favorites.getNumFavorites()); // toggle fav ind
    state.favorites.favorites.forEach(fav => favoritesView.renderFavorites(fav));
});

elements.recipeDiv.addEventListener('click', e => {
    if(e.target.matches('.add-shopping, .add-shopping *')){
        controlShopping(); // console.log(state.recipe.ingredients)
    } else if(e.target.matches('.add-fav, .add-fav *')){
        controlFavorites(); // console.log('add-fav')
    }
});
elements.shoppingList.addEventListener('click', e => {
    const id = e.target.closest('.shopping-list-item').dataset.id;
    if(e.target.matches('.shopping-list-item-remove, .shopping-list-item-remove *')){
        state.shopping.deleteItem(id);
        shoppingView.deleteItem(id);
    }
});



// <img onerror="this.onerror=null;this.src='imagefound.gif';">