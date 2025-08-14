import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPizzaComponent } from './order-pizza.component';
import { PizzaService } from 'src/app/services/pizza.service';
import { CartService } from 'src/app/services/cart.service';
import { HttpClientModule } from '@angular/common/http';

describe('OrderPizzaComponent', () => {
  let component: OrderPizzaComponent;
  let fixture: ComponentFixture<OrderPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [PizzaService, CartService],
      declarations: [ OrderPizzaComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(OrderPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
