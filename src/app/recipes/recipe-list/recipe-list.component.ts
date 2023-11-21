import { Component,OnDestroy,OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
 recipes: Recipe[]=[];
 subscription!:Subscription;
  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute, private dataStorageService:DataStorageService) {
    
   }

  ngOnInit(): void {
    this.dataStorageService.fetchRecipes().subscribe()
    this.recipes=this.recipeService.getRecipes();
    
    this.subscription=this.recipeService.UpdatedRecipeArray.subscribe((response:Recipe[])=>{
      this.recipes=response;
    })
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.route})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
