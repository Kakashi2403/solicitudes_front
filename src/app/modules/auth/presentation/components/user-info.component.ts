/**
 * Componente User Info
 * Muestra informacion del usuario autenticado
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../domain/entities/user.entity';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="user" class="user-info-container">
      <div class="user-header">
        <div class="user-avatar">{{ user.fullName.charAt(0).toUpperCase() }}</div>
        <div class="user-details">
          <h3>{{ user.fullName }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </div>

      <div class="token-chip">Token activo</div>

      <button (click)="onLogout()" class="btn-logout">
        Cerrar sesion
      </button>
    </div>
  `,
  styles: [`
    .user-info-container {
      display: grid;
      gap: 18px;
      padding: 22px;
      border-radius: 22px;
      border: 1px solid #d9e2ec;
      background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
    }

    .user-header {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .user-avatar {
      width: 58px;
      height: 58px;
      border-radius: 18px;
      background: linear-gradient(135deg, #0b4f6c 0%, #147d64 100%);
      color: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .user-details h3 {
      margin: 0;
      color: #102a43;
      font-size: 1.2rem;
    }

    .user-details p {
      margin: 6px 0 0;
      color: #486581;
    }

    .token-chip {
      width: fit-content;
      padding: 8px 12px;
      border-radius: 999px;
      background: #e6fffa;
      color: #0f766e;
      font-size: 0.88rem;
      font-weight: 700;
    }

    .btn-logout {
      min-height: 50px;
      border: none;
      border-radius: 16px;
      background: #102a43;
      color: #f8fafc;
      font-size: 0.96rem;
      font-weight: 700;
      cursor: pointer;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        background-color 0.2s ease;
      box-shadow: 0 16px 30px rgba(16, 42, 67, 0.18);
    }

    .btn-logout:hover {
      background: #0b4f6c;
      transform: translateY(-1px);
    }
  `]
})
export class UserInfoComponent {
  @Input() user: User | null = null;
  @Output() logout = new EventEmitter<void>();

  onLogout(): void {
    this.logout.emit();
  }
}
