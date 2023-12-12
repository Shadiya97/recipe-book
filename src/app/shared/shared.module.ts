import { NgModule } from "@angular/core";
import { DropDownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[DropDownDirective, LoadingSpinnerComponent],
    imports:[CommonModule],
    exports:[DropDownDirective, LoadingSpinnerComponent]
})
export class SharedModule{}