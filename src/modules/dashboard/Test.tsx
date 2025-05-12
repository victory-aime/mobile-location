import React from 'react';
import {
  ImageBackground,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import { DEVICE_WIDTH } from '_constants/dynamic.ts';
import { useNavigation } from '@react-navigation/native';
import { Logo } from '_assets/svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigatorParams } from '_types/navigations';
import { AppRoute } from '_navigations/route/routes.ts';

const PrivateDashboard: React.FC = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppNavigatorParams>>();
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="default" />
      <ImageBackground
        source={require('_assets/images/HomeBackgroundImage.png')}
        style={styles.bgImage}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: top + 16,
            paddingLeft: 18,
            paddingRight: 18,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate(AppRoute.PROFILE)}
            >
              <Logo height={40} width={40} />
            </TouchableOpacity>
            <View style={{ margin: 12 }}>
              <Text>Good morning!</Text>
              <Text>{'storedUsername'}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PrivateDashboard;

const styles = StyleSheet.create({
  bgImage: {
    width: DEVICE_WIDTH,
    height: 370,
    flex: 1,
  },

  chartAndNotificationView: {
    width: 36,
    height: 36,
    aspectRatio: 1,
    borderRadius: 7,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartAndNotificationMainView: {
    gap: 8,
  },
  cardContainer: {
    flex: 1,
  },
});
