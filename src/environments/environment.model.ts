export interface ExternalApiConfig {
  baseUrl: string;
  endpoints: {
    login: string;
    logout?: string;
    refreshToken?: string;
    profile?: string;
    verify?: string;
  };
}

export interface AppEnvironment {
  production: boolean;
  apis: Record<string, ExternalApiConfig> & {
    auth: ExternalApiConfig;
  };
  auth: {
    storageType: 'localStorage' | 'sessionStorage';
    storageKeys: {
      user: string;
      token: string;
      refreshToken: string;
      tokenExpiration: string;
    };
    tokenExpirationTime: number;
    refreshTokenThreshold: number;
    enableAutoRefresh: boolean;
  };
}
