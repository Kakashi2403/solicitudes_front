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
exports.UserInfoComponent = void 0;
/**
 * Componente User Info
 * Muestra informacion del usuario autenticado
 */
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var UserInfoComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-user-info',
            standalone: true,
            imports: [common_1.CommonModule],
            template: "\n    <div *ngIf=\"user\" class=\"user-info-container\">\n      <div class=\"user-header\">\n        <div class=\"user-avatar\">{{ user.fullName.charAt(0).toUpperCase() }}</div>\n        <div class=\"user-details\">\n          <h3>{{ user.fullName }}</h3>\n          <p>{{ user.email }}</p>\n        </div>\n      </div>\n\n      <div class=\"token-chip\">Token activo</div>\n\n      <button (click)=\"onLogout()\" class=\"btn-logout\">\n        Cerrar sesion\n      </button>\n    </div>\n  ",
            styles: ["\n    .user-info-container {\n      display: grid;\n      gap: 18px;\n      padding: 22px;\n      border-radius: 22px;\n      border: 1px solid #d9e2ec;\n      background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);\n    }\n\n    .user-header {\n      display: flex;\n      align-items: center;\n      gap: 16px;\n    }\n\n    .user-avatar {\n      width: 58px;\n      height: 58px;\n      border-radius: 18px;\n      background: linear-gradient(135deg, #0b4f6c 0%, #147d64 100%);\n      color: #f8fafc;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 1.6rem;\n      font-weight: 700;\n      flex-shrink: 0;\n    }\n\n    .user-details h3 {\n      margin: 0;\n      color: #102a43;\n      font-size: 1.2rem;\n    }\n\n    .user-details p {\n      margin: 6px 0 0;\n      color: #486581;\n    }\n\n    .token-chip {\n      width: fit-content;\n      padding: 8px 12px;\n      border-radius: 999px;\n      background: #e6fffa;\n      color: #0f766e;\n      font-size: 0.88rem;\n      font-weight: 700;\n    }\n\n    .btn-logout {\n      min-height: 50px;\n      border: none;\n      border-radius: 16px;\n      background: #102a43;\n      color: #f8fafc;\n      font-size: 0.96rem;\n      font-weight: 700;\n      cursor: pointer;\n      transition:\n        transform 0.2s ease,\n        box-shadow 0.2s ease,\n        background-color 0.2s ease;\n      box-shadow: 0 16px 30px rgba(16, 42, 67, 0.18);\n    }\n\n    .btn-logout:hover {\n      background: #0b4f6c;\n      transform: translateY(-1px);\n    }\n  "]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _logout_decorators;
    var _logout_initializers = [];
    var _logout_extraInitializers = [];
    var UserInfoComponent = _classThis = /** @class */ (function () {
        function UserInfoComponent_1() {
            this.user = __runInitializers(this, _user_initializers, null);
            this.logout = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _logout_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _logout_extraInitializers);
        }
        UserInfoComponent_1.prototype.onLogout = function () {
            this.logout.emit();
        };
        return UserInfoComponent_1;
    }());
    __setFunctionName(_classThis, "UserInfoComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _user_decorators = [(0, core_1.Input)()];
        _logout_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _logout_decorators, { kind: "field", name: "logout", static: false, private: false, access: { has: function (obj) { return "logout" in obj; }, get: function (obj) { return obj.logout; }, set: function (obj, value) { obj.logout = value; } }, metadata: _metadata }, _logout_initializers, _logout_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserInfoComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserInfoComponent = _classThis;
}();
exports.UserInfoComponent = UserInfoComponent;
