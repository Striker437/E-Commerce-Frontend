import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products:Product[];
  constructor(private ProductService:ProductService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    
  }

  doSearch(value:String)
  {
    console.log('value= ${value}');
    this.router.navigate(['/search',value]);
  }
 

  

}
