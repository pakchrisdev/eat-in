import uniqid from 'uniqid';

export default class Shopping{
    constructor(){
        this.items = [];
    }

    addItem(ing){
        const ingredient = {
            id: uniqid(),
            ingred: ing
        }
        this.items.push(ingredient);
        return ingredient;
    }
    deleteItem(id){
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
    }
}