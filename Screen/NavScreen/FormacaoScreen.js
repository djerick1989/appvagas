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
import Slider from '@react-native-community/slider';
import {
  getUserAreas,
  getUserExp,
  getUserSalary,
  patchUserExp,
  postUserAreas,
  patchUserSalary,
} from '../../helpers/api';

export default class FormacaoScreen extends Component {
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
      loading: true,
      subarea: null,
    };
  }

  async componentDidMount() {
    const [isValid, areas] = await getUserAreas();
    const [isValid2, exp] = await getUserExp();
    const [isValid3, salary] = await getUserSalary();
    this.setState({
      listOfAreas: areas,
      dataExp: exp,
      dataSalary: salary,
      currentSalary: salary.current_salary ?? 0,
      lastSalary: salary.last_salary ?? 0,
      prof: exp.career_objective,
      yearsExp: '' + exp.years_of_experience,
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
                      this.clickOkJob();
                    }}>
                    <Text style={{color: '#FFFFFF'}}>Adicionar</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={styles.cardContainer}>
                <View style={styles.cardItem}>
                  <Text style={styles.CardTitle}>Administracion</Text>
                  <Text style={styles.CardSubTitle}>Facultade </Text>
                  <Text style={styles.CardType}>Cursando</Text>
                </View>
              </View>
              <View style={styles.SectionStyleEspecial122}>
                <Text style={styles.InputLabelStyle}>Cursos</Text>
              </View>
              <View style={styles.cardContainer}>
                <View style={styles.cardItem}>
                  <Text style={styles.CardTitle}>Python</Text>
                  <Text style={styles.CardSubTitle}>Udemy </Text>
                  <Text style={styles.CardType}>Concluido em Octubre/2020</Text>
                </View>
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
