import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { BottomTabRouteParams } from '_types/navigations';
import { BottomTabRoute } from '_navigations/route/bottom-tab';
import { useTranslation } from 'react-i18next';

const BottomTab = createBottomTabNavigator<BottomTabRouteParams>();

export default function BottomTabNavigator() {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        unmountOnBlur: true,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          style={{
            height: 95,
            backgroundColor: theme.colors.background,
          }}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) =>
            descriptors[route.key].options.tabBarIcon?.({
              focused,
              color,
              size: 20,
            }) || null
          }
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            return typeof options.tabBarLabel === 'string'
              ? t(options.tabBarLabel)
              : typeof options.title === 'string'
              ? t(options.title)
              : t(route?.name);
          }}
        />
      )}
    >
      {BottomTabRoute.map((obj, index) => {
        const title = t(obj.title) || '';
        return (
          <BottomTab.Screen
            key={obj.title + index}
            name={obj.route as keyof BottomTabRouteParams}
            component={obj.viewComponent}
            options={{
              title,
              headerShown: false,
              unmountOnBlur: true,
              tabBarIcon: ({ color, size }) =>
                obj.icon &&
                obj.icon({ fill: color, width: size, height: size }),
            }}
          />
        );
      })}
    </BottomTab.Navigator>
  );
}
