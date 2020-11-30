import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/Model/cart-item';
import { Product } from 'src/app/Model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

product:Product=new Product();

  constructor(private route:ActivatedRoute,
              private productService:ProductService,
              private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>
    {
       this.productDetails();
    })


  }


  productDetails() {
    //get the 'id' parameter string from route and convert it into string
   const productid:number=+this.route.snapshot.paramMap.get('id');

   this.productService.getProductDetail(productid).subscribe(
   data =>
   {
       this.product=data;
   }

   )
    
  }




  addToCart(theProduct:Product)
  {
    console.log('Adding to cart',theProduct.name,'  product price',theProduct.price);
    const cartItem=new CartItem(theProduct);
    this.cartService.addToCart(cartItem);
  }

  

}
