import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { createHome } from "../models/Homes";

const CreateHomeScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({ name: "", passHash: "" });
  const [passwordA, setPasswordA] = useState("");
  const [info, setInfo] = useState("");

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const submit = async () => {
    if (formData.name && formData.passHash) {
      if (formData.passHash === passwordA) {
        try {
          const response = await createHome(formData);
          if (response.status === 201) {
            setInfo("Home created successfully!");
            navigation.goBack(); // Navigate back to HomeScreen
          } else {
            setInfo(response.msg || "Error creating the home");
          }
        } catch (error) {
          console.error("Error creating the home:", error);
          setInfo("Error creating the home");
        }
      } else {
        setInfo("Passwords do not match");
      }
    } else {
      setInfo("Please fill out all required fields");
    }
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
        placeholder="Confirm password"
        secureTextEntry
        onChangeText={(value) => setPasswordA(value)}
        value={passwordA}
      />

      <Button title="Create Home" onPress={submit} color="#007BFF" />

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

export default CreateHomeScreen;
