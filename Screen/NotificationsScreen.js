import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export default class NotificationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.SectionStyle}>
          <Image
            source={require('../Image/Messages-pana.png')}
            style={{
              width: '100%',
              height: viewportHeight * 0.55,
              resizeMode: 'contain',
              top: 40,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 20,
          }}>
          <Text style={styles.mapLabel}>Ative as notificações</Text>
          <Text style={styles.mapText}>
            Assim você saberá quando algum recrutador lhe enviar mensagens
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
              padding: 10,
              backgroundColor: 'white',
              borderColor: '#6948F4',
              borderWidth: 1,
              margin: 10,
            }}
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate('RegisterScreen', {
              allowNotification: false
            })}>
            <Text style={styles.WhiteButtonTextStyle}>Agora Não</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              padding: 10,
              backgroundColor: '#6948F4',
              borderColor: '#ffffff',
              borderWidth: 1,
              margin: 10,
            }}
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.navigate('RegisterScreen', {
                allowNotification: true
              });
            }}>
            <Text style={styles.blueButtonTextStyle}>Permitir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  mapLabel: {
    color: '#6948F4',
    fontWeight: 'bold',
    fontSize: 22,
  },
  mapText: {
    padding: 20,
    maxWidth: 340,
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    alignItems: 'center',
  },
  SectionStyle: {
    flex: 4,
    marginTop: 0,
  },
  blueButtonTextStyle: {
    color: '#ffffff',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 16,
  },
  WhiteButtonTextStyle: {
    color: '#6948F4',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: '#6948F4',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#6948F4',
    height: 40,
    width: viewportWidth * 0.45,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 10,
  },
  loginbuttonStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    color: '#6948F4',
    borderColor: '#6948F4',
    height: 40,
    width: viewportWidth * 0.45,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',

    paddingVertical: 8,
    fontSize: 18,
  },
  loginbuttonTextStyle: {
    color: '#6948F4',
    paddingVertical: 5,
    fontSize: 18,
  },
});
