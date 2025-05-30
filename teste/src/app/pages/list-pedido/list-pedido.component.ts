import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CadPedidoService } from '../cad-pedido/cad-pedido.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-list-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list-pedido.component.html',
  styleUrl: './list-pedido.component.css',
})
export class ListPedidoComponent implements OnInit {
  @Output() novoPedido = new EventEmitter<void>();
  constructor(private router: Router, private service: CadPedidoService) {}

  listPedido: any[] = [];
  ngOnInit(): void {
    this.CarregarPedidos();
  }
  NovoPedido() {
    this.router.navigate(['/cadastro-pedido']);
  }
  CarregarPedidos() {}
  Search() {}
}
