/**
 * GUÍA DE TESTING - Módulo de Autenticación
 * Ejemplos de cómo testear componentes, servicios y use cases
 */

// ============================================================================
// TEST 1: Unit Test para un Use Case
// ============================================================================

/*
import { TestBed } from '@angular/core/testing';
import { LoginUseCase } from './login.use-case';
import { IAuthPort } from '../ports/auth.port';
import { IAuthRepositoryPort } from '../ports/auth-repository.port';
import { AuthCredentials, User, LoginResponse } from '../entities/user.entity';
import { of } from 'rxjs';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockAuthPort: jasmine.SpyObj<IAuthPort>;
  let mockRepository: jasmine.SpyObj<IAuthRepositoryPort>;

  beforeEach(() => {
    mockAuthPort = jasmine.createSpyObj<IAuthPort>('IAuthPort', [
      'login',
      'getCurrentUser',
      'logout',
      'refreshToken'
    ]);

    mockRepository = jasmine.createSpyObj<IAuthRepositoryPort>('IAuthRepositoryPort', [
      'saveUser',
      'getUser',
      'removeUser',
      'saveToken',
      'getToken',
      'removeToken'
    ]);

    TestBed.configureTestingModule({
      providers: [LoginUseCase]
    });

    useCase = new LoginUseCase(mockAuthPort, mockRepository);
  });

  it('should save user and token on successful login', (done) => {
    const credentials: AuthCredentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    const mockUser: User = {
      id: '123',
      email: 'test@example.com',
      fullName: 'Test User',
      token: 'jwt-token',
      expiresIn: 3600
    };

    const mockResponse: LoginResponse = {
      user: mockUser,
      success: true,
      message: 'Login successful'
    };

    mockAuthPort.login.and.returnValue(of(mockResponse));

    useCase.execute(credentials).subscribe(result => {
      expect(mockAuthPort.login).toHaveBeenCalledWith(credentials);
      expect(mockRepository.saveUser).toHaveBeenCalledWith(mockUser);
      expect(mockRepository.saveToken).toHaveBeenCalledWith(mockUser.token);
      expect(result.success).toBe(true);
      done();
    });
  });

  it('should not save on failed login', (done) => {
    const credentials: AuthCredentials = {
      email: 'invalid@example.com',
      password: 'wrong'
    };

    const mockResponse: LoginResponse = {
      user: {} as User,
      success: false,
      message: 'Invalid credentials'
    };

    mockAuthPort.login.and.returnValue(of(mockResponse));

    useCase.execute(credentials).subscribe(result => {
      expect(mockRepository.saveUser).not.toHaveBeenCalled();
      expect(mockRepository.saveToken).not.toHaveBeenCalled();
      expect(result.success).toBe(false);
      done();
    });
  });
});
*/

// ============================================================================
// TEST 2: Unit Test para un Componente
// ============================================================================

/*
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button when form is invalid', () => {
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBe(true);
  });

  it('should enable submit button when form is valid', () => {
    const emailInput = fixture.nativeElement.querySelector('input[id="email"]');
    const passwordInput = fixture.nativeElement.querySelector('input[id="password"]');

    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = 'password123';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBe(false);
  });

  it('should emit credentials on submit', (done) => {
    component.submit.subscribe(credentials => {
      expect(credentials.email).toBe('test@example.com');
      expect(credentials.password).toBe('password123');
      done();
    });

    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123'
    });

    component.onSubmit();
  });

  it('should show email error message when email is invalid', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid-email');
    emailControl?.markAsTouched();

    fixture.detectChanges();

    expect(component.getEmailError()).toBe('Ingresa un email válido');
  });

  it('should show password error message when password is too short', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('short');
    passwordControl?.markAsTouched();

    fixture.detectChanges();

    expect(component.getPasswordError()).toContain('al menos 6 caracteres');
  });
});
*/

// ============================================================================
// TEST 3: Integration Test para el Auth Service
// ============================================================================

/*
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { LoginUseCase } from '../domain/use-cases/login.use-case';
import { LogoutUseCase } from '../domain/use-cases/logout.use-case';
import { GetCurrentUserUseCase } from '../domain/use-cases/get-current-user.use-case';

describe('AuthService - Integration Test', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        LoginUseCase,
        LogoutUseCase,
        GetCurrentUserUseCase
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login successfully', () => {
    const mockResponse = {
      success: true,
      data: {
        user: {
          id: '123',
          email: 'test@example.com',
          fullName: 'Test User',
          token: 'jwt-token'
        }
      }
    };

    service.login({ email: 'test@example.com', password: 'password' }).subscribe(response => {
      expect(response.success).toBe(true);
      expect(response.user.email).toBe('test@example.com');
    });

    const req = httpMock.expectOne('/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
*/

