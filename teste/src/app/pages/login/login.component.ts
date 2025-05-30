import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (email === 'admin' && password === 'admin') {
        localStorage.setItem('isLoggedIn', 'true');
        this.loginSuccess.emit();
      } else {
        alert('Usuário ou senha incorretos!');
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
