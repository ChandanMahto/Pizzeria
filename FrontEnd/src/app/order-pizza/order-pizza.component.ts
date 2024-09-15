import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { PizzaService } from '../pizza.service';
import { forkJoin, take } from 'rxjs';

@Component({
  selector: 'app-order-pizza',
  templateUrl: './order-pizza.component.html',
  styleUrls: ['./order-pizza.component.css']
})
export class OrderPizzaComponent implements OnInit {
  pizzas:any;
  cartData:any;
  pizzaCheck:boolean=false;
  isError = false;
  constructor(private pizzaService:PizzaService,private cartService:CartService) { }

  ngOnInit(): void {
    const getPizza$ = this.pizzaService.getPizza();
    const getCart$ = this.cartService.getCart();
    forkJoin([getPizza$,getCart$]).pipe(take(1)).subscribe({
      next: ([pizzaData,cartData])=>{
        this.isError = false;
        this.pizzas=pizzaData;
        this.pizzas.forEach(function(element:any){
          element.qty=1;
        })
        this.cartData=cartData;
      },
      error: ()=>{
        this.isError = true;
      }
    })

    this.checkCart();
  }

  checkCart(){
    this.cartData.forEach((item:any)=>{
      if(item.pizzaCheck==true) this.pizzaCheck=true;
    })
  }

  addToCart(id:any,name:any,price:any,description:any,image:any){
    let count=0;
    if(count==0){
      this.pizzaService.addToCart(id,name,parseInt(price),description,image).subscribe((data)=>{
        console.log(data);
      },()=>{},()=>{});
    }
    alert("Added to the cart");
    location.reload();
    console.log(this.cartData);
    
  }
  
}
