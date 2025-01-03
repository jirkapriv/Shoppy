import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

interface JoinButtonProps {
  onPress: () => void; 
}

const JoinHomeButton: React.FC<JoinButtonProps> = ({ onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title="Join Home" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});

export default JoinHomeButton;
