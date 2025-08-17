import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ADD_CART_URL, ADD_INGREDIENTS, CART_URL, DELETE_INGREDIENTS, INGREDIENTS } from '../constants/url';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  item:any=[];
  hi:any=[];
  constructor(private http:HttpClient) { }
  getIngredients(){
    return this.http.get(INGREDIENTS);
  }
  addIngredientsToCart(id:number,name:string){
    const data={ingId:id,ingName:name};
    console.log(data);
    
   //items.map()
    

  //  items.forEach((ng:any)=>{
  //   const data={ingId:ng.id,ingName:ng.name,ingPrice:ng.Price}
  //    console.log(ng.id+" "+ng.name+" "+ng.price+" xyz "+ng+" "+data)    
  //    this.hi= this.http.post("http://localhost:3000/pizza/addCart",data); 
  //   // this.hi={ng.id,ng.name,ng.price};
  //    this.item.push(this.hi);
  //  })
  //   console.log(items.name+" "+items.id+" "+items.price+" "+items.value+" "+this.item);
  //   return this.hi;
    return this.http.post(ADD_CART_URL,data); 
  }
  addIngredientsPriceToCart(price:number){
    const data={ingPrice:price};
    console.log(data);
    
    return this.http.post(ADD_INGREDIENTS,data);
  }
  deleteIngredientsFromCart(id:number,name:string){
    const data={ingId:id,ingName:name};
    console.log(data);
    
    return this.http.post(DELETE_INGREDIENTS,data);
  }
}
