import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import TextInputMask from 'react-native-text-input-mask';
import { getUserProfile, patchUserProfile } from '../../helpers/api';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';

const data = [
  {
    label: 'Acre',
    value: 'AC',
  },
  {
    label: 'Alagoas',
    value: 'AL',
  },
  {
    label: 'Amapá',
    value: 'AP',
  },
  {
    label: 'Amazonas',
    value: 'AM',
  },
  {
    label: 'Bahia',
    value: 'BA',
  },
  {
    label: 'Ceará',
    value: 'CE',
  },
  {
    label: 'Distrito Federal',
    value: 'DF',
  },
  {
    label: 'Espírito Santo',
    value: 'ES',
  },
  {
    label: 'Goiás',
    value: 'GO',
  },
  {
    label: 'Maranhão',
    value: 'MA',
  },
  {
    label: 'Mato Grosso',
    value: 'MT',
  },
  {
    label: 'Mato Grosso do Sul',
    value: 'MS',
  },
  {
    label: 'Minas Gerais',
    value: 'MG',
  },
  {
    label: 'Pará',
    value: 'PA',
  },
  {
    label: 'Paraíba',
    value: 'PB',
  },
  {
    label: 'Paraná',
    value: 'PR',
  },
  {
    label: 'Pernambuco',
    value: 'PE',
  },
  {
    label: 'Piauí',
    value: 'PI',
  },
  {
    label: 'Rio de Janeiro',
    value: 'RJ',
  },
  {
    label: 'Rio Grande do Norte',
    value: 'RN',
  },
  {
    label: 'Rio Grande do Sul',
    value: 'RS',
  },
  {
    label: 'Rondônia',
    value: 'RO',
  },
  {
    label: 'Roraima',
    value: 'RR',
  },
  {
    label: 'Santa Catarina',
    value: 'SC',
  },
  {
    label: 'São Paulo',
    value: 'SP',
  },
  {
    label: 'Sergipe',
    value: 'SE',
  },
  {
    label: 'Tocantins',
    value: 'TO',
  }
];

export default class EnderecoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estado: 'AC',
      cidade: '',
      bairro: '',
      complemento: '',
      number: '',
      zipcode: '',
      endereco: '',
      userPhon: '',
      spinner: true,
      showAlert: false,
    };
  }

  async componentDidMount() {
    this.setState({ spinner: true });
    const [data, user] = await getUserProfile();
    if (!data) {

    }
    this.setState({
      estado: user.state,
      cidade: user.city,
      zipcode: user.zipcode,
      bairro: user.neighbourhood,
      complemento: user.complement,
      number: user.adddressnumber,
      endereco: user.address,
      userPhon: user.phone1,
      spinner: false,
    });
  }

  async handleSubmitButton() {
    this.setState({ spinner: true });
    const dataInJson = this.state;
    delete dataInJson.loading;
    // aqui llamo al update
    await patchUserProfile({
      zipcode: this.state.zipcode,
      state: this.state.estado,
      city: this.state.cidade,
      neighbourhood: this.state.bairro,
      complement: this.state.complemento,
      adddressnumber: this.state.number,
      address: this.state.endereco,
      phone1: this.state.userPhon,
    });
    this.setState({ spinner: false, showAlert: true });
  }

  findByCep = async () => {
    fetch(`https://mobapivagas.jobconvo.com/v1/geocode/${this.state.zipcode}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ cidade: result[0].cidade, bairro: result[0].bairro, endereco: result[0].endereco, estado: result[0].estado });
      })
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
            <KeyboardAvoidingView enabled style={{ flex: 4 }}>
              <Text style={styles.LabelStyle}>Endereço</Text>
              <View style={styles.SectionStyle}>
                <Text style={styles.InputLabelStyle}>CEP</Text>
                <TextInputMask
                  style={styles.inputStyle}
                  onChangeText={(text) => this.setState({ zipcode: text.replace(/[^0-9]/g, '') })}
                  placeholder={'99999-999'}
                  value={this.state.zipcode}
                  mask={"[00000]-[999]"}
                  onSubmitEditing={this.findByCep}
                />
              </View>
              <View style={styles.SectionStyle}>
                <Text style={styles.InputLabelStyle}>Endereço</Text>
                <TextInput
                  style={styles.inputStyle}
                  value={this.state.endereco}
                  onChangeText={(text) => this.setState({ endereco: text })}
                  placeholderTextColor="#aaaaaa"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.containerEspecial}>
                <View style={styles.item}>
                  <View style={styles.SectionStyleEspecial2}>
                    <Text style={styles.InputLabelStyle}>Nº</Text>
                    <TextInput
                      style={styles.inputStyle}
                      value={this.state.number}
                      onChangeText={(text) => this.setState({ number: text })}
                      placeholderTextColor="#aaaaaa"
                      autoCapitalize="sentences"
                      returnKeyType="next"
                      blurOnSubmit={false}
                    />
                  </View>
                </View>
                <View style={styles.item}>
                  <View style={styles.SectionStyleEspecial1}>
                    <Text style={styles.InputLabelStyle}>Complemento</Text>
                    <TextInput
                      style={styles.inputStyle}
                      value={this.state.complemento}
                      onChangeText={(text) =>
                        this.setState({ complemento: text })
                      }
                      placeholderTextColor="#aaaaaa"
                      autoCapitalize="sentences"
                      returnKeyType="next"
                      blurOnSubmit={false}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.SectionStyle}>
                <Text style={styles.InputLabelStyle}>Bairro</Text>
                <TextInput
                  style={styles.inputStyle}
                  value={this.state.bairro}
                  onChangeText={(text) => this.setState({ bairro: text })}
                  placeholderTextColor="#aaaaaa"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <Text style={styles.InputLabelStyle}>Cidade</Text>
                <TextInput
                  style={styles.inputStyle}
                  value={this.state.cidade}
                  onChangeText={(text) => this.setState({ cidade: text })}
                  placeholderTextColor="#aaaaaa"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <Text style={styles.InputLabelStyle}>Estado</Text>
                {/* <TextInput
                  style={styles.inputStyle}
                  value={this.state.estado}
                  onChangeText={(text) => this.setState({ estado: text })}
                  placeholderTextColor="#aaaaaa"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                /> */}
                <Picker
                  selectedValue={this.state.estado}
                  style={{
                    height: 40,
                    width: '100%',
                  }}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ estado: itemValue });
                  }}>
                  {data.map((es, index) => {
                    return (
                      <Picker.Item
                        key={es.label + index}
                        label={es.label}
                        value={es.value}
                      />
                    );
                  })}
                </Picker>
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
  spinnerTextStyle: {
    color: '#FFFFFF',
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