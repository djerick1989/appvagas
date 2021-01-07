/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Modal,
  TouchableHighlight,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {TextInputMask} from 'react-native-masked-text';
import {
  patchUserExperience,
  getUserExperience,
  deleteUserExperience,
  postUserExperience,
} from '../../helpers/api';

export default class ExperienciaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresa: '',
      cargo: '',
      descripcion: '',
      currentID: 0,
      modalIs: 'created',
      dateStart: '',
      dateFinish: '',
      listOfExperiences: [],
      modalVisible: false,
      spinner: true,
      subarea: null,
    };
  }

  async componentDidMount() {
    const [isValid, Experiences] = await getUserExperience();
    if (!isValid) {     
    }
    this.setState({
      listOfExperiences: Experiences,
      spinner: false,
    });
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = () => {
    this.setState({
      isVisibleThisOneToo: true,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      isVisibleThisOneToo: false,
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

  retransformDate(dateIn) {
    const date = dateIn.split('-');
    let realDate = '';
    if (date[0] && date[1] && date[2]) {
      realDate = date[2] + '/' + date[1] + '/' + date[0];
    }
    return realDate;
  }

  clickAddOrEdit = async () => {
    this.setState({spinner: true});
    let realDate = this.transformDate(this.state.dateStart);
    let realDate2 = this.transformDate(this.state.dateFinish);
    if (this.state.modalIs == 'created') {
      await postUserExperience({
        jobtitle: this.state.cargo,
        employer: this.state.empresa,
        detail: this.state.descripcion,
        start: realDate,
        end: realDate2,
      });
    } else {
      const [a, b] = await patchUserExperience(
        {
          jobtitle: this.state.cargo,
          employer: this.state.empresa,
          detail: this.state.descripcion,
          start: realDate,
          end: realDate2,
        },
        this.state.currentID,
      );
    }
    const [isValid, Experiences] = await getUserExperience();
    if (!isValid) {     
    }
    this.setState({
      spinner: false,
      modalVisible: false,
      listOfExperiences: Experiences,
    });
  };

  deleteThisOne = async () => {
    this.setState({spinner: true});
    const [a, b] = await deleteUserExperience(this.state.currentID);   
    const [isValid, Experiences] = await getUserExperience();
    this.setState({
      spinner: false,
      modalVisible: false,
      listOfExperiences: Experiences,
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

  render() {
    return (
      <>
        <StatusBar backgroundColor="#6948F4" barStyle="default" />
        <Spinner
          visible={this.state.spinner}
          textContent={'Carregando...'}
          textStyle={styles.spinnerTextStyle}
        />
        <ScrollView style={styles.scrollContainer}>
          <View>
            <View>
              <Text
                style={styles.BackStyle2}
                onPress={() => this.props.navigation.goBack()}>
                Voltar
              </Text>
            </View>
            <KeyboardAvoidingView enabled style={{flex: 4}}>
              <Text style={styles.LabelStyle}>Experiência Profissional</Text>
              <View style={styles.SectionStyleEspecial13}>
                <View
                  style={{
                    backgroundColor: '#6948F4',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 25,
                    width: '30%',
                  }}>
                  <TouchableHighlight
                    onPress={() => {
                      this.setState({
                        modalVisible: true,
                        modalIs: 'created',
                        empresa: '',
                        cargo: '',
                        descripcion: '',
                        dateStart: '',
                        dateFinish: '',
                        currentID: 0,
                      });
                    }}>
                    <Text style={{color: '#FFFFFF'}}>Adicionar</Text>
                  </TouchableHighlight>
                </View>
              </View>
              {this.state.listOfExperiences.map((element, index) => {
                if (element.level != 10 && element.level != 4) {
                  return (
                    <View style={styles.cardContainer} key={index}>
                      <View style={styles.cardItem}>
                        <Text
                          onPress={() =>
                            this.setState({
                              modalVisible: true,
                              modalIs: 'update',
                              empresa: element.employer,
                              cargo: element.jobtitle,
                              descripcion: element.detail,
                              dateStart: this.retransformDate(element.start),
                              dateFinish: this.retransformDate(element.end),
                              currentID: element.id,
                            })
                          }
                          style={styles.CardTitle}>
                          {element.jobtitle}
                        </Text>
                        <Text
                          onPress={() =>
                            this.setState({
                              modalVisible: true,
                              modalIs: 'update',
                              empresa: element.employer,
                              cargo: element.jobtitle,
                              descripcion: element.detail,
                              dateStart: this.retransformDate(element.start),
                              dateFinish: this.retransformDate(element.end),
                              currentID: element.id,
                            })
                          }
                          style={styles.CardSubTitle}>
                          {element.employer}
                        </Text>
                        <Text
                          onPress={() =>
                            this.setState({
                              modalVisible: true,
                              modalIs: 'update',
                              empresa: element.employer,
                              cargo: element.jobtitle,
                              descripcion: element.detail,
                              dateStart: this.retransformDate(element.start),
                              dateFinish: this.retransformDate(element.end),
                              currentID: element.id,
                            })
                          }
                          style={styles.CardType}>
                          {element.start + ' - ' + element.end}
                        </Text>
                      </View>
                    </View>
                  );
                }
              })}
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{flex: 10}}>
            <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
              <ScrollView style={{padding: 0, margin: 0}}>
                <>
                  <View style={{flex: 5, justifyContent: 'flex-start'}}>
                    <View
                      style={{
                        paddingBottom: 40,
                        flexDirection: 'row',
                        display: 'flex',
                      }}>
                      <Text
                        style={styles.BackStyle2}
                        onPress={() => this.setState({modalVisible: false})}>
                        Voltar
                      </Text>
                      {this.state.modalIs !== 'created' ? (
                        <Text
                          style={styles.BackStyle3}
                          onPress={() => this.deleteThisOne()}>
                          Excluir
                        </Text>
                      ) : null}
                    </View>
                    <View style={styles.SectionStyle}>
                      <Text style={styles.InputLabelStyle}>Cargo</Text>
                      <TextInput
                        style={styles.inputStyle}
                        value={this.state.cargo}
                        onChangeText={(text) => this.setState({cargo: text})}
                        placeholderTextColor="#aaaaaa"
                        returnKeyType="next"
                        blurOnSubmit={false}
                      />
                    </View>
                    <View style={styles.SectionStyle}>
                      <Text style={styles.InputLabelStyle}>Empresa</Text>
                      <TextInput
                        style={styles.inputStyle}
                        value={this.state.empresa}
                        onChangeText={(text) => this.setState({empresa: text})}
                        placeholderTextColor="#aaaaaa"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        blurOnSubmit={false}
                      />
                    </View>
                    <View style={styles.containerEspecial}>
                      <View style={styles.item}>
                        <View style={styles.SectionStyleEspecial2}>
                          <Text style={styles.InputLabelStyle}>
                            Data de Inicio
                          </Text>
                          <TextInputMask
                            style={styles.inputStyle}
                            type={'datetime'}
                            options={{
                              format: 'DD/MM/YYYY',
                            }}
                            placeholder="30/10/1990"
                            value={this.state.dateStart}
                            onChangeText={(text) => {
                              this.setState({
                                dateStart: text,
                              });
                            }}
                          />
                        </View>
                      </View>
                      <View style={styles.item}>
                        <View style={styles.SectionStyleEspecial1}>
                          <Text style={styles.InputLabelStyle}>
                            Data de Término
                          </Text>
                          <TextInputMask
                            style={styles.inputStyle}
                            type={'datetime'}
                            options={{
                              format: 'DD/MM/YYYY',
                            }}
                            placeholder="30/10/1990"
                            value={this.state.dateFinish}
                            onChangeText={(text) => {
                              this.setState({
                                dateFinish: text,
                              });
                            }}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={styles.SectionStyle}>
                      <Text style={styles.InputLabelStyle}>Descrição</Text>
                      <TextInput
                        style={styles.inputStyle}
                        value={this.state.descripcion}
                        onChangeText={(text) =>
                          this.setState({descripcion: text})
                        }
                        placeholderTextColor="#aaaaaa"
                        returnKeyType="next"
                        blurOnSubmit={false}
                      />
                    </View>
                  </View>
                </>
              </ScrollView>
            </SafeAreaView>
          </KeyboardAvoidingView>
          {!this.state.isVisibleThisOneToo ? (
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
                    this.clickAddOrEdit();
                  }}>
                  <Text style={{color: '#FFFFFF'}}>Confirmar</Text>
                </TouchableHighlight>
              </View>
            </View>
          ) : null}
        </Modal>
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
    height: 120,
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
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
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
  spinnerTextStyle: {
    color: '#FFFFFF',
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
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
  },
  LabelStyle: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 20,
    paddingLeft: 35,
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
    fontSize: 14,
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
