import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-listby-category',
  templateUrl: './product-listby-category.component.html',
  styleUrls: ['./product-listby-category.component.css']
})
export class ProductListbyCategoryComponent implements OnInit {

  searchMode:boolean;
  products:Product[];
  constructor(private ProductService:ProductService,
    private route:ActivatedRoute) { }

 
  ngOnInit(): void {
    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    this.route.paramMap.subscribe(() =>
    {
      if(this.searchMode)
    this.searchProducts();

    else{
      this.listProducts();
    }
    });
    
  
    
   }
  
   listProducts() {

    
  
     this.ProductService.getProductList().subscribe(              
      data =>
      {
        this.products=data;   
      }

     )
    
   }


   searchProducts() {
    const theKeyword:String=this.route.snapshot.paramMap.get('keyword');


    this.ProductService.searchProducts(theKeyword).subscribe(

    data=>
     {
    this.products=data;
    }

    )
  }


}
