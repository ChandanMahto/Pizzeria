import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService: CartService,private router: Router) { }

  ngOnInit(): void {
    this.cartService.removeAll().pipe(take(1)).subscribe(()=>{
      console.log("Order placed. All items removed from cart");

    });
  }

  clickBack(): void {
    this.router.navigate(['/'])
  }

}
