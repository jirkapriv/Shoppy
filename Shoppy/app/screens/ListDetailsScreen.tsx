import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { addItemToList, getListById, deleteItemFromList } from "../models/Homes";

const ListDetailsScreen = ({ route, navigation }) => {
  const { homeId, listId, listName } = route.params;
  const [listItems, setListItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState({}); // State to track checked items

  useEffect(() => {
    fetchListItems();
  }, [homeId, listId]);

  const fetchListItems = async () => {
    try {
      setIsLoading(true);
      const response = await getListById(homeId, listId);
      if (response.status === 200) {
        setListItems(response.payload.items || []);
        setCheckedItems({}); // Reset checked items
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
        setListItems(response.payload);
        setNewItem("");
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
      [item]: !prev[item], // Toggle the checked state
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
        await deleteItemFromList(homeId, listId, item); // Remove each checked item
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
              <Text style={styles.checkbox}>
                {checkedItems[item] ? "☑️" : "⬜️"}
              </Text>
            </TouchableOpacity>
            <Text style={styles.item}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items in this list.</Text>
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Add a new item"
        value={newItem}
        onChangeText={setNewItem}
        editable={!isLoading}
      />
      <Button
        title={isLoading ? "Adding..." : "Add Item"}
        onPress={handleAddItem}
        disabled={isLoading}
      />
      <Button
        title="Remove Checked Items"
        onPress={handleRemoveChecked}
        disabled={isLoading}
        color="#FF3B30"
      />
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
    marginBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 10,
  },
  item: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ListDetailsScreen;
