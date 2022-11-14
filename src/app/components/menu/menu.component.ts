import { Component } from '@angular/core';
import { off } from 'process';
import { forkJoin, mergeMap, Observable, of, shareReplay, Subject } from 'rxjs';
import { CoffeeShopService } from 'src/app/services/coffee-shop.service';
import { StringUtil } from 'src/app/util/string-util';
import { Drink } from '../models/drink';
import { Order } from '../models/order';
import { Payment } from '../models/payment';
import { Prices } from '../models/prices';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  capitalize = StringUtil.capitalize;

  displayStyle = "none";

  selectedOrder = new Order();

  selectedOrderPayment = new Payment();

  selectedItemQuantity: number;

  drinks$: Observable<Drink[]> = this.coffeeShopService.retrieveDrinksList().pipe(shareReplay(1));

  private _orderPlacedSubject: Subject<void> = new Subject<void>();

  private _orderPlaced$ = this._orderPlacedSubject.asObservable().pipe(mergeMap(() => {
    return forkJoin([this.coffeeShopService.retrieveOrdersList(), this.coffeeShopService.retrievePaymentsList()]).pipe(
      mergeMap(([ordersList, paymentsList]) => {
        const updatedOrdersList = ordersList.push(this.selectedOrder);
        if (this.selectedOrder?.user) {
          if (this.selectedOrderPayment?.amount && this.selectedOrder?.user) {
            const updatedPaymentsList = paymentsList.push(this.selectedOrderPayment);
            return forkJoin([this.coffeeShopService.updateOrdersList(ordersList), this.coffeeShopService.updatePaymentsList(paymentsList)]);
          }
          return this.coffeeShopService.updateOrdersList(ordersList);
        }
        return of({});
      })
    );
  })).subscribe(() => {
    this.closeOrderModal();
  });

  constructor(private coffeeShopService: CoffeeShopService) { }

  determineKeys(prices: Prices): string[] {
    return Object.keys(prices);
  }

  determinePrice(fieldName: string, prices: Prices): number {
    return prices[fieldName];
  }

  openOrderModal(drinkName: string, size: string, price: number): void {
    this.displayStyle = "block";
    this.selectedOrder.drink = drinkName;
    this.selectedOrder.size = size;
    this.selectedOrder.price = price;
  };

  closeOrderModal(): void {
    this.displayStyle = "none";
    this.clearOrder();
  };

  onQuantityUpdated(event): void {
    this.selectedItemQuantity = event?.target?.value;
  };

  onPaymentAmountUpdated(event): void {
    this.selectedOrderPayment.amount = event?.target?.value;
  };

  onNameUpdated(event): void {
    this.selectedOrder.user = event?.target?.value;
    this.selectedOrderPayment.user = event?.target?.value;
  };

  determineSubTotal(): number {
    if (this.selectedItemQuantity && this.selectedOrder?.price) {
      return this.selectedItemQuantity * this.selectedOrder.price;
    }
    return 0;
  }

  addOrder(): void {
    this._orderPlacedSubject.next();
  }

  private clearOrder(): void {
    this.selectedOrder = new Order();
    this.selectedOrderPayment = new Payment();
  }
}
