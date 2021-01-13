import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Modal,
  StatusBar,
  TouchableHighlight,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../Components/Loader';
import FadeInView from 'react-native-fade-in-view';
import DropdownItems from '../Components/DropdownItems';
import AsyncStorage from '@react-native-community/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInputMask } from 'react-native-masked-text';
import TextMask from 'react-native-text-input-mask';
import moment from 'moment';

export default class RegiterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCorrectUser: false,
      isValidPhone: false,
      isValidPassword: false,
      isValidCpf: false,
      isValidEmail: false,
      isValidCep: false,
      isValidAddress: false,
      isValidNeiboughood: false,
      isValidCity: false,
      isValidState: false,
      isValidCountry: false,
      isValidInstitution: false,
      isValidExperience: false,
      showLoading: false,
      isValidExperienceInfo: false,
      hasClickEducation: false,
      hasExperience: null,
      hasWorking: null,
      isValidJob: false,
      modalVisible: false,
      allowNotification: props.route.params.allowNotification,
      hasEmail: null,
      UserName: '',
      FirstName: '',
      LastName: '',
      PhonNumber: '',
      Password: '',
      Cep: '',
      Address: '',
      Neiboughood: '',
      City: '',
      State: '',
      Country: '',
      isregistered: false,
      CPF: '',
      Email: '',
      InfoExp: '',
      user_info: null,
      item1: '',
      item2: '',
      item3: '',
      item4: '',
      item5: '',
      item6: '',
      item7: '',
      item8: '',
      item9: '',
      item10: '',
      item11: '',
      item12: '',
      itemNivel: '',
      itemStatus: '',
      areaSelected: '',
      listNivels: [
        { label: 'Nivel', value: -1 },
        { label: 'Até 5º ano do Ensino Fundamental', value: 0 },
        { label: 'Do 6º ao 9º ano do Ensino Fundamental', value: 1 },
        { label: 'Ensino Fundamental', value: 2 },
        { label: 'Ensino Medio', value: 3 },
        { label: 'Curso Tecnico', value: 4 },
        { label: 'Tecnologo', value: 5 },
        { label: 'Ensino Superior', value: 6 },
        { label: 'Pos', value: 7 },
        { label: 'Mestrado', value: 8 },
        { label: 'Doutorado', value: 9 },
        { label: 'Curso', value: 10 },
      ],
      listStatus: [
        { label: 'Todos', value: 0 },
        { label: 'Concluido', value: 1 },
        { label: 'Cursando', value: 2 },
        { label: 'Incompleto', value: 3 },
        { label: 'Desconhecido', value: 4 },
      ],
      isVisible1: false,
      isVisible2: false,
      isVisible3: false,
      isVisible4: false,
      isVisible5: false,
      isVisible6: false,
      isVisible7: false,
      isVisible8: false,
      isVisible9: false,
      isVisible10: false,
      isVisible11: false,
      isVisible12: false,
      isValidNivel: false,
      isValidStatus: false,
      isValidInicio: null,
      dismissed: false,
      isOneDropdownActive: false,
      show: true,
      mode: 'date',
      date: '',
      dateConcluido: '',
      allAreas: [],
      subarea: null,
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      isValidInicio: true,
      show: Platform.OS === 'ios' ? true : false,
    });
  };

  transformDate(dateIn) {
    const date = dateIn.split('/');
    let realDate = '';
    if (date[0] && date[1] && date[2]) {
      realDate = date[2] + '-' + date[1] + '-' + date[0];
    }
    return realDate;
  }

  showMode = (currentMode) => {
    this.setState({
      mode: currentMode,
      show: true,
    });
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
  };

  sendToApp() {
    const user_info = this.state.user_info;
    AsyncStorage.setItem('userId', '' + user_info.id);
    AsyncStorage.setItem('username', '' + user_info.username);
    AsyncStorage.setItem('email', '' + this.state.Email);
    AsyncStorage.setItem('first_name', '' + user_info.first_name);
    AsyncStorage.setItem('last_name', '' + user_info.last_name);
    AsyncStorage.setItem('userToken', user_info.token.api_key);
    AsyncStorage.setItem('cpf', this.state.CPF);
    this.props.navigation.navigate('JumpToThis');
  }

  renderChatBox(
    item,
    timer = 750,
    withImage = false,
    styleIn = styles.chatboxStyle,
    ChatContainerStyle = styles.ChatContainerStyle,
    ChatTextStyle = styles.ChatTextStyle,
  ) {
    return (
      <View style={styleIn}>
        <FadeInView duration={timer} style={ChatContainerStyle}>
          <Text style={ChatTextStyle}>{item}</Text>
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

  handleSubmitText = (keyToSearch, value = false) => {
    switch (keyToSearch) {
      case 'userName':
        if (this.state.UserName.indexOf(' ') > 0) {
          const userName = this.state.UserName;
          const firstSpace = userName.indexOf(' ');
          this.setState({
            FirstName: userName.substring(0, firstSpace),
            LastName: userName.substring(firstSpace + 1, userName.length),
          });
          this.setState({ isCorrectUser: true });
        } else {
          Alert.alert('Alerta', 'Favor inserir seu sobrenome');
        }
        break;
      case 'phone':
        if (this.state.PhonNumber.length === 11) {
          fetch(`https://mobapivagas.jobconvo.com/v1/user/username/${this.state.PhonNumber}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          })
            .then(response => response.json())
            .then(result => {
              if (result.first_name) {
                Alert.alert('Alerta', 'Este número já está cadastrado',
                  [
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    {
                      text: "Login", onPress: () => this.props.navigation.navigate('LoginScreen')
                    }
                  ])
              } else {
                this.setState({ isValidPhone: true });
              }
            })
        }
        break;
      case 'password':
        if (this.state.Password.length >= 4) {
          this.setState({ showLoading: true });
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
                    this.setState({ isValidPassword: true });
                    this.setState({ showLoading: false });
                    this.setState({ isregistered: true });
                    if (responseJsonLogin.token) {
                      this.setState({ user_info: responseJsonLogin });
                    }
                  })
                  .catch((error) => {
                    this.setState({ showLoading: false });
                    console.error(error);
                  });
              } else {
                this.setState({ showLoading: false });
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
                  { cancelable: false },
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
        this.setState({ showLoading: true });
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

            this.setState({ showLoading: false });
            if (responseJson.user) {
              this.setState({ isValidCpf: true });
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
        break;

      case 'email':
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.Email) === false) {
          Alert.alert('Inválido Email');
          return;
        } else {
          fetch(
            'https://mobapivagas.jobconvo.com/v1/user/' +
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
                email: this.state.Email,
              }),
            },
          )
            .then((response) => response.json())
            .then(() => {
              this.setState({ isValidEmail: true });
            })
            .catch((error) => {
              console.error(error);
              Alert.alert('server error');
            });
        }
        break;
      case 'Cep':
        this.setState({ isValidCep: true });
        break;
      case 'Address':
        this.setState({ isValidAddress: true });
        break;
      case 'Neiboughood':
        this.setState({ isValidNeiboughood: true });
        break;
      case 'City':
        this.setState({ isValidCity: true });
        break;
      case 'State':
        this.setState({ isValidState: true });
        break;
      case 'Country':
        this.setState({ showLoading: true });
        fetch(
          'https://mobapivagas.jobconvo.com/v1/user/profile/' +
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
              zipcode: this.state.Cep,
              state: this.state.State,
              city: this.state.City,
              neighbourhood: this.state.Neiboughood,
              complement: null,
              adddressnumber: null,
              address: this.state.Address,
              phone1: this.state.PhonNumber,
            }),
          },
        )
          .then((response) => response.json())
          .then(() => {
            this.setState({ showLoading: false, isValidCountry: true });
          })
          .catch((error) => {
            console.error(error);
            Alert.alert('server error');
          });
        break;
      case 'hasExperience':
        if (value === false) {
          this.setState({ showLoading: true });
          fetch(
            'https://mobapivagas.jobconvo.com/v1/user/resume/exp/' +
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
                years_of_experience: 0,
                career_objective: 'Eu não tenho experiência',
              }),
            },
          )
            .then((response) => response.json())
            .then(() => {
              this.setState({ showLoading: false, hasExperience: value });
            })
            .catch((error) => {
              console.error(error);
              Alert.alert('server error');
            });
        } else {
          this.setState({ hasExperience: value });
        }
        break;
      case 'YearsExp':
        if (this.state.YearsExp == '' || this.state.YearsExp == null) {
          this.setState({ YearsExp: 0 });
        }
        this.setState({ isValidExperience: true });
        break;
      case 'InfoExp':
        this.setState({ showLoading: true });
        fetch(
          'https://mobapivagas.jobconvo.com/v1/user/resume/exp/' +
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
              years_of_experience: this.state.YearsExp,
              career_objective: this.state.InfoExp,
            }),
          },
        )
          .then((response) => response.json())
          .then(() => {
            this.setState({ showLoading: false, isValidExperienceInfo: true });
          })
          .catch((error) => {
            console.error(error);
            Alert.alert('server error');
          });
        break;
      case 'Formation':
        this.setState({
          isValidFormation: true,
        });
        break;
      case 'Institution':
        this.setState({
          isValidInstitution: true,
        });
        break;
      case 'FirstSaldo':
        this.setState({
          isValidFirstSaldo: true,
        });
        break;
      case 'LastSaldo':
        this.setState({ showLoading: true });
        fetch(
          'https://mobapivagas.jobconvo.com/v1/user/salary/' +
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
              last_salary: this.state.LastSaldo,
              current_salary: this.state.FirstSaldo,
            }),
          },
        )
          .then((response) => response.json())
          .then(() => {
            this.setState({ showLoading: false, isValidLastSaldo: true });
          })
          .catch((error) => {
            console.error(error);
            Alert.alert('server error');
          });
        break;
      case 'dateInicio':
        if (this.state.date.length == 8) {
          let tmp = `01/${this.state.date}`;
          let date1 = moment(tmp);
          if (!date1.isValid()) {
            alert('data inválida');
            return;
          }
          this.setState({
            isValidInicio: true,
          });
        }
        break;
      case 'dateConcluido':
        if (this.state.dateConcluido.length == 8) {
          let tmp = `01/${this.state.dateConcluido}`;
          let date2 = moment(tmp);
          if (!date2.isValid()) {
            alert('data inválida');
            return;
          }
          let realDate = this.transformDate(this.state.date);
          let realDate2 = this.transformDate(this.state.dateConcluido);
          fetch('https://mobapivagas.jobconvo.com/v1/user/add/education/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Token ' + this.state.user_info.token.api_key,
            },
            body: JSON.stringify({
              level: this.state.itemNivel,
              title: this.state.Formation,
              school: this.state.Institution,
              status: this.state.status,
              start: realDate,
              end: realDate2,
            }),
          })
            .then((response) => response.json())
            .then(() => {
              this.setState({
                isValidConcluido: true,
              });
            })
            .catch((error) => {
              console.error(error);
              Alert.alert('server error');
            });
        }
        break;
      case 'hasWorking':
        if (value === false) {
          this.setState({ showLoading: true });
          fetch(
            'https://mobapivagas.jobconvo.com/v1/user/resume/exp/' +
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
                unemployed: false,
              }),
            },
          )
            .then((response) => response.json())
            .then(() => {
              this.setState({ showLoading: false, hasWorking: value });
            })
            .catch((error) => {
              console.error(error);
              Alert.alert('server error');
            });
        } else {
          this.setState({ hasWorking: value });
        }
        break;
      default:
        break;
    }
  };

  changValue(state) {
    this.setState(
      {
        subarea: null,
        item1: null,
        item2: null,
        item3: null,
        item4: null,
        item5: null,
        item6: null,
        item7: null,
        item8: null,
        item9: null,
        item10: null,
        item11: null,
        item12: null,
        ...state,
      },
      () => {
        if (state.isValidNivel) {
          this.setState({
            isValidNivel: true,
          });
        }
        if (state.isValidStatus) {
          this.setState({
            isValidStatus: true,
          });
        }
      },
    );
  }

  clickOkJob = () => {
    if (this.state.subarea == null) {
      return;
    }
    this.setState({ showLoading: true });
    fetch('https://mobapivagas.jobconvo.com/v1/user/add/area/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + this.state.user_info.token.api_key,
      },
      body: JSON.stringify({
        area: this.state.subarea,
      }),
    });
    this.setState({
      showLoading: false,
      modalVisible: !this.state.modalVisible,
      isValidJob: true,
    });
  };

  changeVisibility(state) {
    this.setState({
      isVisible1: false,
      isVisible2: false,
      isVisible3: false,
      isVisible4: false,
      isVisible5: false,
      isVisible6: false,
      isVisible7: false,
      isVisible8: false,
      isVisible9: false,
      isVisible10: false,
      isVisible11: false,
      isVisible12: false,
      ...state,
    });
  }

  inputWithKeyBoard = (
    timer = 750,
    changeState,
    submitEditing,
    placeholder,
    editable,
    placeholderTextColor = '#aaaaaa',
    autoCapitalize = 'sentences',
    returnKeyType = 'next',
    keyboardType = 'default',
    isPassword = false,
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
            keyboardType={keyboardType}
            editable={!editable}
            secureTextEntry={isPassword ? true : false}
          />
        </FadeInView>
      </KeyboardAvoidingView>
    );
  };

  buttonInChat = (time = 750, onPress, text) => {
    return (
      <FadeInView duration={time} style={styles.chatboxStyle}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={onPress}>
          <Text style={styles.buttonTextStyle}>{text}</Text>
        </TouchableOpacity>
      </FadeInView>
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

  buttonsIn = (
    caseTrue,
    caseFalse,
    timer = 750,
    textOk = 'SIM',
    textNo = 'NÃO',
    styleY = styles.YbuttonStyleTwo,
    styleN = styles.NbuttonStyleTwo,
    inputStyle = styles.InputBoxStyle,
  ) => {
    return (
      <View style={inputStyle}>
        <FadeInView
          duration={timer}
          style={(styles.InputBoxStyle, { flexDirection: 'row' })}>
          <TouchableOpacity
            style={styleY}
            activeOpacity={0.5}
            onPress={caseTrue}>
            <Text style={styles.blueButtonTextStyle}>{textOk}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styleN}
            activeOpacity={0.5}
            onPress={caseFalse}>
            <Text style={styles.WhiteButtonTextStyle}>{textNo}</Text>
          </TouchableOpacity>
        </FadeInView>
      </View>
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
          this.scrollView.scrollToEnd({ animated: true })
        }>
        <StatusBar backgroundColor="#6948F4" barStyle="default" />
        <Loader loading={this.state.showLoading} />
        <TouchableWithoutFeedback>
          <View style={{ padding: 20 }}>
            {this.renderChatBox('Olá, muito bem vindo!', 500, true)}
            {this.renderChatBox(
              'Sou o Pesquisa Vagas e estou aqui para ajuda-lo a conseguir um novo trabalho. Vamos lá?',
              2500,
            )}
            {this.renderChatBox(
              'Muito bem, que tal começar se apresentando?',
              3800,
            )}
            {this.renderChatBox('Como você se chama?', 4900)}
            {this.inputWithKeyBoard(
              6500,
              (val) => this.setState({ UserName: val }),
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
                (val) => this.setState({ Password: val }),
                () => this.handleSubmitText('password'),
                '*******',
                this.state.isValidPassword,
                '#aaaaaa',
                'sentences',
                'next',
                'default',
                true,
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
                '',
                this.state.isValidCpf,
              )
              : null}
            {this.state.isValidCpf
              ? this.renderChatBox('Você tem email?')
              : null}
            {this.state.isValidCpf && this.state.hasEmail == null
              ? this.buttonsIn(
                () => this.setState({ hasEmail: true }),
                () => this.setState({ hasEmail: false }),
              )
              : null}
            {this.state.hasEmail
              ? this.inputWithKeyBoard(
                1000,
                (val) => this.setState({ Email: val }),
                () => this.handleSubmitText('email'),
                'INSERIR EMAIL',
                this.state.isValidEmail,
              )
              : null}
            {this.state.hasEmail == false
              ? this.renderChatBox(
                'Eu não tenho email',
                1000,
                false,
                styles.answerboxStyle,
                styles.ChatContainerStyleAnswer,
                styles.ChatTextStyleAnswer,
              )
              : null}
            {this.state.hasEmail == false
              ? this.renderChatBox('Tudo bem, vamos continuar.', 2000)
              : null}
            {this.state.hasEmail == false || this.state.isValidEmail
              ? this.renderChatBox(
                'Legal. Seu cadastro foi realizado com sucesso!',
                2600,
              )
              : null}
            {this.state.hasEmail == false || this.state.isValidEmail
              ? this.renderChatBox(
                'Agora informe seu endereço para mostrarmos as vagas mais perto de você.',
                3200,
              )
              : null}
            {this.state.hasEmail == false || this.state.isValidEmail
              ? this.buttonInChat(
                4200,
                () => {
                  this.props.navigation.navigate('Endereco');
                  this.setState({ isValidCountry: true })
                },
                'CADASTRAR ENDEREÇO',
              )
              : null}
            {this.state.isValidCountry
              ? this.renderChatBox(
                'Agora me diga em que área você quer trabalhar?',
                1200,
              )
              : null}
            {this.state.isValidCountry
              ? this.buttonInChat(
                2000,
                () => this.setState({ modalVisible: !this.state.modalVisible }),
                'ESCOLHER AREA',
              )
              : null}
            {this.state.isValidJob
              ? this.renderChatBox('Ótima escolha!')
              : null}
            {this.state.isValidJob
              ? this.renderChatBox(
                'Se quiser adicionar outras áreas de interesse, é super fácil. Basta ir em sua página de perfil.',
                1500,
              )
              : null}
            {this.state.isValidJob
              ? this.renderChatBox(
                'Você têm experiência em ' + this.state.subarea + '?',
                2500,
              )
              : null}
            {this.state.isValidJob && this.state.hasExperience == null
              ? this.buttonsIn(
                () => this.handleSubmitText('hasExperience', true),
                () => this.handleSubmitText('hasExperience', false),
                3000,
              )
              : null}
            {this.state.hasExperience == true
              ? this.renderChatBox('QUANTOS ANOS DE EXPERIÊNCIA?')
              : null}
            {this.state.hasExperience
              ? this.inputWithKeyBoard(
                1200,
                (num) => this.setState({ YearsExp: num }),
                () => this.handleSubmitText('YearsExp'),
                'ANOS DE EXPERIÊNCIA',
                this.state.isValidExperience,
                '#aaaaaa',
                'sentences',
                'next',
                'phone-pad',
              )
              : null}
            {this.state.hasExperience && this.state.isValidExperience
              ? this.renderChatBox(
                'Me fale sobre seus trabalhos, atual e anteriores.',
              )
              : null}
            {this.state.hasExperience && this.state.isValidExperience
              ? this.inputWithKeyBoard(
                1200,
                (text) => this.setState({ InfoExp: text }),
                () => this.handleSubmitText('InfoExp'),
                'CADASTRAR EXPERIÊNCIA',
                this.state.isValidExperienceInfo,
              )
              : null}

            {this.state.hasExperience == false
              ? this.renderChatBox(
                'Eu não tenho experiência',
                1200,
                false,
                styles.answerboxStyle,
                styles.ChatContainerStyleAnswer,
                styles.ChatTextStyleAnswer,
              )
              : null}

            {this.state.hasExperience == false
              ? this.renderChatBox(
                'Tranquilo, temos vagas sem experência também',
                1600,
              )
              : null}

            {this.state.isValidExperienceInfo ||
              this.state.hasExperience == false
              ? this.renderChatBox(
                'Estamos quase acabando. Vou te mostrar vagas já já.',
                2100,
              )
              : null}

            {this.state.isValidExperienceInfo ||
              this.state.hasExperience == false
              ? this.renderChatBox(
                'Você está trabalhando neste momento ou está desempregado?',
                2400,
              )
              : null}

            {this.state.isValidExperienceInfo ||
              this.state.hasExperience == false
              ? this.buttonsIn(
                () => this.handleSubmitText('hasWorking', true),
                () => this.handleSubmitText('hasWorking', false),
                3000,
                'TRABALHANDO',
                'DESEMPREGADO',
                styles.YbuttonStyleThree,
                styles.NbuttonStyleThree,
                styles.InputBoxStyleTwo,
              )
              : null}

            {this.state.hasWorking != null
              ? this.renderChatBox('Entendi')
              : null}

            {this.state.hasWorking != null
              ? this.renderChatBox(
                'Me fale sobre sua formação acadêmica. Onde você estudou e qual o seu nível de instrução?',
                1500,
              )
              : null}

            {this.state.hasWorking != null
              ? this.buttonInChat(
                2400,
                () => { this.setState({ isValidNivel: true }) },
                'CADASTRAR EDUCAÇÃO',
              )
              : null}

            {this.state.isValidNivel ? (
              <KeyboardAvoidingView enabled>
                <FadeInView duration={1200} style={styles.InputBoxStylePicker}>
                  <Picker
                    selectedValue={this.state.itemStatus}
                    style={{
                      height: 40,
                      width: '100%',
                    }}
                    enabled={!this.state.isValidStatus}
                    onValueChange={(itemValue, itemIndex) => {
                      if (itemValue <= 3) {
                        this.changValue({
                          itemStatus: itemValue,
                          isValidStatus: true,
                          isValidInstitution: false
                        });
                      } else {
                        this.changValue({
                          itemStatus: itemValue,
                          isValidStatus: false,
                          isValidInstitution: true
                        });
                      }
                    }}>
                    {this.state.listStatus.map((el, index) => {
                      return (
                        <Picker.Item
                          key={el.label + index}
                          label={el.label}
                          value={el.value}
                        />
                      );
                    })}
                  </Picker>
                </FadeInView>
              </KeyboardAvoidingView>
            ) : null}

            {this.state.isValidInstitution
              ? this.inputWithKeyBoard(
                1200,
                (text) => this.setState({ Formation: text }),
                () => this.handleSubmitText('Formation'),
                'Formação',
                this.state.isValidFormation,
              )
              : null}

            {this.state.isValidFormation
              ? this.inputWithKeyBoard(
                1200,
                (text) => this.setState({ Institution: text }),
                () => this.handleSubmitText('Institution'),
                'Instituicao',
                this.state.isValidStatus,
              )
              : null}

            {this.state.isValidStatus == true
              ? this.renderChatBox('insira o Inicio', 750)
              : null}

            {this.state.isValidStatus == true ? (
              <KeyboardAvoidingView enabled>
                <FadeInView duration={1200} style={styles.InputBoxStyle}>
                  <TextMask
                    style={styles.inputStyle}
                    mask={"[00]/[0000]"}
                    keyboardType='numeric'
                    placeholder="10/1990"
                    value={this.state.date}
                    onChangeText={(text) => {
                      this.setState({
                        date: text,
                      });
                    }}
                    onSubmitEditing={() => this.handleSubmitText('dateInicio')}
                  />
                </FadeInView>
              </KeyboardAvoidingView>
            ) : null}

            {this.state.isValidInicio != null
              ? this.renderChatBox('Concluido', 750)
              : null}

            {this.state.isValidInicio != null ? (
              <KeyboardAvoidingView enabled>
                <FadeInView duration={1200} style={styles.InputBoxStyle}>
                  <TextMask
                    style={styles.inputStyle}
                    mask={"[00]/[0000]"}
                    keyboardType='numeric'
                    placeholder="10/1990"
                    value={this.state.dateConcluido}
                    onChangeText={(text) => {
                      this.setState({
                        dateConcluido: text,
                      });
                    }}
                    onSubmitEditing={() => this.handleSubmitText('dateConcluido')}
                  />
                </FadeInView>
              </KeyboardAvoidingView>
            ) : null}

            {this.state.isValidConcluido
              ? this.renderChatBox(
                'Legal. Para finalizar, me fale o seu último salário e sua pretensão salarial',
              )
              : null}

            {this.state.isValidConcluido
              ? this.inputWithKeyBoard(
                1200,
                (text) => this.setState({ FirstSaldo: text }),
                () => this.handleSubmitText('FirstSaldo'),
                'Salário anterior',
                this.state.isValidFirstSaldo,
                'R$ 99.999,99',
                'sentences',
                'next',
                'phone-pad',
              )
              : null}

            {this.state.isValidFirstSaldo
              ? this.inputWithKeyBoard(
                1200,
                (text) => this.setState({ LastSaldo: text }),
                () => this.handleSubmitText('LastSaldo'),
                'pretensão salarial',
                this.state.isValidLastSaldo,
                'R$ 99.999,99',
                'sentences',
                'next',
                'phone-pad',
              )
              : null}

            {this.state.isValidLastSaldo
              ? this.renderChatBox('Maravilha!')
              : null}

            {this.state.isValidLastSaldo
              ? this.renderChatBox(
                'Foi fácil certo! Agora vamos ver as vagas disponíveis mais perto de você. Boa sorte!',
                1500,
              )
              : null}

            {this.state.isValidLastSaldo ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'stretch',
                }}>
                <View
                  style={{
                    backgroundColor: '#6948F4',
                    alignItems: 'center',
                    padding: 20,
                  }}>
                  <TouchableHighlight
                    onPress={() => {
                      this.sendToApp();
                    }}>
                    <Text style={{ color: '#FFFFFF' }}>VER VAGAS</Text>
                  </TouchableHighlight>
                </View>
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {

          }}>
          <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
            <StatusBar backgroundColor="#6948F4" barStyle="default" />
            <ScrollView>
              <View style={{ flex: 5, justifyContent: 'flex-start' }}>
                <Text style={styles.LabelStyle}>
                  Escolha a área que mais lhe interessar.
                </Text>
                <Text style={styles.LabelStyles}>
                  Posteriormente vocé poderá adicionar mais áreas.
                </Text>
                <DropDownPicker
                  items={DropdownItems.items1}
                  defaultValue={this.state.item1}
                  containerStyle={{ height: 40 }}
                  isVisible={this.state.isVisible1}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisible1: true,
                      isOneDropdownActive: true,
                    })
                  }
                  zIndex={15}
                  onClose={() =>
                    this.setState({
                      isVisible1: false,
                      isOneDropdownActive: false,
                    })
                  }
                  onChangeItem={(item) =>
                    this.changValue({
                      item1: item.value,
                      subarea: item.value,
                    })
                  }
                  placeholder={DropdownItems.mainarea[0].title}
                  labelStyle={styles.dLabelStyle}
                  itemStyle={styles.dItemStyle}
                  placeholderStyle={styles.dPlaceholderStyle}
                  dropDownStyle={styles.dStyle}
                />
                <DropDownPicker
                  items={DropdownItems.items2}
                  defaultValue={this.state.item2}
                  containerStyle={{ height: 40 }}
                  isVisible={this.state.isVisible2}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisible2: true,
                      isOneDropdownActive: true,
                    })
                  }
                  zIndex={14}
                  onClose={() =>
                    this.setState({
                      isVisible2: false,
                      isOneDropdownActive: false,
                    })
                  }
                  onChangeItem={(item) =>
                    this.changValue({
                      item2: item.value,
                      subarea: item.value,
                    })
                  }
                  placeholder={DropdownItems.mainarea[1].title}
                  labelStyle={styles.dLabelStyle}
                  itemStyle={styles.dItemStyle}
                  placeholderStyle={styles.dPlaceholderStyle}
                  dropDownStyle={styles.dStyle}
                />
                <DropDownPicker
                  items={DropdownItems.items3}
                  defaultValue={this.state.item3}
                  containerStyle={{ height: 40 }}
                  isVisible={this.state.isVisible3}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisible3: true,
                      isOneDropdownActive: true,
                    })
                  }
                  zIndex={13}
                  onClose={() =>
                    this.setState({
                      isVisible3: false,
                      isOneDropdownActive: false,
                    })
                  }
                  onChangeItem={(item) =>
                    this.changValue({
                      item3: item.value,
                      subarea: item.value,
                    })
                  }
                  placeholder={DropdownItems.mainarea[2].title}
                  labelStyle={styles.dLabelStyle}
                  itemStyle={styles.dItemStyle}
                  placeholderStyle={styles.dPlaceholderStyle}
                  dropDownStyle={styles.dStyle}
                />
                <DropDownPicker
                  items={DropdownItems.items4}
                  defaultValue={this.state.item4}
                  containerStyle={{ height: 40 }}
                  zIndex={12}
                  isVisible={this.state.isVisible4}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisible4: true,
                      isOneDropdownActive: true,
                    })
                  }
                  onClose={() =>
                    this.setState({
                      isVisible4: false,
                      isOneDropdownActive: false,
                    })
                  }
                  onChangeItem={(item) =>
                    this.changValue({
                      item4: item.value,
                      subarea: item.value,
                    })
                  }
                  placeholder={DropdownItems.mainarea[3].title}
                  labelStyle={styles.dLabelStyle}
                  itemStyle={styles.dItemStyle}
                  placeholderStyle={styles.dPlaceholderStyle}
                  dropDownStyle={styles.dStyle}
                />
                <DropDownPicker
                  items={DropdownItems.items5}
                  zIndex={11}
                  defaultValue={this.state.item5}
                  containerStyle={{ height: 40 }}
                  isVisible={this.state.isVisible5}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisible5: true,
                      isOneDropdownActive: true,
                    })
                  }
                  onClose={() =>
                    this.setState({
                      isVisible5: false,
                      isOneDropdownActive: false,
                    })
                  }
                  onChangeItem={(item) =>
                    this.changValue({
                      item5: item.value,
                      subarea: item.value,
                    })
                  }
                  placeholder={DropdownItems.mainarea[4].title}
                  labelStyle={styles.dLabelStyle}
                  itemStyle={styles.dItemStyle}
                  placeholderStyle={styles.dPlaceholderStyle}
                  dropDownStyle={styles.dStyle}
                />
                <DropDownPicker
                  zIndex={10}
                  items={DropdownItems.items6}
                  defaultValue={this.state.item6}
                  containerStyle={{ height: 40 }}
                  isVisible={this.state.isVisible6}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisible6: true,
                      isOneDropdownActive: true,
                    })
                  }
                  onClose={() =>
                    this.setState({
                      isVisible6: false,
                      isOneDropdownActive: false,
                    })
                  }
                  onChangeItem={(item) =>
                    this.changValue({
                      item6: item.value,
                      subarea: item.value,
                    })
                  }
                  placeholder={DropdownItems.mainarea[5].title}
                  labelStyle={styles.dLabelStyle}
                  itemStyle={styles.dItemStyle}
                  placeholderStyle={styles.dPlaceholderStyle}
                  dropDownStyle={styles.dStyle}
                />
                <DropDownPicker
                  zIndex={9}
                  items={DropdownItems.items7}
                  defaultValue={this.state.item7}
                  containerStyle={{ height: 40 }}
                  isVisible={this.state.isVisible7}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisible7: true,
                      isOneDropdownActive: true,
                    })
                  }
                  onClose={() =>
                    this.setState({
                      isVisible7: false,
                      isOneDropdownActive: false,
                    })
                  }
                  onChangeItem={(item) =>
                    this.changValue({
                      item7: item.value,
                      subarea: item.value,
                    })
                  }
                  placeholder={DropdownItems.mainarea[6].title}
                  labelStyle={styles.dLabelStyle}
                  itemStyle={styles.dItemStyle}
                  placeholderStyle={styles.dPlaceholderStyle}
                  dropDownStyle={styles.dStyle}
                />
                <DropDownPicker
                  zIndex={8}
                  items={DropdownItems.items8}
                  defaultValue={this.state.item8}
                  containerStyle={{ height: 40 }}
                  isVisible={this.state.isVisible8}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisible8: true,
                      isOneDropdownActive: true,
                    })
                  }
                  onClose={() =>
                    this.setState({
                      isVisible8: false,
                      isOneDropdownActive: false,
                    })
                  }
                  onChangeItem={(item) =>
                    this.changValue({
                      item8: item.value,
                      subarea: item.value,
                    })
                  }
                  placeholder={DropdownItems.mainarea[7].title}
                  labelStyle={styles.dLabelStyle}
                  itemStyle={styles.dItemStyle}
                  placeholderStyle={styles.dPlaceholderStyle}
                  dropDownStyle={styles.dStyle}
                />
                <DropDownPicker
                  zIndex={7}
                  items={DropdownItems.items9}
                  defaultValue={this.state.item9}
                  containerStyle={{ height: 40 }}
                  isVisible={this.state.isVisible9}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisible9: true,
                      isOneDropdownActive: true,
                    })
                  }
                  onClose={() =>
                    this.setState({
                      isVisible9: false,
                      isOneDropdownActive: false,
                    })
                  }
                  onChangeItem={(item) =>
                    this.changValue({
                      item9: item.value,
                      subarea: item.value,
                    })
                  }
                  placeholder={DropdownItems.mainarea[8].title}
                  labelStyle={styles.dLabelStyle}
                  itemStyle={styles.dItemStyle}
                  placeholderStyle={styles.dPlaceholderStyle}
                  dropDownStyle={styles.dStyle}
                />
                <DropDownPicker
                  zIndex={6}
                  items={DropdownItems.items10}
                  defaultValue={this.state.item10}
                  containerStyle={{ height: 40 }}
                  isVisible={this.state.isVisible10}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisible10: true,
                      isOneDropdownActive: true,
                    })
                  }
                  onClose={() =>
                    this.setState({
                      isVisible10: false,
                      isOneDropdownActive: false,
                    })
                  }
                  onChangeItem={(item) =>
                    this.changValue({
                      item10: item.value,
                      subarea: item.value,
                    })
                  }
                  placeholder={DropdownItems.mainarea[9].title}
                  labelStyle={styles.dLabelStyle}
                  itemStyle={styles.dItemStyle}
                  placeholderStyle={styles.dPlaceholderStyle}
                  dropDownStyle={styles.dStyle}
                />
                <DropDownPicker
                  zIndex={5}
                  items={DropdownItems.items11}
                  defaultValue={this.state.item11}
                  containerStyle={{ height: 40 }}
                  isVisible={this.state.isVisible11}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisible11: true,
                      isOneDropdownActive: true,
                    })
                  }
                  onClose={() =>
                    this.setState({
                      isVisible11: false,
                      isOneDropdownActive: false,
                    })
                  }
                  onChangeItem={(item) =>
                    this.changValue({
                      item11: item.value,
                      subarea: item.value,
                    })
                  }
                  placeholder={DropdownItems.mainarea[10].title}
                  labelStyle={styles.dLabelStyle}
                  itemStyle={styles.dItemStyle}
                  placeholderStyle={styles.dPlaceholderStyle}
                  dropDownStyle={styles.dStyle}
                />
                <DropDownPicker
                  zIndex={4}
                  items={DropdownItems.items12}
                  defaultValue={this.state.item12}
                  containerStyle={{ height: 40 }}
                  isVisible={this.state.isVisible12}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisible12: true,
                      isOneDropdownActive: true,
                    })
                  }
                  onClose={() =>
                    this.setState({
                      isVisible12: false,
                      isOneDropdownActive: false,
                    })
                  }
                  onChangeItem={(item) =>
                    this.changValue({
                      item12: item.value,
                      subarea: item.value,
                    })
                  }
                  placeholder={DropdownItems.mainarea[11].title}
                  labelStyle={styles.dLabelStyle}
                  itemStyle={styles.dItemStyle}
                  placeholderStyle={styles.dPlaceholderStyle}
                  dropDownStyle={styles.dStyle}
                />
              </View>
              {this.state.isOneDropdownActive ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'stretch',
                    paddingTop: 260,
                  }}
                />
              ) : null}
              {!this.state.isOneDropdownActive ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'stretch',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#6948F4',
                      alignItems: 'center',
                      padding: 20,
                    }}>
                    <TouchableHighlight
                      onPress={() => {
                        this.clickOkJob();
                      }}>
                      <Text style={{ color: '#FFFFFF' }}>Confirmar</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              ) : null}
            </ScrollView>
          </SafeAreaView>
        </Modal>
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
  YbuttonStyleThree: {
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
  NbuttonStyleThree: {
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
  ChatContainerStyleAnswer: {
    backgroundColor: '#6948F4',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  ChatTextStyle: {
    fontSize: 18,
    color: '#000000',
  },
  ChatTextStyleAnswer: {
    fontSize: 18,
    color: '#ffffff',
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
  InputBoxStylePicker: {
    borderColor: '#6948F4',
    borderWidth: 1,
    borderRadius: 5,
    width: '70%',
    marginBottom: 15,
    alignSelf: 'flex-end',
    height: 40,
  },
  InputBoxStyleTwo: {
    marginBottom: 15,
    alignSelf: 'center',
    height: 40,
  },
  inputStyle: {
    color: '#000000',
    paddingLeft: 10,
    paddingTop: 0,
    height: 35,
    paddingBottom: 0,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#6948F4',
  },
  buttonStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    color: '#6948F4',
    borderColor: '#6948F4',
    height: 40,
    alignItems: 'center',
    borderRadius: 25,
    marginLeft: 25,
    marginRight: 25,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: '#6948F4',
    paddingVertical: 8,
    fontWeight: 'bold',
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
  LabelStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  LabelStyles: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
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
