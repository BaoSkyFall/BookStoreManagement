import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUserDialogComponent } from './table-user-dialog.component';

describe('TableUserDialogComponent', () => {
  let component: TableUserDialogComponent;
  let fixture: ComponentFixture<TableUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
