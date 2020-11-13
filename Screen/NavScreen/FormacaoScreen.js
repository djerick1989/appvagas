import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableHighlight,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DropdownItems from '../../Components/DropdownItems';
import Loader from '../../Components/Loader';
import {TextInputMask} from 'react-native-masked-text';
import Slider from '@react-native-community/slider';
import {
  getUserAreas,
  getUserExp,
  getUserSalary,
  patchUserExp,
  postUserAreas,
  patchUserSalary,
  postUserEducation,
  patchUserEducation,
  getUserEducations,
} from '../../helpers/api';

export default class FormacaoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameEscola: '',
      nameCurso: '',
      listNivels: [
        {label: 'Até 5º ano do Ensino Fundamental', value: 0},
        {label: 'Do 6º ao 9º ano do Ensino Fundamental', value: 1},
        {label: 'Ensino Fundamental', value: 2},
        {label: 'Ensino Medio', value: 3},
        {label: 'Curso Tecnico', value: 4},
        {label: 'Tecnologo', value: 5},
        {label: 'Ensino Superior', value: 6},
        {label: 'Pos', value: 7},
        {label: 'Mestrado', value: 8},
        {label: 'Doutorado', value: 9},
        {label: 'Curso', value: 10},
      ],
      listStatus: [
        {label: 'Concluido', value: 1},
        {label: 'Cursando', value: 2},
        {label: 'Incompleto', value: 3},
        {label: 'Desconhecido', value: 4},
      ],
      modalIs: 'created',
      itemNivel: '',
      itemStatus: '',
      yearsExp: '',
      dateStart: '',
      dateFinish: '',
      prof: '',
      currentSalary: 0,
      listOfNewAreas: [],
      listOfEducations: [],
      lastSalary: 0,
      dataSalary: '',
      modalVisible: false,
      loading: true,
      subarea: null,
    };
  }

  async componentDidMount() {
    const [isValid, educations] = await getUserEducations();
    this.setState({
      listOfEducations: educations,
      loading: false,
    });
  }

  clickOkJob = () => {
    this.state.listOfNewAreas.push({area: this.state.subarea});
    this.state.listOfAreas.push({area: this.state.subarea});
    this.setState({
      modalVisible: false,
    });
  };

  clickAddOrEdit = async () => {
    this.setState({loading: true});
    const date = this.state.dateStart.split('/');
    let realDate = '';
    if (date[0] && date[1] && date[2]) {
      realDate = date[2] + '-' + date[1] + '-' + date[0];
    }
    const date2 = this.state.dateFinish.split('/');
    let realDate2 = '';
    if (date2[0] && date2[1] && date2[2]) {
      realDate2 = date2[2] + '-' + date2[1] + '-' + date2[0];
    }
    if (this.state.modalIs == 'created') {
      const [a, v] = await postUserEducation({
        level: this.state.itemNivel,
        title: this.state.nameCurso,
        school: this.state.nameEscola,
        status: this.state.itemStatus,
        start: realDate,
        end: realDate2,
      });
    }
    this.setState({loading: false, modalVisible: false});
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

  async handleSubmitButton() {
    this.setState({loading: true});
    await patchUserSalary({
      last_salary: this.state.lastSalary,
      current_salary: this.state.currentSalary,
    });
    await patchUserExp({
      years_of_experience: this.state.yearsExp,
      career_objective: this.state.prof,
    });
    if (this.state.listOfNewAreas.length) {
      for (let index = 0; index < this.state.listOfNewAreas.length; index++) {
        const [a, b] = await postUserAreas(this.state.listOfNewAreas[index]);
        console.log(a, b);
      }
    }
    this.setState({listOfNewAreas: [], loading: false});
  }

  render() {
    return (
      <>
        <ScrollView style={styles.scrollContainer}>
          <Loader loading={this.state.loading} />
          <View>
            <View>
              <Text
                style={styles.BackStyle2}
                onPress={() => this.props.navigation.navigate('Candidaturas')}>
                Voltar
              </Text>
            </View>
            <KeyboardAvoidingView enabled style={{flex: 4}}>
              <Text style={styles.LabelStyle}>Formação Acadêmica</Text>
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
                      this.setState({modalVisible: true, modalIs: 'created'});
                    }}>
                    <Text style={{color: '#FFFFFF'}}>Adicionar</Text>
                  </TouchableHighlight>
                </View>
              </View>
              {this.state.listOfEducations.map((element) => {
                if (element.level != 10 && element.level != 4) {
                  return (
                    <View style={styles.cardContainer}>
                      <View style={styles.cardItem}>
                        <Text style={styles.CardTitle}>{element.title}</Text>
                        <Text style={styles.CardSubTitle}>
                          {element.school}
                        </Text>
                        <Text style={styles.CardType}>
                          {this.state.listStatus.map((el) =>
                            el.value == element.status ? el.label : null,
                          )}
                        </Text>
                      </View>
                    </View>
                  );
                }
              })}
              <View style={styles.SectionStyleEspecial122}>
                <Text style={styles.InputLabelStyle}>Cursos</Text>
              </View>
              {this.state.listOfEducations.map((element) => {
                if (element.level == 10 || element.level == 4) {
                  return (
                    <View style={styles.cardContainer}>
                      <View style={styles.cardItem}>
                        <Text style={styles.CardTitle}>{element.title}</Text>
                        <Text style={styles.CardSubTitle}>
                          {element.school}
                        </Text>
                        <Text style={styles.CardType}>
                          {this.state.listStatus.map((el) =>
                            el.value == element.status ? el.label : null,
                          )}
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
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
            <View style={{flex: 5, justifyContent: 'flex-start'}}>
              <View style={{paddingBottom: 40}}>
                <Text
                  style={styles.BackStyle2}
                  onPress={() => this.setState({modalVisible: false})}>
                  Voltar
                </Text>
              </View>
              <KeyboardAvoidingView enabled style={{flex: 4}}>
                <View style={styles.SectionStyle}>
                  <Text style={styles.InputLabelStyle}>Nome da Escola</Text>
                  <TextInput
                    style={styles.inputStyle}
                    value={this.state.nameEscola}
                    onChangeText={(text) => this.setState({nameEscola: text})}
                    placeholderTextColor="#aaaaaa"
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                </View>
                <View style={styles.SectionStyle}>
                  <Text style={styles.InputLabelStyle}>Nome do Curso</Text>
                  <TextInput
                    style={styles.inputStyle}
                    value={this.state.nameCurso}
                    onChangeText={(text) => this.setState({nameCurso: text})}
                    placeholderTextColor="#aaaaaa"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                </View>
                <View style={styles.SectionStyle}>
                  <Text style={styles.InputLabelStyle}>Nivel</Text>
                  <DropDownPicker
                    items={this.state.listNivels}
                    defaultValue={this.state.itemNivel}
                    containerStyle={{height: 40}}
                    isVisible={this.state.isVisibleThisOne}
                    onOpen={() =>
                      this.changeVisibility({
                        isVisibleThisOne: true,
                      })
                    }
                    zIndex={15}
                    onClose={() =>
                      this.setState({
                        isVisibleThisOne: false,
                      })
                    }
                    onChangeItem={(item) => {
                      this.changValue({
                        itemNivel: item.value,
                      });
                    }}
                    placeholder={'Seleccionar'}
                    labelStyle={styles.dLabelStyle}
                    itemStyle={styles.dItemStyle}
                    placeholderStyle={styles.dPlaceholderStyle}
                    dropDownStyle={styles.dStyle}
                  />
                </View>
                {!this.state.isVisibleThisOne ? (
                  <>
                    <View style={styles.SectionStyle}>
                      <Text style={styles.InputLabelStyle}>Status</Text>
                      <DropDownPicker
                        items={this.state.listStatus}
                        defaultValue={this.state.itemStatus}
                        containerStyle={{height: 40}}
                        isVisible={this.state.isVisibleThisOneToo}
                        onOpen={() =>
                          this.changeVisibility({
                            isVisibleThisOneToo: true,
                          })
                        }
                        zIndex={15}
                        onClose={() =>
                          this.setState({
                            isVisibleThisOneToo: false,
                          })
                        }
                        onChangeItem={(item) => {
                          this.changValue({
                            itemStatus: item.value,
                          });
                        }}
                        placeholder={'Seleccionar'}
                        labelStyle={styles.dLabelStyle}
                        itemStyle={styles.dItemStyle}
                        placeholderStyle={styles.dPlaceholderStyle}
                        dropDownStyle={styles.dStyle}
                      />
                    </View>

                    {!this.state.isVisibleThisOneToo ? (
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
                    ) : null}
                  </>
                ) : null}
              </KeyboardAvoidingView>
            </View>
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
          </SafeAreaView>
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
    fontSize: 16,
    paddingTop: 30,
    paddingLeft: 35,
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
