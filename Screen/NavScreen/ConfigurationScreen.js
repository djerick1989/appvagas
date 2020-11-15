import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Linking,
  ScrollView,
} from 'react-native';
import Loader from '../../Components/Loader';
import {patchUserProfile} from '../../helpers/api';
import {List} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

export default class IdiomasScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      imageSource: require('../../Image/avatar.png'),
    };
  }

  async componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  updateImageOnProfile = async (urlImage) => {
    await patchUserProfile({
      photo: urlImage,
    });
    this.setState({loading: false});
  };

  onClickImage = () => {
    console.log('image press');
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('imagen tomada');
      // Agregar logica de la subida de imagen
      console.log(response);
      // al tener la url de la imagen subida
      //this.updateImageOnProfile(urlImage);
    });
  };

  handleOpenLink = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  render() {
    return (
      <>
        <ScrollView style={styles.scrollContainer}>
          <Loader loading={this.state.loading} />
          <View>
            <KeyboardAvoidingView enabled style={{flex: 4}}>
              <Text style={styles.LabelStyle}>Configs</Text>

              <View style={styles.SectionStyle}>
                <List.Item
                  title="Preferências"
                  onPress={() => this.props.navigation.navigate('Preferences')}
                  right={(props) => <List.Icon {...props} icon="menu-right" />}
                />
                <List.Item
                  title="Termos"
                  onPress={() =>
                    this.props.navigation.navigate('Termos', {
                      comeFrom: 'preferences',
                    })
                  }
                  right={(props) => <List.Icon {...props} icon="menu-right" />}
                />
                <List.Item
                  title="Políticas"
                  onPress={() =>
                    this.props.navigation.navigate('Policy', {
                      comeFrom: 'preferences',
                    })
                  }
                  right={(props) => <List.Icon {...props} icon="menu-right" />}
                />
                <List.Item
                  title="Ajuda"
                  onPress={() =>
                    this.handleOpenLink('https://jobconvo.freshdesk.com/')
                  }
                  right={(props) => <List.Icon {...props} icon="menu-right" />}
                />
                <List.Item
                  title="Convidar Amgios"
                  onPress={() => alert('not implemented Yet')}
                  right={(props) => <List.Icon {...props} icon="logout" />}
                />
                <List.Item
                  title="Divulgar Vaga"
                  onPress={() =>
                    this.handleOpenLink(
                      'https://www.jobconvo.com/pt-br/pricing/',
                    )
                  }
                  right={(props) => <List.Icon {...props} icon="menu-right" />}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  containerEspecial: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    height: 70,
    margin: 10,
  },
  cardContainer: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    margin: 10,
  },
  containerEspecial2: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    margin: 10,
  },
  item: {
    width: '50%',
  },
  cardItem: {
    width: '90%',
    marginLeft: 20,
    backgroundColor: '#66666621',
    height: 80,
    color: '#6948F4',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#6948F4',
  },
  item2: {
    width: '90%',
    marginLeft: 20,
    height: 150,
    color: '#6948F4',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#6948F4',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  SectionStyle: {
    height: 70,
    marginTop: 40,
    marginLeft: 15,
    marginRight: 15,
    margin: 10,
  },
  SectionStyleEspecial1: {
    height: 70,
    marginRight: 25,
    marginLeft: 10,
  },
  SectionStyleEspecial2: {
    height: 70,
    marginLeft: 25,
    marginRight: 10,
  },
  SectionStyleEspecial11: {
    marginRight: 25,
    marginLeft: 10,
  },
  SectionStyleEspecial12: {
    marginLeft: 25,
    marginRight: 10,
  },
  SectionStyleEspecial122: {
    marginLeft: 30,
    marginTop: 30,
  },
  SectionStyleEspecial13: {
    marginLeft: 35,
    marginTop: 10,
    marginBottom: 30,
    marginRight: 10,
  },
  LabelStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    paddingTop: 20,
  },
  InputLabelStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 5,
  },
  textHoverSlider: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#6948F4',
  },
  InputLabelStyleArea: {
    alignSelf: 'flex-end',
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
  subarea: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
    backgroundColor: '#6948F4',
    borderRadius: 25,
    margin: 5,
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
  buttonStyleArea: {
    backgroundColor: '#6948F4',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#6948F4',
    height: 30,
    alignItems: 'center',
    borderRadius: 25,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  buttonTextStyleArea: {
    color: '#FFFFFF',
    paddingVertical: 8,
    fontSize: 14,
    padding: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 8,
    fontSize: 18,
  },
  LabelStyle1: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  LabelStyles1: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
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
  CardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10,
    color: '#6948F4',
  },
  CardSubTitle: {
    fontWeight: 'bold',
    fontSize: 12,
    paddingTop: 5,
    paddingLeft: 10,
    color: '#00000096',
  },
  CardType: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingTop: 30,
    paddingLeft: 10,
    color: '#6948f4b3',
  },
  BackStyle: {
    color: '#6948F4',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    bottom: 20,
    right: 0,
    left: 0,
  },

  BackStyle2: {
    color: '#6948F4',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    fontSize: 16,
    paddingTop: 30,
    paddingLeft: 35,
  },
  BackStyle3: {
    color: '#ff0000c7',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    fontSize: 12,
    paddingTop: 30,
    paddingLeft: 250,
  },

  BackStyle22: {
    backgroundColor: '#6948F4',
    color: '#FFFFFF',
    margin: 20,
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 30,
    paddingLeft: 35,
  },
});
