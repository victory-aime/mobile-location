import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { UsersModule } from 'bvg-innovation-state-management';
import { useAuth } from '_app/auth-provider';
import SafeAreaWrapper from '_components/SafeAreaWrapper';
import { AppRoute } from '_navigations/route/routes';
import { DEVICE_WIDTH } from '_constants/dynamic';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigatorParams } from '_types/navigations';
import { BaseText } from '_components/base-text';
import { BaseIcon } from '_components/base-icon/BaseIcon';
import { LogoutIcon, NotificationIcon } from '_assets/svg';
import { darkTheme } from '_theme/ThemeOverrides';
import { BaseDialog } from '_components/dialog/Dialog';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  const { logout, tokenData } = useAuth();
  const userCache = UsersModule.UserCache.getUser();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppNavigatorParams>>();
  const { top } = useSafeAreaInsets();
  const { data: user } = UsersModule.userInfoQueries({
    payload: { userId: tokenData?.keycloakId ?? '' },
    queryOptions: { enabled: !!tokenData?.keycloakId || !!userCache },
  });
  const [openLogout, setOpenLogout] = useState<boolean>(false);

  return (
    <SafeAreaWrapper style={{ flex: 1, paddingTop: 0 }}>
      <View style={{ flex: 1, position: 'relative' }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="default"
        />
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                hitSlop={{ top: 30, left: 30, right: 30 }}
                onPress={() => navigation.navigate(AppRoute.PROFILE)}
              >
                <Image
                  source={{ uri: 'https://avatar.iran.liara.run/public' }}
                  width={40}
                  height={40}
                />
              </TouchableOpacity>
              <View style={{ margin: 12 }}>
                <BaseText color={darkTheme.colors.onSurface}>
                  {t('COMMON.HELLO')}
                </BaseText>
                <BaseText color={darkTheme.colors.onSurface}>
                  {user?.name + ' ' + user?.firstName}
                </BaseText>
              </View>
            </View>
            <View
              style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}
            >
              <BaseIcon
                background={false}
                colorsScheme="none"
                icon={<NotificationIcon fill={darkTheme.colors.onSurface} />}
              />
              <BaseIcon
                background={false}
                colorsScheme="none"
                onPress={() => setOpenLogout(true)}
                icon={<LogoutIcon fill={darkTheme.colors.onSurface} />}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      <BaseDialog
        title="AUTH.LOGOUT.TITLE"
        content="AUTH.LOGOUT.MESSAGE"
        onValidate={logout}
        type={'danger'}
        visible={openLogout}
        onClose={() => setOpenLogout(false)}
      >
        <BaseText>{t('AUTH.LOGOUT.MESSAGE')}</BaseText>
      </BaseDialog>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    width: DEVICE_WIDTH,
    height: 370,
    flex: 1,
  },
});

export default Dashboard;
