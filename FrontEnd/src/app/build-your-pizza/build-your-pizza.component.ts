import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CartService } from '../cart.service';
import { IngredientsService } from '../ingredients.service';
import { forkJoin, take } from 'rxjs';

@Component({
  selector: 'app-build-your-pizza',
  templateUrl: './build-your-pizza.component.html',
  styleUrls: ['./build-your-pizza.component.css']
})
export class BuildYourPizzaComponent implements OnInit {
  //@Output() getPrice=new EventEmitter();
  ingredients:any;
  checkData:any=[];
  checkedIngredients:any=[];
  cartData:any;
  total=0;
  isChecked=false;
  isError = false
  constructor(private ingredientsService:IngredientsService,private cartService:CartService) { }

  ngOnInit(): void {
    const getIngredients$ = this.ingredientsService.getIngredients();
    const getCart$ = this.cartService.getCart();
    forkJoin([getIngredients$,getCart$]).pipe(take(1)).subscribe({
      next: ([ingredientsData,cartData])=>{
        this.isError = false;
        this.ingredients=ingredientsData;        
        this.ingredients.forEach((element:any)=>{
            element.checked=false;
        })
        this.cartData=cartData;
      },
      error: ()=>{
        this.isError = true;
      }
    })
  }

  updatePrice($event:any,id:number,name:string,price:number,item:any){
    if($event.target.checked){
      this.checkedIngredients.push({id,name,price});
      console.log(this.checkedIngredients);
      
      this.total = this.total + Number($event.target.value);
      this.cartData.forEach(()=>{
       // this.ingredientsService.addIngredientsToCart(id,name).subscribe();
      })
    }else{
      this.total = this.total - Number($event.target.value);
      //this.checkedIngredients=this.arrayRemove(this.checkedIngredients,item);
      this.checkedIngredients.forEach((ing:any)=>{
        if(ing.id==item.id) this.checkedIngredients.splice(ing,1);
      })
      console.log(this.checkedIngredients);
      
      this.cartData.forEach(()=>{
        //this.ingredientsService.deleteIngredientsFromCart(id,name).subscribe();
      })
    }
  }



  addIngredientsPriceToCart(){
    console.log(this.checkedIngredients);
    this.price()
      this.checkedIngredients.forEach((item:any)=>{
        
        this.ingredientsService.addIngredientsToCart(item.id,item.name).subscribe();
      })
      //location.reload();
    }

    price(){
      console.log(this.total);
      
      this.ingredientsService.addIngredientsPriceToCart(this.total).subscribe();
    }
    
 

}
