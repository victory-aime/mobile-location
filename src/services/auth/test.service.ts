import { logout } from 'react-native-app-auth';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Pour la navigation

// --- Configuration Keycloak (doit correspondre à celle utilisée pour le login) ---
const config = {
  issuer: 'VOTRE_URL_KEYCLOAK/realms/VOTRE_REALM', // Ex: 'https://keycloak.example.com/realms/myrealm'
  clientId: 'VOTRE_CLIENT_ID_REACT_NATIVE',
  redirectUrl: 'myapp://oauthredirect', // Le même que pour le login
  postLogoutRedirectUrl: 'myapp://callback', // L'URI où Keycloak doit rediriger après le logout
  scopes: ['openid', 'profile', 'email', 'offline_access'],
};

// --- Nom de la clé Keychain pour stocker les jetons ---
const TOKEN_KEY = 'keycloak_tokens';

// --- Fonction principale pour effectuer la déconnexion ---
const logoutUser = async (navigation: any) => {
  // Passez l'objet navigation si vous l'utilisez
  console.log('Tentative de déconnexion...');
  try {
    // 1. Récupérer les jetons stockés, notamment l'idToken
    const tokens = '4';

    if (!tokens) {
      console.warn(
        'Aucun jeton ID trouvé localement. Effacement local uniquement.',
      );
      Alert.alert(
        'Session expirée',
        'Aucune session active trouvée. Vous êtes déconnecté.',
      );

      navigation.replace('LoginScreen'); // Rediriger vers l'écran de connexion
      return;
    }

    // 2. Appeler la fonction de logout de react-native-app-auth
    // Cette fonction interagit avec l'endpoint de logout de Keycloak.
    // Elle gère l'ouverture d'une vue système (navigateur/WebView) si nécessaire
    // et la redirection vers postLogoutRedirectUrl après le processus Keycloak.
    try {
      console.log('Appel de la fonction logout de react-native-app-auth...');
      const logoutResult = await logout(config, {
        idToken: tokens, // Important : Indique à Keycloak quelle session terminer
        postLogoutRedirectUrl: config.postLogoutRedirectUrl, // Ajout de la propriété manquante
      });
      console.log(
        'Appel de logout react-native-app-auth terminé.',
        logoutResult,
      );

      // Le succès de cet appel ne garantit pas toujours que Keycloak a pu rediriger,
      // mais il indique que l'application a initié le processus.
    } catch (serverLogoutError) {
      // Ceci capture les erreurs *lors de l'appel à la bibliothèque*,
      // pas nécessairement si Keycloak a échoué à la redirection.
      console.warn(
        "Échec lors de l'appel de logout react-native-app-auth:",
        serverLogoutError,
      );
      Alert.alert(
        'Déconnexion partielle',
        'Échec de la tentative de déconnexion complète de Keycloak, mais votre session locale sera effacée.',
      );
      // Continuez pour effacer les jetons locaux même en cas d'échec côté serveur
    }

    // 3. Effacer les jetons stockés localement quoi qu'il arrive
    //await clearLocalTokens();

    // 4. Rediriger l'utilisateur vers l'écran de connexion
    Alert.alert('Déconnexion réussie', 'Vous avez été déconnecté.');
    navigation.replace('LoginScreen');
  } catch (error) {
    console.error(
      'Une erreur générale est survenue pendant la déconnexion :',
      error,
    );
    Alert.alert(
      'Erreur de déconnexion',
      'Une erreur est survenue. Veuillez réessayer.',
    );
    // Optionnel: effacer les tokens locaux même en cas d'erreur inattendue
    //clearLocalTokens();
    navigation.replace('LoginScreen');
  }
};

// --- Exemple d'utilisation dans un composant ---
/*
import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Assurez-vous que logoutUser et la config sont importés ou accessibles

const UserProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* ... Le reste de votre profil utilisateur ... *}
      <Button
        title="Se Déconnecter"
        onPress={() => logoutUser(navigation)} // Appel de la fonction de déconnexion
        color="red"
      />
    </View>
  );
};

export default UserProfileScreen;
*/
