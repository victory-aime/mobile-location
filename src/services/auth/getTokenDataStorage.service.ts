import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenData } from '_app/auth-provider';
import { StorageKeys } from '_constants/storageKeys';

export const getTokenDataFromStorage = async (): Promise<TokenData | null> => {
  try {
    const [accessToken, refreshToken, idToken, expiresAt, keycloakId] =
      await AsyncStorage.multiGet([
        StorageKeys.ACCESS_TOKEN_KEY,
        StorageKeys.REFRESH_TOKEN_KEY,
        StorageKeys.ID_TOKEN_KEY,
        StorageKeys.EXPIRES_AT_KEY,
        StorageKeys.KEYCLOAK_ID,
      ]);

    if (
      !accessToken[1] ||
      !refreshToken[1] ||
      !idToken[1] ||
      !expiresAt[1] ||
      !keycloakId[1]
    ) {
      return null;
    }

    return {
      access_token: accessToken[1],
      refresh_token: refreshToken[1],
      id_token: idToken[1],
      expires_at: parseInt(expiresAt[1], 10),
      keycloakId: keycloakId[1],
    };
  } catch (error) {
    console.warn('❌ Failed to load token data from storage:', error);
    return null;
  }
};
