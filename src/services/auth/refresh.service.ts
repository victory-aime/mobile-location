import Config from 'react-native-config';
import axios from 'axios';

const toFormUrlEncoded = (obj: Record<string, string>) =>
  Object.entries(obj)
    .map(
      ([key, value]) =>
        encodeURIComponent(key) + '=' + encodeURIComponent(value),
    )
    .join('&');

export const refreshAccessToken = async (refresh_token: string) => {
  const { TOKEN_ENDPOINT, KEYCLOAK_CLIENT_SECRET, KEYCLOAK_CLIENT_ID } = Config;

  try {
    if (!refresh_token) {
      console.warn('No refresh token found');
      return false;
    }

    const formBody = toFormUrlEncoded({
      client_id: KEYCLOAK_CLIENT_ID,
      client_secret: KEYCLOAK_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token,
    });

    const resp = await axios.post(TOKEN_ENDPOINT!, formBody, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const refresh_token_data = resp.data;
    return {
      ...refresh_token_data,
      access_token: refresh_token_data.access_token,
      refresh_token: refresh_token_data.refresh_token,
      id_token: refresh_token_data.id_token,
      expires_at: Math.floor(Date.now() / 1000) + refresh_token_data.expires_in,
    };
  } catch (e) {
    console.warn('Refresh token failed', e);
  }
};
