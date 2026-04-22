/**
 * Componente Login Form
 * Formulario reutilizable para login
 */
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthCredentials } from '../../domain/entities/user.entity';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-form-container">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Correo electronico</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            placeholder="tu@correo.com"
            class="form-control"
            autocomplete="username"
          />
          <span *ngIf="getEmailError()" class="error-message">
            {{ getEmailError() }}
          </span>
        </div>

        <div class="form-group">
          <label for="password">Contrasena</label>
          <input
            id="password"
            type="password"
            formControlName="password"
            placeholder="Ingresa tu contrasena"
            class="form-control"
            autocomplete="current-password"
          />
          <span *ngIf="getPasswordError()" class="error-message">
            {{ getPasswordError() }}
          </span>
        </div>

        <button
          type="submit"
          [disabled]="!loginForm.valid || isLoading"
          class="btn-submit"
        >
          {{ isLoading ? 'Conectando con la API...' : 'Solicitar token' }}
        </button>
      </form>

      <div *ngIf="errorMessage" class="alert-error">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .login-form-container {
      width: 100%;
    }

    form {
      display: grid;
      gap: 18px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    label {
      color: #243b53;
      font-size: 0.92rem;
      font-weight: 700;
      letter-spacing: 0.01em;
    }

    .form-control {
      min-height: 52px;
      padding: 0 16px;
      border: 1px solid #cbd2d9;
      border-radius: 16px;
      font-size: 0.98rem;
      color: #102a43;
      background: #ffffff;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        transform 0.2s ease;
    }

    .form-control::placeholder {
      color: #7b8794;
    }

    .form-control:focus {
      outline: none;
      border-color: #0b4f6c;
      box-shadow: 0 0 0 4px rgba(11, 79, 108, 0.12);
      transform: translateY(-1px);
    }

    .form-control:disabled {
      background-color: #f7fafc;
      color: #9aa5b1;
      cursor: not-allowed;
    }

    .error-message {
      color: #b42318;
      font-size: 0.85rem;
    }

    .btn-submit {
      min-height: 54px;
      border: none;
      border-radius: 18px;
      background: linear-gradient(135deg, #0b4f6c 0%, #147d64 100%);
      color: #f8fafc;
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.01em;
      cursor: pointer;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        opacity 0.2s ease;
      box-shadow: 0 16px 28px rgba(20, 125, 100, 0.22);
    }

    .btn-submit:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 20px 34px rgba(20, 125, 100, 0.28);
    }

    .btn-submit:disabled {
      opacity: 0.55;
      cursor: not-allowed;
      box-shadow: none;
    }

    .alert-error {
      margin-top: 18px;
      padding: 14px 16px;
      border-radius: 16px;
      border: 1px solid #f7b4ae;
      background: #fff3f1;
      color: #8a1c0f;
      line-height: 1.5;
    }
  `]
})
export class LoginFormComponent implements OnChanges {
  @Input() isLoading = false;
  @Input() errorMessage = '';
  @Output() submit = new EventEmitter<AuthCredentials>();

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['isLoading']) {
      return;
    }

    if (this.isLoading) {
      this.loginForm.disable({ emitEvent: false });
      return;
    }

    this.loginForm.enable({ emitEvent: false });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submit.emit(this.loginForm.getRawValue() as AuthCredentials);
    }
  }

  getEmailError(): string | null {
    const emailControl = this.loginForm.get('email');

    if (emailControl?.hasError('required')) {
      return 'El correo electronico es requerido';
    }

    if (emailControl?.hasError('email')) {
      return 'Ingresa un correo electronico valido';
    }

    return null;
  }

  getPasswordError(): string | null {
    const passwordControl = this.loginForm.get('password');

    if (passwordControl?.hasError('required')) {
      return 'La contrasena es requerida';
    }

    if (passwordControl?.hasError('minlength')) {
      return 'La contrasena debe tener al menos 6 caracteres';
    }

    return null;
  }
}
