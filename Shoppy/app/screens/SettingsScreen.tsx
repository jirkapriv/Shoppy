import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

const SettingsScreen = ({ navigation }) => {
  const [home, setHome] = useState(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const storedHome = await AsyncStorage.getItem("homeData");
      if (storedHome) {
        const parsedHome = JSON.parse(storedHome);
        setHome(parsedHome);
      } else {
        setHome(null);
      }
    } catch (error) {
      console.error("Error fetching home data:", error);
      Alert.alert("Error", "An error occurred while checking your home.");
    }
  };

  const handleLeaveHome = async () => {
    try {
      await AsyncStorage.removeItem("homeData");
      setHome(null);
      Alert.alert("Success", "You have left the home.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Tabs" }],
      });
    } catch (error) {
      console.error("Error leaving home:", error);
      Alert.alert("Error", "An error occurred while leaving the home.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="settings-sharp" size={28} color="#007BFF" />
        <Text style={styles.title}>Settings</Text>
      </View>
      {home ? (
        <View style={styles.homeDetails}>
          <Text style={styles.subtitle}>Home Name: {home.name}</Text>
          <Text style={styles.subtitle}>Home ID: {home.id}</Text>
          <TouchableOpacity
            style={styles.leaveButton}
            onPress={handleLeaveHome}
          >
            <Ionicons name="log-out-outline" size={20} color="#FFF" />
            <Text style={styles.leaveButtonText}>Leave Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.info}>
          You are not part of any home. Join or create one from the Home tab.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343A40",
    marginLeft: 8,
  },
  homeDetails: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  subtitle: {
    fontSize: 18,
    color: "#495057",
    marginBottom: 10,
  },
  leaveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  leaveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  info: {
    fontSize: 16,
    color: "#6C757D",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SettingsScreen;
