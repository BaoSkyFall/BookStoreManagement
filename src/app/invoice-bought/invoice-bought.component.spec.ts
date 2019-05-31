import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceBoughtComponent } from './invoice-bought.component';

describe('InvoiceBoughtComponent', () => {
  let component: InvoiceBoughtComponent;
  let fixture: ComponentFixture<InvoiceBoughtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceBoughtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceBoughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
