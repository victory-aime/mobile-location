import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../app/auth-provider';
import { ChevronRight, Logo } from '_assets/svg';
import { useTranslation } from 'react-i18next';
import SafeAreaWrapper from '_components/SafeAreaWrapper';
import { BaseText, TextVariant, TextWeight } from '_components/base-text';
import { LineHeightType } from '_components/base-text/interface/base-text';
import { BaseButton } from '_components/base-button/BaseButton';
import { useState } from 'react';
import { ButtonSizes } from '_components/base-button/interface/button';
import { BaseIcon } from '_components/base-icon/BaseIcon';
import { lightTheme } from '_theme/ThemeOverrides';

const LoginScreen = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      await login();
      setLoading(true);
    } catch (err) {
      setLoading(false);
      console.error("Erreur d'authentification :", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaWrapper
      style={{
        flex: 1,
        paddingLeft: 18,
        paddingRight: 18,
      }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{ gap: 20, alignItems: 'center', justifyContent: 'center' }}
        >
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 99,
              borderStyle: 'dashed',
              borderWidth: 4,
              borderColor: theme.colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Logo width={80} height={80} />
          </View>
          <BaseText variant={TextVariant.EXTRA} weight={TextWeight.Bold}>
            {t('APP_NAME')}
          </BaseText>

          <BaseText
            style={{ textAlign: 'center', color: 'gray' }}
            variant={TextVariant.L}
            lineHeight={LineHeightType.mediumLarge}
          >
            {t('START.DESC')}
          </BaseText>
        </View>
        <View
          style={{
            marginTop: 50,
          }}
        >
          <BaseButton
            onPress={handleLogin}
            isLoading={loading}
            style={{ width: 400 }}
            size={ButtonSizes.Large}
            weight={TextWeight.Bold}
          >
            {t('COMMON.LOGIN')}
          </BaseButton>

          <View
            style={{
              gap: 6,
              marginTop: 20,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <BaseText variant={TextVariant.M}>{t('COMMON.REGISTER')}</BaseText>
            <BaseIcon
              icon={<ChevronRight fill={lightTheme.colors.background} />}
              colorsScheme={'primary'}
              variant={'circle'}
              onPress={handleLogin}
            />
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default LoginScreen;
