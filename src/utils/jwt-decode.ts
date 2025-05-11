import { decode as base64Decode } from 'base-64';

export const decodeJWT = (token: string): any | null => {
  try {
    const payload = token.split('.')[1];
    const decodedPayload = base64Decode(payload);
    return JSON.parse(decodedPayload);
  } catch (e) {
    console.error('❌ Failed to decode JWT:', e);
    return null;
  }
};
