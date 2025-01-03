import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import JoinButton from "../components/JoinHomeButton";
import CreateButton from "../components/CreateHomeButton";

import AsyncStorage from '@react-native-async-storage/async-storage';

interface HomeScreenProps {
  navigation: any; 
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    checkLocalStorageForJoin();
    }, []);

  const checkLocalStorageForJoin = async () => {
    if (await AsyncStorage.getItem("userID")){
      setIsJoined(true);
      navigation.navigate("GroupInfo");
    }
  }

  const handleJoinHome = () => {
    console.log("Join Home clicked");
    navigation.navigate("JoinHome")
    setIsJoined(true);
  };

  const handleCreateHome = () => {
    console.log("Navigating to Create Home screen");
    navigation.navigate("CreateHome"); 
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
