declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL: string;
    KEYCLOAK_CLIENT_ID: string;
    KEYCLOAK_CLIENT_SECRET: string;
    KEYCLOAK_ISSUER: string;
    AUTHORIZATION_ENDPOINT: string;
    TOKEN_ENDPOINT: string;
    END_SESSION: string;
    REDIRECT_CALLBACK_KEYCLOAK: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
