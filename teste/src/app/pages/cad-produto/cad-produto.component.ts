import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CadProdutoService } from './cad-produto.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-cad-produto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cad-produto.component.html',
  styleUrl: './cad-produto.component.css',
})
export class CadProdutoComponent implements OnInit {
  produtos: any[] = [];
  idProduto: any = 0;
  itemForm!: FormGroup;

  constructor(
    private cadProdutoService: CadProdutoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.itemForm = this.CreateForm();
    this.PreencheProduto();
  }
  VoltarParaLista() {
    this.router.navigate(['/lista-produto']);
  }
  CreateForm() {
    return this.formBuilder.group({
      id: [0],
      nome: [''],
      descricao: [''],
      preco: [''],
      qtdeEstoque: [''],
    });
  }
  PreencheProduto() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idProduto = id;
      this.cadProdutoService.GetProdutoID(id).subscribe({
        next: (produto: any) => {
          this.itemForm.patchValue(produto.body);
        },
        error: (err: any) => {
          alert('Erro ao carregar Produto!');
          console.error(err);
        },
      });
    }
  }
  Request() {
    this.itemForm.markAllAsTouched();
    if (this.itemForm.invalid) {
      const controls = this.itemForm.controls;
      let campos: string[] = [];
      if (controls['nome'].invalid) campos.push('Nome');
      if (controls['descricao'].invalid) campos.push('Descrição');
      if (controls['preco'].invalid) campos.push('Preço');
      if (controls['qtdeEstoque'].invalid) campos.push('Quantidade em Estoque');
      alert('Preencha corretamente os campos: ' + campos.join(', '));
      return;
    }
    this.idProduto > 0 ? this.EditarProduto() : this.SalvarProduto();
  }
  SalvarProduto() {
    var json = this.itemForm.getRawValue();
    this.cadProdutoService.PostProduto(json).subscribe({
      next: (res) => {
        alert('Produto salvo com sucesso!');
        this.router.navigate(['/lista-produto']);
      },
      error: (err) => {
        alert('Erro ao salvar produto!');
        console.error(err);
      },
    });
  }
  EditarProduto() {
    var json = this.itemForm.getRawValue();
    this.cadProdutoService.EditProduto(json).subscribe({
      next: (res) => {
        alert('Produto editado com sucesso!');
        this.router.navigate(['/lista-produto']);
      },
      error: (err) => {
        alert('Erro ao editar produto!');
        console.error(err);
      },
    });
  }
  FormatCurrency(element: string) {
    var input = document.getElementById(element) as HTMLInputElement;
    input.value = input.value.replace(',', '.');
  }
  LimitarCasasDecimais(event: any) {
    let valor = event.target.value;
    valor = valor.replace(/[^0-9,.]/g, '');

    if (valor.includes(',')) {
      const [inteiro, decimal] = valor.split(',');
      if (decimal && decimal.length > 2) {
        valor = inteiro + ',' + decimal.slice(0, 2);
      }
    }
    event.target.value = valor;
    this.itemForm.get('preco')?.setValue(valor, { emitEvent: false });
  }
}
