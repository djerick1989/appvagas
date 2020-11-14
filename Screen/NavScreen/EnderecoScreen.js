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
import {getUserProfile, patchUserProfile} from '../../helpers/api';

export default class EnderecoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estado: '',
      cidade: '',
      bairro: '',
      complemento: '',
      number: '',
      endereco: '',
      userPhon: '',
      loading: true,
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    const [data, user] = await getUserProfile();

    this.setState({
      estado: user.state,
      cidade: user.city,
      bairro: user.neighbourhood,
      complemento: user.complement,
      number: user.adddressnumber,
      endereco: user.address,
      userPhon: user.phone1,
      loading: false,
    });
  }

  async handleSubmitButton() {
    this.setState({loading: true});
    const dataInJson = this.state;
    delete dataInJson.loading;
    // aqui llamo al update
    await patchUserProfile({
      state: this.state.estado,
      city: this.state.cidade,
      neighbourhood: this.state.bairro,
      complement: this.state.complemento,
      adddressnumber: this.state.number,
      address: this.state.endereco,
      phone1: this.state.userPhon,
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
              onPress={() => this.props.navigation.goBack()}>
              Voltar
            </Text>
          </View>
          <KeyboardAvoidingView enabled style={{flex: 4}}>
            <Text style={styles.LabelStyle}>Endereço</Text>
            <View style={styles.SectionStyle}>
              <Text style={styles.InputLabelStyle}>CEP</Text>
              <TextInput
                style={styles.inputStyle}
                type={'cel-phone'}
                value={this.state.userPhon}
                onChangeText={(text) => this.setState({userPhon: text})}
                placeholder="30130-000"
                placeholderTextColor="#aaaaaa"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <Text style={styles.InputLabelStyle}>Endereço</Text>
              <TextInput
                style={styles.inputStyle}
                value={this.state.endereco}
                onChangeText={(text) => this.setState({endereco: text})}
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
                    onChangeText={(text) => this.setState({number: text})}
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
                    onChangeText={(text) => this.setState({complemento: text})}
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
                onChangeText={(text) => this.setState({bairro: text})}
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
                onChangeText={(text) => this.setState({cidade: text})}
                placeholderTextColor="#aaaaaa"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <Text style={styles.InputLabelStyle}>Estado</Text>
              <TextInput
                style={styles.inputStyle}
                value={this.state.estado}
                onChangeText={(text) => this.setState({estado: text})}
                placeholderTextColor="#aaaaaa"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
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
