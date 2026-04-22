"use strict";
/**
 * GUIA: Solicitud HTTP al endpoint de Token
 *
 * Tu API: https://localhost:7298/api/Token
 * Metodo: POST
 * Content-Type: application/json
 */
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
exports.ExampleComponent = void 0;
// ============================================================================
// EJEMPLO 1: Solicitud Simple (como se ve en Postman)
// ============================================================================
/*
POST https://localhost:7298/api/Token
Content-Type: application/json

{
  "email": "fabianjsanchezpulifo@hotmail.com",
  "password": "Kakash1240"
}

RESPUESTA EXITOSA (200 OK):
{
  "body": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "errors": null,
  "warnings": null
}

PAYLOAD DEL JWT (decodificado):
{
  "nameid": "1",
  "unique_name": "Administrador",
  "email": "fabianjsanchezpulifo@hotmail.com",
  "nbf": 1776809844,
  "exp": 1776813444,
  "iat": 1776809844
}
*/
// ============================================================================
// EJEMPLO 2: Como se usa en la aplicacion Angular
// ============================================================================
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ExampleComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-example',
            standalone: true,
            imports: [forms_1.FormsModule],
            template: "\n    <form (ngSubmit)=\"login()\">\n      <input [(ngModel)]=\"email\" placeholder=\"Email\" name=\"email\" />\n      <input [(ngModel)]=\"password\" type=\"password\" placeholder=\"Contrasena\" name=\"password\" />\n      <button type=\"submit\">Login</button>\n    </form>\n  "
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ExampleComponent = _classThis = /** @class */ (function () {
        function ExampleComponent_1(authService) {
            this.authService = authService;
            this.email = 'fabianjsanchezpulifo@hotmail.com';
            this.password = 'Kakash1240';
        }
        ExampleComponent_1.prototype.login = function () {
            this.authService.login({ email: this.email, password: this.password }).subscribe({
                next: function (response) {
                    console.log('Login exitoso');
                    console.log('Usuario:', response.user);
                    if (response.user) {
                        console.log('Token:', response.user.token);
                    }
                    // El usuario se guarda automaticamente en localStorage
                },
                error: function (error) {
                    console.error('Error en login:', error);
                }
            });
        };
        return ExampleComponent_1;
    }());
    __setFunctionName(_classThis, "ExampleComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleComponent = _classThis;
}();
exports.ExampleComponent = ExampleComponent;
