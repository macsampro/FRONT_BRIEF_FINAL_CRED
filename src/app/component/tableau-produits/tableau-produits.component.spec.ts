import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauProduitsComponent } from './tableau-produits.component';

describe('TableauProduitsComponent', () => {
  let component: TableauProduitsComponent;
  let fixture: ComponentFixture<TableauProduitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableauProduitsComponent]
    });
    fixture = TestBed.createComponent(TableauProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
