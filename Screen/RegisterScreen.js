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
        }
        this.setState({isCorrectUser: true});

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

  render() {
    const input_phoneNumber = (
      <KeyboardAvoidingView enabled>
        <FadeInView duration={3750} style={styles.InputBoxStyle}>
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
            {this.state.isCorrectUser ? input_phoneNumber : null}

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
