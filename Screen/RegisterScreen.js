import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Loader from '../Components/Loader';
import FadeInView from 'react-native-fade-in-view';
import DropdownItems from '../Components/DropdownItems';
import DropDownPicker from 'react-native-dropdown-picker';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LocationIQ from 'react-native-locationiq';
import {TextInputMask} from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import {WebView} from 'react-native-webview';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export default class RegiterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCorrectUser: false,
      isValidPhone: false,
      isValidPassword: false,
      isValidCpf: false,
      showLoading: false,
      UserName: '',
      FirstName: '',
      LastName: '',
      PhonNumber: '',
      Password: '',
      isregistered: false,
      CPF: '',
      Email: '',
      textInChat: [],
      EmailYN: '',
      ExpYN: '',
      Address: '',
      subarea: '',
      Y_exp: '',
      R_exp: '',
      unemployeed: false,
      // RenderTextState: '4',
      RenderTextState: '17',
      RegisterSuccess: '0',
      modalVisible: false,
      modalVisible_l: false,
      item1: null,
      isVisible1: false,
      item2: null,
      isVisible2: false,
      item3: null,
      isVisible3: false,
      item4: null,
      isVisible4: false,
      item5: null,
      isVisible5: false,
      item6: null,
      isVisible6: false,
      item7: null,
      isVisible7: false,
      item8: null,
      isVisible8: false,
      item9: null,
      isVisible9: false,
      item10: null,
      isVisible10: false,
      item11: null,
      isVisible11: false,
      item12: null,
      isVisible12: false,
      x: null,
      region: null,
      mapRegion: null,
      confirm_location: false,
      user_info: null,
    };
  }

  componentDidMount() {}

  renderChatBox(
    item,
    timer = 750,
    withImage = false,
    styleIn = styles.chatboxStyle,
  ) {
    return (
      <View style={styleIn}>
        <FadeInView duration={timer} style={styles.ChatContainerStyle}>
          <Text style={styles.ChatTextStyle}>{item}</Text>
          {withImage ? (
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
                marginTop: 10,
              }}
              source={require('../Image/smile.png')}
            />
          ) : null}
        </FadeInView>
      </View>
    );
  }

  email_validate() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.Email) === false) {
      console.log('Email is Not Correct');
      Alert.alert('Inválido Email');
      return false;
    } else {
      console.log('Email is Correct');
      this.handleSubmitButton();
    }
  }

  handleSubmitText = (keyToSearch) => {
    switch (keyToSearch) {
      case 'userName':
        if (this.state.UserName.indexOf(' ') > 0) {
          const userName = this.state.UserName;
          const firstSpace = userName.indexOf(' ');
          this.setState({
            FirstName: userName.substring(0, firstSpace),
            LastName: userName.substring(firstSpace + 1, userName.length),
          });
          this.setState({isCorrectUser: true});
        }
        break;
      case 'phone':
        if (this.state.PhonNumber.length === 11) {
          this.setState({isValidPhone: true});
        }
        break;
      case 'password':
        if (this.state.Password.length >= 4) {
          this.setState({showLoading: true});
          fetch('https://mobapivagas.jobconvo.com/v1/user/create/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.state.PhonNumber,
              first_name: this.state.FirstName,
              last_name: this.state.LastName,
              password: this.state.Password,
            }),
          })
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.first_name) {
                fetch('https://mobapivagas.jobconvo.com/v1/rest/login/', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: this.state.PhonNumber,
                    password: this.state.Password,
                  }),
                })
                  .then((response) => response.json())
                  .then((responseJsonLogin) => {
                    this.setState({isValidPassword: true});
                    this.setState({showLoading: false});
                    this.setState({isregistered: true});
                    if (responseJsonLogin.token) {
                      this.setState({user_info: responseJsonLogin});
                    }
                  })
                  .catch((error) => {
                    this.setState({showLoading: false});
                    console.error(error);
                  });
              } else {
                this.setState({showLoading: false});
                Alert.alert(
                  'usuario',
                  responseJson.username[0],
                  [
                    {
                      text: 'OK',
                      onPress: () =>
                        this.props.navigation.navigate('LoginScreen'),
                    },
                    ,
                  ],
                  {cancelable: false},
                );
                // requiero mostrar el boton volver
                return;
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
        break;
      case 'cpf':
        if (!this.state.CPF) {
          return;
        }

        this.setState({showLogin: true});
        fetch(
          'https://mobapivagas.jobconvo.com/v1/user/cpf/' +
            this.state.user_info.id +
            '/update/',
          {
            method: 'PATCH',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Token ' + this.state.user_info.token.api_key,
            },
            body: JSON.stringify({
              cpf: this.state.CPF,
            }),
          },
        )
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            this.setState({showLogin: false});
            if (responseJson.user) {
              this.setState({RenderTextState: 12});
            } else {
              if (responseJson.message) {
                Alert.alert(responseJson.message);
              } else {
                Alert.alert(
                  'Vimos que já há um outro cadastro com seu CPF em nosso sistema. \n' +
                    'Favor entrar em contato com nosso suporte em: \n' +
                    'suporte@jobconvo.com',
                );
              }
              return;
            }
          })
          .catch((error) => {
            console.error(error);
            Alert.alert('server error');
          });
        this.setState({isValidCpf: true});
        break;
      default:
        break;
    }
  };

  inputWithKeyBoard = (
    timer = 750,
    changeState,
    submitEditing,
    placeholder,
    editable,
    placeholderTextColor = '#aaaaaa',
    autoCapitalize = 'sentences',
    returnKeyType = 'next',
  ) => {
    return (
      <KeyboardAvoidingView enabled>
        <FadeInView duration={timer} style={styles.InputBoxStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={changeState}
            onSubmitEditing={submitEditing}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            autoCapitalize={autoCapitalize}
            returnKeyType={returnKeyType}
            blurOnSubmit={false}
            editable={!editable}
          />
        </FadeInView>
      </KeyboardAvoidingView>
    );
  };

  inputWithInputMask = (
    time = 750,
    type,
    options,
    value,
    onChangeText,
    onSubmitEditing,
    placeholder,
    editable,
  ) => {
    return (
      <KeyboardAvoidingView enabled>
        <FadeInView duration={time} style={styles.InputBoxStyle}>
          <TextInputMask
            style={styles.inputStyle}
            type={type}
            options={options}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            placeholderTextColor="#aaaaaa"
            returnKeyType="next"
            blurOnSubmit={false}
            editable={!editable}
          />
        </FadeInView>
      </KeyboardAvoidingView>
    );
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        ref={(ref) => {
          this.scrollView = ref;
        }}
        onContentSizeChange={() =>
          this.scrollView.scrollToEnd({animated: true})
        }>
        <Loader loading={this.state.showLoading} />
        <TouchableWithoutFeedback>
          <View style={{padding: 20}}>
            {this.renderChatBox('Olá, muito bem vindo!', 500, true)}
            {this.renderChatBox(
              'Sou o Pesquisa Vagas e estou aqui para ajuda-lo a conseguir um novo trabalho. Vamos lá?',
              1500,
            )}
            {this.renderChatBox(
              'Muito bem, que tal começar se apresentando?',
              3000,
            )}
            {this.renderChatBox('Como você se chama?', 4500)}
            {this.inputWithKeyBoard(
              5500,
              (val) => this.setState({UserName: val}),
              () => this.handleSubmitText('userName'),
              'NOME E SOBRENOME',
              this.state.isCorrectUser,
            )}

            {this.state.isCorrectUser
              ? this.renderChatBox('Lindo nome!', 1200)
              : null}
            {this.state.isCorrectUser
              ? this.renderChatBox('Qual o número do seu celular?', 2000)
              : null}
            {this.state.isCorrectUser
              ? this.inputWithInputMask(
                  750,
                  'cel-phone',
                  {
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  },
                  this.state.PhonNumber,
                  (text) => {
                    this.setState({
                      PhonNumber: text.replace(/[^0-9]/g, ''),
                    });
                  },
                  () => this.handleSubmitText('phone'),
                  '(11) 98877 5566',
                  this.state.isValidPhone,
                )
              : null}

            {this.state.isValidPhone
              ? this.renderChatBox('Cadastre agora a sua senha de acesso')
              : null}

            {this.state.isValidPhone
              ? this.inputWithKeyBoard(
                  5500,
                  (val) => this.setState({Password: val}),
                  () => this.handleSubmitText('password'),
                  '*******',
                  this.state.isValidPassword,
                )
              : null}

            {this.state.isValidPassword
              ? this.renderChatBox('Qual o seu CPF?')
              : null}

            {this.state.isValidPassword
              ? this.inputWithInputMask(
                  1800,
                  'cpf',
                  {},
                  this.state.CPF,
                  (text) => {
                    this.setState({
                      CPF: text.replace(/[^0-9]/g, ''),
                    });
                  },
                  () => this.handleSubmitText('cpf'),
                  '(11) 98877 5566',
                  this.state.isValidCpf,
                )
              : null}

            {/* {this.renderChatBox('Como você se chama?', 4500, false, styles.answerboxStyle)} */}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mapLabel: {
    color: '#6948F4',
    fontWeight: 'bold',
    fontSize: 22,
  },
  mapText: {
    padding: 20,
    color: 'black',
    fontSize: 18,
    alignItems: 'center',
  },
  map: {
    height: 400,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  chatboxStyle: {
    width: '70%',
    alignSelf: 'flex-start',
  },
  answerboxStyle: {
    width: '70%',
    alignSelf: 'flex-end',
  },

  YbuttonStyleTwo: {
    backgroundColor: '#6948F4',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    borderWidth: 0,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  NbuttonStyleTwo: {
    backgroundColor: 'white',
    borderColor: '#6948F4',
    color: '#6948F4',
    fontWeight: 'bold',
    fontSize: 14,
    borderWidth: 2,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  YbuttonStyle: {
    backgroundColor: '#6948F4',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    borderWidth: 0,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  NbuttonStyle: {
    backgroundColor: 'white',
    borderColor: '#6948F4',
    color: '#6948F4',
    fontWeight: 'bold',
    fontSize: 14,
    borderWidth: 2,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  ChatContainerStyle: {
    backgroundColor: '#e2dcfc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  ChatTextStyle: {
    fontSize: 18,
    color: '#000000',
  },
  MultiLineInputBoxStyle: {
    width: '70%',
    marginBottom: 15,
    alignSelf: 'flex-end',
    height: 100,
  },
  InputBoxStyle: {
    width: '70%',
    marginBottom: 15,
    alignSelf: 'flex-end',
    height: 40,
  },
  inputStyle: {
    color: '#000000',
    paddingLeft: 10,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#6948F4',
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
    fontSize: 14,
  },
  WhiteButtonTextStyle: {
    color: '#6948F4',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 16,
  },

  blueButtonTextStyle: {
    color: '#ffffff',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 16,
  },
  dLabelStyle: {
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#6948F4',
  },
  dItemStyle: {
    justifyContent: 'flex-start',
  },
  dPlaceholderStyle: {
    textAlign: 'left',
    color: 'black',
    fontWeight: '200',
  },
  dStyle: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    minHeight: 300,
  },
});
