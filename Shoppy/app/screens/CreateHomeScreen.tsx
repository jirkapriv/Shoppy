import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createHome } from "../models/Homes";

const CreateHomeScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: "",
    passHash: "",
    QR: "",
  });
  const [info, setInfo] = useState("");

  const handleCreateHome = async () => {
    if (!formData.name || !formData.passHash) {
      setInfo("Name and password are required!");
      return;
    }

    try {
      const response = await createHome(formData);
      if (response.status === 201) {
        // Save the created home to AsyncStorage
        const createdHome = {
          id: response.payload._id,
          name: response.payload.name,
        };
        await AsyncStorage.setItem("homeData", JSON.stringify(createdHome));

        // Redirect to the Home tab
        navigation.navigate("Tabs");
      } else {
        setInfo(response.msg || "Error creating home. Please try again.");
      }
    } catch (error) {
      console.error("Error creating home:", error);
      setInfo("Error connecting to the server. Please try again later.");
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Home</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter home name"
        onChangeText={(value) => handleChange("name", value)}
        value={formData.name}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        onChangeText={(value) => handleChange("passHash", value)}
        value={formData.passHash}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter QR code (optional)"
        onChangeText={(value) => handleChange("QR", value)}
        value={formData.QR}
      />

      <Button title="Create Home" onPress={handleCreateHome} color="#34C759" />

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

export default CreateHomeScreen;
