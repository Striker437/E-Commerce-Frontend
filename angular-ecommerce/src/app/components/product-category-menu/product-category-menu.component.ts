import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/Model/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {


  ProductCategories:ProductCategory[];
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.productService.getCategories().subscribe(
     data=>
     {
       console.log('getting all categories'+JSON.stringify(data));
       this.ProductCategories=data;
     }

    )
    
    
  }

}
