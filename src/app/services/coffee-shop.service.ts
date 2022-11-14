import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Drink } from '../components/models/drink';
import { Order } from '../components/models/order';
import * as prices from './../data/prices.json';
import * as orders from './../data/orders.json';
import * as payments from './../data/payments.json';
import { Payment } from '../components/models/payment';
import { readFileSync, writeFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';

@Injectable({
  providedIn: 'root'
})
export class CoffeeShopService {

  private _updatedOrdersList: Order[] = [];
  private _updatedPaymentsList: Payment[] = [];

  public retrieveDrinksList(): Observable<Drink[]> {
    return of(prices).pipe(map(prices => Object.assign([], prices)));
  }

  public retrieveOrdersList(): Observable<Order[]> {
    if (this._updatedOrdersList.length) {
      return of(this._updatedOrdersList);
    }
    return of(orders).pipe(map(orders => Object.assign([], orders)));
  }

  public retrievePaymentsList(): Observable<Payment[]> {
    if (this._updatedPaymentsList.length) {
      return of(this._updatedPaymentsList);
    }
    return of(payments).pipe(map(payments => Object.assign([], payments)));
  }

  public updateOrdersList(orders: Order[]): Observable<Order[]> {
    this._updatedOrdersList = orders;
    return of(orders);
    // return of(this.writeToFile('orders.json', orders)).pipe(map(orders => Object.assign([], orders)));
  }

  public updatePaymentsList(payments: Payment[]): Observable<Payment[]> {
    this._updatedPaymentsList = payments;
    console.log(payments);
    return of(payments);
    // return of(this.writeToFile('payments.json', payments)).pipe(map(payments => Object.assign([], payments)));
  }


  private writeToFile(filename: string, data: any) {
    writeFileSync(join(__dirname, filename), data, {
      flag: 'w',
    });

    const contents = readFileSync(join(__dirname, filename), 'utf-8');
    console.log(contents);

    return contents;
  }
}
