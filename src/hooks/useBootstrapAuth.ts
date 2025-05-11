import { useEffect, useState } from 'react';
import { useAuth } from '../app/auth-provider';
import { getTokenDataFromStorage } from '../services/auth';
import { StorageKeys } from '../constants/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBootstrapAuth = () => {
  const [bootstrapped, setBootstrapped] = useState(false);
  const { initializeAuth, refreshAccessToken, logout } = useAuth();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const tokens = await getTokenDataFromStorage();
        if (!tokens) {
          throw new Error('No tokens found');
        }

        const now = Math.floor(Date.now() / 1000);
        const isExpired = tokens.expires_at <= now;

        if (!isExpired) {
          await initializeAuth(tokens);
        } else {
          const result = await refreshAccessToken();
          if (result?.error === 'RefreshAccessTokenError') {
            console.log('Token refresh failed, clearing session');
            await AsyncStorage.multiRemove([
              StorageKeys.ACCESS_TOKEN_KEY,
              StorageKeys.REFRESH_TOKEN_KEY,
              StorageKeys.ID_TOKEN_KEY,
              StorageKeys.EXPIRES_AT_KEY,
            ]);
            await logout();
          }
        }
      } catch {
      } finally {
        setBootstrapped(true);
      }
    };

    bootstrap().then();
  }, [initializeAuth, logout, refreshAccessToken]);

  return { bootstrapped };
};
