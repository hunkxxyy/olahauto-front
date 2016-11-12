/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenuServiceService } from './menu-service.service';

describe('Service: MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuServiceService]
    });
  });

  it('should ...', inject([MenuServiceService], (service: MenuServiceService) => {
    expect(service).toBeTruthy();
  }));
});
