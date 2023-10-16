import { EventEmitter, Injectable, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn:'root'
}
  
)
export class RecipeService {
UpdatedRecipeArray= new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Hyderabadi Chicken Biryani',
  //     `Long-grained rice seasoned with aromatic spices like saffron and stacked with tender and juicy chicken in a rich sauce. The dish is then covered, and the lid is fastened with dough before the biryani is cooked over low heat. This is unquestionably a special occasion meal.`,
  //     'https://www.licious.in/blog/wp-content/uploads/2020/12/Hyderabadi-chicken-Biryani.jpg',[new Ingredient('Chicken',1),new Ingredient('Basmati Rice (cups)',2)]
  //   ),
  //   new Recipe(
  //     'Appam',
  //     `Appam is a type of pancake, originating from South India, made with fermented rice batter and coconut milk, common in Kerala, India. It is eaten most frequently for breakfast or dinner.

  //     It is usually made using raw rice, coconut milk, coconut, yeast, sugar and cooked rice.`,
  //     'https://www.kannammacooks.com/wp-content/uploads/elaneer-appam-tender-coconut-appam-recipe-1-3.jpg',
  //     [new Ingredient('raw rice (cups)',2),new Ingredient('coconut grated (cups)',0.5), new Ingredient('cooked rice (cups)',0.5)]
  //   )
  // ];

  private recipes:Recipe[]=[]

setRecipes(recipes:Recipe[]){
  this.recipes=recipes;
  this.UpdatedRecipeArray.next(this.recipes.slice());
}

  getRecipes(){
    return this.recipes.slice();
  }

getRecipe(index:number){
  return this.recipes[index]
}

addRecipe(recipe:Recipe){
  this.recipes.push(recipe)
  this.UpdatedRecipeArray.next(this.recipes.slice());
}

updateRecipe(index:number,newRecipe:Recipe){
  this.recipes.splice(index,1,newRecipe);
  this.UpdatedRecipeArray.next(this.recipes.slice());
}

deleteRecipe(index:number){
  this.recipes.splice(index,1);
  this.UpdatedRecipeArray.next(this.recipes.slice());
}

deleteIngredient(index:number){
  this.recipes[index].ingredients.splice(index,1);
  this.UpdatedRecipeArray.next(this.recipes.slice());
}
}
