import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListbyCategoryComponent } from './components/product-listby-category/product-listby-category.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: 'search/:keyword' , component:ProductListbyCategoryComponent},
 {path: 'category/:id' , component:ProductListComponent},
 {path: 'category' , component:ProductListComponent},
 {path: 'product/:id' , component:ProductDetailsComponent},
 {path: 'product' , component:ProductListbyCategoryComponent},
 {path: '' , redirectTo:'/product' ,pathMatch:'full'},
 {path: '**' , redirectTo:'/product',pathMatch:'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
