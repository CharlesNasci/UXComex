import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CadProdutoService } from '../cad-produto/cad-produto.service';
import { Router } from '@angular/router';
import { FormControl, FormsModule } from '@angular/forms';
import {} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-list-produto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list-produto.component.html',
  styleUrl: './list-produto.component.css',
})
export class ListProdutoComponent implements OnInit {
  listProdutos: any[] = [
    { nome: 'Charles', descrica: 'descricao', preco: 10, qtdeEstoque: 20 },
  ];
  searchProduto: string = '';
  produtoSelecionado: any = null;

  constructor(private service: CadProdutoService, private router: Router) {}

  ngOnInit(): void {
    this.CarregarProdutos();
  }

  NovoProduto() {
    this.router.navigate(['/cadastro-produto']);
  }
  CarregarProdutos() {
    this.service.GetProduto().subscribe({
      next: (res) => (this.listProdutos = res.body),
      error: (err) => {
        console.error('Erro ao buscar produtos', err);
      },
    });
  }
  EditarProduto(produto: any) {
    this.router.navigate(['/cadastro-produto', produto.id]);
  }
  Search() {
    this.service.GetProdutoSerch(this.searchProduto).subscribe({
      next: (res) => (this.listProdutos = res.body),
      error: (err) => {
        console.error('Erro ao buscar produtos', err);
      },
    });
  }
  LimparBusca() {
    this.CarregarProdutos();
  }
  SelecionarProduto(produto: any) {
    this.produtoSelecionado = produto;
  }
  DeleteProduto(id_Produto: any) {
    if (!confirm('Tem certeza que deseja excluir este Produto?')) {
      return;
    }
    this.service.DeleteProduto(id_Produto).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.listProdutos = this.listProdutos.filter(
            (c) => c.id !== id_Produto
          );
          alert('Produto excluído com sucesso!');
        } else {
          alert('Erro ao excluir produto.');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Erro na exclusão do produto.');
      },
    });
  }
}
