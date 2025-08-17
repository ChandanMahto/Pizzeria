import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_QUANTITY_CART_URL, CART_URL, DELETE_INGREDIENTS, REMOVE_ALL_CART_URL, REMOVE_CART_URL, REMOVE_QUANTITY_CART_URL } from '../constants/url';
import { CartDataModel } from '../model/cart-data.model';
import { map, Observable, of, Subject, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartData!: Observable<Array<CartDataModel>>;
  total:number=0;
  private resetSource = new Subject<void>();
  reset$ = this.resetSource.asObservable();
  constructor(private http:HttpClient) { }

  getCart(): Observable<Array<CartDataModel>>{
    this.cartData = this.cartData ? this.cartData : this.http.get<Array<CartDataModel>>(CART_URL)
    return this.cartData;
  }
  removeItem(id:string){
    const data={Id:id};
    console.log(data);
    
    return this.http.post(REMOVE_CART_URL,data);
  }
  removeAll(){
  return this.cartData.pipe(
    map(cartArray => cartArray.map(item => item.Id)),
    switchMap(ids => this.http.post(REMOVE_ALL_CART_URL, ids)),
    tap(()=>{
      this.cartData = of([]);
      this.resetSource.next();
    })
  );
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
    const data = this.cartData.pipe(map((cartArray) => cartArray.map(item =>{
       this.total+=item.price;
  })));
    console.log(data);
    return this.total;
  }
  deleteIngredientsFromCart(Id:any,id:any,name:any,price:any,total:number){
    const data={Id:Id,ingId:id,ingName:name,ingPrice:price,ingTotalPrice:total};
    console.log(data);
    
    return this.http.post(DELETE_INGREDIENTS,data);
  }
}
