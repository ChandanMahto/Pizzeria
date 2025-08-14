import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildYourPizzaComponent } from './build-your-pizza.component';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { CartService } from 'src/app/services/cart.service';
import { HttpClientModule } from '@angular/common/http';

describe('BuildYourPizzaComponent', () => {
  let component: BuildYourPizzaComponent;
  let fixture: ComponentFixture<BuildYourPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],  
      providers: [IngredientsService,CartService],
      declarations: [ BuildYourPizzaComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(BuildYourPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
