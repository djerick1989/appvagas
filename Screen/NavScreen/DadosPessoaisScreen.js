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
import Loader from '../../Components/Loader';
import {
  getUserProfile,
  patchUserProfile,
  getUserDisability,
  patchUserDisability,
} from '../../helpers/api';
import {TextInputMask} from 'react-native-masked-text';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButtonRN from 'radio-buttons-react-native';

const data = [
  {
    label: 'Masculino',
    value: 1,
  },
  {
    label: 'Feminino',
    value: 2,
  },
  {
    label: 'Nao informar',
    value: 3,
  },
];
export default class DadosPessoaisScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dt: '',
      sex: 0,
      itemStatusCivil: '',
      itemPCD: 0,
      isVisibleThisOne: false,
      isVisibleThisOneToo: false,
      listPCD: [
        {label: 'NÃO', value: 0},
        {label: 'Amputação', value: 1},
        {label: 'Hemiplegia', value: 2},
        {label: 'Membros com deformidade congênita ou adquirida', value: 3},
        {label: 'Monoparesia', value: 4},
        {label: 'Monoplegia', value: 5},
        {label: 'Paralisia cerebral', value: 6},
        {label: 'Paraparesia', value: 7},
        {label: 'Paraplegia', value: 8},
        {label: 'Tetraparesia', value: 9},
        {label: 'Tetraplegia', value: 10},
        {label: 'Triparesia', value: 11},
        {label: 'Triplegia', value: 12},
        {label: 'Nanismo', value: 13},
        {label: 'Ostomia', value: 14},
        {label: 'Hemiparesia', value: 15},
        {label: 'Surdez moderada', value: 16},
        {label: 'Surdez severa', value: 17},
        {label: 'Anacusia', value: 18},
        {label: 'Baixa Visão', value: 19},
        {label: 'Cegueira', value: 20},
        {label: 'Visão Monocular', value: 21},
        {label: 'Deficiência Intelectual', value: 22},
        {label: 'Deficiência Psicossocial', value: 23},
        {label: 'Reabilitado do INSS', value: 24},
        {label: 'Outros', value: 25},
      ],
      listStatusCivil: [
        {label: 'Solteiro', value: 1},
        {label: 'Casado', value: 2},
        {label: 'Outro', value: 3},
      ],
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    const [isValid, user] = await getUserProfile();
    const [isValid1, disability] = await getUserDisability();
    const date = user.birthday ? user.birthday.split('-') : null;
    let realDate = null;
    if (date && date[2] && date[1] && date[0]) {
      realDate = date[2] + '/' + date[1] + '/' + date[0];
    } else {
      realDate = null;
    }
    this.setState({
      dt: realDate,
      sex: parseInt(user.born_sex) ?? '',
      itemStatusCivil: parseInt(user.social_status) ?? '',
      itemPCD: disability.disability,
      loading: false,
    });
  }

  changValue(state) {
    this.setState({
      ...state,
    });
  }
  changeVisibility(state) {
    this.setState({
      ...state,
    });
  }

  async handleSubmitButton() {
    this.setState({loading: true});
    const date = this.state.dt.split('/');
    let realDate = '';
    if (date[0] && date[1] && date[2]) {
      realDate = date[2] + '-' + date[1] + '-' + date[0];
    }
    await patchUserProfile({
      birthday: realDate,
      social_status: this.state.itemStatusCivil,
      born_sex: this.state.sex == 0 ? '' : this.state.sex,
    });
    await patchUserDisability({
      disability: this.state.itemPCD,
    });
    this.setState({loading: false});
  }

  render() {
    return (
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
            <Text style={styles.LabelStyle}>Dados Pessoais</Text>
            <View style={styles.SectionStyle}>
              <Text style={styles.InputLabelStyle}>Data de Nascimento</Text>
              <TextInputMask
                style={styles.inputStyle}
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY',
                }}
                placeholder="30/10/1990"
                value={this.state.dt}
                onChangeText={(text) => {
                  this.setState({
                    dt: text,
                  });
                }}
              />
            </View>
            <View style={styles.SectionStyleOnlyText}>
              <Text style={styles.InputLabelStyle}>Sexo</Text>
            </View>
            <RadioButtonRN
              data={data}
              initial={this.state.sex}
              activeColor="#6948F4"
              selectedBtn={(e) => this.setState({sex: e.value})}
              style={styles.radioButonstyle}
            />
            <View style={styles.SectionStyle}>
              <Text style={styles.InputLabelStyle}>Estado Civil</Text>
              <DropDownPicker
                items={this.state.listStatusCivil}
                defaultValue={this.state.itemStatusCivil}
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
                    itemStatusCivil: item.value,
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
                  <Text style={styles.InputLabelStyle}>
                    PCD (Pessoa com Deficiéncia)
                  </Text>
                  <DropDownPicker
                    items={this.state.listPCD}
                    defaultValue={this.state.itemPCD}
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
                        itemPCD: item.value,
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
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => this.handleSubmitButton()}>
                    <Text style={styles.buttonTextStyle}>Confirmar</Text>
                  </TouchableOpacity>
                ) : null}
              </>
            ) : null}
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
  item: {
    width: '50%',
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
  SectionStyleOnlyText: {
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
  },
  radioButonstyle: {
    marginRight: 35,
    marginLeft: 35,
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
