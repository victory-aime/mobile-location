import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { BaseIconProps } from './interface/icon';
import { SvgProps } from 'react-native-svg';

export const BaseIcon: React.FC<BaseIconProps> = ({
  icon,
  size = 40,
  colorsScheme = 'primary',
  variant = 'circle',
  background = true,
  onPress,
}) => {
  const theme = useTheme() as any;

  const schemeColorMap: Record<string, string> = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.error,
  };

  const bgColor = background ? schemeColorMap[colorsScheme] : 'transparent';

  const borderRadiusMap: Record<typeof variant, number> = {
    circle: size / 2,
    square: 4,
    rounded: 12,
  };

  const iconProps: SvgProps = {
    width: size * 0.6,
    height: size * 0.6,
  };

  return (
    <TouchableOpacity
      style={[
        styles.wrapper,
        {
          width: size,
          height: size,
          backgroundColor: bgColor,
          borderRadius: borderRadiusMap[variant],
        },
      ]}
      onPress={() => onPress?.()}
    >
      {React.isValidElement(icon) ? React.cloneElement(icon, iconProps) : icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
