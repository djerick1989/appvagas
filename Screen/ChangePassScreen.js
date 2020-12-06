import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import Loader from '../Components/Loader';
import {postUserChangePass} from '../helpers/api';

const ChangePassScreen = (props) => {
  let [passWord1, setPassword] = useState('');
  let [passWord2, setPassword2] = useState('');
  let [errortext, setErrortext] = useState('');
  let [loading, setLoading] = useState(false);
  //   let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const handleSubmitButton = async () => {
    setErrortext('');
    if (!passWord1 || !passWord2) {
      setErrortext('Insert Password');
      return;
    } else {
      setErrortext('');
    }
    if (passWord1 !== passWord2) {
      setErrortext('Password not match');
      return;
    } else {
      setErrortext('');
    }
    //Show Loader
    setLoading(true);
    await postUserChangePass({
      password: passWord1,
      password_confirm: passWord2,
    });
    setLoading(false);
    props.navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <StatusBar backgroundColor="#6948F4" barStyle="default" />
      <View style={{alignItems: 'center', flex: 1}}>
        <Image
          source={require('../Image/Logo-Pesquisa-Vagas.png')}
          style={{
            width: '60%',
            height: 100,
            resizeMode: 'contain',
            margin: 20,
            top: 10,
          }}
        />
      </View>

      <KeyboardAvoidingView enabled style={{flex: 4}}>
        <Text style={styles.LabelStyle}>Cadastrar Nova Senha</Text>
        <View style={styles.SectionStyle}>
          <Text style={styles.InputLabelStyle}>Sua Nova Senha</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(password) => setPassword(password)}
            placeholder="******"
            placeholderTextColor="#aaaaaa"
            autoCapitalize="sentences"
            returnKeyType="next"
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.SectionStyle}>
          <Text style={styles.InputLabelStyle}>Confirmar Nova Senha</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(password) => setPassword2(password)}
            placeholder="******"
            placeholderTextColor="#aaaaaa"
            autoCapitalize="sentences"
            returnKeyType="next"
            blurOnSubmit={false}
          />
        </View>
        {errortext != '' ? (
          <Text style={styles.errorTextStyle}> {errortext} </Text>
        ) : null}
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={handleSubmitButton}>
          <Text style={styles.buttonTextStyle}>Confirmar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Text style={styles.BackStyle} onPress={() => props.navigation.goBack()}>
        Voltar
      </Text>
    </View>
  );
};

export default ChangePassScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  SectionStyle: {
    height: 70,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  LabelStyle: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 70,
    paddingLeft: 30,
    paddingBottom: 30,
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
    zIndex: 0,
    position: 'absolute',
    color: '#6948F4',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    bottom: 20,
    right: 0,
    left: 0,
  },
});
