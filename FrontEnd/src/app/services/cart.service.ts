import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_QUANTITY_CART_URL, CART_URL, DELETE_INGREDIENTS, REMOVE_CART_URL, REMOVE_QUANTITY_CART_URL } from '../constants/url';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartData:any;
  total:number=0;
  constructor(private http:HttpClient) { }
  getCart(){
    return this.http.get(CART_URL)
  }
  removeItem(id:string){
    const data={Id:id};
    console.log(data);
    
    return this.http.post(REMOVE_CART_URL,data);
  }
  addQuantity(id:string){
    const data={Id:id};
    console.log(data);
    
    return this.http.post(ADD_QUANTITY_CART_URL,data);
  }
  minusQuantity(id:string){
    const data={Id:id};
    console.log(data);
    
    return this.http.post(REMOVE_QUANTITY_CART_URL,data);
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
    
    return this.http.post(DELETE_INGREDIENTS,data);
  }
}
