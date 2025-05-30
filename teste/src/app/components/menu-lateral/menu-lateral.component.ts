import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css'],
})
export class MenuLateralComponent {
  constructor(private router: Router) {}

  irPara(tela: string) {
    this.router.navigate([tela]);
  }
}
