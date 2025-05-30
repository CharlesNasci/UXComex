import { TestBed } from '@angular/core/testing';

import { CadPedidoService } from './cad-pedido.service';

describe('CadPedidoService', () => {
  let service: CadPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
