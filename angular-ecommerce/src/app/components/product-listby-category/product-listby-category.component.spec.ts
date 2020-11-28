import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListbyCategoryComponent } from './product-listby-category.component';

describe('ProductListbyCategoryComponent', () => {
  let component: ProductListbyCategoryComponent;
  let fixture: ComponentFixture<ProductListbyCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListbyCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListbyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
