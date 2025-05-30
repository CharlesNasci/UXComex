import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelecionarProdutoComponent } from './selecionar-produto.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cad-pedido',
  imports: [CommonModule, FormsModule, SelecionarProdutoComponent],
  templateUrl: './cad-pedido.component.html',
  styleUrl: './cad-pedido.component.css',
})
export class CadPedidoComponent {
  constructor(private router: Router) {}
  mostrarModalProduto = false;

  clientes = [{ id: 1, nome: 'Charles' }];
  produtos = [{ id: 1, nome: 'Produto 1', preco: 10, estoque: 5 }];

  pedido = {
    id: null,
    idCliente: null,
    data: new Date(),
    valorTotal: 0,
    status: 'Novo',
    itens: [{ idProduto: null, quantidade: 1, precoUnitario: 0 }],
  };

  VoltarParaLista() {
    this.router.navigate(['/lista-pedido']);
  }
  getNomeProduto(objProduto: any): string {
    const produto = this.produtos?.find(
      (p: any) => p.id === objProduto.idProduto
    );
    return produto ? produto.nome : 'Produto não encontrado';
  }
  produtoSelecionado(produto: any) {
    this.pedido.itens.push({
      idProduto: produto.id,
      quantidade: 1,
      precoUnitario: produto.preco,
    });
    this.mostrarModalProduto = false;
  }
  abrirSelecionarProduto() {
    this.mostrarModalProduto = true;
  }
  fecharModalProduto() {
    this.mostrarModalProduto = false;
  }
  adicionarItem() {
    this.mostrarModalProduto = true;
  }
  removerItem(index: number) {
    this.pedido.itens.splice(index, 1);
  }

  getPrecoProduto(idProduto: number) {
    const prod = this.produtos.find((p) => p.id === idProduto);
    return prod ? prod.preco : 0;
  }

  getEstoqueDisponivel(idProduto: any) {
    const prod = this.produtos.find((p) => p.id === idProduto);
    return prod ? prod.estoque : 1;
  }

  calcularTotal() {
    return this.pedido.itens.reduce((total, item: any) => {
      const preco = this.getPrecoProduto(item.idProduto);
      return total + preco * (item.quantidade || 0);
    }, 0);
  }

  salvarPedido() {
    for (const item of this.pedido.itens) {
      const prod = this.produtos.find((p) => p.id === item.idProduto);
      if (!prod || item.quantidade > prod.estoque) {
        alert('Estoque insuficiente para algum produto!');
        return;
      }
    }
    this.pedido.valorTotal = this.calcularTotal();
    alert('Pedido salvo com sucesso!');
  }
}
