import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildYourPizzaComponent } from './build-your-pizza/build-your-pizza.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { OrderPizzaComponent } from './order-pizza/order-pizza.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path:'',component:HomeScreenComponent},
  {path:'orderpizza',component:OrderPizzaComponent},
  {path:'buildyourpizza',component:BuildYourPizzaComponent},
  {path:'cart',component:ShoppingCartComponent},
  {path:'checkout',component:CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
