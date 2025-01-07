import { TextInput, type TextInputProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedTextInput({
  style,
  lightColor = '#000', // Výchozí barva textu pro světlý režim je černá
  darkColor = '#fff', // Výchozí barva textu pro tmavý režim je bílá
  lightBackgroundColor = '#ccc',
  darkBackgroundColor = '#aaa',
  type = 'default',
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor(
    { light: lightBackgroundColor, dark: darkBackgroundColor },
    'background'
  );

  return (
    <TextInput
      style={[
        { color, backgroundColor },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      placeholderTextColor={color}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    padding: 8,
    borderRadius: 4,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    padding: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    padding: 10,
    borderRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 4,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
    padding: 8,
    borderRadius: 4,
  },
});
