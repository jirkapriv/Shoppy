import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import JoinButton from "../components/JoinHomeButton";
import CreateButton from "../components/CreateHomeButton";

interface HomeScreenProps {
  navigation: any; // Add navigation prop type
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinHome = () => {
    console.log("Join Home clicked");
    setIsJoined(true);
  };

  const handleCreateHome = () => {
    console.log("Navigating to Create Home screen");
    navigation.navigate("CreateHome"); // Navigate to the CreateHomeScreen
  };

  return (
    <View style={styles.container}>
      {!isJoined && (
        <Text style={styles.message}>
          You are not in a home. Please join or create one.
        </Text>
      )}

      <JoinButton onPress={handleJoinHome} />
      <CreateButton onPress={handleCreateHome} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
    color: "gray",
  },
});

export default HomeScreen;
