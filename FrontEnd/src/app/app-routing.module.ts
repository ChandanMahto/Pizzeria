import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildYourPizzaComponent } from './pages/build-your-pizza/build-your-pizza.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';
import { OrderPizzaComponent } from './pages/order-pizza/order-pizza.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

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
