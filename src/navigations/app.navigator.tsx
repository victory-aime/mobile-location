import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { globalApplicationContext } from '../app/globalState';
import { AppContext } from '../app/app-context';
import BottomTabNavigator from '_navigations/bottom-tab.navigator';
import { AppNavigatorParams } from '_types/navigations';
import { AppRoute } from '_navigations/route/routes.ts';
import { ProfileScreen } from '_modules/profile/Profile.tsx';

const AppStack = createNativeStackNavigator<AppNavigatorParams>();

const AppNavigator = () => {
  return (
    <AppContext.Provider value={globalApplicationContext}>
      <NavigationContainer>
        <AppStack.Navigator
          initialRouteName={AppRoute.BOTTOM_TAB_NAVIGATOR}
          screenOptions={{ headerShown: false }}
        >
          <AppStack.Screen
            name={AppRoute.BOTTOM_TAB_NAVIGATOR}
            component={BottomTabNavigator}
          />
          <AppStack.Screen name={AppRoute.PROFILE} component={ProfileScreen} />
        </AppStack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};
export default AppNavigator;
