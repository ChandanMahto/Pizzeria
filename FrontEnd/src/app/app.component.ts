import { Component } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';
  cartData:any;
  itemsInCart:number=0;
  constructor(private cartService:CartService){
    cartService.getCart().subscribe((data)=>{
      this.cartData=data;
      this.cartData.forEach(()=>{
        this.itemsInCart++;
      })
    })
    
  }
  
}