// ============================================================================
// TEST 4: E2E Test con Cypress (opcional)
// ============================================================================

/*
describe('Auth - E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('should login with valid credentials', () => {
    cy.get('input[id="email"]').type('test@example.com');
    cy.get('input[id="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.contains('Bienvenido').should('be.visible');
  });

  it('should show error message with invalid credentials', () => {
    cy.get('input[id="email"]').type('invalid@example.com');
    cy.get('input[id="password"]').type('wrong');
    cy.get('button[type="submit"]').click();

    cy.contains('Email o contraseña inválidos').should('be.visible');
  });

  it('should logout successfully', () => {
    // Login primero
    cy.get('input[id="email"]').type('test@example.com');
    cy.get('input[id="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Logout
    cy.contains('Cerrar Sesión').click();

    // Verificar que volvió al login
    cy.contains('Iniciar Sesión').should('be.visible');
  });
});
*/

// ============================================================================
// TEST 5: Mock Adapter para Testing
// ============================================================================

/*
export class MockAuthAdapter implements IAuthPort {
  private shouldFail = false;

  setShouldFail(value: boolean): void {
    this.shouldFail = value;
  }

  login(credentials: AuthCredentials): Observable<LoginResponse> {
    if (this.shouldFail) {
      return throwError(() => new Error('Login failed'));
    }

    if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
      return of({
        user: {
          id: '123',
          email: credentials.email,
          fullName: 'Test User',
          token: 'mock-jwt-token',
          expiresIn: 3600
        },
        success: true
      });
    } else {
      return of({
        user: {} as User,
        success: false,
        message: 'Invalid credentials'
      });
    }
  }

  getCurrentUser(): Observable<User | null> {
    return of({
      id: '123',
      email: 'test@example.com',
      fullName: 'Test User',
      token: 'mock-jwt-token'
    });
  }

  logout(): Observable<void> {
    return of(void 0);
  }

  refreshToken(token: string): Observable<LoginResponse> {
    return of({
      user: {
        id: '123',
        email: 'test@example.com',
        fullName: 'Test User',
        token: 'new-mock-jwt-token'
      },
      success: true
    });
  }
}
*/

// ============================================================================
// TEST 6: Setup para usar Mock en todos los tests
// ============================================================================

/*
import { NgModule } from '@angular/core';
import { MockAuthAdapter } from './mock-auth.adapter';
import { IAuthPort } from '../domain/ports/auth.port';
import { IAuthRepositoryPort } from '../domain/ports/auth-repository.port';

// Mock para repository
export class MockRepository implements IAuthRepositoryPort {
  private user: any = null;
  private token: string | null = null;

  saveUser(user: any): void { this.user = user; }
  getUser(): any { return this.user; }
  removeUser(): void { this.user = null; }
  saveToken(token: string): void { this.token = token; }
  getToken(): string | null { return this.token; }
  removeToken(): void { this.token = null; }
}

@NgModule({
  providers: [
    { provide: IAuthPort, useClass: MockAuthAdapter },
    { provide: IAuthRepositoryPort, useClass: MockRepository }
  ]
})
export class AuthTestingModule {}

// En tu test:
// TestBed.configureTestingModule({
//   imports: [AuthTestingModule]
// });
*/

// ============================================================================
// CHECKLIST DE TESTING
// ============================================================================

/*
✅ Unit Tests:
  - [ ] LoginUseCase.execute() con credenciales válidas
  - [ ] LoginUseCase.execute() con credenciales inválidas
  - [ ] LogoutUseCase.execute()
  - [ ] GetCurrentUserUseCase.execute()
  - [ ] LoginMapper.apiResponseToUser()
  - [ ] LoginMapper.userToLoginResponseDTO()

✅ Component Tests:
  - [ ] LoginFormComponent valida email
  - [ ] LoginFormComponent valida contraseña
  - [ ] LoginFormComponent emite form values en submit
  - [ ] LoginFormComponent muestra mensajes de error
  - [ ] LoginFormComponent deshabilita formulario mientras carga
  - [ ] UserInfoComponent muestra datos del usuario
  - [ ] UserInfoComponent emite evento de logout

✅ Service Tests:
  - [ ] AuthService.login() llama a LoginUseCase
  - [ ] AuthService.logout() llama a LogoutUseCase
  - [ ] AuthService.getCurrentUser() retorna usuario

✅ Integration Tests:
  - [ ] Http requests al endpoint correcto
  - [ ] Respuestas se mapean correctamente
  - [ ] Errores se manejan correctamente

✅ E2E Tests:
  - [ ] Login exitoso redirige a dashboard
  - [ ] Login fallido muestra error
  - [ ] Logout limpia sesión
  - [ ] Token se envía en súbsequentes requests
*/

export {};
