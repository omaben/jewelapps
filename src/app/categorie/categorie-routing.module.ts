import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriePage } from './categorie';

const routes: Routes = [
  {
    path: '',
    component: CategoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriePageRoutingModule { }
