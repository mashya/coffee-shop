import { Component } from '@angular/core';
import { combineLatest, groupBy, mergeMap, Observable, reduce, shareReplay, toArray } from 'rxjs';
import { CoffeeShopService } from 'src/app/services/coffee-shop.service';
import { StringUtil } from 'src/app/util/string-util';
import { Drink } from '../models/drink';
import { Order } from '../models/order';
import { Payment } from '../models/payment';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
})

export class PaymentsListComponent {

  capitalize = StringUtil.capitalize;

  private drinks$: Observable<Drink[]> = this.coffeeShopService.retrieveDrinksList().pipe(shareReplay(1));

  private payments$: Observable<Payment[]> = this.coffeeShopService.retrievePaymentsList().pipe(shareReplay(1));

  private orders$: Observable<Order[]> = this.coffeeShopService.retrieveOrdersList().pipe(shareReplay(1));

  ordersGroupedBy$: Observable<{ user: string, orders: Order[], paymentAmount: number; }[]> =
    combineLatest([this.drinks$, this.payments$]).pipe(mergeMap(([drinks, payments]) =>
      this.orders$.pipe(
        mergeMap(orders => orders),
        groupBy(order => order.user),
        mergeMap(group => group
          .pipe(
            reduce((acc, cur) => {
              const currentWithPrice = cur;
              currentWithPrice.price = drinks.find(drink => drink.drink_name === currentWithPrice.drink)?.prices[currentWithPrice.size];
              acc.orders.push(currentWithPrice);
              return acc;
            },
              { user: group.key, orders: [] as Order[], paymentAmount: payments.filter(payment => payment.user == group.key).reduce((accPayment, currPaymentObject) => (accPayment + currPaymentObject.amount), 0) }
            )
          )
        ),
        toArray(),
      )));

  constructor(private coffeeShopService: CoffeeShopService) { }

  calculateTotalBillAmount(orders: Order[]): number {
    return orders.map(order => order.price).reduce((acc, curr) => acc + curr, 0);
  }

  calculateDueAmount(billAmount: number, payment: number): number {
    return billAmount - payment;
  }

}
