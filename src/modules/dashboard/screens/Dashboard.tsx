import React from 'react';
import {Text, View} from 'react-native';
import {ProductModule} from 'bvg-innovation-state-management';

export const Dashboard = () => {
  const {data, isLoading, isError, error} =
    ProductModule.getPublicProductQueries({
      payload: {},
      queryOptions: {
        enabled: true,
      },
    });

  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (isError) {
    console.warn('error?.message', error?.message);
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{error?.message}</Text>
        <Text>{error?.cause?.message}</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Produits chargés: {JSON.stringify(data)}</Text>
    </View>
  );
};
