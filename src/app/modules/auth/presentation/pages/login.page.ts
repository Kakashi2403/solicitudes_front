/**
 * Pagina Login
 * Pagina principal del modulo de autenticacion
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../infrastructure/services/auth.service';
import { LoginFormComponent } from '../components/login-form.component';
import { UserInfoComponent } from '../components/user-info.component';
import { AuthCredentials, User } from '../../domain/entities/user.entity';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, UserInfoComponent],
  template: `
    <div class="login-page-container">
      <div class="login-shell">
        <section class="hero-panel">
          <span class="eyebrow">Arquitectura Hexagonal</span>
          <h1>Login conectado a APIs externas</h1>
          <p>
            Este modulo usa puertos y adaptadores para desacoplar la UI del backend.
            La primera integracion activa consume el endpoint de autenticacion configurado en
            <code>environment</code>.
          </p>

          <div class="hero-badges">
            <span>Endpoint configurable</span>
            <span>JWT decodificado en mapper</span>
            <span>Sesion persistida</span>
          </div>
        </section>

        <section class="auth-card">
          <div *ngIf="!currentUser; else userLogged" class="login-section">
            <span class="card-kicker">Autenticacion</span>
            <h2>Iniciar sesion</h2>
            <p class="card-copy">
              Ingresa tus credenciales para solicitar el token a la API externa.
            </p>

            <app-login-form
              [isLoading]="isLoading"
              [errorMessage]="errorMessage"
              (submit)="onLogin($event)"
            ></app-login-form>
          </div>

          <ng-template #userLogged>
            <div class="user-section">
              <span class="card-kicker">Sesion activa</span>
              <h2>Bienvenido</h2>
              <p class="card-copy">
                La informacion del usuario se obtuvo a partir del JWT y se persiste localmente.
              </p>
              <app-user-info
                [user]="currentUser"
                (logout)="onLogout()"
              ></app-user-info>
            </div>
          </ng-template>
        </section>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }

    .login-page-container {
      min-height: 100vh;
      padding: 32px;
      background:
        radial-gradient(circle at top left, rgba(255, 184, 108, 0.28), transparent 34%),
        radial-gradient(circle at bottom right, rgba(79, 172, 254, 0.2), transparent 28%),
        linear-gradient(135deg, #f4efe6 0%, #eef5ff 45%, #f7fbf8 100%);
    }

    .login-shell {
      max-width: 1120px;
      margin: 0 auto;
      min-height: calc(100vh - 64px);
      display: grid;
      grid-template-columns: minmax(280px, 1.1fr) minmax(320px, 0.9fr);
      gap: 28px;
      align-items: stretch;
    }

    .hero-panel,
    .auth-card {
      border-radius: 28px;
      box-shadow: 0 22px 60px rgba(15, 23, 42, 0.08);
      backdrop-filter: blur(10px);
    }

    .hero-panel {
      padding: 48px;
      background:
        linear-gradient(160deg, rgba(16, 42, 67, 0.95), rgba(11, 82, 91, 0.88)),
        linear-gradient(135deg, #102a43, #0b525b);
      color: #f8fafc;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .auth-card {
      padding: 40px 36px;
      background: rgba(255, 255, 255, 0.88);
      border: 1px solid rgba(255, 255, 255, 0.65);
      display: flex;
      align-items: center;
    }

    .login-section,
    .user-section {
      width: 100%;
      animation: fadeUp 0.28s ease-out;
    }

    .eyebrow,
    .card-kicker {
      display: inline-flex;
      align-items: center;
      width: fit-content;
      padding: 8px 14px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .eyebrow {
      background: rgba(255, 255, 255, 0.14);
      color: #fef3c7;
    }

    .card-kicker {
      background: #e1f0ff;
      color: #0b4f6c;
      margin-bottom: 16px;
    }

    h1,
    h2 {
      margin: 0;
      font-family: Georgia, 'Times New Roman', serif;
      letter-spacing: -0.03em;
    }

    h1 {
      font-size: clamp(2.6rem, 5vw, 4.3rem);
      line-height: 0.96;
      margin-top: 18px;
    }

    h2 {
      font-size: 2rem;
      color: #102a43;
    }

    p {
      margin: 0;
      line-height: 1.7;
      font-size: 1rem;
    }

    .hero-panel p {
      max-width: 34rem;
      margin-top: 22px;
      color: rgba(248, 250, 252, 0.84);
    }

    .card-copy {
      margin: 12px 0 28px;
      color: #486581;
    }

    .hero-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 28px;
    }

    .hero-badges span {
      padding: 10px 14px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.1);
      color: #f8fafc;
      font-size: 0.92rem;
    }

    code {
      padding: 2px 8px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.12);
      color: #fef3c7;
    }

    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(12px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 920px) {
      .login-page-container {
        padding: 18px;
      }

      .login-shell {
        grid-template-columns: 1fr;
        min-height: auto;
      }

      .hero-panel,
      .auth-card {
        padding: 28px;
      }
    }
  `]
})
export class LoginPageComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isLoading = false;
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCurrentUser(): void {
    this.authService
      .getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.currentUser = user;
      });
  }

  onLogin(credentials: AuthCredentials): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService
      .login(credentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isLoading = false;

          if (response.success) {
            this.currentUser = response.user ?? null;
            return;
          }

          this.errorMessage = response.message || 'Error al iniciar sesion';
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = this.getLoginErrorMessage(error);
          console.error('Login error:', error);
        }
      });
  }

  onLogout(): void {
    this.isLoading = true;
    this.authService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.currentUser = null;
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Logout error:', error);
          this.currentUser = null;
        }
      });
  }

  private getLoginErrorMessage(error: {
    status?: number;
    error?: {
      message?: string;
      errors?: string[] | null;
    };
  }): string {
    if (error.status === 0) {
      return 'No fue posible conectar con la API de autenticacion. Revisa HTTPS, CORS y que el backend este disponible.';
    }

    if (error.error?.errors?.length) {
      return error.error.errors.join(', ');
    }

    return error.error?.message || 'Error de conexion. Por favor intenta de nuevo.';
  }
}
