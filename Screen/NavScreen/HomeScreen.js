/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  Modal,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Loader from '../../Components/Loader';
import {getAllJobs} from '../../helpers/api';
import ViewPager from '@react-native-community/viewpager';
import {WebView} from 'react-native-webview';

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
      x: {
        latitude: '-122.42',
        longitude: '37.779',
      },
    };
  }

  async componentDidMount() {
    const [isValid, Jobs] = await getAllJobs();
    console.log(Jobs);
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

  vw(percentageWidth) {
    return Dimensions.get('window').width * (percentageWidth / 100);
  }

  vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
  }

  updateSearch = (search) => {
    this.setState({search});
  };

  render() {
    const mapbox = `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8" />
    <title>Draggable Marker</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src='https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.css' rel='stylesheet' />
    <style>
            body {
                margin: 0;
                padding: 0;
            }
    
            #map {
                position: absolute;
                top: 0;
                bottom: 0;
                width: 100%;
            }
        </style>
    </head>
    <body>
    <style>
            .marker {
                display: block;
                border: none;
                cursor: pointer;
                padding: 0;
                width: 50px;
                height: 50px;
    
            }
    
            .coordinates {
                background: rgba(0, 0, 0, 0.7);
                color: #fff;
                position: absolute;
                bottom: 40px;
                left: 10px;
                padding: 5px 10px;
                margin: 0;
                font-size: 14px;
                line-height: 18px;
                border-radius: 3px;
                display: none;
            }
        </style>
    <div id="map"></div>
    <pre id="coordinates" class="coordinates"></pre>
    <script>
            //Add your LocationIQ Maps Access Token here (not the API token!)
            locationiqKey = '5417ddeaa4502b';
            
            var coordinates = document.getElementById('coordinates');
            
            //Define the map and configure the map's theme
            var map = new mapboxgl.Map({
                container: 'map',
                center: [-122.42, 37.779],
                style: 'https://tiles.locationiq.com/v2/streets/vector.json?key='+locationiqKey,
                zoom: 12
            });
                
            // First create DOM element for the marker
            var el = document.createElement('div');
            el.className = 'marker';
            el.id = 'marker';
            // Set marker properties using JS
            el.style.backgroundImage = 'url(https://maps.locationiq.com/v2/samples/marker50px.png)';
    
            var marker = new mapboxgl.Marker(el, {
                draggable: true
            }).setLngLat([-122.42, 37.779])
              .addTo(map);
    
            // After the mouse is released the following function is executed which updates the displayed lat and long
            function onDragEnd() {
                var lngLat = marker.getLngLat();
                coordinates.style.display = 'block';
                coordinates.innerHTML =
                    'Latitude: ' + lngLat.lat + '<br />Longitude: ' + lngLat.lng;
            }
    
            marker.on('dragend', onDragEnd);
        </script>
    </body>
    </html>`;
    let Image_Http_URL = {
      uri:
        'https://s3.amazonaws.com/wordpresspublicsite/wp-content/uploads/2019/08/22145108/JobConvo-logo-degrade.png',
    };
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
        <ViewPager
          style={styles.viewPager}
          initialPage={0}
          transitionStyle="curl">
          <View
            key="1"
            style={{
              backgroundColor: '#00000',
              paddingLeft: 25,
              paddingRight: 25,
            }}>
            <View
              style={{
                height: '100%',
                borderColor: '#686868',
                borderWidth: 1,
                borderBottomEndRadius: 25,
                borderBottomStartRadius: 25,
              }}>
              <View style={{width: '100%', height: '40%'}}>
                <WebView javaScriptEnabled={true} source={{html: mapbox}} />
              </View>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ScrollView style={styles.scrollContainer}>
                    <View>
                      <KeyboardAvoidingView
                        enabled
                        style={{flex: 4, marginTop: 30}}>
                        <View style={styles.containerEspecial33}>
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
                              <Text style={styles.InputLabelStyle22}>
                                Sao Paulo - SP
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.containerEspecial}>
                          <View style={styles.item11}>
                            <View style={styles.SectionStyleEspecial2}>
                              <Text style={styles.InputLabelStyle}>
                                Detalhes
                              </Text>
                            </View>
                          </View>
                          <View style={styles.item21}>
                            <View style={styles.SectionStyleEspecial1}>
                              <Text style={styles.InputLabelStyle22}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.containerEspecial}>
                          <View style={styles.item11}>
                            <View style={styles.SectionStyleEspecial2}>
                              <Text style={styles.InputLabelStyle}>
                                Requisitos
                              </Text>
                            </View>
                          </View>
                          <View style={styles.item21}>
                            <View style={styles.SectionStyleEspecial1}>
                              <Text style={styles.InputLabelStyle22}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam
                              </Text>
                            </View>
                          </View>
                        </View>
                      </KeyboardAvoidingView>
                    </View>
                  </ScrollView>
                  <Image
                    source={Image_Http_URL}
                    style={{
                      height: 50,
                      position: 'absolute',
                      resizeMode: 'contain',
                      borderColor: '#686868',
                      borderWidth: 1,
                      width: 200,
                      backgroundColor: '#FFFFFF',
                      top: -30,
                      padding: 5,
                      borderRadius: 5,
                    }}
                  />
                </View>
              </View>

              <View style={styles.containerEspecial34}>
                <View style={styles.item33}>
                  <View style={styles.btnCenter}>
                    <Text style={styles.InputLabelStyle}>
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          borderColor: 'transparent',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 50,
                          height: 50,
                          backgroundColor: '#ff0000',
                          borderRadius: 50,
                        }}>
                        <MaterialCommunityIcons
                          name="close"
                          size={30}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>
                    </Text>
                  </View>
                </View>
                <View style={styles.item33}>
                  <View style={styles.btnCenter}>
                    <Text style={styles.InputLabelStyle22}>
                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                        }}>
                        <MaterialCommunityIcons
                          style={{
                            marginTop: 5,
                          }}
                          name="export-variant"
                          size={40}
                          color="#6948F4"
                        />
                      </TouchableOpacity>
                    </Text>
                  </View>
                </View>
                <View style={styles.item33}>
                  <View style={styles.btnCenter}>
                    <Text style={styles.InputLabelStyle22}>
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          borderColor: 'transparent',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 50,
                          height: 50,
                          backgroundColor: '#26bd26',
                          borderRadius: 50,
                        }}>
                        <MaterialCommunityIcons
                          name="check"
                          size={30}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            key="2"
            style={{
              backgroundColor: '#00000',
              paddingLeft: 25,
              paddingRight: 25,
            }}>
            <View
              style={{
                height: '100%',
                borderColor: '#686868',
                borderWidth: 1,
                borderBottomEndRadius: 25,
                borderBottomStartRadius: 25,
              }}>
              <View style={{width: '100%', height: '40%'}}>
                <WebView javaScriptEnabled={true} source={{html: mapbox}} />
              </View>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ScrollView style={styles.scrollContainer}>
                    <View>
                      <KeyboardAvoidingView
                        enabled
                        style={{flex: 4, marginTop: 30}}>
                        <View style={styles.containerEspecial33}>
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
                              <Text style={styles.InputLabelStyle22}>
                                Sao Paulo - SP
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.containerEspecial}>
                          <View style={styles.item11}>
                            <View style={styles.SectionStyleEspecial2}>
                              <Text style={styles.InputLabelStyle}>
                                Detalhes
                              </Text>
                            </View>
                          </View>
                          <View style={styles.item21}>
                            <View style={styles.SectionStyleEspecial1}>
                              <Text style={styles.InputLabelStyle22}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.containerEspecial}>
                          <View style={styles.item11}>
                            <View style={styles.SectionStyleEspecial2}>
                              <Text style={styles.InputLabelStyle}>
                                Requisitos
                              </Text>
                            </View>
                          </View>
                          <View style={styles.item21}>
                            <View style={styles.SectionStyleEspecial1}>
                              <Text style={styles.InputLabelStyle22}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam
                              </Text>
                            </View>
                          </View>
                        </View>
                      </KeyboardAvoidingView>
                    </View>
                  </ScrollView>
                  <Image
                    source={Image_Http_URL}
                    style={{
                      height: 50,
                      position: 'absolute',
                      resizeMode: 'contain',
                      borderColor: '#686868',
                      borderWidth: 1,
                      width: 200,
                      backgroundColor: '#FFFFFF',
                      top: -30,
                      padding: 5,
                      borderRadius: 5,
                    }}
                  />
                </View>
              </View>

              <View style={styles.containerEspecial34}>
                <View style={styles.item33}>
                  <View style={styles.btnCenter}>
                    <Text style={styles.InputLabelStyle}>
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          borderColor: 'transparent',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 50,
                          height: 50,
                          backgroundColor: '#ff0000',
                          borderRadius: 50,
                        }}>
                        <MaterialCommunityIcons
                          name="close"
                          size={30}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>
                    </Text>
                  </View>
                </View>
                <View style={styles.item33}>
                  <View style={styles.btnCenter}>
                    <Text style={styles.InputLabelStyle22}>
                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                        }}>
                        <MaterialCommunityIcons
                          style={{
                            marginTop: 5,
                          }}
                          name="export-variant"
                          size={40}
                          color="#6948F4"
                        />
                      </TouchableOpacity>
                    </Text>
                  </View>
                </View>
                <View style={styles.item33}>
                  <View style={styles.btnCenter}>
                    <Text style={styles.InputLabelStyle22}>
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          borderColor: 'transparent',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 50,
                          height: 50,
                          backgroundColor: '#26bd26',
                          borderRadius: 50,
                        }}>
                        <MaterialCommunityIcons
                          name="check"
                          size={30}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ViewPager>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerEspecial34: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingTop: 20,
    borderColor: '#686868',
    borderTopWidth: 1,
  },
  containerEspecial: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  containerEspecial33: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  containerEspecial22: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  viewPager: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
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
  item33: {
    width: '33%',
  },
  btnCenter: {
    alignSelf: 'center',
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
    borderColor: '#686868',
    borderTopWidth: 1,
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
