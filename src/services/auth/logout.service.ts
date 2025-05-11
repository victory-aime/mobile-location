import axios from 'axios';

export const logout = async (id_token: string | undefined) => {
  if (!id_token) {
    console.warn('❌ id_token is missing. Cannot logout.');
    return;
  }
  const postLogoutRedirectUri = 'myapp://callback';
  const logoutUrl =
    'http://localhost:8080/realms/ecommerce/protocol/openid-connect/logout?' +
    `id_token_hint=${id_token}` +
    `&post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`;
  try {
    await axios.get(logoutUrl);
  } catch (err) {
    console.warn('❌ Logout redirection failed.', err);
  }
};
