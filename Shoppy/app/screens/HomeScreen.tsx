import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  Clipboard
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getHomeById, createList, deleteList } from "../models/Homes";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {
  const [home, setHome] = useState(null);
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    fetchHomeData();
  }, []);
const copyID = () => {
        Clipboard.setString(`${home._id}`);
  }
  useFocusEffect(
    React.useCallback(() => {
      fetchHomeData(); 
    }, [])
  );

  const fetchHomeData = async () => {
    try {
      setIsLoading(true);
      const storedHome = await AsyncStorage.getItem("homeData");
      if (storedHome) {
        const parsedHome = JSON.parse(storedHome);
        const response = await getHomeById(parsedHome.id);
        if (response.status === 200) {
          setHome(response.payload);
          setLists(Object.entries(response.payload.Lists)); 
        } else {
          setHome(null);
          Alert.alert("Error", "Failed to fetch home data.");
        }
      } else {
        setHome(null);
        setLists([]);
      }
    } catch (error) {
      console.error("Error fetching home data:", error);
      Alert.alert("Error", "An error occurred while fetching home data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) {
      Alert.alert("Validation", "List name cannot be empty.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await createList(home._id, { listName: newListName });
      if (response.status === 201) {
        setLists(Object.entries(response.payload)); // Update the lists locally
        setModalVisible(false);
        setNewListName("");
      } else {
        Alert.alert("Error", response.msg || "Failed to create the list.");
      }
    } catch (error) {
      console.error("Error creating list:", error);
      Alert.alert("Error", "An error occurred while creating the list.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteList = async (listId) => {
    Alert.alert(
      "Delete List",
      "Are you sure you want to delete this list?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setIsLoading(true);
              const response = await deleteList(home._id, listId);
              if (response.status === 200) {
                setLists((prevLists) =>
                  prevLists.filter((list) => list[0] !== listId)
                ); // Remove the deleted list locally
              } else {
                Alert.alert("Error", response.msg || "Failed to delete the list.");
              }
            } catch (error) {
              console.error("Error deleting list:", error);
              Alert.alert("Error", "An error occurred while deleting the list.");
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
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
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          You are not part of a home. Please choose an option:
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.homeButton, styles.joinButton]}
            onPress={() => navigation.navigate("JoinHome")}
          >
            <Text style={styles.buttonText}>Join Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.homeButton, styles.createButton]}
            onPress={() => navigation.navigate("CreateHome")}
          >
            <Text style={styles.buttonText}>Create Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{home.name}</Text>

        <TouchableOpacity onPress={copyID} style={styles.idButton}>
    <Text style={styles.subtitle}>ID: {home._id}</Text>
  </TouchableOpacity>

            <Text style={styles.listTitle}>Lists:</Text>
      <FlatList
        data={lists}
        keyExtractor={(item) => item[0]} // Use list name as the key
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() =>
                navigation.navigate("ListDetails", {
                  homeId: home._id,
                  listId: item[0],
                  listName: item[0],
                })
              }
            >
              <Text style={styles.listName}>{item[0]}</Text>
              <Text style={styles.listContent}>
                {item[1].length > 0
                  ? item[1].slice(0, 3).join(", ") + (item[1].length > 3 ? "..." : "")
                  : "No items in this list"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteList(item[0])}
              style={styles.deleteButton}
            >
              <Ionicons name="trash" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No lists available.</Text>
        }
      />

      {/* Floating + Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal for Adding a New List */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New List</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter list name"
              value={newListName}
              onChangeText={setNewListName}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.createModalButton]}
                onPress={handleCreateList}
              >
                <Text style={styles.buttonText}>CREATE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#343A40",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6C757D",
    marginBottom: 16, 
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#495057",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderColor: "#DEE2E6",
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  listName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
    flex: 1,
  },
  listContent: {
    fontSize: 16,
    color: "#495057",
  },
  deleteButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#FFF0F0",
  },
  emptyListText: {
    fontSize: 16,
    color: "#6C757D",
    textAlign: "center",
    marginTop: 20,
  },
  floatingButton: {
    backgroundColor: "#007BFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  floatingButtonText: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center", 
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    width: "100%", 
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10, 
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
    marginHorizontal: 5,
  },
  createModalButton: {
    backgroundColor: "#28A745",
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  homeButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  joinButton: {
    backgroundColor: "#007BFF",
    marginHorizontal: 5,
  },
  createButton: {
    backgroundColor: "#28A745",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },

idButton: {
  paddingVertical: 8,
  paddingHorizontal: 15,
  backgroundColor: "#F8F9FA",
  alignItems: "center",
  marginBottom: 0, 
},
});

export default HomeScreen;
