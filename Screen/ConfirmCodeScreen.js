import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { getPhoneNumber } from 'react-native-device-info';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Loader from '../Components/Loader';
import { postUserRecoverCode, postUserRecoverPass } from '../helpers/api';

const ConfirmCodeScreen = (props) => {
  let [userCode, setuserCode] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  //   let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const handleSubmitButton = async () => {
    setErrortext('');
    if (!userCode || userCode.length < 2) {
      setErrortext('Codigo 4 minimum');
      return;
    } else {
      setErrortext('');
    }
    //Show Loader
    setLoading(true);
    const [a, b] = await postUserRecoverCode({
      code: userCode,
    });
    setLoading(false);
    console.log(b);
    if (a == true && b.message != 'Usuário não encontrado.') {
      props.navigation.navigate('ChangePassScreen');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6948F4" barStyle="default" />
      <Loader loading={loading} />
      <View style={{ alignItems: 'center', flex: 1 }}>
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

      <KeyboardAvoidingView enabled style={{ flex: 4 }}>
        <Text style={styles.LabelStyle}>Recuperar Senha</Text>
        <Text style={styles.LabelStyle2}>
          Enviamos un SMS no seu número com o código para recuperar sua senha.
        </Text>
        <Text style={styles.LabelStyle3}>
          Caso náo tenha recebido o código, favor recuperar a senha novamente.
        </Text>
        <View style={styles.SectionStyle}>
          <Text style={styles.InputLabelStyle}>Inserir Código</Text>
          <TextInput
            style={styles.inputStyle}
            keyboardType="phone-pad"
            onChangeText={(userCode) => setuserCode(userCode)}
            // underlineColorAndroid="#FFFFFF"
            placeholderTextColor="#6948F4"
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

export default ConfirmCodeScreen;
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
  LabelStyle2: {
    fontSize: 16,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
  },
  LabelStyle3: {
    fontSize: 16,
    paddingLeft: 30,
    paddingRight: 30,
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
