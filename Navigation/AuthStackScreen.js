import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from '../Screen/SplashScreen';
import SlideScreen from '../Screen/SlideScreen';
import StartScreen from '../Screen/StartScreen';
import LoginScreen from '../Screen/LoginScreen';
import ForgetPassScreen from '../Screen/ForgetPassScreen';
import ChangePassScreen from '../Screen/ChangePassScreen';
import ConfirmCodeScreen from '../Screen/ConfirmCodeScreen';
import ConditionsScreen from './Screen/ConditionsScreen';
import RegisterScreen from '../Screen/RegisterScreen';
import MapScreen from '../Screen/MapScreen';
import NotificationsScreen from '../Screen/NotificationsScreen';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false,}} />
    <AuthStack.Screen name="SlideScreen" component={SlideScreen} options={{headerShown: false,}}/>
    <AuthStack.Screen name="StartScreen" component={StartScreen} options={{headerShown: false,}}/>
    <AuthStack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false,}}/>
    <AuthStack.Screen name="ForgetPassScreen" component={ForgetPassScreen} options={{headerShown: false,}}/>
    <AuthStack.Screen name="ChangePassScreen" component={ChangePassScreen} options={{headerShown: false,}}/>
    <AuthStack.Screen name="ConfirmCodeScreen" component={ConfirmCodeScreen} options={{headerShown: false,}}/>
    <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false,}}/>
    <AuthStack.Screen name="MapScreen" component={MapScreen} options={{headerShown: false,}}/>
    <AuthStack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{headerShown: false,}}/>
    <AuthStack.Screen name="ConditionsScreen" component={ConditionsScreen} options={{headerShown: false,}}/>
  </AuthStack.Navigator>
);

export default AuthStackScreen 