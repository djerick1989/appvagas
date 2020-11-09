import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../Screen/NavScreen/HomeScreen';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen}  options={{headerShown: false}}/>
  </HomeStack.Navigator>
);

export default HomeStackScreen 