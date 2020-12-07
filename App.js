import 'react-native-gesture-handler';
import * as React from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Linking,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {List} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import SplashScreen from './Screen/SplashScreen';
import SlideScreen from './Screen/SlideScreen';
import StartScreen from './Screen/StartScreen';
import LoginScreen from './Screen/LoginScreen';
import ForgetPassScreen from './Screen/ForgetPassScreen';
import ChangePassScreen from './Screen/ChangePassScreen';
import ConfirmCodeScreen from './Screen/ConfirmCodeScreen';
import ConditionsScreen from './Screen/ConditionsScreen';
import PolicyScreen from './Screen/NavScreen/PolicyScreen';
import RegisterScreen from './Screen/RegisterScreen';
import MapScreen from './Screen/MapScreen';
import NotificationsScreen from './Screen/NotificationsScreen';
import ExperienciaScreen from './Screen/NavScreen/ExperienciaScreen';
import CandidaturasScreen from './Screen/NavScreen/CandidaturasScreen';
import CurriculumScreen from './Screen/NavScreen/CurriculumScreen';
import HomeScreen from './Screen/NavScreen/HomeScreen';
import ConfigurationScreen from './Screen/NavScreen/ConfigurationScreen';
import PreferencesScreen from './Screen/NavScreen/PreferencesScreen';
import EnderecoScreen from './Screen/NavScreen/EnderecoScreen';
import DadosScreen from './Screen/NavScreen/DadosScreen';
import DadosPessoaisScreen from './Screen/NavScreen/DadosPessoaisScreen';
import FormacaoScreen from './Screen/NavScreen/FormacaoScreen';
import IdiomasScreen from './Screen/NavScreen/IdiomasScreen';
import ObjetivoScreen from './Screen/NavScreen/ObjetivoScreen';
import AsyncStorage from '@react-native-community/async-storage';

function CustomDrawerContent(propsParent) {
  return (
    <DrawerContentScrollView {...propsParent}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}>
        <View>
          <KeyboardAvoidingView enabled style={{flex: 4}}>
            <View
              style={{
                marginTop: 40,
                marginLeft: 15,
                marginRight: 15,
                margin: 10,
              }}>
              <List.Item
                title="Preferências"
                onPress={() => propsParent.navigation.navigate('Preferences')}
                right={(props) => <List.Icon {...props} icon="menu-right" />}
              />
              <List.Item
                title="Termos"
                onPress={() =>
                  propsParent.navigation.navigate('Termos', {
                    comeFrom: 'preferences',
                  })
                }
                right={(props) => <List.Icon {...props} icon="menu-right" />}
              />
              <List.Item
                title="Políticas"
                onPress={() =>
                  propsParent.navigation.navigate('Policy', {
                    comeFrom: 'preferences',
                  })
                }
                right={(props) => <List.Icon {...props} icon="menu-right" />}
              />
              <List.Item
                title="Ajuda"
                onPress={() =>
                  Linking.openURL('https://jobconvo.freshdesk.com/')
                }
                right={(props) => <List.Icon {...props} icon="menu-right" />}
              />
              <List.Item
                title="Convidar Amgios"
                onPress={() => alert('not implemented Yet')}
                right={(props) => <List.Icon {...props} icon="logout" />}
              />
              <List.Item
                title="Divulgar Vaga"
                onPress={() =>
                  Linking.openURL('https://www.jobconvo.com/pt-br/pricing/')
                }
                right={(props) => <List.Icon {...props} icon="menu-right" />}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
      <DrawerItemList {...propsParent} />
    </DrawerContentScrollView>
  );
}

const ConfigsDrawer = createDrawerNavigator();
const ConfigsDrawerScreen = () => (
  <ConfigsDrawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    drawerContentOptions={{
      activeTintColor: '#FFFFFF',
      itemStyle: {marginVertical: 30},
    }}>
    <ConfigsDrawer.Screen
      name="HomeDrawer"
      component={AppTabsScreen}
      options={{
        drawerLabel: () => null,
        headerShown: false,
        title: null,
        drawerIcon: () => null,
      }}
    />
    <ConfigsDrawer.Screen
      name="Preferences"
      component={PreferencesScreen}
      options={{
        drawerLabel: () => null,
        headerShown: false,
        title: null,
        drawerIcon: () => null,
      }}
    />
    <ConfigsDrawer.Screen
      name="Termos"
      component={ConditionsScreen}
      options={{
        drawerLabel: () => null,
        headerShown: false,
        title: null,
        drawerIcon: () => null,
      }}
    />
    <ConfigsDrawer.Screen
      name="Policy"
      component={PolicyScreen}
      options={{
        drawerLabel: () => null,
        headerShown: false,
        title: null,
        drawerIcon: () => null,
      }}
    />
    <ConfigsDrawer.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{
        drawerLabel: () => null,
        headerShown: false,
        title: null,
        drawerIcon: () => null,
      }}
    />
    <ConfigsDrawer.Screen
      name="MapScreen"
      component={MapScreen}
      options={{
        drawerLabel: () => null,
        headerShown: false,
        title: null,
        drawerIcon: () => null,
      }}
    />
    <ConfigsDrawer.Screen
      name="JumpBack"
      component={SlideScreen}
      options={{
        drawerLabel: () => null,
        headerShown: false,
        title: null,
        drawerIcon: () => null,
      }}
    />
  </ConfigsDrawer.Navigator>
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
      name="Termos"
      component={ConditionsScreen}
      options={{headerShown: false}}
    />
    <ConfigsStack.Screen
      name="Preferences"
      component={PreferencesScreen}
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
const AppTabsScreen = (propsParent) => (
  //  tabBar={(props) => <MyTabBar {...props} />}
  <AppTabs.Navigator>
    <AppTabs.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Vagas',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <AppTabs.Screen
      name="Candidaturas"
      component={CandidaturasScreen}
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
    {/* <AppTabs.Item
      name="Configs"
      component={(props) => {
        this.preventDefault = true;
        return props.navigation.toggleDrawer();
      }}
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
    /> */}
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
        tabBarButton: () => (
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
              top: 3,
            }}
            onPress={() => propsParent.navigation.toggleDrawer()}>
            <MaterialCommunityIcons
              name="cog-outline"
              color={'#969696'}
              size={24}
            />
            <Text style={{color: '#969696', fontSize: 10, top: 7}}>
              Configs
            </Text>
          </TouchableOpacity>
        ),
      }}
    />
  </AppTabs.Navigator>
);

function MyTabBar({navigation}) {
  return (
    <Button
      title="Go somewhere"
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        navigation.toggleDrawer();
      }}
    />
  );
}

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
    <AuthStack.Screen
      name="JumpToThis"
      component={AppTabsScreen}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

export default () => {
  const [userToken, setToken] = React.useState('');
  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };
  const readData = async () => {
    await AsyncStorage.getItem('userToken').then((res) => {
      setToken(res);
    });
  };
  React.useEffect(() => {
    setTimeout(() => {
      //   setIsLoading(!isLoading);
      // if (userToken == '')
      readData();
      // deleteData();
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
        {userToken == '' || userToken == null ? (
          <AuthStackScreen />
        ) : (
          <ConfigsDrawerScreen />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};
