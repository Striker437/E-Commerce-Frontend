import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice:number=0.0;
  totalQuantity:number=0.0;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {

    this.updateCartStatus();
  }
  updateCartStatus() {
    //subscribe to the total price
    this.cartService.totalPrice.subscribe(
      data=>{
        this.totalPrice=data;

      }
    )


    this.cartService.totalquantity.subscribe(

      data=>
      {
        this.totalQuantity=data;
      }


    )

    //subsrcibe to total quantity
  }

}
