"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
exports.environment = {
    production: true,
    apis: {
        auth: {
            baseUrl: 'https://localhost:7298/api',
            endpoints: {
                login: '/Token'
            }
        }
    },
    auth: {
        storageType: 'localStorage',
        storageKeys: {
            user: 'auth_user',
            token: 'auth_token',
            refreshToken: 'auth_refresh_token',
            tokenExpiration: 'auth_token_expiration'
        },
        tokenExpirationTime: 3600,
        refreshTokenThreshold: 300,
        enableAutoRefresh: false
    }
};
