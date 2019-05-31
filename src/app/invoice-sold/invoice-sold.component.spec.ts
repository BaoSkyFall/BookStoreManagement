import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSoldComponent } from './invoice-sold.component';

describe('InvoiceSoldComponent', () => {
  let component: InvoiceSoldComponent;
  let fixture: ComponentFixture<InvoiceSoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceSoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
