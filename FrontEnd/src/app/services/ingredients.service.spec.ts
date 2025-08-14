import { TestBed } from '@angular/core/testing';

import { IngredientsService } from './ingredients.service';
import { HttpClientModule } from '@angular/common/http';

describe('IngredientsService', () => {
  let service: IngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    providers: [IngredientsService], 
    });
    service = TestBed.inject(IngredientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
