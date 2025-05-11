import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';
import {
  loginWithKeycloak,
  logout as keycloakLogout,
  refreshAccessToken,
  getTokenDataFromStorage,
} from '../services/auth';
import { globalApplicationContext } from './globalState';
import { decodeJWT } from '../utils/jwt-decode';

export type TokenData = {
  access_token: string;
  refresh_token: string;
  id_token: string;
  keycloakId?: string;
  expires_at: number;
};

interface AuthContextType {
  tokenData: TokenData | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<any>;
  getValidAccessToken: () => Promise<string | null>;
  initializeAuth: (tokens: TokenData) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);

  const saveTokenData = async (data: TokenData) => {
    await AsyncStorage.multiSet([
      [StorageKeys.ACCESS_TOKEN_KEY, data.access_token],
      [StorageKeys.REFRESH_TOKEN_KEY, data.refresh_token],
      [StorageKeys.ID_TOKEN_KEY, data.id_token],
      [StorageKeys.EXPIRES_AT_KEY, data.expires_at.toString()],
    ]);
    setTokenData(data);
  };

  const initializeAuth = async (tokens: TokenData) => {
    await saveTokenData(tokens);
    setTokenData(tokens);
  };

  const login = async () => {
    const result = await loginWithKeycloak();
    const decoded: any = decodeJWT(result.access_token);
    const data: TokenData = {
      access_token: result.access_token,
      refresh_token: result.refresh_token,
      id_token: result.id_token,
      keycloakId: decoded?.sub,
      expires_at: Math.floor(Date.now() / 1000) + result.expires_in,
    };
    await saveTokenData(data);
    return result;
  };

  const logout = useCallback(async () => {
    await keycloakLogout(tokenData?.id_token);
    await AsyncStorage.multiRemove([
      StorageKeys.ACCESS_TOKEN_KEY,
      StorageKeys.REFRESH_TOKEN_KEY,
      StorageKeys.ID_TOKEN_KEY,
      StorageKeys.EXPIRES_AT_KEY,
    ]);
    setTokenData(null);
  }, [tokenData]);

  const isExpiringSoon = (expiresAt: number): boolean => {
    const now = Math.floor(Date.now() / 1000);
    return expiresAt - now <= 60;
  };

  const maybeRefreshToken = useCallback(async () => {
    try {
      if (!tokenData || !isExpiringSoon(tokenData.expires_at)) {
        return;
      }
      const refreshedToken = await refreshAccessToken(tokenData.refresh_token);
      const decoded = decodeJWT(refreshedToken.access_token);
      if (refreshedToken) {
        await saveTokenData(refreshedToken);
      }
      return {
        ...tokenData,
        access_token: refreshedToken.access_token,
        refresh_token: refreshedToken.refresh_token,
        id_token: refreshedToken.id_token,
        expires_at: refreshedToken.expires_at,
        keycloakId: decoded?.sub,
      };
    } catch (e) {
      console.warn('refresh error', e);
      return { ...tokenData, error: 'RefreshAccessTokenError' };
    }
  }, [tokenData]);

  const getValidAccessToken = async (): Promise<string | null> => {
    if (!tokenData) {
      return null;
    }
    if (isExpiringSoon(tokenData.expires_at)) {
      const success = await refreshAccessToken(tokenData.refresh_token);
      if (!success) {
        return null;
      }
      const updated = await getTokenDataFromStorage();
      if (updated) {
        setTokenData(updated);
        return updated.access_token;
      }
    }
    return tokenData.access_token;
  };

  useEffect(() => {
    if (tokenData?.access_token) {
      globalApplicationContext.setToken(tokenData.access_token);
    } else {
      globalApplicationContext.setToken('');
    }
  }, [tokenData?.access_token]);

  return (
    <AuthContext.Provider
      value={{
        tokenData,
        login,
        logout,
        getValidAccessToken,
        refreshAccessToken: maybeRefreshToken,
        initializeAuth,
        isAuthenticated: !!tokenData?.access_token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
