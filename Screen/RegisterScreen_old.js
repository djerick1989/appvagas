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
      showIndicator: false,
      UserName: '',
      FirstName: '',
      LastName: '',
      PhonNumber: '',
      Password: '',
      isregistered: false,
      CPF: '',
      Email: '',
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

  DropdownItems = [
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
      {label: 'Operador de Estacionamento', value: 'Operador de Estacionamento'},
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
  

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 0.8,
          longitudeDelta: 0.00421 * 0.5,
        };
        this.onRegionChange(region, region.latitude, region.longitude);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  onRegionChange(region, lat, lon) {
    this.setState({
      mapRegion: region,

      x: {latitude: lat, longitude: lon},
    });
  }

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

  changValue(state) {
    this.setState({
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
    });
  }

  ConfirmLocation(state) {
    this.setState(
      {
        modalVisible_l: !this.state.modalVisible_l,
        confirm_location: true,
        ...state,
      },
      function () {
        this.handleSubmitButton();
      },
    );
  }

  renderImage(key) {
    if (key != 1) {
      return null;
    }
    return (
      <Image
        style={{width: 25, height: 25, resizeMode: 'contain', marginTop: 10}}
        source={require('../Image/smile.png')}
      />
    );
  }

  renderChatBox(key, item) {
    return (
      <View style={styles.chatboxStyle}>
        <FadeInView
          duration={750}
          style={styles.ChatContainerStyle}
          onFadeComplete={() => this.setState({RenderTextState: key})}>
          <Text style={styles.ChatTextStyle}>{item}</Text>
          {this.renderImage(key)}
        </FadeInView>
      </View>
    );
  }

  renderAnswerBox(key, item) {
    return (
      <View style={styles.answerboxStyle}>
        <FadeInView
          duration={750}
          style={styles.ChatContainerStyle}
          onFadeComplete={() => this.setState({RenderTextState: key})}>
          <Text style={styles.ChatTextStyle}>{item}</Text>
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

  handleSubmitButton() {
    if (this.state.UserName == '') {
      return;
    }

    if (this.state.RenderTextState < 5) {
      this.setState({RenderTextState: 5});
    }

    if (this.state.UserName.indexOf(' ') > 0) {
      const firstSpace = this.state.UserName.indexOf(' ');
      const length = this.state.UserName.length;
      this.setState(
        {FirstName: this.state.UserName.substring(0, firstSpace)},
        function () {},
      );
      this.setState(
        {LastName: this.state.UserName.substring(firstSpace + 1, length)},
        function () {},
      );
    }

    if (!this.state.PhonNumber) {
      return;
    }

    console.log(
      'PhonNumber: ' +
        this.state.PhonNumber +
        ' lenght:' +
        this.state.PhonNumber.length,
    );

    if (this.state.PhonNumber.length != 11) {
      return;
    }

    if (this.state.RenderTextState < 8) {
      this.setState({RenderTextState: 8});
    }

    if (!this.state.Password) {
      return;
    }

    if (this.state.Password.length < 4) {
      return;
    }

    if (this.state.RegisterSuccess == '0' && this.state.RenderTextState == 9) {
      this.setState({showIndicator: true});
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
              .then((responseJson) => {
                this.setState({RenderTextState: 10});
                //Hide Loader
                this.setState({showIndicator: false});
                this.setState({isregistered: true});
                // If server response message same as Data Matched
                if (responseJson.token) {
                  this.setState({user_info: responseJson});
                  console.log(responseJson);
                }
              })
              .catch((error) => {
                //Hide Loader
                this.setState({showIndicator: false});
                console.error(error);
              });
          } else {
            this.setState({showIndicator: false});
            Alert.alert(responseJson.username[0]);
            return;
          }
          console.log('Registration Successful. Please Login to proceed');
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (this.state.CPF) {
      if (this.state.RenderTextState == 11) {
        this.setState({showIndicator: true});
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
            this.setState({showIndicator: false});
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
      }
    } else {
      return;
    }
    if (this.state.EmailYN == 'Y') {
      if (this.state.Email) {
        if (this.state.RenderTextState == 14) {
          this.setState({showIndicator: true});
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
            .then((responseJson) => {
              console.log(responseJson);
              this.setState({showIndicator: false});
              if (responseJson.email) {
                this.setState({RenderTextState: 16});
              } else {
                Alert.alert(responseJson.message);
                return;
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } else {
        Alert.alert('Valid Email!');
        return;
      }
    }

    if (this.state.confirm_location) {
      if (this.state.RenderTextState == 17) {
        this.setState({showIndicator: true});
        LocationIQ.init('5417ddeaa4502b');
        LocationIQ.reverse(this.state.x.latitude, this.state.x.longitude)
          .then((json) => {
            // var address = json.address;
            console.log(this.state.x);
            console.log(json.address);
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
                  country_code: json.address.country_code,
                  country: json.address.country,
                  state: json.address.state,
                  city: json.address.county,
                  zipcode: json.address.postcode,
                  addressnumber: json.address.house_number,
                  address: json.address.road,
                }),
              },
            )
              .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson);
                this.setState({showIndicator: false});
                if (responseJson.user) {
                  this.setState({RenderTextState: 18});
                } else {
                  Alert.alert(responseJson.message);
                  return;
                }
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => console.warn(error));
      }
    } else {
      return;
    }
    if (this.state.RenderTextState == 32) {
      this.setState({showIndicator: true});
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
            years_of_experience: this.state.Y_exp,
            range_of_experience: this.state.R_exp,
            unemployed: this.state.unemployed,
            career_objective: this.state.subarea,
          }),
        },
      )
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({showIndicator: false});
          console.log(responseJson);
          this.setState({RenderTextState: 33});
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  render() {
    const mapbox =
      this.state.x !== null &&
      `<script src='https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.css' rel='stylesheet' />
    <style>
            body {
                margin: 0;
                padding: 0;
            }
    
            #map {
                position: absolute;
                top: 0;
                bottom: 0;
                width: 100%;
            }
        </style>
    </head>
    <body>
    <style>
            .marker {
                display: block;
                border: none;
                cursor: pointer;
                padding: 0;
                width: 50px;
                height: 50px;
    
            }
    
            .coordinates {
                background: rgba(0, 0, 0, 0.7);
                color: #fff;
                position: absolute;
                bottom: 40px;
                left: 10px;
                padding: 5px 10px;
                margin: 0;
                font-size: 14px;
                line-height: 18px;
                border-radius: 3px;
                display: none;
            }
        </style>
    <div id="map"></div>
    <pre id="coordinates" class="coordinates"></pre>
    <script>
            //Add your LocationIQ Maps Access Token here (not the API token!)
            locationiqKey = '5417ddeaa4502b';
            
            var coordinates = document.getElementById('coordinates');
            
            //Define the map and configure the map's theme
            var map = new mapboxgl.Map({
                container: 'map',
                // center: ['${this.state.x.latitude}', '${
        this.state.x.longitude
      }'],
                // center: ['current_latitude', 'current_longitude'],
                center: ['-122.42', '37.779'],
                style: 'https://tiles.locationiq.com/v2/streets/vector.json?key='+locationiqKey,
                zoom: 15,
                
            });
                
            // First create DOM element for the marker
            var el = document.createElement('div');
            el.className = 'marker';
            el.id = 'marker';
            // Set marker properties using JS
            el.style.backgroundImage = url(${'../Image/marker.png'});
    
            var marker = new mapboxgl.Marker(el, {
                draggable: true
            }).setLngLat([-122.444733, 37.767443])
            .addTo(map);
    
            // After the mouse is released the following function is executed which updates the displayed lat and long
            function onDragEnd() {
                var lngLat = marker.getLngLat();
                coordinates.style.display = 'block';
                coordinates.innerHTML =
                    'Latitude: ' + lngLat.lat + '<br />Longitude: ' + lngLat.lng;
            }
    
            marker.on('dragend', onDragEnd);
        </script>
    </body>`;

    const input_name = (
      <KeyboardAvoidingView enabled>
        <FadeInView duration={750} style={styles.InputBoxStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(text) => this.setState({UserName: text})}
            onSubmitEditing={() => this.handleSubmitButton()}
            placeholder="NOME E SOBRENOME"
            placeholderTextColor="#aaaaaa"
            autoCapitalize="sentences"
            returnKeyType="next"
            blurOnSubmit={false}
            editable={this.state.RenderTextState > 5 ? false : true}
          />
        </FadeInView>
      </KeyboardAvoidingView>
    );
    const input_phoneNumber = (
      <KeyboardAvoidingView enabled>
        <FadeInView duration={750} style={styles.InputBoxStyle}>
          <TextInputMask
            style={styles.inputStyle}
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
            value={this.state.PhonNumber}
            onChangeText={(text) => {
              this.setState({
                PhonNumber: text.replace(/[^0-9]/g, ''),
              });
            }}
            onSubmitEditing={() => this.handleSubmitButton()}
            placeholder="(11) 98877 5566"
            placeholderTextColor="#aaaaaa"
            blurOnSubmit={false}
            editable={this.state.RenderTextState > 7 ? false : true}
            ref={(ref) => (this.phoneField = ref)}
          />
        </FadeInView>
      </KeyboardAvoidingView>
    );
    const input_password = (
      <KeyboardAvoidingView enabled>
        <FadeInView duration={750} style={styles.InputBoxStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(text) => this.setState({Password: text})}
            onSubmitEditing={() => this.handleSubmitButton()}
            placeholder="*******"
            placeholderTextColor="#aaaaaa"
            autoCapitalize="sentences"
            returnKeyType="next"
            blurOnSubmit={false}
            editable={this.state.RenderTextState > 10 ? false : true}
          />
        </FadeInView>
      </KeyboardAvoidingView>
    );
    const input_CPF = (
      <KeyboardAvoidingView enabled>
        <FadeInView duration={750} style={styles.InputBoxStyle}>
          <TextInputMask
            style={styles.inputStyle}
            type={'cpf'}
            value={this.state.CPF}
            onChangeText={(text) => {
              this.setState({
                CPF: text.replace(/[^0-9]/g, ''),
              });
            }}
            onSubmitEditing={() => this.handleSubmitButton()}
            placeholderTextColor="#aaaaaa"
            returnKeyType="next"
            editable={this.state.RenderTextState > 11 ? false : true}
          />
        </FadeInView>
      </KeyboardAvoidingView>
    );
    const YN = (
      <View style={styles.InputBoxStyle}>
        <FadeInView
          duration={750}
          style={(styles.InputBoxStyle, {flexDirection: 'row'})}>
          <TouchableOpacity
            style={styles.YbuttonStyleTwo}
            activeOpacity={0.5}
            onPress={() => this.setState({RenderTextState: 14, EmailYN: 'Y'})}>
            <Text style={styles.blueButtonTextStyle}>SIM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NbuttonStyleTwo}
            activeOpacity={0.5}
            onPress={() => this.setState({RenderTextState: 14, EmailYN: 'N'})}>
            <Text style={styles.WhiteButtonTextStyle}>NÃO</Text>
          </TouchableOpacity>
        </FadeInView>
      </View>
    );
    const input_5 = (
      <KeyboardAvoidingView enabled>
        <FadeInView duration={750} style={styles.InputBoxStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(text) => this.setState({Email: text})}
            onSubmitEditing={() => this.email_validate()}
            placeholder="INSERIR EMAIL"
            placeholderTextColor="#aaaaaa"
            autoCapitalize="sentences"
            returnKeyType="next"
            blurOnSubmit={false}
          />
        </FadeInView>
      </KeyboardAvoidingView>
    );
    const button_map = (
      <View style={styles.chatboxStyle}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() =>
            this.setState({modalVisible_l: !this.state.modalVisible_l})
          }
          // onPress={()=> this.setState({RenderTextState:18})}
        >
          <Text style={styles.buttonTextStyle}>CADASTRAR ENDEREÇO</Text>
        </TouchableOpacity>
      </View>
    );
    const button_1 = (
      <View style={styles.chatboxStyle}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() =>
            this.setState({modalVisible: !this.state.modalVisible})
          }>
          <Text style={styles.buttonTextStyle}>ESCOLHER AREA</Text>
        </TouchableOpacity>
      </View>
    );
    const YN2 = (
      <View style={styles.InputBoxStyle}>
        <FadeInView duration={750} style={styles.InputBoxStyle}>
          <Text
            style={styles.ChatTextStyle}
            onPress={() => this.setState({RenderTextState: 25, ExpYN: 'Y'})}
            // this.setState({EmailYN:'Y'})
          >
            SIM
          </Text>
          <Text
            style={styles.ChatTextStyle}
            onPress={() => this.setState({RenderTextState: 25, ExpYN: 'N'})}>
            NÃO
          </Text>
        </FadeInView>
      </View>
    );
    const input_6 = (
      <KeyboardAvoidingView enabled>
        <FadeInView duration={750} style={styles.InputBoxStyle}>
          <TextInput
            style={styles.inputStyle}
            keyboardType="phone-pad"
            onChangeText={(num) => this.setState({Y_exp: num})}
            onSubmitEditing={() => this.setState({RenderTextState: 27})}
            placeholder="Years of experience"
            placeholderTextColor="#aaaaaa"
            autoCapitalize="sentences"
            returnKeyType="next"
            blurOnSubmit={false}
          />
        </FadeInView>
      </KeyboardAvoidingView>
    );
    const input_7 = (
      <KeyboardAvoidingView enabled>
        <FadeInView duration={750} style={styles.InputBoxStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(num) => this.setState({R_exp: num})}
            onSubmitEditing={() => this.setState({RenderTextState: 29})}
            placeholder="Years of experience"
            placeholderTextColor="#aaaaaa"
            autoCapitalize="sentences"
            returnKeyType="next"
            blurOnSubmit={false}
          />
        </FadeInView>
      </KeyboardAvoidingView>
    );
    const YN3 = (
      <View style={styles.InputBoxStyle}>
        <FadeInView duration={750} style={styles.InputBoxStyle}>
          <Text
            style={styles.ChatTextStyle}
            onPress={() =>
              this.setState(
                {RenderTextState: 32, unemployeed: false},
                function () {
                  this.handleSubmitButton();
                },
              )
            }
            // this.setState({EmailYN:'Y'})
          >
            TRABALHANDO
          </Text>
          <Text
            style={styles.ChatTextStyle}
            onPress={() =>
              this.setState(
                {RenderTextState: 32, unemployeed: true},
                function () {
                  this.handleSubmitButton();
                },
              )
            }>
            DESEMPREGADO
          </Text>
        </FadeInView>
      </View>
    );

    return (
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
      this.state.x !== null && (
        <ScrollView
          style={styles.container}
          ref={(ref) => {
            this.scrollView = ref;
          }}
          onContentSizeChange={() =>
            this.scrollView.scrollToEnd({animated: true})
          }>
          <Loader loading={this.state.showIndicator} />
          <TouchableWithoutFeedback>
            <View style={{padding: 20}}>
              {this.state.RenderTextState > -1 &&
                this.renderChatBox('1', 'Olá, muito bem vindo!')}
              {this.state.RenderTextState > 0 &&
                this.renderChatBox(
                  '2',
                  'Sou o Pesquisa Vagas e estou aqui para ajuda-lo a conseguir um novo trabalho. Vamos lá?',
                )}
              {this.state.RenderTextState > 1 &&
                this.renderChatBox(
                  '3',
                  'Muito bem, que tal começar se apresentando?',
                )}
              {this.state.RenderTextState > 2 &&
                this.renderChatBox('4', 'Como você se chama?')}
              {this.state.RenderTextState > 3 && input_name}
              {this.state.RenderTextState > 4 &&
                this.renderChatBox('6', 'Lindo nome!')}
              {this.state.RenderTextState > 5 &&
                this.renderChatBox('7', 'Qual o número do seu celular?')}
              {this.state.RenderTextState > 6 && input_phoneNumber}
              {this.state.RenderTextState > 7 &&
                this.renderChatBox('9', 'Cadastre agora a sua senha de acesso')}
              {this.state.RenderTextState > 8 && input_password}
              {this.state.RenderTextState > 9 &&
                this.renderChatBox('11', 'Qual o seu CPF?')}
              {this.state.RenderTextState > 10 && input_CPF}
              {this.state.RenderTextState > 11 &&
                this.renderChatBox('13', 'Você tem email?')}
              {this.state.RenderTextState == 13 && YN}
              {this.state.RenderTextState > 13 &&
                this.state.EmailYN == 'Y' &&
                input_5}
              {this.state.RenderTextState > 13 &&
                this.state.EmailYN == 'N' &&
                this.renderAnswerBox('15', 'Eu não tenho email')}
              {this.state.RenderTextState > 14 &&
                this.state.EmailYN == 'N' &&
                this.renderChatBox('16', 'Tudo bem, vamos continuar.')}
              {this.state.RenderTextState > 15 &&
                this.renderChatBox(
                  '17',
                  'Legal. Seu cadastro foi realizado com sucesso!',
                )}
              {this.state.RenderTextState > 15 &&
                this.renderChatBox(
                  '17',
                  'Agora informe seu endereço para mostrarmos as vagas mais perto de você.',
                )}
              {this.state.RenderTextState > 16 && button_map}
              {this.state.RenderTextState > 17 &&
                this.renderChatBox(
                  '19',
                  'Agora me diga em que área você quer trabalhar?',
                )}
              {this.state.RenderTextState > 18 && button_1}
              {this.state.RenderTextState > 19 &&
                this.renderAnswerBox('21', this.state.subarea)}
              {this.state.RenderTextState > 20 &&
                this.renderChatBox('22', 'Ótima escolha!')}
              {this.state.RenderTextState > 21 &&
                this.renderChatBox(
                  '23',
                  'Se quiser adicionar outras áreas de interesse, é super fácil. Basta ir em sua página de perfil.',
                )}
              {this.state.RenderTextState > 22 &&
                this.renderChatBox(
                  '24',
                  'Você têm experiência em ' + this.state.subarea + '?',
                )}
              {this.state.RenderTextState == 24 && YN2}
              {this.state.RenderTextState > 24 &&
                this.state.ExpYN == 'Y' &&
                this.renderChatBox('26', 'QUANTOS ANOS DE EXPERIÊNCIA?')}
              {this.state.RenderTextState > 25 &&
                this.state.ExpYN == 'Y' &&
                input_6}
              {this.state.RenderTextState > 26 &&
                this.state.ExpYN == 'Y' &&
                this.renderChatBox(
                  '28',
                  'Me fale sobre seus trabalhos, atual e anteriores.',
                )}
              {this.state.RenderTextState > 26 &&
                this.state.ExpYN == 'Y' &&
                input_7}
              {this.state.RenderTextState > 24 &&
                this.state.ExpYN == 'N' &&
                this.renderAnswerBox('28', 'Eu não tenho experiência')}
              {this.state.RenderTextState > 27 &&
                this.state.ExpYN == 'N' &&
                this.renderChatBox(
                  '29',
                  'Tranquilo, temos vagas sem experência também',
                )}
              {this.state.RenderTextState > 28 &&
                this.renderChatBox(
                  '30',
                  'Estamos quase acabando. Vou te mostrar vagas já já.',
                )}
              {this.state.RenderTextState > 29 &&
                this.renderChatBox(
                  '31',
                  'Você está trabalhando neste momento ou está desempregado?',
                )}
              {this.state.RenderTextState == 31 && YN3}
              {this.state.RenderTextState > 32 &&
                this.renderChatBox('34', 'Entendi.')}
              {this.state.RenderTextState > 33 &&
                this.renderChatBox(
                  '35',
                  'Me fale sobre sua formação acadêmica. Onde você estudou e qual o seu nível de instrução?',
                )}
            </View>
          </TouchableWithoutFeedback>
          {/*  */}
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              console.log('Modal has been closed.');
            }}>
            <View style={styles.modal}>
              <View style={{flex: 5, justifyContent: 'flex-start'}}>
                <DropDownPicker
                  items={DropdownItems.items1}
                  defaultValue={this.state.item1}
                  containerStyle={{height: 40}}
                  isVisible={this.state.isVisible1}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisible1: true,
                    })
                  }
                  onClose={() =>
                    this.setState({
                      isVisible1: false,
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
              </View>
              <View>
                <DropDownPicker
                  items={DropdownItems.items2}
                  defaultValue={this.state.item2}
                  containerStyle={{height: 40}}
                  isVisible={this.state.isVisible2}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisible2: true,
                    })
                  }
                  onClose={() =>
                    this.setState({
                      isVisible2: false,
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
              </View>
              <DropDownPicker
                items={DropdownItems.items3}
                defaultValue={this.state.item3}
                containerStyle={{height: 40}}
                isVisible={this.state.isVisible3}
                onOpen={() =>
                  this.changeVisibility({
                    isVisible3: true,
                  })
                }
                onClose={() =>
                  this.setState({
                    isVisible3: false,
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
                containerStyle={{height: 40}}
                isVisible={this.state.isVisible4}
                onOpen={() =>
                  this.changeVisibility({
                    isVisible4: true,
                  })
                }
                onClose={() =>
                  this.setState({
                    isVisible4: false,
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
                defaultValue={this.state.item5}
                containerStyle={{height: 40}}
                isVisible={this.state.isVisible5}
                onOpen={() =>
                  this.changeVisibility({
                    isVisible5: true,
                  })
                }
                onClose={() =>
                  this.setState({
                    isVisible5: false,
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
                items={DropdownItems.items6}
                defaultValue={this.state.item6}
                containerStyle={{height: 40}}
                isVisible={this.state.isVisible6}
                onOpen={() =>
                  this.changeVisibility({
                    isVisible6: true,
                  })
                }
                onClose={() =>
                  this.setState({
                    isVisible6: false,
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
                items={DropdownItems.items7}
                defaultValue={this.state.item7}
                containerStyle={{height: 40}}
                isVisible={this.state.isVisible7}
                onOpen={() =>
                  this.changeVisibility({
                    isVisible7: true,
                  })
                }
                onClose={() =>
                  this.setState({
                    isVisible7: false,
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
                items={DropdownItems.items8}
                defaultValue={this.state.item8}
                containerStyle={{height: 40}}
                isVisible={this.state.isVisible8}
                onOpen={() =>
                  this.changeVisibility({
                    isVisible8: true,
                  })
                }
                onClose={() =>
                  this.setState({
                    isVisible8: false,
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
                items={DropdownItems.items9}
                defaultValue={this.state.item9}
                containerStyle={{height: 40}}
                isVisible={this.state.isVisible9}
                onOpen={() =>
                  this.changeVisibility({
                    isVisible9: true,
                  })
                }
                onClose={() =>
                  this.setState({
                    isVisible9: false,
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
                items={DropdownItems.items10}
                defaultValue={this.state.item10}
                containerStyle={{height: 40}}
                isVisible={this.state.isVisible10}
                onOpen={() =>
                  this.changeVisibility({
                    isVisible10: true,
                  })
                }
                onClose={() =>
                  this.setState({
                    isVisible10: false,
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
                items={DropdownItems.items11}
                defaultValue={this.state.item11}
                containerStyle={{height: 40}}
                isVisible={this.state.isVisible11}
                onOpen={() =>
                  this.changeVisibility({
                    isVisible11: true,
                  })
                }
                onClose={() =>
                  this.setState({
                    isVisible11: false,
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
                items={DropdownItems.items12}
                defaultValue={this.state.item12}
                containerStyle={{height: 40}}
                isVisible={this.state.isVisible12}
                onOpen={() =>
                  this.changeVisibility({
                    isVisible12: true,
                  })
                }
                onClose={() =>
                  this.setState({
                    isVisible12: false,
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
                    this.setState({
                      modalVisible: !this.state.modalVisible,
                      RenderTextState: 20,
                    });
                  }}>
                  <Text style={{color: '#FFFFFF'}}>Confirmar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          {/* Modal de Solicitar permiso de direccion */}
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.modalVisible_l}
            onRequestClose={() => {
              console.log('Modal has been closed.');
            }}>
            <View style={{flex: 1}}>
              <View style={{flex: 3, justifyContent: 'flex-start'}}>
                {/* <Image
                  source={require('../Image/map.png')}
                  style={{
                    width: '100%',
                    height: viewportHeight * 0.55,
                    resizeMode: 'contain',
                    top: 60,
                  }}
                /> */}

                <WebView
                  javaScriptEnabled={true}
                  // originWhitelist={['*']}
                  source={{html: mapbox}}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  padding: 20,
                }}>
                <Text style={styles.mapLabel}>
                  Permitir acesso à localização
                </Text>
                <Text style={styles.mapText}>
                  Isso nos ajudar a te mostrar vagas perto de onde você está ou
                  regiões que voc6e escolher
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
                  onPress={() =>
                    this.setState({modalVisible_l: !this.state.modalVisible_l})
                  }>
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
                    this.ConfirmLocation();
                  }}>
                  <Text style={styles.blueButtonTextStyle}>Permitir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      )
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