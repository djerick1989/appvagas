import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Modal,
  StatusBar,
  TouchableHighlight,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from '@react-native-picker/picker';
import TextMask from 'react-native-text-input-mask';
import {
  postUserEducation,
  patchUserEducation,
  getUserEducations,
  deleteUserEducation,
} from '../../helpers/api';
import moment from 'moment';

export default class FormacaoScreen extends Component {
  state = {
    nameEscola: '',
    nameCurso: '',
    currentID: 0,
    listNivels: [
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
      { label: 'Concluido', value: 1 },
      { label: 'Cursando', value: 2 },
      { label: 'Incompleto', value: 3 },
      { label: 'Desconhecido', value: 4 },
    ],
    modalIs: 'created',
    itemNivel: 0,
    itemStatus: 1,
    yearsExp: '',
    dateStart: '',
    spinner: true,
    dateFinish: '',
    prof: '',
    currentSalary: 0,
    listOfNewAreas: [],
    listOfEducations: [],
    lastSalary: 0,
    dataSalary: '',
    modalVisible: false,
    subarea: null,
  };

  async componentDidMount() {
    const [isValid, educations] = await getUserEducations();
    if (!isValid) {

    }
    this.setState({
      listOfEducations: educations,
      spinner: false,
    });
  }

  transformDate(dateIn) {
    const date = dateIn.split('/');
    let realDate = '';
    if (date[0] && date[1] && date[2]) {
      realDate = date[2] + '-' + date[1] + '-' + date[0];
    }
    return realDate;
  }

  validateDate = (date) => {
    let array = date.split('/');
    if (parseInt(array[0]) > 0 && parseInt(array[0]) < 13) {
      return true;
    }
    return false;
  }

  retransformDate(dateIn) {
    console.log(dateIn);
    const date = dateIn.split('-');
    let realDate = '';
    if (date[0] && date[1] && date[2]) {
      realDate = date[1] + '/' + date[0];
    }
    return realDate;
  }

  clickAddOrEdit = async () => {
    this.setState({ spinner: true });    
    if (
      this.state.nameEscola === '' ||
      this.state.nameCurso === '' ||
      this.state.itemNivel === '' ||
      this.state.itemStatus === '' ||
      this.state.dateStart === '' ||
      this.state.dateFinish === ''
    ) {
      alert('requer a adição de todos os dados para continuar');
      this.setState({ spinner: false });
      return;
    }
    if (this.validateDate(this.state.dateStart) === false || this.validateDate(this.state.dateFinish) === false) {
      alert('datas inválidas');
      this.setState({ spinner: false });
      return;
    }
    let realDate = this.transformDate(`01/${this.state.dateStart}`);
    let realDate2 = this.transformDate(`01/${this.state.dateFinish}`);
    let date1 = moment(realDate);
    let date2 = moment(realDate2);
    if (!date1.isValid() || !date2.isValid()) {
      alert('datas inválidas');
      this.setState({ spinner: false });
      return;
    }
    if (this.state.modalIs == 'created') {
      await postUserEducation({
        level: this.state.itemNivel,
        title: this.state.nameCurso,
        school: this.state.nameEscola,
        status: this.state.itemStatus,
        start: realDate,
        end: realDate2,
      });
    } else {
      const [a, b] = await patchUserEducation(
        {
          level: this.state.itemNivel,
          title: this.state.nameCurso,
          school: this.state.nameEscola,
          status: this.state.itemStatus,
          start: realDate,
          end: realDate2,
        },
        this.state.currentID,
      );
    }
    const [isValid, educations] = await getUserEducations();
    if (!isValid) {

    }
    this.setState({
      spinner: false,
      modalVisible: false,
      listOfEducations: educations,
    });
  };

