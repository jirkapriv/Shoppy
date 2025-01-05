import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native"; // Import hook
import { getHomeById } from "../models/Homes";

const HomeScreen = ({ navigation }) => {
  const [home, setHome] = useState(null);
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused(); // Check if the screen is focused

  useEffect(() => {
    if (isFocused) {
      fetchHomeData(); // Fetch data when screen is focused
    }
  }, [isFocused]);

  const fetchHomeData = async () => {
    try {
      setIsLoading(true);
      const storedHome = await AsyncStorage.getItem("homeData");
      if (storedHome) {
        const parsedHome = JSON.parse(storedHome);
        const response = await getHomeById(parsedHome.id);
        if (response.status === 200) {
          setHome(response.payload);
          setLists(Object.entries(response.payload.Lists)); // Update lists
        }
      }
    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeaveHome = async () => {
    await AsyncStorage.removeItem("homeData");
    setHome(null);
    setLists([]);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Loading...</Text>
      </View>
    );
  }

  if (!home) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          You are not in a home. Please join or create one.
        </Text>
        <Button
          title="Join Home"
          onPress={() => navigation.navigate("JoinHome")}
          color="#007BFF"
        />
        <Button
          title="Create Home"
          onPress={() => navigation.navigate("CreateHome")}
          color="#34C759"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{home.name}</Text>
      <Text style={styles.subtitle}>ID: {home._id}</Text>

      <Text style={styles.listTitle}>Lists:</Text>
      <FlatList
        data={lists}
        keyExtractor={(item) => item[0]} // Use the list name as the key
        renderItem={({ item }) => {
          const itemsToShow = item[1].slice(0, 3); // Display first 3 items
          const displayItems =
            itemsToShow.length < item[1].length
              ? `${itemsToShow.join(", ")}, ...`
              : itemsToShow.join(", "); // Add '...' if more items exist

          return (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                navigation.navigate("ListDetails", {
                  homeId: home._id, // Pass the home ID
                  listId: item[0], // Use the list name as the listId
                  listName: item[0], // Pass the list name for display
                });
              }}
            >
              <Text style={styles.listName}>{item[0]}</Text>
              <Text style={styles.listContent}>
                {displayItems || "No items in this list"}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <Button title="Leave Home" onPress={handleLeaveHome} color="#FF3B30" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  listItem: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
  },
  listName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listContent: {
    fontSize: 16,
    color: "#555",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
    color: "gray",
  },
});

export default HomeScreen;
