
import { CoffeeShopService } from './coffee-shop.service';

describe('CoffeeShopService', () => {
  let service: CoffeeShopService;

  beforeEach(() => {
    service = new CoffeeShopService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve menu items', () => {
    return new Promise<void>(done => {
      service.retrieveDrinksList().subscribe(list => {
        expect(list).toBeTruthy();
        done();
      });
    });
  });

  it('should retrieve orders list', () => {
    return new Promise<void>(done => {
      service.retrieveOrdersList().subscribe(list => {
        expect(list).toBeTruthy();
        done();
      });
    });
  });

  it('should retrieve payments list', () => {
    return new Promise<void>(done => {
      service.retrievePaymentsList().subscribe(list => {
        expect(list).toBeTruthy();
        done();
      });
    });
  });
});
