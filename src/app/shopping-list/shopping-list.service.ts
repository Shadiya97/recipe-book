import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  updatedIngArray = new Subject <Ingredient[]>();
 startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomato', 6),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }
  onItemAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.updatedIngArray.next(this.ingredients.slice());
  }

  addToShoppingList(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients)
    this.updatedIngArray.next(this.ingredients.slice());

    /* I guess no need to emit updatedIngArray because push reflected due to component instantiation due to changing page to shopping list */
  }

  updateorDeleteIngredient(id:number,updatedIng?:Ingredient){
    if (updatedIng){
      this.ingredients.splice(id,1,updatedIng);
    }
    else{
    this.ingredients.splice(id,1);
    }
    this.updatedIngArray.next(this.ingredients.slice());
  }
}
