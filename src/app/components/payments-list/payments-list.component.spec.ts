import { CoffeeShopService } from 'src/app/services/coffee-shop.service';
import * as orders from './../../data/orders.json';
import * as payments from './../../data/payments.json';
import * as prices from './../../data/prices.json';

import { of } from 'rxjs';
import { Order } from '../models/order';
import { PaymentsListComponent } from './payments-list.component';

describe('PaymentsListComponent', () => {
  let component: PaymentsListComponent;

  const coffeeShopServiceMock = { retrieveDrinksList: {}, retrieveOrdersList: {}, retrievePaymentsList: {} } as unknown as CoffeeShopService;

  beforeEach(() => {
    spyOn(coffeeShopServiceMock, 'retrieveDrinksList').and.returnValue(of(Object.assign([], prices)));
    spyOn(coffeeShopServiceMock, 'retrieveOrdersList').and.returnValue(of(Object.assign([], orders)));
    spyOn(coffeeShopServiceMock, 'retrievePaymentsList').and.returnValue(of(Object.assign([], payments)));
    component = new PaymentsListComponent(coffeeShopServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate bill and payment amounts for each user', () => {
    return new Promise<void>(done => {
      component.ordersGroupedBy$.subscribe(ordersGroupedBy => {
        expect(ordersGroupedBy.length).toEqual(8);
        expect(ordersGroupedBy[0].paymentAmount).toEqual(69);
        done();
      });
    });
  });

  it('should calculate bill amount', () => {
    const orders = [
      { user: 'test', price: 1 } as Order,
      { user: 'test', price: 2 } as Order
    ];
    expect(component.calculateTotalBillAmount(orders)).toEqual(3);
  });

  it('should calculate due amount', () => {
    expect(component.calculateDueAmount(10, 5)).toEqual(5);
    expect(component.calculateDueAmount(5, 10)).toEqual(-5);
  });
});
