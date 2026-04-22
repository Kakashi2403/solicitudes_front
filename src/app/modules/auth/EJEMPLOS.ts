/**
 * EJEMPLOS Y PATRONES
 * Como extender y testear el modulo de autenticacion
 */

// ============================================================================
// EJEMPLO 1: Crear un nuevo adaptador HTTP alternativo
// ============================================================================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthPort } from './domain/ports/auth.port';
import { User, AuthCredentials, LoginResponse } from './domain/entities/user.entity';

/**
 * Adaptador alternativo que usa OAuth2
 * Puedes reemplazar HttpAuthAdapter con este en auth.module.ts
 */
@Injectable()
export class OAuth2AuthAdapter implements IAuthPort {
  private readonly apiUrl = 'https://oauth-provider.com/auth';
  private readonly clientId = 'your-client-id';
  private readonly clientSecret = 'your-client-secret';

  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentials): Observable<LoginResponse> {
    void this.http;
    void this.apiUrl;
    void this.clientId;
    void this.clientSecret;

    return new Observable((observer) => {
      observer.next({
        user: {
          id: 'oauth-user',
          email: credentials.email,
          fullName: 'OAuth Example User',
          token: 'oauth-access-token',
          expiresIn: 3600
        },
        success: true
      });
      observer.complete();
    });
  }

  getCurrentUser(): Observable<User | null> {
    return new Observable((observer) => {
      observer.next(null);
      observer.complete();
    });
  }

  logout(): Observable<void> {
    return new Observable((observer) => {
      observer.next();
      observer.complete();
    });
  }

  refreshToken(token: string): Observable<LoginResponse> {
    return new Observable((observer) => {
      observer.next({
        user: {
          id: 'oauth-user',
          email: 'oauth@example.com',
          fullName: 'OAuth Example User',
          token,
          expiresIn: 3600
        },
        success: true
      });
      observer.complete();
    });
  }
}

// ============================================================================
// EJEMPLO 2: Crear un nuevo adaptador de persistencia
// ============================================================================

/**
 * Adaptador que usa IndexedDB en lugar de localStorage
 */
// @Injectable()
// export class IndexedDbAuthAdapter implements IAuthRepositoryPort {
//   private db!: IDBDatabase;
//
//   constructor() {
//     this.initDb();
//   }
//
//   private initDb() {
//     const request = indexedDB.open('AuthDB', 1);
//     request.onupgradeneeded = (event) => {
//       const db = (event.target as IDBOpenDBRequest).result;
//       if (!db.objectStoreNames.contains('auth')) {
//         db.createObjectStore('auth');
//       }
//     };
//   }
//
//   saveUser(user: User): void {
//     // Implementar guardado en IndexedDB
//   }
//
//   getUser(): User | null {
//     // Implementar lectura desde IndexedDB
//     return null;
//   }
//   // ... resto de metodos
// }

// ============================================================================
// EJEMPLO 3: Usar un Mock para Testing
// ============================================================================

/**
 * Mock para testing - implementa IAuthPort
 */
export class MockAuthAdapter implements IAuthPort {
  mockUser: User = {
    id: 'test-123',
    email: 'test@example.com',
    fullName: 'Test User',
    token: 'mock-token',
    expiresIn: 3600
  };

  login(credentials: AuthCredentials): Observable<LoginResponse> {
    return new Observable((observer) => {
      if (credentials.email === 'test@example.com' && credentials.password === 'password') {
        observer.next({
          user: this.mockUser,
          success: true
        });
        observer.complete();
        return;
      }

      observer.error({
        message: 'Credenciales invalidas'
      });
    });
  }

  getCurrentUser(): Observable<User | null> {
    return new Observable((observer) => {
      observer.next(this.mockUser);
      observer.complete();
    });
  }

  logout(): Observable<void> {
    return new Observable((observer) => {
      observer.next();
      observer.complete();
    });
  }

  refreshToken(token: string): Observable<LoginResponse> {
    return new Observable((observer) => {
      observer.next({
        user: {
          ...this.mockUser,
          token
        },
        success: true
      });
      observer.complete();
    });
  }
}

// ============================================================================
// EJEMPLO 4: Unit Test para un Use Case
// ============================================================================

/*
// En login.use-case.spec.ts
import { TestBed } from '@angular/core/testing';
import { LoginUseCase } from './login.use-case';
import { MockAuthAdapter } from './mock-auth.adapter';
import { LocalStorageAuthAdapter } from '../../infrastructure/adapters/local-storage-auth.adapter';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockAuthAdapter: MockAuthAdapter;
  let mockRepository: LocalStorageAuthAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginUseCase]
    });

    mockAuthAdapter = new MockAuthAdapter();
    mockRepository = new LocalStorageAuthAdapter();
    useCase = new LoginUseCase(mockAuthAdapter, mockRepository);
  });

  it('should save user to repository on successful login', (done) => {
    const credentials = { email: 'test@example.com', password: 'password' };

    useCase.execute(credentials).subscribe((response) => {
      expect(response.success).toBe(true);
      expect(mockRepository.getUser()).toBeTruthy();
      done();
    });
  });

  it('should fail on invalid credentials', (done) => {
    const credentials = { email: 'invalid@example.com', password: 'wrong' };

    useCase.execute(credentials).subscribe({
      next: () => {
        fail('Should have thrown an error');
      },
      error: () => {
        expect(true).toBe(true);
        done();
      }
    });
  });
});
*/

// ============================================================================
// EJEMPLO 5: Configurar para usar Mock en Tests
// ============================================================================

/*
// En un archivo de configuracion de test (auth.test.module.ts)
import { NgModule } from '@angular/core';
import { IAuthPort } from './domain/ports/auth.port';
import { MockAuthAdapter } from './infrastructure/adapters/mock-auth.adapter';

@NgModule({
  providers: [
    {
      provide: IAuthPort,
      useClass: MockAuthAdapter
    }
  ]
})
export class AuthTestModule {}

// En tu test:
import { AuthTestModule } from './auth.test.module';

TestBed.configureTestingModule({
  imports: [AuthTestModule]
});
*/

// ============================================================================
// EJEMPLO 6: Interceptor para agregar token a todas las requests
// ============================================================================

/*
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageAuthAdapter } from './local-storage-auth.adapter';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private authRepository: LocalStorageAuthAdapter) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authRepository.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}

// Registrar en app.ts o auth.module.ts:
// {
//   provide: HTTP_INTERCEPTORS,
//   useClass: AuthTokenInterceptor,
//   multi: true
// }
*/

// ============================================================================
// EJEMPLO 7: Guard para proteger rutas autenticadas
// ============================================================================

/*
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      map((user) => {
        if (user) {
          return true;
        }

        this.router.navigate(['/auth/login']);
        return false;
      })
    );
  }
}

// Usar en rutas:
// {
//   path: 'dashboard',
//   component: DashboardComponent,
//   canActivate: [AuthGuard]
// }
*/

export {};
