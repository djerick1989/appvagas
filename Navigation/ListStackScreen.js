import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../Screen/NavScreen/HomeScreen';

const ListStack = createStackNavigator();
const ListStackScreen = () => (
  <ListStack.Navigator>
    <ListStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
  </ListStack.Navigator>
);

export default ListStackScreen 