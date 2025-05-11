import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native';
import { Config } from 'react-native-config';

const {
  REDIRECT_CALLBACK_KEYCLOAK,
  KEYCLOAK_ISSUER,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  AUTHORIZATION_ENDPOINT,
  TOKEN_ENDPOINT,
} = Config;

const keycloakConfig = {
  issuer: KEYCLOAK_ISSUER,
  clientId: KEYCLOAK_CLIENT_ID,
  clientSecret: KEYCLOAK_CLIENT_SECRET,
  redirectUrl: REDIRECT_CALLBACK_KEYCLOAK,
  scopes: ['openid', 'profile', 'email'],
  serviceConfiguration: {
    authorizationEndpoint: AUTHORIZATION_ENDPOINT,
    tokenEndpoint: TOKEN_ENDPOINT,
  },
};

export const loginWithKeycloak = async (): Promise<any> => {
  const authUrl =
    `${keycloakConfig.serviceConfiguration.authorizationEndpoint}?` +
    `client_id=${keycloakConfig.clientId}` +
    `&redirect_uri=${encodeURIComponent(keycloakConfig.redirectUrl)}` +
    '&response_type=code' +
    `&scope=${encodeURIComponent(keycloakConfig.scopes.join(' '))}`;

  return new Promise(async (resolve, reject) => {
    const handleUrl = async ({ url }: { url: string }) => {
      if (subscription) {
        subscription.remove();
      }

      const extractCodeFromUrl = (link: string): string | null => {
        const match = link.match(/[?&]code=([^&]+)/);
        return match ? decodeURIComponent(match[1]) : null;
      };
      const code = extractCodeFromUrl(url);

      if (!code) {
        reject(new Error('code not found in callback'));
        return;
      }
      try {
        const token = await exchangeCodeForToken(code);
        resolve(token);
      } catch (error) {
        reject(error);
      }
    };

    const subscription = Linking.addListener('url', handleUrl);

    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.openAuth(
          authUrl,
          keycloakConfig.redirectUrl,
          {
            showTitle: false,
            enableUrlBarHiding: true,
            enableDefaultShare: false,
            ephemeralWebSession: false,
          },
        );

        if (result.type === 'success' && result.url) {
          await handleUrl({ url: result.url });
        } else {
          const initialUrl = await Linking.getInitialURL();
          if (initialUrl) {
            await handleUrl({ url: initialUrl });
          } else {
            subscription.remove();
            reject(new Error('callback url not found'));
          }
        }
      } else {
        subscription.remove();
        reject(new Error('InAppBrowser not available'));
      }
    } catch (err) {
      subscription.remove();
      reject(err);
    }
  });
};

const exchangeCodeForToken = async (code: string) => {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: keycloakConfig.redirectUrl,
    client_id: keycloakConfig.clientId,
    client_secret: keycloakConfig.clientSecret,
  });

  const response = await fetch(
    keycloakConfig.serviceConfiguration.tokenEndpoint,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Token exchange failed:', errorText);
    throw new Error('Token exchange failed');
  }
  return await response.json(); // { access_token, refresh_token, id_token, ... }
};
