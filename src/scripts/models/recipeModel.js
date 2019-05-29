import axios from 'axios';
import { key } from '../config';

export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const resp = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = resp.data.recipe.title;
            this.author = resp.data.recipe.publisher;
            this.image = resp.data.recipe.image_url;
            this.url = resp.data.recipe.source_url;
            this.ingredients = resp.data.recipe.ingredients;
        } catch(err){ console.log('recipeModel issue: ' + err) }
    }
    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }
    calcServings(){
        this.servings = 4;
    }
}