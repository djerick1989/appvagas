import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SplashScreen from './Screen/SplashScreen';
import SlideScreen from './Screen/SlideScreen';
import StartScreen from './Screen/StartScreen';
import LoginScreen from './Screen/LoginScreen';
import ForgetPassScreen from './Screen/ForgetPassScreen';
import ChangePassScreen from './Screen/ChangePassScreen';
import ConfirmCodeScreen from './Screen/ConfirmCodeScreen';
import RegisterScreen from './Screen/RegisterScreen';
import HomeScreen from './Screen/NavScreen/HomeScreen';
import AsyncStorage from '@react-native-community/async-storage'




const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen}  options={{headerShown: false}}/>
  </HomeStack.Navigator>
);

// const ListStack = createStackNavigator();
// const ListStackScreen = () => (
//   <ListStack.Navigator>
//     <ListStack.Screen name="ActionsList" component={ActionsList} options={{headerShown: false}}/>
//   </ListStack.Navigator>
// );

// const ProfileStack = createStackNavigator();
// const ProfileStackScreen = () => (
//   <ProfileStack.Navigator>
//     <ProfileStack.Screen name="ActionsList" component={ActionsList} options={{headerShown: false}}/>
//   </ProfileStack.Navigator>
// );

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
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
    {/* <AppTabs.Screen
      name="List"
      component={ListStackScreen}
      options={{
        tabBarIcon: props => (
          <Ionicons
            name="ios-checkmark-circle-outline"
            size={props.size}
            color={props.color}
          />
        ),
      }}
    />
    <AppTabs.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarIcon: props => (
          <Ionicons
            name="ios-checkmark-circle-outline"
            size={props.size}
            color={props.color}
          />
        ),
      }}
    /> */}
  </AppTabs.Navigator>
);


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
  </AuthStack.Navigator>
);

export default () => {
    const [userToken , setToken] = React.useState('');
    const deleteData = async () => {
        try {
          await AsyncStorage.removeItem('token');
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      }
    const readData = async () => {
        await AsyncStorage.getItem('token').then((res) => {
            // if (userToken !== null) {
            //     setToken(res)
            //   }
            console.log(res);
            setToken(res);
          });
         
        // try {
            
        // } catch (e) {
        //   alert('Failed to fetch the data from storage')
        // }
      }
  React.useEffect(() => {
    setTimeout(() => {
    //   setIsLoading(!isLoading);
    // if (userToken == '')
    // readData()
    deleteData()
    }, 500);
  }, []);

  return (
    <NavigationContainer>
        {userToken == ''?(
        <AuthStackScreen />
        ):(
        <AppTabsScreen/> 
        )}
    </NavigationContainer>
  );
};