import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildYourPizzaComponent } from './build-your-pizza.component';

describe('BuildYourPizzaComponent', () => {
  let component: BuildYourPizzaComponent;
  let fixture: ComponentFixture<BuildYourPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildYourPizzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildYourPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
