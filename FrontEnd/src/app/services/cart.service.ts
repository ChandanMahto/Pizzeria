import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartData:any;
  total:number=0;
  constructor(private http:HttpClient) { }
  getCart(){
    this.cartData="http://localhost:3000/pizza/cart";
    return this.http.get("http://localhost:3000/pizza/cart");
  }
  removeItem(id:string){
    const data={Id:id};
    console.log(data);
    
    return this.http.post("http://localhost:3000/pizza/remove",data);
  }
  addQuantity(id:string){
    const data={Id:id};
    console.log(data);
    
    return this.http.post("http://localhost:3000/pizza/addQuantity",data);
  }
  minusQuantity(id:string){
    const data={Id:id};
    console.log(data);
    
    return this.http.post("http://localhost:3000/pizza/minusQuantity",data);
  }
  getTotal():number{
    for(let items of this.cartData){
      this.total+=parseInt(items.price);
    }
    console.log(this.total);
    
    return this.total;
  }
  deleteIngredientsFromCart(Id:any,id:any,name:any,price:any,total:number){
    const data={Id:Id,ingId:id,ingName:name,ingPrice:price,ingTotalPrice:total};
    console.log(data);
    
    return this.http.post("http://localhost:3000/pizza/deleteIngredientsFromCart",data);
  }
}
