import React, { Component,useState, useEffect ,useContext}from "react";

import { StyleSheet, Text, View, Image,TouchableOpacity, TextInput,  KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard } from "react-native";
import Loader from '../Components/Loader';
import {TextInputMask} from 'react-native-masked-text'
import KeyboardListener from 'react-native-keyboard-listener';
import AsyncStorage from '@react-native-community/async-storage'
import { AuthContext } from '../Components/AuthContext';



const LoginScreen = props => {
  let [userPhon, setUserPhon] = useState('');
  let [password, setPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [usertoken, setToken] = useState(false);
  let [isKeyboardVisible, setKeyboardVisible] = useState('');

  const { signIn } = useContext(AuthContext);
  
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        _keyboardDidShow();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        _keyboardDidHide();
      }
    );
    
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
 
  // const saveData = async () => {
  //   try {
  //     AsyncStorage.setItem("token", usertoken).then(
  //       () => AsyncStorage.getItem("operator")
  //             .then((result)=>console.log(result))
  //    )
  //     await AsyncStorage.setItem('token', usertoken)
  //     alert('Data successfully saved')
  //   } catch (e) {
  //     alert('Failed to save the data to the storage')
  //   }
  // }

  const _keyboardDidShow = () => {
    setKeyboardVisible(true);
  }
  const  _keyboardDidHide = () => {
    setKeyboardVisible(false);
  }
  const handleSubmitButton = () => {
    setErrortext('');
    if (!userPhon||userPhon.length!=11) {
    setErrortext('Phon Nuber length must be 11 digits');
      return;
    }else{
        setErrortext('');
    }
    if (!password) {
    setErrortext('Please enter your Password!');
        return;
    }else{
        setErrortext('');
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
        username: userPhon,
        password: password,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://mobapivagas.jobconvo.com/v1/rest/login/', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.token) {
          console.log(responseJson.token.api_key)
          setToken(responseJson.token.api_key)
          AsyncStorage.setItem("userToken", responseJson.token.api_key).then( () => AsyncStorage.getItem("userToken")
          .then((result)=>console.log(result)))

          signIn(responseJson.token.api_key )
          // props.navigation.navigate('AppTabsScreen');
        } else {
          setErrortext('Login Failed');
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };


    return (
        <View style={styles.container}>
            
            <Loader loading={loading} />
            <View style={{ alignItems: 'center',flex:1 }}>
                <Image
                source={require('../Image/Logo-Pesquisa-Vagas.png')}
                style={{
                    width: '60%',
                    height: 100,
                    resizeMode: 'contain',
                    margin: 20,
                    top:10,
                    }}
                />
            </View>
            
            <KeyboardAvoidingView enabled style={{flex:4,}}>
                <Text style={styles.LabelStyle}>
                    Login
                </Text>
                <View style={styles.SectionStyle}>
                    <Text style={styles.InputLabelStyle}>Telefone Celular</Text>
                    <TextInputMask
                        style={styles.inputStyle}
                        type={'cel-phone'}
                        options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                        }}
                        value={userPhon}
                        onChangeText={userPhon => setUserPhon(userPhon.replace(/[^0-9]/g, ''))}
                        onSubmitEditing={() => handleSubmitButton()}
                        placeholder="(11) 98877 5566"
                        placeholderTextColor="#aaaaaa"
                        returnKeyType="next"
                        blurOnSubmit={false}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <Text style={styles.InputLabelStyle}>Senha</Text>
                    <TextInput
                    style={styles.inputStyle}
                    onChangeText={password => setPassword(password) }
                    placeholder="******"
                    placeholderTextColor="#aaaaaa"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() =>
                        handleSubmitButton()
                      }
                    />
                </View>
                {errortext != '' ? (
                    <Text style={styles.errorTextStyle}> {errortext} </Text>
                ) : null}
            </KeyboardAvoidingView>
            {isKeyboardVisible==false &&
              <View style={{flex:1,justifyContent: 'flex-end',alignItems:'center',}}>
                <View style={{flexDirection: 'row',marginBottom:30, alignItems:'center',}}>
                    <Text style={{color:'#000000'}}>Esqueceu sua senha? </Text>
                    <TouchableOpacity
                    onPress={() =>props.navigation.navigate('ForgetPassScreen')}
                    activeOpacity={0.5}
                    >
                    <Text style={{color:'#6948F4', fontWeight:'bold'}}>Recuperar</Text>
                    </TouchableOpacity>
                </View>
                <Text 
                    style={styles.BackStyle}
                    onPress={() => props.navigation.navigate('StartScreen')}
                    >Voltar
                </Text>
                </View>}
            
        </View>
    );
  }

export default LoginScreen;
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
    fontWeight:'bold',
    fontSize:25,
    paddingTop: 70,
    paddingLeft: 30,
    paddingBottom: 30,
  }, 
  InputLabelStyle: {
    fontWeight:'bold',
    fontSize:16,
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
      fontWeight: "bold",
      fontSize: 16,
      textAlign:"center",
      bottom:20,
      right:0,
      left:0,
  },
  
});