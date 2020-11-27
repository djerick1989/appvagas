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
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import Slider from '@react-native-community/slider';
import {
  getUserAreas,
  getUserExp,
  getUserSalary,
  patchUserExp,
  postUserAreas,
  patchUserSalary,
} from '../../helpers/api';

export default class ObjetivoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfAreas: [],
      dataExp: '',
      yearsExp: '',
      prof: '',
      currentSalary: 0,
      listOfNewAreas: [],
      lastSalary: 0,
      dataSalary: '',
      modalVisible: false,
      showAlert: false,
      spinner: true,
      subarea: null,
    };
  }

  async componentDidMount() {
    const [isValid, areas] = await getUserAreas();
    const [isValid2, exp] = await getUserExp();
    const [isValid3, salary] = await getUserSalary();
    if (!isValid || !isValid2 || !isValid3) {
      console.log('Error consiguiendo informacion de Objetivo Screen');
    }
    this.updateCurrentInformation(areas, exp, salary);
  }

  updateCurrentInformation(areas, exp, salary) {
    this.setState(
      {
        listOfAreas: areas,
        dataExp: exp,
        dataSalary: salary,
        currentSalary: salary.current_salary ?? 0,
        lastSalary: salary.last_salary ?? 0,
        prof: exp.career_objective,
        yearsExp: '' + exp.years_of_experience,
      },
      () => {
        this.setState({
          spinner: !this.state.spinner,
        });
      },
    );
  }

  clickOkJob = () => {
    this.state.listOfNewAreas.push({area: this.state.subarea});
    this.state.listOfAreas.push({area: this.state.subarea});
    this.setState({
      modalVisible: false,
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
      showAlert: false,
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
    this.setState({spinner: true});
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
    this.setState({listOfNewAreas: [], spinner: false, showAlert: true});
  }

  render() {
    return (
      <>
        <Spinner
          visible={this.state.spinner}
          textContent={'Carregando...'}
          textStyle={styles.spinnerTextStyle}
        />
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Sucesso"
          message="Atualizado com sucesso"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={false}
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
              <Text style={styles.LabelStyle}>Objetivo Profissional</Text>
              <View style={styles.SectionStyle}>
                <Text style={styles.InputLabelStyle}>
                  Qual o seu objetivo profissional?
                </Text>
                <TextInput
                  style={styles.inputStyle}
                  numberOfLines={4}
                  multiline
                  value={this.state.prof}
                  onChangeText={(text) => this.setState({prof: text})}
                  placeholderTextColor="#aaaaaa"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <Text style={styles.InputLabelStyle}>
                  Quantos anos de experiéncia possui?
                </Text>
                <TextInput
                  style={styles.inputStyle}
                  value={this.state.yearsExp}
                  onChangeText={(text) => this.setState({yearsExp: text})}
                  placeholderTextColor="#aaaaaa"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.SectionStyle}>
                <Text style={styles.InputLabelStyle}>
                  Qual foi seu ultimo ou atual salario?
                </Text>
                <Text style={styles.textHoverSlider}>
                  R$ {this.state.currentSalary}
                </Text>
                <Slider
                  minimumValue={0}
                  value={this.state.currentSalary}
                  onValueChange={(value) =>
                    this.setState({currentSalary: value})
                  }
                  step={100}
                  maximumValue={50000}
                  minimumTrackTintColor="#6948f45c"
                  maximumTrackTintColor="#6948F4"
                />
              </View>
              <View style={styles.SectionStyle}>
                <Text style={styles.InputLabelStyle}>Pretensao Salarial</Text>
                <Text style={styles.textHoverSlider}>
                  R$ {this.state.lastSalary}
                </Text>
                <Slider
                  minimumValue={0}
                  step={100}
                  value={this.state.lastSalary}
                  onValueChange={(value) => this.setState({lastSalary: value})}
                  maximumValue={50000}
                  minimumTrackTintColor="#6948f45c"
                  maximumTrackTintColor="#6948F4"
                />
              </View>
              <View style={styles.containerEspecial2}>
                <View style={styles.item}>
                  <View style={styles.SectionStyleEspecial12}>
                    <Text style={styles.InputLabelStyle}>Areas</Text>
                  </View>
                </View>
                <View style={styles.item}>
                  <View style={styles.SectionStyleEspecial11}>
                    <Text style={styles.InputLabelStyleArea}>
                      <Text
                        style={styles.BackStyle2}
                        onPress={() => {
                          this.setState({modalVisible: true, subarea: null});
                          this.changValue();
                        }}>
                        Adicionar
                      </Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.item2}>
                  <ScrollView style={styles.scrollContainer}>
                    <View style={styles.containerEspecial2}>
                      {this.state.listOfAreas.map((element, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={styles.buttonStyleArea}
                            activeOpacity={0.5}>
                            <Text style={styles.buttonTextStyleArea}>
                              {element.area}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              </View>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => this.handleSubmitButton()}>
                <Text style={styles.buttonTextStyle}>Confirmar</Text>
              </TouchableOpacity>
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
              <Text style={styles.LabelStyle1}>
                Escolha a área que mais lhe interessar.
              </Text>
              <Text style={styles.LabelStyles1}>
                Posteriormente vocé poderá adicionar mais áreas.
              </Text>
              <DropDownPicker
                items={DropdownItems.items1}
                defaultValue={this.state.item1}
                containerStyle={{height: 40}}
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
                containerStyle={{height: 40}}
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
                containerStyle={{height: 40}}
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
                containerStyle={{height: 40}}
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
                containerStyle={{height: 40}}
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
                containerStyle={{height: 40}}
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
                containerStyle={{height: 40}}
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
                containerStyle={{height: 40}}
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
                containerStyle={{height: 40}}
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
                containerStyle={{height: 40}}
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
                containerStyle={{height: 40}}
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
                containerStyle={{height: 40}}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    height: 70,
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
  spinnerTextStyle: {
    color: '#FFFFFF',
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
});
