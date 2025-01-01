import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CreateHomeScreen from "./screens/CreateHomeScreen"; // Import the new screen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tabs Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// Stack Navigator (Wrapping the Tabs and Additional Screens)
const Layout = () => {
  return (
    <Stack.Navigator>
      {/* Bottom Tab Navigator */}
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }} // Hide header for tabs
      />
      {/* Additional Screens */}
      <Stack.Screen
        name="CreateHome"
        component={CreateHomeScreen}
        options={{ title: "Create Home" }} // Customize header title
      />
    </Stack.Navigator>
  );
};

export default Layout;
