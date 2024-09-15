import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  //@Output() totalPrice=new EventEmitter();
  cartData:any;
  counter:number=0;
  total:number=0;
  oneTime:boolean=false;
  grandTotal:number=0;
  ingredientsTotal:number=0;
  ingP:any=[]
  //quantity:number;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((data)=>{
      this.cartData=data;
      console.log(this.cartData.ingPrice+"helo");
      this.ingP=this.cartData.ingPrice;
      
      this.updatePrice();
      console.log(this.ingredientsTotal+" viola "+this.ingP+"  "+this.cartData);
      if(this.counter==0){
        this.counter++;
      }
      
      // this.cartData.forEach((item:any)=>{
      //   console.log(parseInt(item.price));
      //   this.total=item.price;
      //   //this.grandTotal+=this.total;
      // })
      
     // console.log(data);
      //this.grandTotal = this.cartService.getTotal();
      //console.log(this.grandTotal+" xyz "+this.cartService.getTotal());
    //   if(!this.oneTime){
      // for(let items of this.cartData){
      //   //console.log(this.total);
        
      //   this.grandTotal+=items.price;
      // }
    // }
    //   this.oneTime=true;
      //this.quantity=data.qty;
    })
    // this.cartData.forEach((item:any)=>{
    //   console.log(item.id);
      
    //   this.ingredientsTotal+=item
    // })
    //location.reload();
  }
 // getTotal
  
  
  
  addQuantity(item:any) {
    this.grandTotal=0;
    console.log(item.Id);
    this.cartService.addQuantity(item.Id).subscribe(()=>{
      this.updatePrice();
    });
    // this.total=parseInt(item.qty)*parseInt(item.price);
    // this.cartData.forEach((data:any)=>{
    //   this.grandTotal+=(data.qty*data.price);
    // })
    console.log(this.grandTotal);
    
   // this.totalPrice.emit(this.grandTotal);
    //this.grandTotal+=this.total;
    location.reload()
    //location.search;
  }

  minusQuantity(item:any) {
    this.grandTotal=0;
    console.log(item.Id);
    // this.total=parseInt(item.qty)*parseInt(item.price);
    // this.cartData.forEach((item:any)=>{
    //   this.grandTotal+=(item.qty*item.price);
    // })
    console.log(this.grandTotal);
    
    //this.grandTotal-=this.total;
    //this.totalPrice.emit(this.grandTotal);
    if(item.qty>1){
      this.cartService.minusQuantity(item.Id).subscribe(()=>{
        this.updatePrice()
      });
      location.reload();
    }
    //location.search;
  }

  removeItem(id : string) {
    console.log(id);
    
    this.cartService.removeItem(id).subscribe();
    location.reload();
  }

  emptyCart() {
    //this.cartService.removeAllCart();
  }

  removeToppings(Id:any,id:any,name:any,price:any,total:number){
    this.cartService.deleteIngredientsFromCart(Id,id,name,price,total).subscribe();
    location.reload();
  }

  updatePrice(){
    this.grandTotal=0;
    this.total=0;
    for(let items of this.cartData){
      this.total=(items.qty*items.price);
      this.ingredientsTotal+=parseInt(items.ingPrice);
      if(items.ingTotalPrice!=null||items.ingTotalPrice!=undefined){
      this.grandTotal=(this.grandTotal+this.total+items.ingTotalPrice);
      }else{
        this.grandTotal=(this.grandTotal+this.total);
      }

    }
    console.log(this.total+"<total  gt> "+this.grandTotal);
    //location.reload();
  }
}
