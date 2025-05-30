import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';
import { CadClienteService } from './cad-cliente.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { validatePhone } from '../../Validations/select.validator';

@Component({
  selector: 'app-cad-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, CommonModule, FormsModule],
  providers: [provideNgxMask()],
  templateUrl: './cad-cliente.component.html',
  styleUrl: './cad-cliente.component.css',
})
export class CadClienteComponent implements OnInit {
  itemForm!: FormGroup;
  idCliente: any = 0;
  constructor(
    private cadClienteService: CadClienteService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.itemForm = this.CreateForm();
    this.PreencheCliente();
  }
  CreateForm() {
    return this.formBuilder.group({
      id: [0],
      nome: [''],
      email: ['', Validators.email],
      telefone: ['', validatePhone],
      dataCadastro: [''],
    });
  }
  PreencheCliente() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idCliente = id;
      this.cadClienteService.GetClienteID(id).subscribe({
        next: (res: any) => {
          const cliente = res.body;
          if (cliente.dataCadastro) {
            cliente.dataCadastro = cliente.dataCadastro.split('T')[0];
          }

          this.itemForm.patchValue(cliente);
          console.log(this.itemForm);
        },
        error: (err: any) => {
          alert('Erro ao carregar cliente!');
          console.error(err);
        },
      });
    }
  }

  VoltarParaLista() {
    this.router.navigate(['/lista-cliente']);
  }
  Request() {
    this.itemForm.markAllAsTouched();
    if (this.itemForm.invalid) {
      const controls = this.itemForm.controls;
      let campos: string[] = [];
      if (controls['nome'].invalid) campos.push('Nome');
      if (controls['email'].invalid) campos.push('Email');
      if (controls['telefone'].invalid) campos.push('Telefone');
      if (controls['dataCadastro'].invalid) campos.push('Data de Cadastro');
      alert('Preencha corretamente os campos: ' + campos.join(', '));
      return;
    }
    this.idCliente > 0 ? this.EditarCliente() : this.SalvarProduto();
  }
  SalvarProduto() {
    var json = this.itemForm.getRawValue();
    this.cadClienteService.PostCliente(json).subscribe({
      next: (res) => {
        alert('Produto salvo com sucesso!');
        this.router.navigate(['/lista-cliente']);
      },
      error: (err) => {
        alert('Erro ao salvar produto!');
        console.error(err);
      },
    });
  }
  EditarCliente() {
    var json = this.itemForm.getRawValue();
    this.cadClienteService.EditCliente(json).subscribe({
      next: (res) => {
        alert('Cliente editado com sucesso!');
        this.router.navigate(['/lista-cliente']);
      },
      error: (err) => {
        alert('Erro ao editar cliente!');
        console.error(err);
      },
    });
  }
}
