import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CartService } from '../cart.service';
import { IngredientsService } from '../ingredients.service';

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
  total:number=0;
  isChecked:boolean=false;
  constructor(private ingredientsService:IngredientsService,private cartService:CartService) { }

  ngOnInit(): void {
    this.ingredientsService.getIngredients().subscribe((data)=>{
      this.ingredients=data;
      console.log(data);
      
      this.ingredients.forEach((element:any)=>{
          element.checked=false;
      })
    })
    this.cartService.getCart().subscribe((data)=>{
      this.cartData=data;
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
