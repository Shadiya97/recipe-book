import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoggingService } from "../logging.service";

const routes:Routes = [
    { path:'', component: ShoppingListComponent },
]

@NgModule({
    declarations:[ShoppingListComponent,
        ShoppingEditComponent],
    imports:[CommonModule,FormsModule,RouterModule.forChild(routes)],
    // providers:[LoggingService]
 
})

export class ShoppingListModule{}