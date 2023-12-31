import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
@Injectable({
    providedIn:'root'
})

export class DataStorageService{
    constructor(private http: HttpClient,private recipeService: RecipeService, private authService: AuthService){}


    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
       return this.http.put('https://recipe-book-project-ee671-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe((response)=>{
        console.log(response)
       })
    }

    fetchRecipes(){

        return this.http.get<Recipe[]>('https://recipe-book-project-ee671-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
        map((recipes:Recipe[]) =>{
            return recipes.map((recipe)=>{
                return {
                    ...recipe, 
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                }
            });
        }),tap((recipes:Recipe[])=>{
            this.recipeService.setRecipes(recipes);
        }) )
    }

    deleteRecipe(id:number){
        return this.http.delete<Recipe>(`https://recipe-book-project-ee671-default-rtdb.firebaseio.com/recipes/${id}.json`).subscribe()
    }
}