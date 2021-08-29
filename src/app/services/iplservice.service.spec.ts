import { TestBed } from '@angular/core/testing';
import { IplserviceService } from './iplservice.service';

describe('IplserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IplserviceService = TestBed.get(IplserviceService);
    expect(service).toBeTruthy();
  });
});
