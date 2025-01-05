import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CreateHomeScreen from "./screens/CreateHomeScreen";
import JoinHomeScreen from "./screens/JoinHomeScreen";
import GroupStatsScreen from "./screens/GroupStatsScreen";
import ListDetailsScreen from "./screens/ListDetailsScreen"; // Import ListDetailsScreen
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "information-circle" : "information-circle-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings-sharp" : "settings-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Layout = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateHome"
        component={CreateHomeScreen}
        options={{ title: "Create Home" }}
      />
      <Stack.Screen
        name="JoinHome"
        component={JoinHomeScreen}
        options={{ title: "Join Home" }}
      />
      <Stack.Screen
        name="GroupInfo"
        component={GroupStatsScreen}
        options={{ title: "Group Info" }}
      />
      <Stack.Screen
        name="ListDetails" // Add the ListDetails screen
        component={ListDetailsScreen}
        options={({ route }) => ({ title: route.params.listName || "List Details" })}
      />
    </Stack.Navigator>
  );
};

export default Layout;
