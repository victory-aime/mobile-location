import { SafeAreaWrapper } from '_components/safe-area';
import { BaseText } from '_components/base-text';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaWrapper style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BaseText>back</BaseText>
      </TouchableOpacity>
      <BaseText>Welcome profile screen</BaseText>
    </SafeAreaWrapper>
  );
};
