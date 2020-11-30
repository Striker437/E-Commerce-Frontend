import { Product } from './product';

export class CartItem {

    id:number;
    name:String;
    imageURL:String;
    price:number;
    quantity:number;

    constructor(product:Product)
    {
        this.id=product.id;
        this.name=product.name;
        this.imageURL=product.imageURL;
        this.price=product.price;
        this.quantity=1;

    }
}
