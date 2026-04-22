"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPageComponent = void 0;
/**
 * Pagina Login
 * Pagina principal del modulo de autenticacion
 */
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var login_form_component_1 = require("../components/login-form.component");
var user_info_component_1 = require("../components/user-info.component");
var LoginPageComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-login-page',
            standalone: true,
            imports: [common_1.CommonModule, login_form_component_1.LoginFormComponent, user_info_component_1.UserInfoComponent],
            template: "\n    <div class=\"login-page-container\">\n      <div class=\"login-shell\">\n        <section class=\"hero-panel\">\n          <span class=\"eyebrow\">Arquitectura Hexagonal</span>\n          <h1>Login conectado a APIs externas</h1>\n          <p>\n            Este modulo usa puertos y adaptadores para desacoplar la UI del backend.\n            La primera integracion activa consume el endpoint de autenticacion configurado en\n            <code>environment</code>.\n          </p>\n\n          <div class=\"hero-badges\">\n            <span>Endpoint configurable</span>\n            <span>JWT decodificado en mapper</span>\n            <span>Sesion persistida</span>\n          </div>\n        </section>\n\n        <section class=\"auth-card\">\n          <div *ngIf=\"!currentUser; else userLogged\" class=\"login-section\">\n            <span class=\"card-kicker\">Autenticacion</span>\n            <h2>Iniciar sesion</h2>\n            <p class=\"card-copy\">\n              Ingresa tus credenciales para solicitar el token a la API externa.\n            </p>\n\n            <app-login-form\n              [isLoading]=\"isLoading\"\n              [errorMessage]=\"errorMessage\"\n              (submit)=\"onLogin($event)\"\n            ></app-login-form>\n          </div>\n\n          <ng-template #userLogged>\n            <div class=\"user-section\">\n              <span class=\"card-kicker\">Sesion activa</span>\n              <h2>Bienvenido</h2>\n              <p class=\"card-copy\">\n                La informacion del usuario se obtuvo a partir del JWT y se persiste localmente.\n              </p>\n              <app-user-info\n                [user]=\"currentUser\"\n                (logout)=\"onLogout()\"\n              ></app-user-info>\n            </div>\n          </ng-template>\n        </section>\n      </div>\n    </div>\n  ",
            styles: ["\n    :host {\n      display: block;\n      min-height: 100vh;\n    }\n\n    .login-page-container {\n      min-height: 100vh;\n      padding: 32px;\n      background:\n        radial-gradient(circle at top left, rgba(255, 184, 108, 0.28), transparent 34%),\n        radial-gradient(circle at bottom right, rgba(79, 172, 254, 0.2), transparent 28%),\n        linear-gradient(135deg, #f4efe6 0%, #eef5ff 45%, #f7fbf8 100%);\n    }\n\n    .login-shell {\n      max-width: 1120px;\n      margin: 0 auto;\n      min-height: calc(100vh - 64px);\n      display: grid;\n      grid-template-columns: minmax(280px, 1.1fr) minmax(320px, 0.9fr);\n      gap: 28px;\n      align-items: stretch;\n    }\n\n    .hero-panel,\n    .auth-card {\n      border-radius: 28px;\n      box-shadow: 0 22px 60px rgba(15, 23, 42, 0.08);\n      backdrop-filter: blur(10px);\n    }\n\n    .hero-panel {\n      padding: 48px;\n      background:\n        linear-gradient(160deg, rgba(16, 42, 67, 0.95), rgba(11, 82, 91, 0.88)),\n        linear-gradient(135deg, #102a43, #0b525b);\n      color: #f8fafc;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n    }\n\n    .auth-card {\n      padding: 40px 36px;\n      background: rgba(255, 255, 255, 0.88);\n      border: 1px solid rgba(255, 255, 255, 0.65);\n      display: flex;\n      align-items: center;\n    }\n\n    .login-section,\n    .user-section {\n      width: 100%;\n      animation: fadeUp 0.28s ease-out;\n    }\n\n    .eyebrow,\n    .card-kicker {\n      display: inline-flex;\n      align-items: center;\n      width: fit-content;\n      padding: 8px 14px;\n      border-radius: 999px;\n      font-size: 12px;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n\n    .eyebrow {\n      background: rgba(255, 255, 255, 0.14);\n      color: #fef3c7;\n    }\n\n    .card-kicker {\n      background: #e1f0ff;\n      color: #0b4f6c;\n      margin-bottom: 16px;\n    }\n\n    h1,\n    h2 {\n      margin: 0;\n      font-family: Georgia, 'Times New Roman', serif;\n      letter-spacing: -0.03em;\n    }\n\n    h1 {\n      font-size: clamp(2.6rem, 5vw, 4.3rem);\n      line-height: 0.96;\n      margin-top: 18px;\n    }\n\n    h2 {\n      font-size: 2rem;\n      color: #102a43;\n    }\n\n    p {\n      margin: 0;\n      line-height: 1.7;\n      font-size: 1rem;\n    }\n\n    .hero-panel p {\n      max-width: 34rem;\n      margin-top: 22px;\n      color: rgba(248, 250, 252, 0.84);\n    }\n\n    .card-copy {\n      margin: 12px 0 28px;\n      color: #486581;\n    }\n\n    .hero-badges {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 12px;\n      margin-top: 28px;\n    }\n\n    .hero-badges span {\n      padding: 10px 14px;\n      border-radius: 14px;\n      background: rgba(255, 255, 255, 0.1);\n      color: #f8fafc;\n      font-size: 0.92rem;\n    }\n\n    code {\n      padding: 2px 8px;\n      border-radius: 999px;\n      background: rgba(255, 255, 255, 0.12);\n      color: #fef3c7;\n    }\n\n    @keyframes fadeUp {\n      from {\n        opacity: 0;\n        transform: translateY(12px);\n      }\n\n      to {\n        opacity: 1;\n        transform: translateY(0);\n      }\n    }\n\n    @media (max-width: 920px) {\n      .login-page-container {\n        padding: 18px;\n      }\n\n      .login-shell {\n        grid-template-columns: 1fr;\n        min-height: auto;\n      }\n\n      .hero-panel,\n      .auth-card {\n        padding: 28px;\n      }\n    }\n  "]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LoginPageComponent = _classThis = /** @class */ (function () {
        function LoginPageComponent_1(authService) {
            this.authService = authService;
            this.currentUser = null;
            this.isLoading = false;
            this.errorMessage = '';
            this.destroy$ = new rxjs_1.Subject();
        }
        LoginPageComponent_1.prototype.ngOnInit = function () {
            this.loadCurrentUser();
        };
        LoginPageComponent_1.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        LoginPageComponent_1.prototype.loadCurrentUser = function () {
            var _this = this;
            this.authService
                .getCurrentUser()
                .pipe((0, operators_1.takeUntil)(this.destroy$))
                .subscribe(function (user) {
                _this.currentUser = user;
            });
        };
        LoginPageComponent_1.prototype.onLogin = function (credentials) {
            var _this = this;
            this.isLoading = true;
            this.errorMessage = '';
            this.authService
                .login(credentials)
                .pipe((0, operators_1.takeUntil)(this.destroy$))
                .subscribe({
                next: function (response) {
                    var _a;
                    _this.isLoading = false;
                    if (response.success) {
                        _this.currentUser = (_a = response.user) !== null && _a !== void 0 ? _a : null;
                        return;
                    }
                    _this.errorMessage = response.message || 'Error al iniciar sesion';
                },
                error: function (error) {
                    _this.isLoading = false;
                    _this.errorMessage = _this.getLoginErrorMessage(error);
                    console.error('Login error:', error);
                }
            });
        };
        LoginPageComponent_1.prototype.onLogout = function () {
            var _this = this;
            this.isLoading = true;
            this.authService
                .logout()
                .pipe((0, operators_1.takeUntil)(this.destroy$))
                .subscribe({
                next: function () {
                    _this.isLoading = false;
                    _this.currentUser = null;
                },
                error: function (error) {
                    _this.isLoading = false;
                    console.error('Logout error:', error);
                    _this.currentUser = null;
                }
            });
        };
        LoginPageComponent_1.prototype.getLoginErrorMessage = function (error) {
            var _a, _b, _c;
            if (error.status === 0) {
                return 'No fue posible conectar con la API de autenticacion. Revisa HTTPS, CORS y que el backend este disponible.';
            }
            if ((_b = (_a = error.error) === null || _a === void 0 ? void 0 : _a.errors) === null || _b === void 0 ? void 0 : _b.length) {
                return error.error.errors.join(', ');
            }
            return ((_c = error.error) === null || _c === void 0 ? void 0 : _c.message) || 'Error de conexion. Por favor intenta de nuevo.';
        };
        return LoginPageComponent_1;
    }());
    __setFunctionName(_classThis, "LoginPageComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoginPageComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoginPageComponent = _classThis;
}();
exports.LoginPageComponent = LoginPageComponent;
