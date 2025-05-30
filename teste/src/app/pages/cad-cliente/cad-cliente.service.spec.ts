import { TestBed } from '@angular/core/testing';

import { CadClienteService } from './cad-cliente.service';

describe('CadClienteService', () => {
  let service: CadClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
