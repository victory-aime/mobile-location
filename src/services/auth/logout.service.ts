import axios from 'axios';
import Config from 'react-native-config';

export const logout = async (id_token: string | undefined) => {
  const { LOGOUT_CALLBACK } = Config;
  if (!id_token) {
    console.warn('❌ id_token is missing. Cannot logout.');
    return;
  }
  const callback = 'myapp://logout-redirect';
  const logoutUrl =
    'http://192.168.1.161:8080/realms/ecommerce/protocol/openid-connect/logout?' +
    `id_token_hint=${id_token}` +
    `&post_logout_redirect_uri=${encodeURIComponent(callback)}`;
  try {
    await axios.get(logoutUrl);
    console.log('✅ Logout succeeded.');
  } catch (error) {
    console.warn('❌ Logout redirection failed.', error);
  }
};
