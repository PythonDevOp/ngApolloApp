import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockPickerComponent } from './stock-picker/stock-picker.component';

const routes: Routes = [
  { path: '', component: StockPickerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
