import { NavigatorScreenParams } from '@react-navigation/core';
import {
  AppRoute,
  AuthRoute,
  BottomTabRoutes,
} from '_navigations/route/routes';

export type AppNavigatorParams = {
  [AppRoute.BOTTOM_TAB_NAVIGATOR]: NavigatorScreenParams<BottomTabRouteParams>;
  [AppRoute.PROFILE]: undefined;
};

export type AuthStackParam = {
  [AuthRoute.LOGIN]: undefined;
};

export type BottomTabRouteParams = {
  [BottomTabRoutes.DASHBOARD]: undefined;
  [BottomTabRoutes.SHOP]: undefined;
  [BottomTabRoutes.PROFILE]: undefined;
  [BottomTabRoutes.FAVOURITE]: undefined;
};
