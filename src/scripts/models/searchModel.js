import axios from 'axios';
import { key } from '../config';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getRecipes(){
        try{
            const resp = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.recipes = resp.data.recipes;
        } catch(err){ console.log('searchModel issue: ' + err) }
    }
}

