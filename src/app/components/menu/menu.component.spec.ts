import { of } from 'rxjs';
import { CoffeeShopService } from 'src/app/services/coffee-shop.service';
import { Drink } from '../models/drink';
import { Prices } from '../models/prices';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;

  const coffeeShopServiceMock = { retrieveDrinksList: {} } as unknown as CoffeeShopService;
  const prices = { small: 1, medium: 2 } as Prices;

  beforeEach(() => {
    spyOn(coffeeShopServiceMock, 'retrieveDrinksList').and.returnValue(of([new Drink()]));
    component = new MenuComponent(coffeeShopServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve menu items', () => {
    return new Promise<void>(done => {
      component.drinks$.subscribe(drinks => {
        expect(drinks.length).toEqual(1);
        done();
      });
    });
  });

  it('should return list of prices keys', () => {
    expect(component.determineKeys({} as Prices).length).toEqual(0);
    expect(component.determineKeys(prices).length).toEqual(2);
  });

  it('should determine price based on data provided', () => {
    expect(component.determinePrice('small', prices)).toEqual(1);
    expect(component.determinePrice('medium', prices)).toEqual(2);
  });
});
