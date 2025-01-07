import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { addItemToList, getListById, deleteItemFromList } from "../models/Homes";
import Ionicons from "@expo/vector-icons/Ionicons";

const ListDetailsScreen = ({ route }) => {
  const { homeId, listId, listName } = route.params;
  const [listItems, setListItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    fetchListItems();
  }, [homeId, listId]);

  const fetchListItems = async () => {
    try {
      setIsLoading(true);
      const response = await getListById(homeId, listId);
      if (response.status === 200) {
        setListItems(response.payload.items || []);
        setCheckedItems({});
      } else {
        Alert.alert("Error", response.msg || "Failed to fetch list items.");
      }
    } catch (error) {
      console.error("Error fetching list items:", error);
      Alert.alert("Error", "An error occurred while fetching list items.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.trim()) {
      Alert.alert("Validation", "Item name cannot be empty.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await addItemToList(homeId, listId, newItem.trim());
      if (response.status === 200) {
        setListItems((prevItems) => [...prevItems, newItem.trim()]);
        setNewItem(""); // Clear the input field
      } else {
        Alert.alert("Error", response.msg || "Failed to add the item.");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      Alert.alert("Error", "An error occurred while adding the item.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCheck = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleRemoveChecked = async () => {
    const itemsToRemove = Object.keys(checkedItems).filter(
      (item) => checkedItems[item]
    );

    if (itemsToRemove.length === 0) {
      Alert.alert("No items selected", "Please select items to remove.");
      return;
    }

    try {
      setIsLoading(true);
      for (const item of itemsToRemove) {
        await deleteItemFromList(homeId, listId, item);
      }
      fetchListItems(); // Refresh the list after removal
    } catch (error) {
      console.error("Error removing items:", error);
      Alert.alert("Error", "An error occurred while removing items.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{listName}</Text>
      <FlatList
        data={listItems}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity onPress={() => toggleCheck(item)}>
              <Ionicons
                name={checkedItems[item] ? "checkbox" : "square-outline"}
                size={24}
                color={checkedItems[item] ? "#007BFF" : "#ADB5BD"}
                style={styles.checkbox}
              />
            </TouchableOpacity>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No items in this list.</Text>
        }
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new item"
          value={newItem}
          onChangeText={setNewItem}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[styles.addButton, isLoading && styles.disabledButton]}
          onPress={handleAddItem}
          disabled={isLoading}
        >
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.removeButton, isLoading && styles.disabledButton]}
        onPress={handleRemoveChecked}
        disabled={isLoading}
      >
        <Ionicons name="trash" size={20} color="#FFF" />
        <Text style={styles.removeButtonText}>Remove Checked</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#343A40",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
    color: "#495057",
    flex: 1,
  },
  emptyListText: {
    fontSize: 16,
    color: "#6C757D",
    textAlign: "center",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#ADB5BD",
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  removeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default ListDetailsScreen;
