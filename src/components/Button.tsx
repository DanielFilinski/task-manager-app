import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const { colors } = useTheme();

  const getButtonStyle = () => {
    const baseStyle = {
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      minHeight: 50,
    };

    let variantStyle = {};
    if (variant === 'primary') {
      variantStyle = { backgroundColor: colors.primary };
    } else if (variant === 'secondary') {
      variantStyle = { backgroundColor: colors.buttonSecondaryBg };
    } else if (variant === 'danger') {
      variantStyle = { backgroundColor: colors.error };
    }

    return [baseStyle, variantStyle, disabled && styles.disabled, style];
  };

  const getTextStyle = () => {
    return {
      fontSize: 16,
      fontWeight: '600' as const,
      color: variant === 'secondary' ? colors.buttonSecondaryText : '#FFFFFF',
    };
  };

  const getActivityIndicatorColor = () => {
    return variant === 'secondary' ? colors.primary : '#FFFFFF';
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getActivityIndicatorColor()} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});

