import React, { Component,useState }from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity, TextInput,  KeyboardAvoidingView,} from "react-native";
import Loader from '../Components/Loader';

const ConfirmCodeScreen = props => {
  let [userPhon, setUserPhon] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
//   let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userPhon) {
    //   alert('Please fill Name');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      user_number: userPhon,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://aboutreact.herokuapp.com/register.php', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status == 1) {
          setIsRegistraionSuccess(true);
          console.log('Registration Successful. Please Login to proceed');
        } else {
          setErrortext('Registration Unsuccessful');
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
                    Recuperar Senha
                </Text>
                <View style={styles.SectionStyle}>
                    <Text style={styles.InputLabelStyle}>Telefone Celular</Text>
                    <TextInput
                    style={styles.inputStyle}
                    keyboardType='phone-pad'
                    onChangeText={userPhon => setUserPhon(userPhon.replace(/[^0-9]/g, ''))}
                    // underlineColorAndroid="#FFFFFF"
                    placeholder="(11) 98877 5566"
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
                    <Text style={styles.buttonTextStyle}>Recuperar</Text>
                </TouchableOpacity>
                
            </KeyboardAvoidingView>
            <Text 
                style={styles.BackStyle}
                onPress={() => props.navigation.navigate('StartScreen')}
                >Voltar</Text>

        </View>
    );
  }

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
      zIndex:0,
      position:"absolute",
      color: '#6948F4',
      fontWeight: "bold",
      fontSize: 16,
      textAlign:"center",
      bottom:20,
      right:0,
      left:0,
  },
  
});