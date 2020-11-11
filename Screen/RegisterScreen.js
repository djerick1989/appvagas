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
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Loader from '../Components/Loader';
import FadeInView from 'react-native-fade-in-view';
import DropDownPicker from 'react-native-dropdown-picker';
import MapView, {Marker, Callout} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import Geolocation from '@react-native-community/geolocation';
import LocationIQ from 'react-native-locationiq';
import {TextInputMask} from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import {WebView} from 'react-native-webview';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const DropdownItems = [
  [
    {label: 'Assistente Administrativo', value: 'Assistente Administrativo'},
    {label: 'Escrituário', value: 'Escrituário'},
    {label: 'Office Boy', value: 'Office Boy'},
    {label: 'Recepcionista', value: 'Recepcionista'},
    {label: 'Secretária', value: 'Secretária'},
  ],
  [
    {label: 'Carpiteiro', value: 'Carpiteiro'},
    {label: 'Eletricista', value: 'Eletricista'},
    {label: 'Encanador', value: 'Encanador'},
    {label: 'Pedreiro', value: 'Pedreiro'},
    {label: 'Pintor', value: 'Pintor'},
  ],
  [
    {label: 'Banhista', value: 'Banhista'},
    {label: 'Tosador', value: 'Tosador'},
  ],
  [
    {label: 'Auxiliar de Produção', value: 'Auxiliar de Produção'},
    {label: 'Caldeireiro', value: 'Caldeireiro'},
    {label: 'Ferramenteiro', value: 'Ferramenteiro'},
    {label: 'Fresador', value: 'Fresador'},
    {label: 'Funileiro', value: 'Funileiro'},
    {label: 'Mecanico Industrial', value: 'Mecanico Industrial'},
    {label: 'Operador de Máquinas', value: 'Operador de Máquinas'},
    {label: 'Serralheiro', value: 'Serralheiro'},
    {label: 'Soldador', value: 'Soldador'},
    {label: 'Torneiro', value: 'Torneiro'},
  ],
  [
    {label: 'Auxiliar de Limpeza', value: 'Auxiliar de Limpeza'},
    {label: 'Doméstica', value: 'Doméstica'},
    {label: 'Faxineiro', value: 'Faxineiro'},
    {label: 'Lavador de Auto', value: 'Lavador de Auto'},
    {label: 'Limpador de Vidros', value: 'Limpador de Vidros'},
    {label: 'Operador de Varredeira', value: 'Operador de Varredeira'},
    {label: 'Supervisor de Limpeza', value: 'Supervisor de Limpeza'},
  ],
  [
    {label: 'Ajudante de Cozinha', value: 'Ajudante de Cozinha'},
    {label: 'Atendente', value: 'Atendente'},
    {label: 'Auxiliar de Garçom', value: 'Auxiliar de Garçom'},
    {label: 'Barista', value: 'Barista'},
    {label: 'Barman', value: 'Barman'},
    {label: 'Cozinheiro', value: 'Cozinheiro'},
    {label: 'Garçom', value: 'Garçom'},
    {label: 'Masseiro', value: 'Masseiro'},
    {label: 'Pizzaiolo', value: 'Pizzaiolo'},
    {label: 'Sushiman', value: 'Sushiman'},
  ],
  [
    {label: 'Assistente Administrativo', value: 'Assistente Administrativo'},
    {label: 'Atendente de Farmácia', value: 'Atendente de Farmácia'},
    {label: 'Auxiliar Hospitalar', value: 'Auxiliar Hospitalar'},
    {label: 'Auxiliar de Enfermagem', value: 'Auxiliar de Enfermagem'},
    {
      label: 'Auxiliar de Limpeza Hospitalar',
      value: 'Auxiliar de Limpeza Hospitalar',
    },
    {label: 'Estoquista Hospitalar', value: 'Estoquista Hospitalar'},
    {label: 'Farmaceutico', value: 'Farmaceutico'},
    {label: 'Recepcionista Hospitalar', value: 'Recepcionista Hospitalar'},
    {
      label: 'Técnico de Análises Clínicas',
      value: 'Técnico de Análises Clínicas',
    },
    {label: 'Técnico de Coleta', value: 'Técnico de Coleta'},
    {label: 'Técnico de Enfermagem', value: 'Técnico de Enfermagem'},
    {
      label: 'Técnico de Patologia Clínica',
      value: 'Técnico de Patologia Clínica',
    },
  ],
  [
    {label: 'Aux. Tec. Em Telecom', value: 'Aux. Tec. Em Telecom'},
    {label: 'Auxiliar de Manutenção', value: 'Auxiliar de Manutenção'},
    {
      label: 'Auxiliar de Serviços Gerais',
      value: 'Auxiliar de Serviços Gerais',
    },
    {label: 'Bombeiro', value: 'Bombeiro'},
    {label: 'Copeira', value: 'Copeira'},
    {label: 'Frentista', value: 'Frentista'},
    {label: 'Jardineiro', value: 'Jardineiro'},
    {label: 'Limpador de Piscina', value: 'Limpador de Piscina'},
    {label: 'Porteiro', value: 'Porteiro'},
    {label: 'Segurança', value: 'Segurança'},
    {label: 'Vigilante', value: 'Vigilante'},
    {label: 'Zelador', value: 'Zelador'},
  ],
  [
    {label: 'Analista de Help Desk', value: 'Analista de Help Desk'},
    {label: 'Operador de Call Center', value: 'Operador de Call Center'},
    {
      label: 'Operador de Call Center Ativo',
      value: 'Operador de Call Center Ativo',
    },
    {
      label: 'Operador de Call Center Receptivo',
      value: 'Operador de Call Center Receptivo',
    },
    {label: 'Operador de Cobrança', value: 'Operador de Cobrança'},
  ],
  [
    {label: 'Ajudante de Entrega', value: 'Ajudante de Entrega'},
    {label: 'Auxiliar de Logística', value: 'Auxiliar de Logística'},
    {label: 'Auxiliar de Motorista', value: 'Auxiliar de Motorista'},
    {label: 'Manobrista', value: 'Manobrista'},
    {label: 'Motoboy', value: 'Motoboy'},
    {label: 'Motorista Entregador', value: 'Motorista Entregador'},
    {
      label: 'Operador de Estacionamento',
      value: 'Operador de Estacionamento',
    },
    {label: 'Tratorista', value: 'Tratorista'},
  ],
  [
    {label: 'Ajudante de Padeiro', value: 'Ajudante de Padeiro'},
    {label: 'Atendente de Loja', value: 'Atendente de Loja'},
    {label: 'Açougueiro', value: 'Açougueiro'},
    {label: 'Balconista', value: 'Balconista'},
    {label: 'Cartazista', value: 'Cartazista'},
    {label: 'Confeiteiro', value: 'Confeiteiro'},
    {label: 'Conferente', value: 'Conferente'},
    {label: 'Especialista em Frios', value: 'Especialista em Frios'},
    {label: 'Especialista em Queijos', value: 'Especialista em Queijos'},
    {label: 'Estoquista', value: 'Estoquista'},
    {label: 'Feirante', value: 'Feirante'},
    {label: 'Fiscal de Loja', value: 'Fiscal de Loja'},
    {label: 'Operador de Caixa', value: 'Operador de Caixa'},
    {label: 'Padeiro', value: 'Padeiro'},
    {label: 'Peixeiro', value: 'Peixeiro'},
    {label: 'Repositor', value: 'Repositor'},
    {label: 'Shopper', value: 'Shopper'},
    {label: 'Visual Merchandising', value: 'Visual Merchandising'},
  ],
  [
    {label: 'Assistente Comercial', value: 'Assistente Comercial'},
    {label: 'Atendente de Loja', value: 'Atendente de Loja'},
    {label: 'Balconista', value: 'Balconista'},
    {label: 'Corretor de Imóveis', value: 'Corretor de Imóveis'},
    {label: 'Promotor de Vendas', value: 'Promotor de Vendas'},
    {label: 'Vendedor', value: 'Vendedor'},
    {label: 'Vendedor Externo', value: 'Vendedor Externo'},
  ],
];
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
      showLoading: false,
      isValidJob: false,
      // TODO just testing
      modalVisible: true,
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
      user_info: null,
      item1: [],
      item2: [],
      item3: [],
      item4: [],
      item5: [],
      item6: [],
      item7: [],
      item8: [],
      item9: [],
      item10: [],
      item11: [],
      item12: [],
      collectionItems: '',
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

  handleSubmitText = (keyToSearch) => {
    switch (keyToSearch) {
      case 'userName':
        //bypass
        this.setState({isCorrectUser: true});

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
        //bypass
        this.setState({isValidPhone: true});
        if (this.state.PhonNumber.length === 11) {
          this.setState({isValidPhone: true});
        }
        break;
      case 'password':
        //bypass
        this.setState({isValidPassword: true});

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
        //bypass
        this.setState({isValidCpf: true});
        if (!this.state.CPF) {
          return;
        }

        this.setState({showLoading: true});
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
            this.setState({showLoading: false});
            if (responseJson.user) {
              this.setState({isValidCpf: true});
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
          this.setState({isValidEmail: true});
        }
        break;
      case 'Cep':
        this.setState({isValidCep: true});
        break;
      case 'Address':
        this.setState({isValidAddress: true});
        break;
      case 'Neiboughood':
        this.setState({isValidNeiboughood: true});
        break;
      case 'City':
        this.setState({isValidCity: true});
        break;
      case 'State':
        this.setState({isValidState: true});
        break;
      case 'Country':
        //bypass
        this.setState({isValidCountry: true});
        return;

        this.setState({showLoading: true});
        fetch('https://mobapivagas.jobconvo.com/v1/user/profile/1/update/', {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Token ' + this.state.user_info.token.api_key,
          },
          body: JSON.stringify({
            cpf: this.state.CPF,
            user: this.state.user_info.id,
            photo: '',
            email2: null,
            born_sex: null,
            birthday: null,
            country_code: 'Brasil',
            area_code: '11',
            phone1: this.state.PhonNumber,
            phone2: null,
            address: this.state.Address,
            adddressnumber: null,
            complement: null,
            neighbourhood: this.state.Neiboughood,
            state: this.state.State,
            city: this.state.City,
            country: this.state.Country,
            zipcode: this.state.Zipcode,
            latitude: null,
            longitude: null,
            social_status: null,
            user_language: 'pt-br',
            last_access: null,
          }),
        })
          .then((response) => response.json())
          .then(() => {
            this.setState({showLoading: false, isValidCountry: true});
          })
          .catch((error) => {
            console.error(error);
            Alert.alert('server error');
          });
        break;
      default:
        break;
    }
  };

  clickOkJob = () => {
    this.setState({showLoading: true});
    for (let index = 1; index <= 12; index++) {
      this.state['item' + index].forEach((element) => {
        this.setState({
          collectionItems: this.state.collectionItems + ' ' + element,
        });
        fetch('https://mobapivagas.jobconvo.com/v1/user/add/area/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: 'Token ' + this.state.user_info.token.api_key,
          },
          body: JSON.stringify({
            area: element,
          }),
        });
      });
    }
    this.setState({
      modalVisible: !this.state.modalVisible,
      isValidJob: true,
      showLoading: false,
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

  buttonsIn = (caseTrue, caseFalse) => {
    return (
      <View style={styles.InputBoxStyle}>
        <FadeInView
          duration={750}
          style={(styles.InputBoxStyle, {flexDirection: 'row'})}>
          <TouchableOpacity
            style={styles.YbuttonStyleTwo}
            activeOpacity={0.5}
            onPress={caseTrue}>
            <Text style={styles.blueButtonTextStyle}>SIM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NbuttonStyleTwo}
            activeOpacity={0.5}
            onPress={caseFalse}>
            <Text style={styles.WhiteButtonTextStyle}>NÃO</Text>
          </TouchableOpacity>
        </FadeInView>
      </View>
    );
  };

  render() {
    const mainarea = [
      {title: 'Administrativo'},
      {title: 'Construção'},
      {title: 'Cuidado de Animais'},
      {title: 'Industrial'},
      {title: 'Limpeza'},
      {title: 'Restaurante'},
      {title: 'Saúde'},
      {title: 'Serviços Gerais'},
      {title: 'Telemarketing'},
      {title: 'Transporte'},
      {title: 'Varejo'},
      {title: 'Vendas'},
    ];
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
                  '',
                  this.state.isValidCpf,
                )
              : null}

            {this.state.isValidCpf
              ? this.renderChatBox('Você tem email?')
              : null}
            {this.state.isValidCpf && this.state.hasEmail == null
              ? this.buttonsIn(
                  () => this.setState({hasEmail: true}),
                  () => this.setState({hasEmail: false}),
                )
              : null}

            {this.state.hasEmail
              ? this.inputWithKeyBoard(
                  1000,
                  (val) => this.setState({Email: val}),
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
                  () => this.setState({hasClickAdress: true}),
                  'CADASTRAR ENDEREÇO',
                )
              : null}

            {this.state.hasClickAdress
              ? this.inputWithKeyBoard(
                  1000,
                  (val) => this.setState({Cep: val}),
                  () => this.handleSubmitText('Cep'),
                  'CEP',
                  this.state.isValidCep,
                )
              : null}

            {this.state.isValidCep
              ? this.inputWithKeyBoard(
                  1000,
                  (val) => this.setState({Address: val}),
                  () => this.handleSubmitText('Address'),
                  'Endereço',
                  this.state.isValidAddress,
                )
              : null}

            {this.state.isValidAddress
              ? this.inputWithKeyBoard(
                  1000,
                  (val) => this.setState({Neiboughood: val}),
                  () => this.handleSubmitText('Neiboughood'),
                  'Bairro',
                  this.state.isValidNeiboughood,
                )
              : null}

            {this.state.isValidNeiboughood
              ? this.inputWithKeyBoard(
                  1000,
                  (val) => this.setState({City: val}),
                  () => this.handleSubmitText('City'),
                  'Cidade',
                  this.state.isValidCity,
                )
              : null}

            {this.state.isValidCity
              ? this.inputWithKeyBoard(
                  1000,
                  (val) => this.setState({State: val}),
                  () => this.handleSubmitText('State'),
                  'Estado',
                  this.state.isValidState,
                )
              : null}

            {this.state.isValidState
              ? this.inputWithKeyBoard(
                  1000,
                  (val) => this.setState({Country: val}),
                  () => this.handleSubmitText('Country'),
                  'País',
                  this.state.isValidCountry,
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
                  () => this.setState({modalVisible: !this.state.modalVisible}),
                  'ESCOLHER AREA',
                )
              : null}

            {this.state.isValidJob
              ? this.renderChatBox('Ótima escolha!')
              : null}
            {this.state.isValidJob
              ? this.renderChatBox(
                  'Se quiser adicionar outras áreas de interesse, é super fácil. Basta ir em sua página de perfil.',
                )
              : null}

            {/* {this.renderChatBox('Como você se chama?', 4500, false, styles.answerboxStyle)} */}
          </View>
        </TouchableWithoutFeedback>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
            <View style={{flex: 5, justifyContent: 'flex-start'}}>
              {DropdownItems.map((element, index) => {
                return (
                  <DropDownPicker
                    items={element}
                    multiple={true}
                    defaultValue={this.state['item' + (index + 1)]}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#fafafa'}}
                    isVisible={this.state['isVisible' + (index + 1)]}
                    onOpen={() =>
                      this.changeVisibility({
                        ['isVisible' + (index + 1)]: true,
                      })
                    }
                    onClose={() =>
                      this.setState({
                        ['isVisible' + (index + 1)]: false,
                      })
                    }
                    zIndex={15 - index}
                    multipleText={
                      mainarea[index].title + ' - %d área selecionada'
                    }
                    placeholder={mainarea[index].title}
                    labelStyle={styles.dLabelStyle}
                    itemStyle={styles.dItemStyle}
                    placeholderStyle={styles.dPlaceholderStyle}
                    dropDownStyle={styles.dStyle}
                    onChangeItem={(item) => {
                      this.setState({
                        ['isVisible' + (index + 1)]: false,
                      });
                      this.setState({
                        ['item' + (index + 1)]: item,
                      });
                    }}
                  />
                );
              })}
            </View>
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
                  <Text style={{color: '#FFFFFF'}}>Confirmar</Text>
                </TouchableHighlight>
              </View>
            </View>
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
