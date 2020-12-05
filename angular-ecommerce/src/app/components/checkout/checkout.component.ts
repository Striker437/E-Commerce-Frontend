import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkOutFormGroup:FormGroup   //formgroup name we will use this in our html
  totalPrice:number=0;
  totalQuantity:number=0;
  creditCardMonths:number[]=[];
  creditCardYears:number[]=[];
  constructor(private formBuilder:FormBuilder,
              private formService:FormService,
              private cartService:CartService) { }   //formbuilder is use to build the form

  ngOnInit(): void {

    this.checkOutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({         //for user first name ,last name and email
         firstName: [''],
         lastName:[''],
         email:['']

      }),

      shippingAddress:this.formBuilder.group({
        street: [''],
        city:[''],
        state:[''],
        country: [''],
        zipcode:[''],
      }),

      billingAddress:this.formBuilder.group({
        street: [''],
        city:[''],
        state:[''],
        country: [''],
        zipcode:[''],
      }),

      

      creditCard:this.formBuilder.group({
        cardType: [''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode: [''],
        expirationMonth:[''],
        expirationYear:['']
      })
    });


    this.getCreditCardMonths();

    this.getCreditCardYears();

    this.reviewOrder();


    
  }
  
 

  

  //copy shipping address to billing automatically 
  copyShippingAddressToBillingAddress(event)
  {
    if(event.target.checked)
    {
      this.checkOutFormGroup.controls.billingAddress
      .setValue(this.checkOutFormGroup.controls.shippingAddress.value);    //copy shipping to billing address on checking checkbox in frontend
    }

    else{
      this.checkOutFormGroup.controls.billingAddress.reset();   //clear the values in billing address on unchecking the checkbox
    }
    
  }


  onSubmit()
  {
    console.log("Handling form event",this.checkOutFormGroup.get('customer').value);//getting the value for form control in input
  }




  reviewOrder() {

    this.cartService.totalquantity.subscribe(
      data=>{
        this.totalQuantity=data;

      }
    )


    this.cartService.totalPrice.subscribe(
      data=>{
        this.totalPrice=data;

      }
    )
    this.cartService.computeCartTotals();
    
  }




  handleMonthsAndYears()
  {
    const creditCardFormGroup=this.checkOutFormGroup.get('creditCard')   //get the form group name
    const currentYear:number=new Date().getFullYear();     //get the current year
    const selectedYear:number=creditCardFormGroup.value.expirationYear;   //get the selected year from frontend ui

    //if the current year is equal to selected year ,then start with current month
    let  startMonth:number;
    if(currentYear==selectedYear)
    startMonth=new Date().getMonth()+1;


    else
    startMonth=1;

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data=>
      {
this.creditCardMonths=data
      }
    )

  }


  getCreditCardMonths() {

    //populate credit card months
    const startMonth:number=new Date().getMonth()+1;
    this.formService.getCreditCardMonths(startMonth).subscribe(
      data=>
      {
        console.log("retrieved credit card month",JSON.stringify(data));
         this.creditCardMonths=data;
      }
    )
    
  }



  getCreditCardYears() {


    //populate credit card years


    this.formService.getCreditCardYears().subscribe(
      data=>
      {
        console.log("retrieved credit card month",JSON.stringify(data));
         this.creditCardYears=data;
      }
    )
    
  }



  






  

}
