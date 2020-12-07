import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Country } from '../Model/Country';
import { State } from '../Model/State';

@Injectable({
  providedIn: 'root'
})
export class FormService {


  
  constructor(private httpClient:HttpClient) { }


  getCreditCardMonths(startMonth:number):Observable<number[]>
  {
    let data:number[]=[]

    //build an array for month dropdown list
    //start at current month and loop until 12 month

    for(let theMonth=startMonth;theMonth<=12;theMonth++)
    data.push(theMonth)


    return of(data)
    

  }




  getCreditCardYears():Observable<number[]>
  {
    let data:number[]=[]

    //build an array for year dropdown list
    //start at current year and loop until 10 years
    const startYear:number=new Date().getFullYear();
    const endYear:number=startYear+10;

    for(let theYear=startYear;theYear<=endYear;theYear++)
    data.push(theYear)


    return of(data)
    

  }

  getCountries()
  {
    return this.httpClient.get<Country[]>('http://localhost:8080/countries');   //get all countries
  }

  getStates(countryCode:String)
  {
    return this.httpClient.get<State[]>('http://localhost:8080/getStatesByCode/'+countryCode);   //get states by country id
  }


  
}
