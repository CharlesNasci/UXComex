import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-selecionar-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],

  template: `
    <div class="modal-backdrop" (click)="fechar()"></div>
    <div class="modal">
      <h3>Selecionar Produto</h3>
      <ul>
        <li *ngFor="let produto of produtos" (click)="selecionar(produto)">
          <div class="produto-info">
            <span class="produto-nome">{{ produto.nome }}</span>
            <span class="produto-preco"
              >R$ {{ produto.preco | number : '1.2-2' }}</span
            >
          </div>
          <div class="produto-estoque">Estoque: {{ produto.estoque }}</div>
        </li>
      </ul>
      <button class="btn-cancelar" (click)="fechar()">Cancelar</button>
    </div>
  `,
  styles: [
    `
      .modal-backdrop {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(99, 102, 241, 0.13);
        z-index: 10;
      }
      .modal {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        padding: 32px 24px 18px 24px;
        border-radius: 16px;
        z-index: 11;
        min-width: 340px;
        box-shadow: 0 8px 32px rgba(60, 60, 120, 0.18);
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }
      h3 {
        color: #6366f1;
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 18px;
        text-align: center;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0 0 12px 0;
        max-height: 260px;
        overflow-y: auto;
      }
      li {
        padding: 14px 12px;
        cursor: pointer;
        border-radius: 8px;
        margin-bottom: 8px;
        background: #f7fafc;
        display: flex;
        flex-direction: column;
        gap: 2px;
        border: 1.5px solid transparent;
        transition: background 0.18s, border-color 0.18s, box-shadow 0.18s;
      }
      li:hover {
        background: #e0e7ff;
        border-color: #6366f1;
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.09);
      }
      .produto-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.05rem;
        font-weight: 500;
      }
      .produto-nome {
        color: #373a47;
      }
      .produto-preco {
        color: #6366f1;
        font-weight: 600;
      }
      .produto-estoque {
        font-size: 0.95rem;
        color: #6b7280;
        margin-top: 2px;
      }
      .btn-cancelar {
        background: linear-gradient(90deg, #e0e7ff 0%, #6366f1 100%);
        color: #373a47;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        padding: 10px 0;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 8px;
        transition: background 0.18s, color 0.18s;
      }
      .btn-cancelar:hover {
        background: linear-gradient(90deg, #6366f1 0%, #e0e7ff 100%);
        color: #fff;
      }
      @media (max-width: 500px) {
        .modal {
          min-width: 90vw;
          padding: 18px 6px 12px 6px;
        }
        li {
          padding: 10px 6px;
        }
      }
    `,
  ],
})
export class SelecionarProdutoComponent {
  @Input() produtos: any[] = [];
  @Output() selecionado = new EventEmitter<any>();
  @Output() fecharModal = new EventEmitter<void>();

  selecionar(produto: any) {
    this.selecionado.emit(produto);
  }
  fechar() {
    this.fecharModal.emit();
  }
}
