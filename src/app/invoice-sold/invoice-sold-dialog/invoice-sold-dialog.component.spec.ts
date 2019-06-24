import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSoldDialogComponent } from './invoice-sold-dialog.component';

describe('InvoiceSoldDialogComponent', () => {
  let component: InvoiceSoldDialogComponent;
  let fixture: ComponentFixture<InvoiceSoldDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceSoldDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSoldDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
