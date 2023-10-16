import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  constructor(private slService:ShoppingListService) { }
  subscription!:Subscription;
  editMode=false;
  editedItemindex!:number;
  editedItem!:Ingredient;
  @ViewChild('f',{static:false}) slForm!: NgForm;
  ngOnInit(): void {
    this.subscription=this.slService.startedEditing.subscribe((index:number)=>{
      this.editMode=true;
      this.editedItemindex=index;
      this.editedItem=this.slService.getIngredient(this.editedItemindex);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
      
    })

  }

  

  onSubmit(form:NgForm){
    const value= form.value;
    const newIng= new Ingredient(value.name,value.amount);
    if(this.editMode){
      console.log(value.name);
      this.slService.updateorDeleteIngredient(this.editedItemindex,newIng);
    }
    else{
    this.slService.onItemAdded(newIng);
    }
    this.editMode=false;
    form.reset();
   }

   ngOnDestroy(): void {
     this.subscription.unsubscribe();
   }

   onClickClear(){
    this.slForm.reset();
    this.editMode=false;
   }

   onClickDelete(){
    this.slService.updateorDeleteIngredient(this.editedItemindex);
    this.onClickClear();
   }
}
