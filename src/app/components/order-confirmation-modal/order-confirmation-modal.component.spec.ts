import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmationModalComponent } from './order-confirmation-modal.component';

describe('OrderConfirmationModalComponent', () => {
  let component: OrderConfirmationModalComponent;
  let fixture: ComponentFixture<OrderConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderConfirmationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
