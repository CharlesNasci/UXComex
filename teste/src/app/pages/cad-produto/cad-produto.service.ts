import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralProperty } from '../../functions/general-properties';

@Injectable({
  providedIn: 'root',
})
export class CadProdutoService {
  constructor(private httpClient: HttpClient, private prop: GeneralProperty) {}

  GetProduto() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response',
    };
    return this.httpClient.get<any>(
      this.prop.apiURL + '/api/Produtos/Produtos',
      httpOptions
    );
  }
  GetProdutoSerch(item: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response',
    };
    return this.httpClient.get<any>(
      `${this.prop.apiURL}/api/Produtos/produtos/${item}`,
      httpOptions
    );
  }
  GetProdutoID(item: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response',
    };
    return this.httpClient.get<any>(
      `${this.prop.apiURL}/api/Produtos/produto/${item}`,
      httpOptions
    );
  }

  PostProduto(item: object) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response',
    };
    return this.httpClient.post<any>(
      this.prop.apiURL + '/api/Produtos/criarProduto',
      item,
      httpOptions
    );
  }
  EditProduto(item: object) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response',
    };
    return this.httpClient.put<any>(
      this.prop.apiURL + '/api/Produtos/atualizarProduto',
      item,
      httpOptions
    );
  }
  DeleteProduto(id_Produto: object) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response',
    };
    return this.httpClient.delete<any>(
      `${this.prop.apiURL}/api/Produtos/deletaProduto/${id_Produto}`,

      httpOptions
    );
  }
}
