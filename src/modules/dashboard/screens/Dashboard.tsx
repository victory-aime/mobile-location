import React from 'react';
import { Text, View } from 'react-native';
import { ProductModule } from 'bvg-innovation-state-management';
import { Button } from 'react-native-paper';
import { useAuth } from '../../../app/auth-provider';

const Dashboard = () => {
  const { logout, tokenData } = useAuth();
  const { data, isLoading, isError, error, refetch } =
    ProductModule.getPublicProductQueries({
      payload: {
        userId: tokenData?.keycloakId,
      },
      queryOptions: {
        enabled: true,
      },
    });

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (isError) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{error?.message}</Text>
        <Text>{error?.cause?.message}</Text>
        <Button icon={'camera'}>refetch data</Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Produits chargés: {JSON.stringify(data)}</Text>
      <Text>Token: {JSON.stringify(tokenData?.access_token)}</Text>
      <Button onPress={logout}>Se deconnecter</Button>
      <Button onPress={() => refetch()}>refresh data</Button>
      <Button icon={'camera'}>refetch data</Button>
    </View>
  );
};

export default Dashboard;
