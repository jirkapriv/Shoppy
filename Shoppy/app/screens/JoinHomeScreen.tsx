import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getHomeById } from "../models/Homes";

const JoinHomeScreen = ({ navigation }) => {
  const [homeId, setHomeId] = useState("");
  const [info, setInfo] = useState("");

  const handleJoinHome = async () => {
    try {
      const response = await getHomeById(homeId);
      if (response.status === 200) {
        await AsyncStorage.setItem(
          "homeData",
          JSON.stringify({ id: homeId, name: response.payload.name })
        );
        navigation.navigate("Tabs"); // Redirect to the Home tab
      } else {
        setInfo("Home not found. Please check the ID.");
      }
    } catch (error) {
      setInfo("Error joining the home.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Home</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter home ID"
        value={homeId}
        onChangeText={setHomeId}
      />
      <Button title="Join Home" onPress={handleJoinHome} color="#007BFF" />
      {info ? <Text style={styles.info}>{info}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    width: "100%",
  },
  info: {
    marginTop: 10,
    color: "red",
  },
});

export default JoinHomeScreen;
