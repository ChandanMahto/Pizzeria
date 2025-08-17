import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';
import { OrderPizzaComponent } from './pages/order-pizza/order-pizza.component';
import { PizzaService } from './services/pizza.service';
import { BuildYourPizzaComponent } from './pages/build-your-pizza/build-your-pizza.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NavBarComponent } from './components/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    OrderPizzaComponent,
    BuildYourPizzaComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PizzaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
