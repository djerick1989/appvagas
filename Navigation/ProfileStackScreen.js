import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../Screen/NavScreen/HomeScreen';

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
  </ProfileStack.Navigator>
);
export default ProfileStackScreen 