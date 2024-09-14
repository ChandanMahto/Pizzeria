import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  url:string= 'http://localhost:3000/pizza/orderpizza';
  constructor(private http:HttpClient) { }
  getPizza(){
    console.log(this.http.get(this.url));
    
    return this.http.get(this.url);
  }
  addToCart(id:string,name:any,price:number,description:any,image:any){
    const data={Id:id,qty:1,name:name,price:price,description:description,image:image,pizzaCheck:true}
    console.log(data);
    
    return this.http.post("http://localhost:3000/pizza/addToCart",data);
  }
  
}
