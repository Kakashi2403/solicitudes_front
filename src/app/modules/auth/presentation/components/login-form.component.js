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
exports.LoginFormComponent = void 0;
/**
 * Componente Login Form
 * Formulario reutilizable para login
 */
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var LoginFormComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-login-form',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
            template: "\n    <div class=\"login-form-container\">\n      <form [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\n        <div class=\"form-group\">\n          <label for=\"email\">Correo electronico</label>\n          <input\n            id=\"email\"\n            type=\"email\"\n            formControlName=\"email\"\n            placeholder=\"tu@correo.com\"\n            class=\"form-control\"\n            autocomplete=\"username\"\n          />\n          <span *ngIf=\"getEmailError()\" class=\"error-message\">\n            {{ getEmailError() }}\n          </span>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"password\">Contrasena</label>\n          <input\n            id=\"password\"\n            type=\"password\"\n            formControlName=\"password\"\n            placeholder=\"Ingresa tu contrasena\"\n            class=\"form-control\"\n            autocomplete=\"current-password\"\n          />\n          <span *ngIf=\"getPasswordError()\" class=\"error-message\">\n            {{ getPasswordError() }}\n          </span>\n        </div>\n\n        <button\n          type=\"submit\"\n          [disabled]=\"!loginForm.valid || isLoading\"\n          class=\"btn-submit\"\n        >\n          {{ isLoading ? 'Conectando con la API...' : 'Solicitar token' }}\n        </button>\n      </form>\n\n      <div *ngIf=\"errorMessage\" class=\"alert-error\">\n        {{ errorMessage }}\n      </div>\n    </div>\n  ",
            styles: ["\n    .login-form-container {\n      width: 100%;\n    }\n\n    form {\n      display: grid;\n      gap: 18px;\n    }\n\n    .form-group {\n      display: flex;\n      flex-direction: column;\n      gap: 8px;\n    }\n\n    label {\n      color: #243b53;\n      font-size: 0.92rem;\n      font-weight: 700;\n      letter-spacing: 0.01em;\n    }\n\n    .form-control {\n      min-height: 52px;\n      padding: 0 16px;\n      border: 1px solid #cbd2d9;\n      border-radius: 16px;\n      font-size: 0.98rem;\n      color: #102a43;\n      background: #ffffff;\n      transition:\n        border-color 0.2s ease,\n        box-shadow 0.2s ease,\n        transform 0.2s ease;\n    }\n\n    .form-control::placeholder {\n      color: #7b8794;\n    }\n\n    .form-control:focus {\n      outline: none;\n      border-color: #0b4f6c;\n      box-shadow: 0 0 0 4px rgba(11, 79, 108, 0.12);\n      transform: translateY(-1px);\n    }\n\n    .form-control:disabled {\n      background-color: #f7fafc;\n      color: #9aa5b1;\n      cursor: not-allowed;\n    }\n\n    .error-message {\n      color: #b42318;\n      font-size: 0.85rem;\n    }\n\n    .btn-submit {\n      min-height: 54px;\n      border: none;\n      border-radius: 18px;\n      background: linear-gradient(135deg, #0b4f6c 0%, #147d64 100%);\n      color: #f8fafc;\n      font-size: 1rem;\n      font-weight: 700;\n      letter-spacing: 0.01em;\n      cursor: pointer;\n      transition:\n        transform 0.2s ease,\n        box-shadow 0.2s ease,\n        opacity 0.2s ease;\n      box-shadow: 0 16px 28px rgba(20, 125, 100, 0.22);\n    }\n\n    .btn-submit:hover:not(:disabled) {\n      transform: translateY(-1px);\n      box-shadow: 0 20px 34px rgba(20, 125, 100, 0.28);\n    }\n\n    .btn-submit:disabled {\n      opacity: 0.55;\n      cursor: not-allowed;\n      box-shadow: none;\n    }\n\n    .alert-error {\n      margin-top: 18px;\n      padding: 14px 16px;\n      border-radius: 16px;\n      border: 1px solid #f7b4ae;\n      background: #fff3f1;\n      color: #8a1c0f;\n      line-height: 1.5;\n    }\n  "]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _isLoading_decorators;
    var _isLoading_initializers = [];
    var _isLoading_extraInitializers = [];
    var _errorMessage_decorators;
    var _errorMessage_initializers = [];
    var _errorMessage_extraInitializers = [];
    var _submit_decorators;
    var _submit_initializers = [];
    var _submit_extraInitializers = [];
    var LoginFormComponent = _classThis = /** @class */ (function () {
        function LoginFormComponent_1(fb) {
            this.fb = fb;
            this.isLoading = __runInitializers(this, _isLoading_initializers, false);
            this.errorMessage = (__runInitializers(this, _isLoading_extraInitializers), __runInitializers(this, _errorMessage_initializers, ''));
            this.submit = (__runInitializers(this, _errorMessage_extraInitializers), __runInitializers(this, _submit_initializers, new core_1.EventEmitter()));
            this.loginForm = __runInitializers(this, _submit_extraInitializers);
            this.loginForm = this.fb.group({
                email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
                password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]]
            });
        }
        LoginFormComponent_1.prototype.ngOnChanges = function (changes) {
            if (!changes['isLoading']) {
                return;
            }
            if (this.isLoading) {
                this.loginForm.disable({ emitEvent: false });
                return;
            }
            this.loginForm.enable({ emitEvent: false });
        };
        LoginFormComponent_1.prototype.onSubmit = function () {
            if (this.loginForm.valid) {
                this.submit.emit(this.loginForm.getRawValue());
            }
        };
        LoginFormComponent_1.prototype.getEmailError = function () {
            var emailControl = this.loginForm.get('email');
            if (emailControl === null || emailControl === void 0 ? void 0 : emailControl.hasError('required')) {
                return 'El correo electronico es requerido';
            }
            if (emailControl === null || emailControl === void 0 ? void 0 : emailControl.hasError('email')) {
                return 'Ingresa un correo electronico valido';
            }
            return null;
        };
        LoginFormComponent_1.prototype.getPasswordError = function () {
            var passwordControl = this.loginForm.get('password');
            if (passwordControl === null || passwordControl === void 0 ? void 0 : passwordControl.hasError('required')) {
                return 'La contrasena es requerida';
            }
            if (passwordControl === null || passwordControl === void 0 ? void 0 : passwordControl.hasError('minlength')) {
                return 'La contrasena debe tener al menos 6 caracteres';
            }
            return null;
        };
        return LoginFormComponent_1;
    }());
    __setFunctionName(_classThis, "LoginFormComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _isLoading_decorators = [(0, core_1.Input)()];
        _errorMessage_decorators = [(0, core_1.Input)()];
        _submit_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _isLoading_decorators, { kind: "field", name: "isLoading", static: false, private: false, access: { has: function (obj) { return "isLoading" in obj; }, get: function (obj) { return obj.isLoading; }, set: function (obj, value) { obj.isLoading = value; } }, metadata: _metadata }, _isLoading_initializers, _isLoading_extraInitializers);
        __esDecorate(null, null, _errorMessage_decorators, { kind: "field", name: "errorMessage", static: false, private: false, access: { has: function (obj) { return "errorMessage" in obj; }, get: function (obj) { return obj.errorMessage; }, set: function (obj, value) { obj.errorMessage = value; } }, metadata: _metadata }, _errorMessage_initializers, _errorMessage_extraInitializers);
        __esDecorate(null, null, _submit_decorators, { kind: "field", name: "submit", static: false, private: false, access: { has: function (obj) { return "submit" in obj; }, get: function (obj) { return obj.submit; }, set: function (obj, value) { obj.submit = value; } }, metadata: _metadata }, _submit_initializers, _submit_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoginFormComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoginFormComponent = _classThis;
}();
exports.LoginFormComponent = LoginFormComponent;
