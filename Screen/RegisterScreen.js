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
      showLoading: false,
      UserName: '',
      FirstName: '',
      LastName: '',
      PhonNumber: '',
      Password: '',
      isregistered: false,
      CPF: '',
      Email: '',
      textInChat: '',
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

  componentDidMount() {
    this.setState({textInChat: this.renderChatBox('Olá, muito bem vindo!', true)});
  }

  renderImage(key) {
    if (key != 1) {
      return null;
    }
    return (
      <Image
        style={{width: 25, height: 25, resizeMode: 'contain', marginTop: 10}}
        source={require('../Image/smile.png')}></Image>
    );
  }

  renderChatBox(item, withImage = false) {
    return (
      <View style={styles.chatboxStyle}>
        <FadeInView
          duration={750}
          style={styles.ChatContainerStyle}>
          <Text style={styles.ChatTextStyle}>{item}</Text>
          {withImage ? this.renderImage(1) : ''}
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

    if (this.state.PhonNumber.length != 11) return;

    if (this.state.RenderTextState < 8) this.setState({RenderTextState: 8});

    if (!this.state.Password) {
      return;
    }

    if (this.state.Password.length < 4) {
      return;
    }

    if (this.state.RegisterSuccess == '0' && this.state.RenderTextState == 9) {
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
              .then((responseJson) => {
                this.setState({RenderTextState: 10});
                //Hide Loader
                this.setState({showLoading: false});
                this.setState({isregistered: true});
                // If server response message same as Data Matched
                if (responseJson.token) {
                  this.setState({user_info: responseJson});
                  console.log(responseJson);
                }
              })
              .catch((error) => {
                //Hide Loader
                this.setState({showLoading: false});
                console.error(error);
              });
          } else {
            this.setState({showLoading: false});
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
              this.setState({RenderTextState: 12});
            } else {
              if (responseJson.message) Alert.alert(responseJson.message);
              else
                Alert.alert(
                  'Vimos que já há um outro cadastro com seu CPF em nosso sistema. \n' +
                    'Favor entrar em contato com nosso suporte em: \n' +
                    'suporte@jobconvo.com',
                );
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
    if (this.state.EmailYN == 'Y')
      if (this.state.Email) {
        if (this.state.RenderTextState == 14) {
          this.setState({showLoading: true});
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
              this.setState({showLoading: false});
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

    if (this.state.confirm_location) {
      if (this.state.RenderTextState == 17) {
        this.setState({showLoading: true});
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
                this.setState({showLoading: false});
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
      this.setState({showLoading: true});
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
          this.setState({showLoading: false});
          console.log(responseJson);
          this.setState({RenderTextState: 33});
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  render() {
    var MyText = function(t) {
      return(
        <Text>
          {t}
        </Text>
      )           
    }
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
              {MyText(this.state.textInChat)}
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
