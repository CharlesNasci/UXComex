import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralProperty } from '../../functions/general-properties';

@Injectable({
  providedIn: 'root',
})
export class CadClienteService {
  constructor(private httpClient: HttpClient, private prop: GeneralProperty) {}

  GetClientes() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response',
    };
    return this.httpClient.get<any>(
      this.prop.apiURL + '/api/Clientes/Clientes',
      httpOptions
    );
  }
  GetClienteID(cliente: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response',
    };
    return this.httpClient.get<any>(
      `${this.prop.apiURL}/api/Clientes/cliente/${cliente}`,
      httpOptions
    );
  }
  GetClienteSerch(parametro: any, item: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response',
    };
    return this.httpClient.get<any>(
      `${this.prop.apiURL}/api/Clientes/clientes/${parametro}/${item}`,
      httpOptions
    );
  }
  PostCliente(item: object) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response',
    };
    return this.httpClient.post<any>(
      this.prop.apiURL + '/api/Clientes/criarCliente',
      item,
      httpOptions
    );
  }
  EditCliente(item: object) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response',
    };
    return this.httpClient.put<any>(
      this.prop.apiURL + '/api/Clientes/atualizarCliente',
      item,
      httpOptions
    );
  }
  DeleteCliente(id_cliente: object) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response',
    };
    return this.httpClient.delete<any>(
      `${this.prop.apiURL}/api/Clientes/deletaCliente/${id_cliente}`,

      httpOptions
    );
  }
}
