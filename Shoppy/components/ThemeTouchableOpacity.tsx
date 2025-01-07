import { TouchableOpacity, Text, type TouchableOpacityProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';

export type ThemedTouchableOpacityProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
  title?: string; // Pro zobrazení textu uvnitř
  textStyle?: object; // Stylování textu
};

export function ThemedTouchableOpacity({
  style,
  lightColor = '#000', // Výchozí barva textu pro světlý režim
  darkColor = '#fff', // Výchozí barva textu pro tmavý režim
  lightBackgroundColor = '#fff', // Výchozí barva pozadí pro světlý režim
  darkBackgroundColor = '#333', // Výchozí barva pozadí pro tmavý režim
  title,
  textStyle,
  ...rest
}: ThemedTouchableOpacityProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor(
    { light: lightBackgroundColor, dark: darkBackgroundColor },
    'background'
  );

  return (
    <TouchableOpacity
      style={[
        { backgroundColor },
        styles.default,
        style,
      ]}
      {...rest}
    >
      {title && (
        <ThemedText style={[{ color: textColor }, styles.text, textStyle]}>
          {title}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
