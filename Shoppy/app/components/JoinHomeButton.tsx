import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { getHomeById } from "../models/Homes"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const JoinHomeScreen = () => {
  const [home, setHome] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [info, setInfo] = useState("");
  const [formData, setFormData] = useState({ id: "" });

  const submit = async () => {
    try {
      const data = await getHomeById(formData.id);
      if (data.status === 200) {
        setHome(data.payload);
        setLoaded(true);

        await AsyncStorage.setItem("userID", `${formData.id}`);
      } else if (data.status === 404) {
        setInfo("Home does not exist!");
      } else {
        setInfo("Error fetching home.");
      }
    } catch (error) {
      console.error("Error fetching home:", error);
      setInfo("An error occurred while joining the home.");
    }
  };

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  if (home && isLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.title}>ID: {formData.id}</Text>
        <Text style={styles.title}>Name: {home.name}</Text>
        <Text style={styles.title}>List: {JSON.stringify(home.Lists)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Home</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter home ID"
        onChangeText={(value) => handleChange("id", value)}
        value={formData.id}
      />

      <Button title="Join Home" onPress={submit} color="#007BFF" />

      {info ? <Text style={styles.info}>{info}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
    marginTop: 20,
    textAlign: "center",
    color: "red",
  },
});

export default JoinHomeScreen;
