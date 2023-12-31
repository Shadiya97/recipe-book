import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { Recipe } from '../recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
 id!:number;
 editMode=false;
 recipeForm!: FormGroup

  constructor(private route:ActivatedRoute, private recipeService: RecipeService, private router: Router, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.editMode= params['id'] != null;
      console.log(this.editMode);
      this.initForm();
    }
    )
  }

  onSubmit(){
    // console.log(this.recipeForm);
    // const value=this.recipeForm.value
    // const newRecipe= new Recipe( value.name,value.imagePath,value.description,value.ingredients)
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.dataStorageService.storeRecipes();
      
    } 
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
      this.dataStorageService.storeRecipes();
    } 
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,Validators.required)
      })
    )
  }
  // Validators.pattern(/^[1-9]+[0-9]*$/)

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDesc='';
    let recipeIngredients = new FormArray<any>([])

    if (this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDesc=recipe.description;

      if(recipe['ingredients']){
       for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount,Validators.required)
          }))
        }
        // Validators.pattern(/^[1-9]+[0-9]*$/
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingredients': recipeIngredients

    })
  }

  get controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

onCancel(){
  this.router.navigate(['../'],{relativeTo:this.route});
}

onDeleteIngredient(index:number){
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  // this.recipeService.deleteIngredient(id);
}
}
