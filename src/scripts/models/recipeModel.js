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
    // parseIngredients(){
    //     const long = ['tablespoons', 'tablespoon', 'teaspoons', 'teaspoon', 'ounces', 'ounce'];
    //     const short = ['tbsp', 'tbsp', 'tsp', 'tsp', 'oz', 'oz'];
    //     const newIngreds = this.ingredients.map(ing => {
    //         let ingred = ing.toLowerCase();
    //         long.forEach((unit, i) => { // uniform units
    //             ingred = ingred.replace(unit, short[i]);
    //         });
    //         ingred = ingred.replace(/ *\([^)]*\) */g, ' '); // remove parenthesis

    //         const ingredArr = ingred.split(' ');
    //         const unitInd = ingredArr.findIndex(unit => short.includes(unit));
    //         let ingredObj;
    //         if(unitInd > -1){
    //             // unit it present
    //             const arrCount = ingredArr.slice(0, unitInd);
    //             let count;
    //             if(arrCount.length === 1) count = eval(ingredArr[0].replace('-', '+'));
    //             else count = eval(ingredArr.slice(0, unitInd).join('+'));
    //             ingredObj = {
    //                 count,
    //                 unit: ingredArr[unitInd],
    //                 ingred: ingredArr.slice(unitInd + 1).join(' ')
    //             };
    //         } else if(parseInt(ingredArr[0], 10)){
    //             ingredObj = {
    //                 count: parseInt(ingredArr[0], 10),
    //                 unit: '',
    //                 ingred: ingredArr.slice(1).join(' ')
    //             }; // no unit but 1st el is a num
    //         } else if(unitInd === 1){
    //             ingredObj = { count: 1, unit: '', ingred }; // no unit or number in 1st pos
    //         }
    //         return ingredObj;
    //     });
    //     this.ingredients = newIngreds;
    // }
}