import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/Model/cart-item';
import { Product } from 'src/app/Model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
 // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  
  products:Product[];
  currentCategoryId:number;
  DeleteMode: boolean;
  constructor(private ProductService:ProductService,
              private route:ActivatedRoute,
              private cartService:CartService) { }

  ngOnInit(): void {
    this.DeleteMode=this.route.snapshot.paramMap.has('deleteIdc');                          
    this.route.paramMap.subscribe(() =>
    {
      if(this.DeleteMode)
      this.DeleteProduct();
      else
      this.listProductsbyCategory();
    });
    
    
  }
  listProductsbyCategory() {                //method for getting products by category id

    //check if id parameter is available
    const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');    //returns true or false
    if(hasCategoryId)
    {
      //get the id param string and convert string into integer using '+' symbol
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id');
    }

    else
    {
     //not category id available  ...default to category id 1
      this.currentCategoryId=1;
    }
    this.ProductService.getProductListbycategory(this.currentCategoryId).subscribe(               //subscribe is used to invoke the actual method of rest api from service class
     data =>
     {
       this.products=data;    //get the response in products array
     }

    )
    
  }



  addToCart(theProduct:Product)
  {
    console.log('Adding to cart',theProduct.name,'  product price',theProduct.price);
    const cartItem=new CartItem(theProduct);  //pass the product to newly created cartitem in constructor where it will initialise the id, name and imageurl for product
    this.cartService.addToCart(cartItem);
  }




  DeleteProduct() {                    //delete product

    const deleteId:String=this.route.snapshot.paramMap.get('deleteIdc');


    this.ProductService.DeleteProductCategory(deleteId).subscribe(

      data=>
      {
        this.products=data;
      }

      

    

    )
    
  }















}
