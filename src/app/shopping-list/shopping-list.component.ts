import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
ingredients: Ingredient[]=[];
private updIngArray!: Subscription; 
  constructor(private slService: ShoppingListService, private loggingService:LoggingService) { }

  ngOnInit(): void {
    this.ingredients=this.slService.getIngredients()
    this.updIngArray=this.slService.updatedIngArray
    .subscribe((response:Ingredient[])=>{
      this.ingredients=response;
    })
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit')
  }
  
  ngOnDestroy(): void {
    this.updIngArray.unsubscribe()
  }

  onEditItem(i:number){
    this.slService.startedEditing.next(i)
  }
}
