import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../Model/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  cartItems:CartItem[]=[];
  //subject is a subclass of observable ,we can use subject to publish events in our code , the event will be sent to all of the subscribers ,and in this case subscriber is CartStatusComponent
  totalPrice: Subject<number>=new Subject<number>();   //event for subscribe
  totalquantity:Subject<number>=new Subject<number>();    //event for subscribe
  constructor() { }








  //add items in cart logic

  addToCart(theCartItem:CartItem)

  {

  //check if we have already the item in our cart
 let alreayExistsinCart:boolean=false;
 let existingCartItem: CartItem=undefined;

 if(this.cartItems.length>0)
 {

  for(let tempcartitem of this.cartItems)
  {

    
    if(tempcartitem.id==theCartItem.id)    //check if item is already present in cart based on product id or cart id
    {
      existingCartItem=tempcartitem;
      break;
    }
  }
  //check if same item is present already
  if(existingCartItem!=undefined)
  alreayExistsinCart=true;
 }

 if(alreayExistsinCart)    //item already exists then only increase the quantity
 {
   //increment the quantity
 existingCartItem.quantity++;
 }

 else{
  //just add the item in array
  this.cartItems.push(theCartItem);
 }

 //compute cart totals and price

 this.computeCartTotals();

}


  computeCartTotals() {
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;

    for(let currentcartItem of this.cartItems)
    {
      totalPriceValue+=currentcartItem.quantity*currentcartItem.price;
      totalQuantityValue+=currentcartItem.quantity;
    }


    //publish the new values ,all subscriber will receive the data
    this.totalPrice.next(totalPriceValue);  //one event for totalprice
    this.totalquantity.next(totalQuantityValue);    //one event for totalquantity

    this.logCartData(totalPriceValue,totalQuantityValue);
  }


  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('contents of the cart');
    for(let tempcartitem of this.cartItems )
    {
      const subtotalprice=tempcartitem.quantity*tempcartitem.price;
      console.log('name: ', tempcartitem.name, 'quantity: ', tempcartitem.quantity,'Price' ,tempcartitem.price , 'subTotalPrice: ', tempcartitem.price );
    }

    console.log('total price value' ,totalPriceValue ,'totalQuantityValue' , totalQuantityValue);
  }





  decrementQuantity(thetempcartItem: CartItem) {



   let quantity=thetempcartItem.quantity--;

   //if quantity becomes 0 then remove cart item
   if(quantity==0)
   this.remove(thetempcartItem);
   else
   this.computeCartTotals();    //else compute total price
  }




  remove(thetempcartItem: CartItem) {

    //get index of item in the array

    const itemindex=this.cartItems.findIndex(tempcartItem=>tempcartItem.id==thetempcartItem.id);



    //if found remove the item from given array using given index

    if(itemindex>-1)
    this.cartItems.splice(itemindex,1);


    
  }



  

  
  
}
