import React from "react";
import { Button, View, StyleSheet } from "react-native";

interface CreateButtonProps {
  onPress: () => void; 
}

const CreateHomeButton: React.FC<CreateButtonProps> = ({ onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title="Create Home" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
  },
});

export default CreateHomeButton;
