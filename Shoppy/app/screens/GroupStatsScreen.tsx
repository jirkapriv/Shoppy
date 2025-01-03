import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { getHomeById } from "../models/Homes"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const GroupStatsScreen = () => {
  const [home, setHome] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [info, setInfo] = useState("");
  const [formData, setFormData] = useState({ password: "" });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const id = await AsyncStorage.getItem("userID");    //ziskani id

      const data = await getHomeById(id);
      if (data.status === 200) {
        setHome(data.payload);
        setLoaded(true);

      } else if (data.status === 404) {
        setInfo("Home can not be found!");
      } else {
        setInfo("Error fetching home.");
      }
    } catch (error) {
      console.error("Error fetching home:", error);
      setInfo("An error occurred while joining the home.");
    }
  };

  /*const handleChange = (password, value) => {
    setFormData({ ...formData, [password]: value });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (home.passHash === formData.password) {
      const data = await deleteCategory(id);      //delete cele skupiny zatim tam neni route
      if (data.status === 200) {
        navigation.navigate("HomeScreen")
      } else {
        setInfo(data.msg);
      }
    } else {
      setInfo("Wrong input!");
    }
  }*/

  if (isLoaded === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Group not found</Text>
      </View>
    );
  }

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Group is loading...</Text>
      </View>
    );
  }

  if (home) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.title}>ID: {home._id}</Text>
        <Text style={styles.title}>Name: {home.name}</Text>
        <Text style={styles.title}>List: {JSON.stringify(home.Lists)}</Text>
      </View>
    );
  }
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

export default GroupStatsScreen;
