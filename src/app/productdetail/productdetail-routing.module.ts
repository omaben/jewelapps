import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductdetailPage } from './productdetail';

const routes: Routes = [
  {
    path: '',
    component: ProductdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductdetailPageRoutingModule { }
