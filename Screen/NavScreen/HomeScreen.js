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
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Loader from '../../Components/Loader';
import {TextInputMask} from 'react-native-masked-text';
import {getUserJobs} from '../../helpers/api';
import ViewPager from '@react-native-community/viewpager';

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
      modalVisible: false,
      loading: true,
      subarea: null,
    };
  }

  async componentDidMount() {
    const [isValid, Jobs] = await getUserJobs();
    this.setState({
      listOfJobs: Jobs,
      loading: false,
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
  };

  render() {
    return (
      <View style={styles.scrollContainer}>
        <Loader loading={this.state.loading} />
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
        <ViewPager style={styles.viewPager} initialPage={0}>
          <View
            key="1"
            style={{
              backgroundColor: '#00000',
            }}>
            <View style={styles.containerEspecial}>
              <View style={styles.SectionStyleEspecial2}>
                <Text style={styles.InputLabelStyleTitle}>
                  Python Developer
                </Text>
              </View>
            </View>

            <View style={styles.containerEspecial22}>
              <View style={styles.SectionStyleEspecial2}>
                <Text style={styles.InputLabelStyleSubtitle}>
                  (Company Title)
                </Text>
              </View>
            </View>

            <View style={styles.containerEspecial}>
              <View style={styles.item11}>
                <View style={styles.SectionStyleEspecial2}>
                  <Text style={styles.InputLabelStyle}>Local</Text>
                </View>
              </View>
              <View style={styles.item21}>
                <View style={styles.SectionStyleEspecial1}>
                  <Text style={styles.InputLabelStyle22}>Sao Paulo - SP</Text>
                </View>
              </View>
            </View>

            <View style={styles.containerEspecial}>
              <View style={styles.item11}>
                <View style={styles.SectionStyleEspecial2}>
                  <Text style={styles.InputLabelStyle}>Detalhes</Text>
                </View>
              </View>
              <View style={styles.item21}>
                <View style={styles.SectionStyleEspecial1}>
                  <Text style={styles.InputLabelStyle22}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.containerEspecial}>
              <View style={styles.item11}>
                <View style={styles.SectionStyleEspecial2}>
                  <Text style={styles.InputLabelStyle}>Requisitos</Text>
                </View>
              </View>
              <View style={styles.item21}>
                <View style={styles.SectionStyleEspecial1}>
                  <Text style={styles.InputLabelStyle22}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            key="2"
            style={{
              backgroundColor: '#00000',
            }}>
            <Text>Second page</Text>
          </View>
        </ViewPager>
        {/* <ScrollView style={styles.scrollContainer}>
          <View>
            <KeyboardAvoidingView enabled style={{flex: 4}}>
              {this.state.listOfJobs.map((element, index) => {
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
        </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerEspecial: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  containerEspecial22: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  viewPager: {
    flex: 1,
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
  item11: {
    width: '30%',
  },
  item21: {
    width: '70%',
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
    marginRight: 25,
    marginLeft: 10,
  },
  SectionStyleEspecial2: {
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
    paddingBottom: 20,
    paddingLeft: 35,
  },
  InputLabelStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingBottom: 5,
  },
  InputLabelStyleTitle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  InputLabelStyleSubtitle: {
    fontSize: 16,
    paddingBottom: 5,
  },
  InputLabelStyle22: {
    fontSize: 14,
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
