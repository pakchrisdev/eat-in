export default class Favorites{
    constructor(){
        this.favorites = [];
    }
    addFavorite(id, title, author, img){
        const favorite = { id, title, author, img };
        this.favorites.push(favorite);
        this.saveToLS(); // persist in LS
        return favorite;
    }
    deleteFavorite(id){
        const index = this.favorites.findIndex(el => el.id === id);
        this.favorites.splice(index, 1);
        this.saveToLS(); // persist in LS
    }
    isFavorite(id){ return this.favorites.findIndex(el => el.id === id) !== -1; }
    getNumFavorites(){ return this.favorites.length; }
    saveToLS(){
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
    getFromLS(){
        const favs = JSON.parse(localStorage.getItem('favorites'));
        if(favs) this.favorites = favs;
    }
}