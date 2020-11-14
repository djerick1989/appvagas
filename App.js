import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SplashScreen from './Screen/SplashScreen';
import SlideScreen from './Screen/SlideScreen';
import StartScreen from './Screen/StartScreen';
import LoginScreen from './Screen/LoginScreen';
import CurriculoScreen from './Screen/LoginScreen';
import ForgetPassScreen from './Screen/ForgetPassScreen';
import ChangePassScreen from './Screen/ChangePassScreen';
import ConfirmCodeScreen from './Screen/ConfirmCodeScreen';
import ConditionsScreen from './Screen/ConditionsScreen';
import PolicyScreen from './Screen/PolicyScreen';
import RegisterScreen from './Screen/RegisterScreen';
import MapScreen from './Screen/MapScreen';
import NotificationsScreen from './Screen/NotificationsScreen';
import ExperienciaScreen from './Screen/NavScreen/ExperienciaScreen';
import CurriculumScreen from './Screen/NavScreen/CurriculumScreen';
import HomeScreen from './Screen/NavScreen/HomeScreen';
import ConfigurationScreen from './Screen/NavScreen/ConfigurationScreen';
import EnderecoScreen from './Screen/NavScreen/EnderecoScreen';
import DadosScreen from './Screen/NavScreen/DadosScreen';
import DadosPessoaisScreen from './Screen/NavScreen/DadosPessoaisScreen';
import FormacaoScreen from './Screen/NavScreen/FormacaoScreen';
import IdiomasScreen from './Screen/NavScreen/IdiomasScreen';
import ObjetivoScreen from './Screen/NavScreen/ObjetivoScreen';
import AsyncStorage from '@react-native-community/async-storage';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Curriculum"
      component={CurriculumScreen}
      options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="Dados"
      component={DadosScreen}
      options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="DadosPessoais"
      component={DadosPessoaisScreen}
      options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="Endereco"
      component={EnderecoScreen}
      options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="Objetivo"
      component={ObjetivoScreen}
      options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="Formacao"
      component={FormacaoScreen}
      options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="Experiencia"
      component={ExperienciaScreen}
      options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="Idiom"
      component={IdiomasScreen}
      options={{headerShown: false}}
    />
  </HomeStack.Navigator>
);
const ConfigsStack = createStackNavigator();
const ConfigsStackScreen = () => (
  <ConfigsStack.Navigator>
    <ConfigsStack.Screen
      name="Configs"
      component={ConfigurationScreen}
      options={{headerShown: false}}
    />
    <ConfigsStack.Screen
      name="Policy"
      component={PolicyScreen}
      options={{headerShown: false}}
    />
    <ConfigsStack.Screen
      name="DadosPessoais"
      component={DadosPessoaisScreen}
      options={{headerShown: false}}
    />
    <ConfigsStack.Screen
      name="Endereco"
      component={EnderecoScreen}
      options={{headerShown: false}}
    />
    <ConfigsStack.Screen
      name="Objetivo"
      component={ObjetivoScreen}
      options={{headerShown: false}}
    />
    <ConfigsStack.Screen
      name="Formacao"
      component={FormacaoScreen}
      options={{headerShown: false}}
    />
    <ConfigsStack.Screen
      name="Experiencia"
      component={ExperienciaScreen}
      options={{headerShown: false}}
    />
    <ConfigsStack.Screen
      name="Idiom"
      component={IdiomasScreen}
      options={{headerShown: false}}
    />
  </ConfigsStack.Navigator>
);

const CurriculumStack = createStackNavigator();
const CurriculumStackScreen = () => (
  <CurriculumStack.Navigator>
    <CurriculumStack.Screen
      name="Curriculum"
      component={CurriculumScreen}
      options={{headerShown: false}}
    />
    <CurriculumStack.Screen
      name="Dados"
      component={DadosScreen}
      options={{headerShown: false}}
    />
    <CurriculumStack.Screen
      name="DadosPessoais"
      component={DadosPessoaisScreen}
      options={{headerShown: false}}
    />
    <CurriculumStack.Screen
      name="Endereco"
      component={EnderecoScreen}
      options={{headerShown: false}}
    />
    <CurriculumStack.Screen
      name="Objetivo"
      component={ObjetivoScreen}
      options={{headerShown: false}}
    />
    <CurriculumStack.Screen
      name="Formacao"
      component={FormacaoScreen}
      options={{headerShown: false}}
    />
    <CurriculumStack.Screen
      name="Experiencia"
      component={ExperienciaScreen}
      options={{headerShown: false}}
    />
    <CurriculumStack.Screen
      name="Idiom"
      component={IdiomasScreen}
      options={{headerShown: false}}
    />
  </CurriculumStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
  <AppTabs.Navigator>
    <AppTabs.Screen
      name="Home"
      // component={HomeStackScreen}
      component={ConfigurationScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <AppTabs.Screen
      name="Candidaturas"
      component={ExperienciaScreen}
      options={{
        tabBarLabel: 'Candidaturas',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons
            name="format-list-bulleted"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <AppTabs.Screen
      name="Curriculo"
      component={CurriculumStackScreen}
      options={{
        tabBarLabel: 'Currículo',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons
            name="account-outline"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <AppTabs.Screen
      name="Configs"
      component={ConfigsStackScreen}
      options={{
        tabBarLabel: 'Configs',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons
            name="cog-outline"
            color={color}
            size={size}
          />
        ),
      }}
    />
  </AppTabs.Navigator>
);

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SplashScreen"
      component={SplashScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="SlideScreen"
      component={SlideScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="StartScreen"
      component={StartScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="ForgetPassScreen"
      component={ForgetPassScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="ChangePassScreen"
      component={ChangePassScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="ConfirmCodeScreen"
      component={ConfirmCodeScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="ConditionsScreen"
      component={ConditionsScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="MapScreen"
      component={MapScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="NotificationsScreen"
      component={NotificationsScreen}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

export default () => {
  const [userToken, setToken] = React.useState('');
  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };
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
  };
  React.useEffect(() => {
    setTimeout(() => {
      //   setIsLoading(!isLoading);
      // if (userToken == '')
      // readData()
      deleteData();
    }, 500);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        {userToken !== '' ? <AuthStackScreen /> : <AppTabsScreen />}
      </NavigationContainer>
    </SafeAreaView>
  );
};
