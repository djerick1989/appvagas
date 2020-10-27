//Import React
import React from 'react';
 
//Import Navigators from React Navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Import all the screens needed
import SplashScreen from './Screen/SplashScreen';
import SlideScreen from './Screen/SlideScreen';
import StartScreen from './Screen/StartScreen';
import LoginScreen from './Screen/LoginScreen';
import RecoverPassScreen from './Screen/RecoverPassScreen';
// import RegisterScreen from './Screen/RegisterScreen';
// import DrawerNavigationRoutes from './Screen/DrawerNavigatorRoutes';


const Auth = createStackNavigator({
  //Stack Navigator for Login and Sign up Screen
  StartScreen: {
    screen: StartScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  // LoginScreen: {
  //   screen: LoginScreen,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
  // RegisterScreen: {
  //   screen: RegisterScreen,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
  RecoverPassScreen: {
    screen: RecoverPassScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});



/* Switch Navigator for those screens which needs to be switched only once
  and we don't want to switch back once we switch from them to the next one */
const App = createSwitchNavigator({ 
  SplashScreen: {
    /* SplashScreen which will come once for 5 Seconds */
    screen: SplashScreen,
    navigationOptions: {
      /* Hiding header for Splash Screen */
      headerShown: false,
    },
  },
  SlideScreen: {
    screen:SlideScreen,
    navigationOptions: {
      /* Hiding header for Slide Screen */
      headerShown: false,
    },
  },
  
  Auth: {
    /* Auth Navigator which includer Login Signup will come once */
    screen: Auth,
  },
  // DrawerNavigationRoutes: {
  //   /* Navigation Drawer as a landing page */
  //   screen: DrawerNavigationRoutes,
  //   navigationOptions: {
  //     /* Hiding header for Navigation Drawer as we will use our custom header */
  //     headerShown: false,
  //   },
  // },

  // StackNavigatorRoutes:{
  //   screen: StackNavigationRoutes,
  // }

  
});

export default createAppContainer(App);