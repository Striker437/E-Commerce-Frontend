import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/Model/cart-item';
import { Product } from 'src/app/Model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-listby-category',
  templateUrl: './product-listby-category.component.html',
  styleUrls: ['./product-listby-category.component.css']
})
export class ProductListbyCategoryComponent implements OnInit {

  searchMode:boolean;
  DeleteMode:boolean;
  products:Product[];
  constructor(private ProductService:ProductService,
             private route:ActivatedRoute,
             private cartService:CartService) { }

 
  ngOnInit(): void {
    this.DeleteMode=this.route.snapshot.paramMap.has('deleteIdp');
    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    this.route.paramMap.subscribe(() =>
    {
      if(this.searchMode)
    this.searchProducts();

    else if(this.DeleteMode)
    this.DeleteProduct();

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


   searchProducts() {                             //search products functionality
    const theKeyword:String=this.route.snapshot.paramMap.get('keyword');


    this.ProductService.searchProducts(theKeyword).subscribe(

    data=>
     {
    this.products=data;
    }

    )
  }


  addToCart(theProduct:Product)
  {
    console.log('Adding to cart',theProduct.name,'  product price',theProduct.price);
    const cartItem=new CartItem(theProduct);
    this.cartService.addToCart(cartItem);
  }






  DeleteProduct() {                    //delete product

    const deleteId:String=this.route.snapshot.paramMap.get('deleteIdp');


    this.ProductService.DeleteProduct(deleteId).subscribe(

      data=>
      {
        this.products=data;
      }

      

    

    )
    
  }





}
