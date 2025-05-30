import { TestBed } from '@angular/core/testing';

import { CadProdutoService } from './cad-produto.service';

describe('CadProdutoService', () => {
  let service: CadProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
