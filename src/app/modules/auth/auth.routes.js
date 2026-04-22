"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
var login_page_1 = require("./presentation/pages/login.page");
exports.authRoutes = [
    {
        path: '',
        component: login_page_1.LoginPageComponent
    },
    {
        path: 'login',
        component: login_page_1.LoginPageComponent
    }
];
