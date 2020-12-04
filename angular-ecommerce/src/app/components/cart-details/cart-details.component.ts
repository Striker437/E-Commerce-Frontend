import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/Model/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems:CartItem[]=[];
  tempcartItem:CartItem;
  totalPrice:number=0;
  totalQuantity:number=0;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }





  listCartDetails() {
    //get a handle to cart items

    this.cartItems=this.cartService.cartItems;

    //subscribe to the cart total price

    this.cartService.totalPrice.subscribe(
      data=>
      {
        this.totalPrice=data;
      }

    )

     //subscribe to the cart total quantity

     this.cartService.totalquantity.subscribe(
      data=>
      {
        this.totalQuantity=data;
      }

    )

     //compute cart total price and quantity

    // this.cartService.computeCartTotals();


  }



  //for increment quantity in cart details 
  IncrementQuantity(thetempcartItem:CartItem)
  {
    this.cartService.addToCart(thetempcartItem);

  }



  //decrement the quantity for given cart item 

  DecrementQuantity(thetempcartItem:CartItem)
  {
   this.cartService.decrementQuantity(thetempcartItem);
   

  }



  //remove the particular cart item(particular product)

  remove(thetempcartItem:CartItem)
  {
    this.cartService.remove(thetempcartItem);
  }

}
