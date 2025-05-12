import { SvgProps } from 'react-native-svg';
import React from 'react';
import { Home } from '_assets/svg';
import { BottomTabRouteItem } from '_navigations/route/types';
import { Text, View } from 'react-native';
import Dashboard from '_modules/dashboard/screens/Dashboard.tsx';
import { BottomTabRoutes } from '_navigations/route/routes.ts';

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

export const BottomTabRoute: BottomTabRouteItem[] = [
  {
    title: 'BOTTOM_TAB.DASHBOARD',
    route: BottomTabRoutes.DASHBOARD,
    viewComponent: Dashboard,
    icon: (style?: SvgProps) => {
      return React.createElement(Home, { ...style });
    },
  },
  {
    title: 'BOTTOM_TAB.FAVOURITE',
    route: BottomTabRoutes.FAVOURITE,
    viewComponent: Dashboard,
    icon: (style?: SvgProps) => {
      return React.createElement(Home, { ...style });
    },
  },
  {
    title: 'BOTTOM_TAB.PRODUCT',
    route: BottomTabRoutes.SHOP,
    viewComponent: SettingsScreen,
    icon: (style?: SvgProps) => {
      return React.createElement(Home, { ...style });
    },
  },
  {
    title: 'BOTTOM_TAB.PROFILE',
    route: BottomTabRoutes.PROFILE,
    viewComponent: SettingsScreen,
    icon: (style?: SvgProps) => {
      return React.createElement(Home, { ...style });
    },
  },
];
