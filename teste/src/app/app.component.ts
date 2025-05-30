import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MenuLateralComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}

  navegar(tela: any) {
    this.router.navigateByUrl(tela);
  }
}
