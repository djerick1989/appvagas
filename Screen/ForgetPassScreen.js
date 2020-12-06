import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import Loader from '../Components/Loader';
import {postUserRecoverPass} from '../helpers/api';
import {TextInputMask} from 'react-native-masked-text';

const ForgetPassScreen = (props) => {
  let [userPhon, setUserPhon] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  const handleSubmitButton = async () => {
    setErrortext('');
    if (!userPhon || userPhon.length != 11) {
      setErrortext('Phon Nuber length must be 11 digits');
      return;
    } else {
      setErrortext('');
    }
    //Show Loader
    setLoading(true);
    const [a, b] = await postUserRecoverPass({
      username: userPhon,
    });
    setLoading(false);
    if (a == true) {
      props.navigation.navigate('ConfirmCodeScreen');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6948F4" barStyle="default" />
      <Loader loading={loading} />
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
        <Text style={styles.LabelStyle}>Recuperar Senha</Text>
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
            value={userPhon}
            onChangeText={(userPhon) =>
              setUserPhon(userPhon.replace(/[^0-9]/g, ''))
            }
            placeholder="(11) 98877 5566"
            placeholderTextColor="#aaaaaa"
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
          <Text style={styles.buttonTextStyle}>Recuperar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Text style={styles.BackStyle} onPress={() => props.navigation.goBack()}>
        Voltar
      </Text>
    </View>
  );
};

export default ForgetPassScreen;
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
