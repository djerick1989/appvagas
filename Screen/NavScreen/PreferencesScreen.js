/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Button,
  Modal,
} from 'react-native';
import Loader from '../../Components/Loader';
import {deleteUser} from '../../helpers/api';
import RNRestart from 'react-native-restart';
import {List} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

export default class PreferencesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      modalVisible: false,
      imageSource: require('../../Image/avatar.png'),
    };
  }

  async componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  async deleteAccount() {
    this.setState({modalVisible: false});
    await deleteUser();
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('first_name');
    await AsyncStorage.removeItem('last_name');
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('cpf');
    await AsyncStorage.removeItem('userToken').then(() => {
      RNRestart.Restart();
    });
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor="#6948F4" barStyle="default" />
        <View style={styles.backTop}>
          <Text
            style={styles.BackStyle2}
            onPress={() => this.props.navigation.goBack()}>
            Voltar
          </Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <Loader loading={this.state.loading} />
          <View>
            <KeyboardAvoidingView enabled style={{flex: 4}}>
              <View style={styles.SectionStyle}>
                <List.Item
                  title="Notificações"
                  onPress={() =>
                    this.props.navigation.navigate('Notifications', {
                      comeFrom: 'preferences',
                    })
                  }
                  right={(props) => <List.Icon {...props} icon="menu-right" />}
                />
                <List.Item
                  title="Localização "
                  onPress={() =>
                    this.props.navigation.navigate('MapScreen', {
                      comeFrom: 'preferences',
                    })
                  }
                  right={(props) => <List.Icon {...props} icon="menu-right" />}
                />
                {/* <List.Item
                  title="open drawer "
                  onPress={() => this.props.navigation.toggleDrawer()}
                  right={(props) => <List.Icon {...props} icon="menu-right" />}
                /> */}
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
        <View style={styles.fabMenuStyle}>
          <Button
            color="red"
            style={styles.buttonStyle}
            title="Cancelar conta"
            onPress={() => this.setState({modalVisible: true})}
          />
        </View>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
            <View style={{flex: 5, justifyContent: 'flex-start'}}>
              <View>
                <Text
                  style={styles.BackStyle2}
                  onPress={() => this.setState({modalVisible: false})}>
                  Voltar
                </Text>
              </View>
              <View style={styles.SectionStyle}>
                <Text style={styles.LabelStyle}>
                  Tem certeza de que deseja cancelar sua conta?
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignSelf: 'center',
                  paddingBottom: 50,
                }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: 'white',
                    borderColor: '#6948F4',
                    borderWidth: 1,
                    margin: 10,
                  }}
                  activeOpacity={0.5}
                  onPress={() => this.setState({modalVisible: false})}>
                  <Text style={styles.WhiteButtonTextStyle}>Agora Não</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
          <View style={styles.fabMenuStyle2}>
            <Button
              color="red"
              style={styles.buttonStyle}
              title="Sim, cancelar"
              onPress={() => this.deleteAccount()}
            />
          </View>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  fabMenuStyle: {
    flexDirection: 'row',
    color: '#ff0000',
    flex: 0.05,
    backgroundColor: '#ffffff',
    paddingBottom: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  fabMenuStyle2: {
    flexDirection: 'row',
    color: '#ff0000',
    flex: 0.05,
    backgroundColor: '#ffffff',
    paddingBottom: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  LabelStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginRight: 15,
  },
  SectionStyle: {
    marginTop: 40,
    marginLeft: 15,
    marginRight: 15,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#6948F4',
    borderWidth: 0,
    color: '#ff0000',
    borderColor: '#6948F4',
    height: 40,
    alignItems: 'center',
  },
  BackStyle2: {
    color: '#6948F4',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    fontSize: 16,
    paddingTop: 30,
    paddingLeft: 35,
  },
  backTop: {
    backgroundColor: '#FFFFFF',
  },
  WhiteButtonTextStyle: {
    color: '#6948F4',
    fontWeight: 'bold',
    padding: 25,
    fontSize: 16,
  },
});
