import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {
  getUserAreas,
  getUserExp,
  getUserSalary,
  patchUserExp,
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
      lastSalary: 0,
      dataSalary: '',
      loading: '',
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
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

  async handleSubmitButton() {
    const dataInJson = this.state;
    delete dataInJson.loading;
    const [isValid, areas] = await patchUserSalary({
      last_salary: this.state.lastSalary,
      current_salary: this.state.currentSalary,
    });
    console.log(isValid);
    console.log(areas);
    const [isValid2, ex] = await patchUserExp({
      years_of_experience: this.state.yearsExp,
      career_objective: this.state.prof,
    });
    console.log(isValid2);
    console.log(ex);
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View>
          <View>
            <Text
              style={styles.BackStyle2}
              onPress={() => this.props.navigation.navigate('Candidaturas')}>
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
                onValueChange={(value) => this.setState({currentSalary: value})}
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
                      onPress={() =>
                        this.props.navigation.navigate('Candidaturas')
                      }>
                      Adicionar
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.item2}>
                <ScrollView style={styles.scrollContainer}>
                  <View style={styles.containerEspecial2}>
                    {this.state.listOfAreas.map((element) => {
                      return (
                        <TouchableOpacity
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
