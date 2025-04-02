import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopLayoutComponent } from './shop-layout/shop-layout.component';

const routes: Routes = [
    {
       path: '',
       component: ShopLayoutComponent,
       children: [
         { path: '', component: HomeComponent }
       ]
     }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
