
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStackScreen from "./HomeStackScreen";
import ListStackScreen from "./ListStackScreen";
import ProfileStackScreen from "./ProfileStackScreen";
import DrawerNavigator from "./DrawerNavigator";

const Tab = createBottomTabNavigator();

const AppTabs = createBottomTabNavigator();
const BottomTabNavigator = () => (
  <AppTabs.Navigator>
    <AppTabs.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="home"
            color={color}
            size={size}
          />
        ),
      }} 
    />
    <AppTabs.Screen
      name="List"
      component={ListStackScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="home"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <AppTabs.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="home"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <AppTabs.Screen
      name="Drawer"
      component={DrawerNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="home"
            color={color}
            size={size}
          />
        ),
      }}
    />
  </AppTabs.Navigator>
);

export default BottomTabNavigator;