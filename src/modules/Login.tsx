import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../app/auth-provider';

const LoginScreen = () => {
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login();
    } catch (err) {
      console.error("Erreur d'authentification :", err);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={handleLogin}>Login with Keycloak</Button>
    </View>
  );
};

export default LoginScreen;
