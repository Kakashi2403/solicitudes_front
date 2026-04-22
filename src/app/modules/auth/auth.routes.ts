/**
 * Auth Routes
 * Configuración de rutas para el módulo de autenticación
 */
import { Routes } from '@angular/router';
import { LoginPageComponent } from './presentation/pages/login.page';

export const authRoutes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  }
];
