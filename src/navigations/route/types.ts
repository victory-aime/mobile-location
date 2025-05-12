import { BottomTabRouteParams } from '_types/navigations';
import React from 'react';
import { SvgProps } from 'react-native-svg';

export interface BottomTabRouteItem {
  title: string;
  isCustomButton?: boolean;
  icon?: (style?: SvgProps) => React.ReactElement;
  route: keyof BottomTabRouteParams;
  viewComponent: React.FC;
  key?: string;
}
