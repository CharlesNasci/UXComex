import { Routes } from '@angular/router';
import { ListClienteComponent } from './pages/list-cliente/list-cliente.component';
import { CadClienteComponent } from './pages/cad-cliente/cad-cliente.component';
import { CadProdutoComponent } from './pages/cad-produto/cad-produto.component';
import { ListProdutoComponent } from './pages/list-produto/list-produto.component';
import { ListPedidoComponent } from './pages/list-pedido/list-pedido.component';
import { CadPedidoComponent } from './pages/cad-pedido/cad-pedido.component';

export const routes: Routes = [
  { path: '', redirectTo: 'lista-cliente', pathMatch: 'full' },

  { path: 'lista-cliente', component: ListClienteComponent },
  { path: 'cadastro-cliente', component: CadClienteComponent },
  { path: 'cadastro-cliente/:id', component: CadClienteComponent },

  { path: 'lista-produto', component: ListProdutoComponent },
  { path: 'cadastro-produto', component: CadProdutoComponent },
  { path: 'cadastro-produto/:id', component: CadProdutoComponent },

  { path: 'lista-pedido', component: ListPedidoComponent },
  { path: 'cadastro-pedido', component: CadPedidoComponent },
  { path: 'cadastro-pedido/:id', component: CadPedidoComponent },
];
