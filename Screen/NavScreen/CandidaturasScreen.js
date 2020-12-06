/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import _ from 'lodash';
import {SearchBar} from 'react-native-elements';
import {getUserJobs, getAllJobs} from '../../helpers/api';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from "react-navigation";

export default class ExperienciaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresa: '',
      cargo: '',
      search: '',
      descripcion: '',
      currentID: 0,
      modalIs: 'created',
      dateStart: '',
      dateFinish: '',
      listOfJobs: [],
      listOfSearchJobs: [],
      modalVisible: false,
      spinner: true,
      subarea: null,
    };
  }

  async componentDidMount() {
    await this.getInformation();
    this.props.navigation.addListener('focus', (e) => {
      this.getInformation();
    });
  }

  async getInformation(){
    this.setState({spinner: true});
    const [isValid, AllJobs] = await getAllJobs();
    if (!isValid) {
      console.log('Error getting getAllJobs');
    }
    const [isValid2, Jobs] = await getUserJobs();
    if (!isValid2) {
      console.log('Error getting getUserJobs');
    }
    let listMerged = _.merge(
      _.keyBy(Jobs, 'job'),
      _.keyBy(AllJobs.results, 'uid'),
    );
    listMerged = Object.values(listMerged);
    this.setState({
      listMerged: listMerged,
      listOfSearchJobs: Jobs,
      allJobs: AllJobs.results,
      listOfJobs: Jobs,
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

  retransformDate(dateIn) {
    const date = dateIn.split('-');
    let realDate = '';
    if (date[0] && date[1] && date[2]) {
      realDate = date[2] + '/' + date[1] + '/' + date[0];
    }
    return realDate;
  }

  updateSearch = (search) => {
    this.setState({search});
    const listFinded = this.state.listOfJobs.filter(
      (el) =>
        (el.area && el.area.toLowerCase().includes(search.toLowerCase())) ||
        (el.benefits &&
          el.benefits.toLowerCase().includes(search.toLowerCase())) ||
        (el.city && el.city.toLowerCase().includes(search.toLowerCase())) ||
        (el.company_name &&
          el.company_name.toLowerCase().includes(search.toLowerCase())) ||
        (el.country &&
          el.country.toLowerCase().includes(search.toLowerCase())) ||
        (el.description &&
          el.description.toLowerCase().includes(search.toLowerCase())) ||
        (el.latitude &&
          el.latitude.toLowerCase().includes(search.toLowerCase())) ||
        (el.requirements &&
          el.requirements.toLowerCase().includes(search.toLowerCase())) ||
        (el.salary && el.salary.toLowerCase().includes(search.toLowerCase())) ||
        (el.state && el.state.toLowerCase().includes(search.toLowerCase())) ||
        (el.title && el.title.toLowerCase().includes(search.toLowerCase())),
    );
    this.setState({listOfSearchJobs: listFinded});
  };

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
              <SearchBar
                lightTheme={true}
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
                inputContainerStyle={{
                  backgroundColor: 'transparent',
                }}
                placeholder="Buscar Vagas..."
                onChangeText={this.updateSearch}
                value={this.state.search}
              />
            </View>
            <KeyboardAvoidingView enabled style={{flex: 4}}>
              <Text style={styles.LabelStyle}>Candidaturas</Text>
              {this.state.search == null
                ? this.state.listOfJobs.map((element, index) => {
                    if (element.level != 10 && element.level != 4) {
                      return (
                        <View style={styles.cardContainer} key={index}>
                          <View style={styles.cardItem}>
                            <Text
                              onPress={() =>
                                this.props.navigation.navigate('Home', {
                                  searchId: element.job,
                                })
                              }
                              style={styles.CardTitle}>
                              {this.state.allJobs.map((el) =>
                                el.uid == element.job ? el.title : null,
                              )}
                            </Text>
                            <Text
                              onPress={() =>
                                this.props.navigation.navigate('Home', {
                                  searchId: element.job,
                                })
                              }
                              style={styles.CardSubTitle}>
                              {this.state.allJobs.map((el) =>
                                el.uid == element.job
                                  ? el.state + '-' + el.country
                                  : null,
                              )}
                            </Text>
                            <Text
                              onPress={() =>
                                this.props.navigation.navigate('Home', {
                                  searchId: element.job,
                                })
                              }
                              style={styles.CardType}>
                              {element.apply_date.substring(
                                0,
                                element.apply_date.indexOf('T'),
                              )}
                            </Text>
                          </View>
                        </View>
                      );
                    }
                  })
                : this.state.listOfSearchJobs.map((element, index) => {
                    if (element.level != 10 && element.level != 4) {
                      return (
                        <View style={styles.cardContainer} key={index}>
                          <View style={styles.cardItem}>
                            <Text
                              onPress={() =>
                                this.props.navigation.navigate('Home', {
                                  searchId: element.job,
                                })
                              }
                              style={styles.CardTitle}>
                              {this.state.allJobs.map((el) =>
                                el.uid == element.job ? el.title : null,
                              )}
                            </Text>
                            <Text
                              onPress={() =>
                                this.props.navigation.navigate('Home', {
                                  searchId: element.job,
                                })
                              }
                              style={styles.CardSubTitle}>
                              {this.state.allJobs.map((el) =>
                                el.uid == element.job
                                  ? el.state + '-' + el.country
                                  : null,
                              )}
                            </Text>
                            <Text
                              onPress={() =>
                                this.props.navigation.navigate('Home', {
                                  searchId: element.job,
                                })
                              }
                              style={styles.CardType}>
                              {element.apply_date.substring(
                                0,
                                element.apply_date.indexOf('T'),
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
  spinnerTextStyle: {
    color: '#FFFFFF',
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
    paddingBottom: 20,
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
