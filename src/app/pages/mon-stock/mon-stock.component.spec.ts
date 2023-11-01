import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonStockComponent } from './mon-stock.component';

describe('MonStockComponent', () => {
  let component: MonStockComponent;
  let fixture: ComponentFixture<MonStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonStockComponent]
    });
    fixture = TestBed.createComponent(MonStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
