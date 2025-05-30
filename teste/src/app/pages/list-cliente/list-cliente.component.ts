import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadClienteService } from '../cad-cliente/cad-cliente.service';

@Component({
  selector: 'app-list-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list-cliente.component.html',
  styleUrl: './list-cliente.component.css',
})
export class ListClienteComponent implements OnInit {
  listClientes: any[] = [];
  searchType: number = 0;
  searchCliente: string = '';
  clienteSelecionado: any = null;

  constructor(private service: CadClienteService, private router: Router) {}

  ngOnInit(): void {
    this.CarregarClientes();
  }
  NovoCliente() {
    this.router.navigate(['/cadastro-cliente']);
  }
  CarregarClientes() {
    this.service.GetClientes().subscribe({
      next: (res) => (this.listClientes = res.body),
      error: (err) => {
        console.error('Erro ao buscar clientes', err);
      },
    });
  }
  EditarCliente(cliente: any) {
    this.router.navigate(['/cadastro-cliente', cliente.id]);
  }
  DeleteCliente(id_Cliente: any) {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) {
      return;
    }

    this.service.DeleteCliente(id_Cliente).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.listClientes = this.listClientes.filter(
            (c) => c.id !== id_Cliente
          );
          alert('Cliente excluído com sucesso!');
        } else {
          alert('Erro ao excluir cliente.');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Erro na exclusão do cliente.');
      },
    });
  }

  Search() {
    this.service
      .GetClienteSerch(this.searchType, this.searchCliente)
      .subscribe({
        next: (res) => {
          this.listClientes = res.body;
        },
        error: (err) => {
          console.error('Erro ao buscar produtos', err);
        },
      });
  }
  LimparBusca() {
    this.searchCliente = '';
    this.CarregarClientes();
  }
  SelecionarCliente(produto: any) {
    this.clienteSelecionado = produto;
  }
}
