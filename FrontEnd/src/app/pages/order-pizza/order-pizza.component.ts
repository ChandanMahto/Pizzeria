import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { PizzaService } from '../../services/pizza.service';
import { forkJoin, take } from 'rxjs';

@Component({
  selector: 'app-order-pizza',
  templateUrl: './order-pizza.component.html',
  styleUrls: ['./order-pizza.component.css']
})
export class OrderPizzaComponent implements OnInit {
  @ViewChildren('ingredients') ingredients!: QueryList<ElementRef>;
    @ViewChildren('toppings') toppings!: QueryList<ElementRef>;
      @ViewChildren('body') cardBody!: QueryList<ElementRef>;
    @ViewChildren('description') description!: QueryList<ElementRef>;

  pizzas:any;
  cartData:any;
  pizzaCheck:boolean=false;
  isError = false;
  constructor(private pizzaService:PizzaService,private cartService:CartService) { }


  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.adjustHeight(this.cardBody)
  //     this.adjustHeight(this.description)
  //     this.adjustHeight(this.ingredients)
  //     this.adjustHeight(this.toppings)
  //   },100);
  // }

  ngOnInit(): void {
    const getPizza$ = this.pizzaService.getPizza();
    const getCart$ = this.cartService.getCart();
    forkJoin([getPizza$,getCart$]).pipe(take(1)).subscribe({
      next: ([pizzaData,cartData])=>{
        this.isError = false;
        this.pizzas=pizzaData;
        this.pizzas?.forEach(function(element:any){
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
    this.cartData?.forEach((item:any)=>{
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

  // private adjustHeight(item: QueryList<ElementRef>) {
  //   item.forEach(itm => itm.nativeElement.style.height = 'auto');
  //   let maxHeight =0;
  //         item.forEach(card => {
  //       const height = card.nativeElement.offsetHeight;
  //       if (height > maxHeight) maxHeight = height;
  //     });

  //     item.forEach(card => {
  //       card.nativeElement.style.height = maxHeight + 'px';
  //     });
  // }
  
}
