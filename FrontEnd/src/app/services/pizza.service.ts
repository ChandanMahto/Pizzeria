import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ADD_TO_CART_URL, ORDER_PIZZA } from '../constants/url';
@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  constructor(private http:HttpClient) { }
  getPizza(){
    return this.http.get(ORDER_PIZZA);
  }
  addToCart(id:string,name:any,price:number,description:any,image:any){
    const data={Id:id,qty:1,name:name,price:price,description:description,image:image,pizzaCheck:true}
    console.log(data);
    
    return this.http.post(ADD_TO_CART_URL,data);
  }
  
}
