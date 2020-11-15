import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Loader from '../../Components/Loader';
import {patchuserUpdate, patchUserProfile} from '../../helpers/api';
import {TextInputMask} from 'react-native-masked-text';
import AsyncStorage from '@react-native-community/async-storage';

export default class DadosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpf: '',
      email: '',
      fullName: '',
      phone: '',
      loading: false,
    };
  }

  async componentDidMount() {
    const firstName = await AsyncStorage.getItem('first_name');
    const lastName = await AsyncStorage.getItem('last_name');
    const email = await AsyncStorage.getItem('email');
    const phone = await AsyncStorage.getItem('username');
    this.setState({
      fullName: firstName + ' ' + lastName,
      email: email,
      phone: phone,
    });
  }

  async handleSubmitButton() {
    this.setState({loading: true});
    const fullname = this.state.fullName.split(' ');
    if (fullname[0] && fullname[1]) {
      await patchuserUpdate({
        username: this.state.phone,
        email: this.state.email,
        first_name: fullname[0],
        last_name: fullname[1],
      });
      await AsyncStorage.setItem('first_name', fullname[0]);
      await AsyncStorage.setItem('last_name', fullname[1]);
      await AsyncStorage.setItem('email', this.state.email);
      await AsyncStorage.setItem('username', this.state.phone);
    } else {
      await patchuserUpdate({
        username: this.state.phone,
        email: this.state.email,
      });
      await AsyncStorage.setItem('email', this.state.email);
      await AsyncStorage.setItem('username', this.state.phone);
    }
    this.setState({loading: false});
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <Loader loading={this.state.loading} />
        <View>
          <View>
            <Text
              style={styles.BackStyle2}
              onPress={() => this.props.navigation.goBack()}>
              Voltar
            </Text>
          </View>
          <KeyboardAvoidingView enabled style={{flex: 4}}>
            <Text style={styles.LabelStyle}>Dados Cadastrais</Text>
            <View style={styles.SectionStyle}>
              <Text style={styles.InputLabelStyle}>Nome Completo</Text>
              <TextInput
                style={styles.inputStyle}
                value={this.state.fullName}
                onChangeText={(text) => this.setState({fullName: text})}
                placeholder="NOME E SOBRENOME"
                placeholderTextColor="#aaaaaa"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <Text style={styles.InputLabelStyle}>Telefone Celular</Text>
              <TextInputMask
                style={styles.inputStyle}
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                value={this.state.phone}
                onChangeText={(text) => {
                  this.setState({
                    phone: text.replace(/[^0-9]/g, ''),
                  });
                }}
                placeholder="(11) 98877 5566"
                placeholderTextColor="#aaaaaa"
                blurOnSubmit={false}
                ref={(ref) => (this.phoneField = ref)}
              />
            </View>
            <View style={styles.SectionStyle}>
              <Text style={styles.InputLabelStyle}>CPF</Text>
              <TextInputMask
                style={styles.inputStyle}
                type={'cpf'}
                value={this.state.cpf}
                onChangeText={(text) => {
                  this.setState({
                    cpf: text.replace(/[^0-9]/g, ''),
                  });
                }}
                placeholderTextColor="#aaaaaa"
                returnKeyType="next"
              />
            </View>
            <View style={styles.SectionStyle}>
              <Text style={styles.InputLabelStyle}>Email</Text>
              <TextInput
                style={styles.inputStyle}
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})}
                placeholderTextColor="#aaaaaa"
                placeholder="INSERIR EMAIL"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => this.handleSubmitButton()}>
              <Text style={styles.buttonTextStyle}>Confirmar</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerEspecial: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    height: 70,
    margin: 10,
  },
  item: {
    width: '50%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  SectionStyle: {
    height: 70,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  SectionStyleEspecial1: {
    height: 70,
    marginRight: 25,
    marginLeft: 10,
  },
  SectionStyleEspecial2: {
    height: 70,
    marginLeft: 25,
    marginRight: 10,
  },
  LabelStyle: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 20,
    paddingLeft: 35,
  },
  InputLabelStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 5,
  },
  buttonStyle: {
    backgroundColor: '#6948F4',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#6948F4',
    height: 40,
    alignItems: 'center',
    borderRadius: 25,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 10,
  },

  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 8,
    fontSize: 18,
  },
  inputStyle: {
    flex: 1,
    color: '#6948F4',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#6948F4',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },

  BackStyle: {
    color: '#6948F4',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    bottom: 20,
    right: 0,
    left: 0,
  },

  BackStyle2: {
    color: '#6948F4',
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 30,
    paddingLeft: 35,
  },
});
