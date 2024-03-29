import 'react-native-gesture-handler';
import * as React from 'react';
import Share from 'react-native-share';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Linking,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { List } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
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
import DetailScreen from './Screen/NavScreen/DetailScreen';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';

function CustomDrawerContent(propsParent) {
  return (
    <DrawerContentScrollView {...propsParent}>
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View>
          <List.Item
            title="Preferências"
            onPress={() => propsParent.navigation.navigate('Preferences')}
            right={(props) => <List.Icon {...props} icon="menu-right" color='#6948F4' />}
          />
          <View style={{ width: '100%', borderTopWidth: 1, borderColor: 'gray' }} />
          <List.Item
            title="Termos"
            onPress={() =>
              propsParent.navigation.navigate('Termos', {
                comeFrom: 'preferences',
              })
            }
            right={(props) => <List.Icon {...props} icon="menu-right" color='#6948F4' />}
          />
          <View style={{ width: '100%', borderTopWidth: 1, borderColor: 'gray' }} />
          <List.Item
            title="Políticas"
            onPress={() =>
              propsParent.navigation.navigate('Policy', {
                comeFrom: 'preferences',
              })
            }
            right={(props) => <List.Icon {...props} icon="menu-right" color='#6948F4' />}
          />
          <View style={{ width: '100%', borderTopWidth: 1, borderColor: 'gray' }} />
          <List.Item
            title="Ajuda"
            onPress={() =>
              Linking.openURL('https://jobconvo.freshdesk.com/')
            }
            right={(props) => <List.Icon {...props} icon="menu-right" color='#6948F4' />}
          />
          <View style={{ width: '100%', borderTopWidth: 1, borderColor: 'gray' }} />
          <List.Item
            title="Convidar Amgios"
            onPress={() => {
              Share.open({
                title: "App Vagas",
                message: "Estou usando o app Pesquisava Vagas e recomendo #pesquisavagas #vagas #tinderforjobs",
              })
                .then((res) => {

                })
                .catch((err) => {
                })
            }}
            right={(props) => <List.Icon {...props} icon="logout" color='#6948F4' />}
          />
          <View style={{ width: '100%', borderTopWidth: 1, borderColor: 'gray' }} />
          <List.Item
            title="Divulgar Vaga"
            onPress={() =>
              Linking.openURL('https://www.jobconvo.com/pt-br/pricing/')
            }
            right={(props) => <List.Icon {...props} icon="menu-right" color='#6948F4' />}
          />
          <View style={{ width: '100%', borderTopWidth: 1, borderColor: 'gray' }} />
          <List.Item
            title="SALIR"
            titleStyle={{ color: 'red' }}
            onPress={async () => {
              await AsyncStorage.clear().then(() => {
                RNRestart.Restart();
              });
            }}
          />
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
      itemStyle: { marginVertical: 30 },
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
    <ConfigsDrawer.Screen
      name="Curriculum"
      component={CurriculumScreen}
      options={{
        drawerLabel: () => null,
        headerShown: false,
        title: null,
        drawerIcon: () => null,
      }}
    />
    <ConfigsDrawer.Screen
      name="Candidaturas"
      component={CandidaturasScreen}
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
      options={{ headerShown: false }}
    />
    <ConfigsStack.Screen
      name="Policy"
      component={PolicyScreen}
      options={{ headerShown: false }}
    />
    <ConfigsStack.Screen
      name="Termos"
      component={ConditionsScreen}
      options={{ headerShown: false }}
    />
    <ConfigsStack.Screen
      name="Preferences"
      component={PreferencesScreen}
      options={{ headerShown: false }}
    />
  </ConfigsStack.Navigator>
);

const CurriculumStack = createStackNavigator();
const CurriculumStackScreen = () => (
  <CurriculumStack.Navigator>
    <CurriculumStack.Screen
      name="Curriculum"
      component={CurriculumScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <CurriculumStack.Screen
      name="Dados"
      component={DadosScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <CurriculumStack.Screen
      name="DadosPessoais"
      component={DadosPessoaisScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <CurriculumStack.Screen
      name="Endereco"
      component={EnderecoScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <CurriculumStack.Screen
      name="Objetivo"
      component={ObjetivoScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <CurriculumStack.Screen
      name="Formacao"
      component={FormacaoScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <CurriculumStack.Screen
      name="Experiencia"
      component={ExperienciaScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <CurriculumStack.Screen
      name="Idiom"
      component={IdiomasScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
  </CurriculumStack.Navigator>
);

const CandidaturasStack = createStackNavigator();
const CandidaturasStackScreen = () => (
  <CandidaturasStack.Navigator initialRouteName="Candidaturas">
    <CandidaturasStack.Screen
      name="Candidaturas"
      component={CandidaturasScreen}
      options={{ headerShown: false }}
    />
    <CandidaturasStack.Screen
      name="Detail"
      component={DetailScreen}
      options={{ headerShown: false }}
    />
  </CandidaturasStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = (propsParent) => (
  <AppTabs.Navigator tabBarOptions={{}}>
    <AppTabs.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Vagas',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <AppTabs.Screen
      name="CandidaturasTab"
      component={CandidaturasStackScreen}
      options={{
        tabBarLabel: 'Candidaturas',
        tabBarIcon: ({ color, size }) => (
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
        tabBarIcon: ({ color, size }) => (
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
        tabBarIcon: ({ color, size }) => (
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
              top: 3
            }}
            onPress={(props) => {
              propsParent.navigation.toggleDrawer();
            }}>
            <MaterialCommunityIcons
              name="cog-outline"
              color={'#969696'}
              size={24}
            />
            <Text style={{ color: '#969696', fontSize: 10, top: 7 }}>
              Configs
            </Text>
          </TouchableOpacity>
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
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="SlideScreen"
      component={SlideScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <AuthStack.Screen
      name="StartScreen"
      component={StartScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <AuthStack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <AuthStack.Screen
      name="ForgetPassScreen"
      component={ForgetPassScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <AuthStack.Screen
      name="ChangePassScreen"
      component={ChangePassScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <AuthStack.Screen
      name="ConfirmCodeScreen"
      component={ConfirmCodeScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <AuthStack.Screen
      name="ConditionsScreen"
      component={ConditionsScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <AuthStack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <AuthStack.Screen
      name="MapScreen"
      component={MapScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <AuthStack.Screen
      name="NotificationsScreen"
      component={NotificationsScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <AuthStack.Screen
      name="JumpToThis"
      component={ConfigsDrawerScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
    />
    <AuthStack.Screen
      name="Enderecos"
      component={EnderecoScreen}
      options={{ headerShown: true, headerTitle: null, headerLeft: null, headerStyle: { backgroundColor: '#6948F4' } }}
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
