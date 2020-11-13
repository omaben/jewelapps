import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollectionPage } from './collection';

const routes: Routes = [
  {
    path: '',
    component: CollectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionPageRoutingModule { }
