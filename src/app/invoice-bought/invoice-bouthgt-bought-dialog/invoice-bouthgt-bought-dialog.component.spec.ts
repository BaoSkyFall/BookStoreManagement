import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceBouthgtBoughtDialogComponent } from './invoice-bouthgt-bought-dialog.component';

describe('InvoiceBouthgtBoughtDialogComponent', () => {
  let component: InvoiceBouthgtBoughtDialogComponent;
  let fixture: ComponentFixture<InvoiceBouthgtBoughtDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceBouthgtBoughtDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceBouthgtBoughtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
