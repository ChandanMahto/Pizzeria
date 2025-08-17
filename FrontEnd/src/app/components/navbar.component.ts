import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavBarComponent implements OnInit{
  itemsInCart:number=0;

  constructor(private cartService:CartService) {
   }

   ngOnInit(): void{
    this.getCartItemsCount();
    this.cartService.reset$.subscribe(() => {
      this.getCartItemsCount();
    });
   }
   getCartItemsCount() {
    this.cartService.getCart().subscribe((data)=>{
      this.itemsInCart = data.length;
    })
   }
}