  deleteThisOne = async () => {
    this.setState({ loading: true });
    const [a, b] = await deleteUserEducation(this.state.currentID);

    const [isValid, educations] = await getUserEducations();
    this.setState({
      loading: false,
      modalVisible: false,
      listOfEducations: educations,
    });
  };

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
            <KeyboardAvoidingView enabled style={{ flex: 4 }}>
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
                      this.setState({
                        modalVisible: true,
                        modalIs: 'created',
                        nameEscola: '',
                        nameCurso: '',
                        dateStart: '',
                        dateFinish: '',
                        currentID: 0,
                      });
                    }}>
                    <Text style={{ color: '#FFFFFF' }}>Adicionar</Text>
                  </TouchableHighlight>
                </View>
              </View>
              {this.state.listOfEducations.map((element, index) => {
                if (element.level != 10 && element.level != 4) {
                  return (
                    <View style={styles.cardContainer} key={index}>
                      <View style={styles.cardItem}>
                        <Text
                          onPress={() =>
                            this.setState({
                              modalVisible: true,
                              modalIs: 'update',
                              nameEscola: element.school,
                              itemNivel: element.level,
                              nameCurso: element.title,
                              itemStatus: element.status,
                              dateStart: this.retransformDate(element.start),
                              dateFinish: this.retransformDate(element.end),
                              currentID: element.id,
                            })
                          }
                          style={styles.CardTitle}>
                          {element.title}
                        </Text>
                        <Text
                          onPress={() =>
                            this.setState({
                              modalVisible: true,
                              modalIs: 'update',
                              nameEscola: element.school,
                              itemNivel: element.level,
                              nameCurso: element.title,
                              itemStatus: element.status,
                              dateStart: this.retransformDate(element.start),
                              dateFinish: this.retransformDate(element.end),
                              currentID: element.id,
                            })
                          }
                          style={styles.CardSubTitle}>
                          {element.school}
                        </Text>
                        <Text
                          onPress={() =>
                            this.setState({
                              modalVisible: true,
                              modalIs: 'update',
                              nameEscola: element.school,
                              itemNivel: element.level,
                              nameCurso: element.title,
                              itemStatus: element.status,
                              dateStart: this.retransformDate(element.start),
                              dateFinish: this.retransformDate(element.end),
                              currentID: element.id,
                            })
                          }
                          style={styles.CardType}>
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
              {this.state.listOfEducations.map((element, index) => {
                if (element.level == 10 || element.level == 4) {
                  return (
                    <View style={styles.cardContainer} key={index}>
                      <View style={styles.cardItem}>
                        <Text
                          onPress={() =>
                            this.setState({
                              modalVisible: true,
                              modalIs: 'update',
                              nameEscola: element.school,
                              itemNivel: element.level,
                              nameCurso: element.title,
                              itemStatus: element.status,
                              dateStart: this.retransformDate(element.start),
                              dateFinish: this.retransformDate(element.end),
                              currentID: element.id,
                            })
                          }
                          style={styles.CardTitle}>
                          {element.title}
                        </Text>
                        <Text
                          onPress={() =>
                            this.setState({
                              modalVisible: true,
                              modalIs: 'update',
                              nameEscola: element.school,
                              itemNivel: element.level,
                              nameCurso: element.title,
                              itemStatus: element.status,
                              dateStart: this.retransformDate(element.start),
                              dateFinish: this.retransformDate(element.end),
                              currentID: element.id,
                            })
                          }
                          style={styles.CardSubTitle}>
                          {element.school}
                        </Text>
                        <Text
                          onPress={() =>
                            this.setState({
                              modalVisible: true,
                              modalIs: 'update',
                              nameEscola: element.school,
                              itemNivel: element.level,
                              nameCurso: element.title,
                              itemStatus: element.status,
                              dateStart: this.retransformDate(element.start),
                              dateFinish: this.retransformDate(element.end),
                              currentID: element.id,
                            })
                          }
                          style={styles.CardType}>
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
          visible={this.state.modalVisible}>
          <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
            <ScrollView style={styles.scrollContainer}>
              <View style={{ flex: 5, justifyContent: 'flex-start' }}>
                <View
                  style={{
                    paddingBottom: 40,
                    flexDirection: 'row',
                    display: 'flex',
                  }}>
                  <Text
                    style={styles.BackStyle2}
                    onPress={() => this.setState({ modalVisible: false })}>
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
                <KeyboardAvoidingView enabled style={{ flex: 4 }}>
                  <View style={styles.SectionStyle}>
                    <Text style={styles.InputLabelStyle}>Nome da Escola</Text>
                    <TextInput
                      style={styles.inputStyle}
                      value={this.state.nameEscola}
                      onChangeText={(text) => this.setState({ nameEscola: text })}
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
                      onChangeText={(text) => this.setState({ nameCurso: text })}
                      placeholderTextColor="#aaaaaa"
                      autoCapitalize="sentences"
                      returnKeyType="next"
                      blurOnSubmit={false}
                    />
                  </View>
                  <View style={styles.SectionStyle}>
                    <Text style={styles.InputLabelStyle}>Nivel</Text>
                    <View style={styles.InputBoxStylePicker}>
                      <Picker
                        selectedValue={this.state.itemNivel}
                        style={{
                          height: 40,
                          width: '100%',
                        }}
                        onValueChange={(itemValue, itemIndex) => {
                          if (itemValue == -1) {
                            return;
                          }
                          this.setState({ itemNivel: itemValue });
                        }}>
                        {this.state.listNivels.map((el, index) => {
                          return (
                            <Picker.Item
                              key={el.label + index}
                              label={el.label}
                              value={el.value}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                  </View>
                  {!this.state.isVisibleThisOne ? (
                    <>
                      <View style={styles.SectionStyle}>
                        <Text style={styles.InputLabelStyle}>Status</Text>
                        <View style={styles.InputBoxStylePicker}>
                          <Picker
                            selectedValue={this.state.itemStatus}
                            style={{
                              height: 40,
                              width: '100%',
                            }}
                            onValueChange={(itemValue, itemIndex) => {
                              if (itemValue == -1) {
                                return;
                              }
                              this.setState({ itemStatus: itemValue });
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
                        </View>
                      </View>

                      <View style={styles.containerEspecial}>
                        <View style={styles.item}>
                          <View style={styles.SectionStyleEspecial2}>
                            <Text style={styles.InputLabelStyle}>
                              Data de Inicio
                            </Text>
                            <TextMask
                              style={styles.inputStyle}
                              keyboardType="numeric"
                              mask={"[00]/[0000]"}
                              placeholder="10/1990"
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
                            <TextMask
                              style={styles.inputStyle}
                              keyboardType="numeric"
                              mask={"[00]/[0000]"}
                              placeholder="10/1990"
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
                    </>
                  ) : null}
                </KeyboardAvoidingView>
              </View>
            </ScrollView>
            <View
              style={{
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
                  <Text style={{ color: '#FFFFFF' }}>Confirmar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  containerEspecial: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    height: 70,
    margin: 10,
  },
  spinnerTextStyle: {
    color: '#FFFFFF',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    margin: 10,
  },
  containerEspecial2: {
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
    backgroundColor: '#ffffff',
    height: 120,
    color: '#6948F4',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'transparent',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5
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
    backgroundColor: '#66666621',
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
  InputBoxStylePicker: {
    borderColor: '#6948F4',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    marginBottom: 15,
    alignSelf: 'flex-end',
    height: 40,
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
    paddingLeft: 200,
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
