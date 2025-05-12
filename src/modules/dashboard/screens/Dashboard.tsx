import React from 'react';
import { View } from 'react-native';
import { ProductModule } from 'bvg-innovation-state-management';
import { useAuth } from '../../../app/auth-provider';
import SafeAreaWrapper from '_components/SafeAreaWrapper';
import PrivateDashboard from '_modules/dashboard/Test.tsx';

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

  return (
    <SafeAreaWrapper style={{ flex: 1, paddingTop: 0 }}>
      <PrivateDashboard />
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      ></View>
    </SafeAreaWrapper>
  );
};

export default Dashboard;
