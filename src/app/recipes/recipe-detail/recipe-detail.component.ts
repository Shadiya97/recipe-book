import { Component,  OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe!:Recipe;
id!:number;
  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute,private recipeService:RecipeService, private router:Router,private dataStorageService:DataStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=+params['id'];
      this.recipe= this.recipeService.getRecipe(this.id)})
  }


toShoppingList(ingredients:Ingredient[]){
 this.shoppingListService.addToShoppingList(ingredients);
}

onEditRecipe(){
  this.router.navigate(['edit'],{relativeTo:this.route})
}

onDeleteRecipe(){
  this.recipeService.deleteRecipe(this.id);
  this.router.navigate(['recipes']);
  this.dataStorageService.deleteRecipe(this.id);
}
}
