import React, { Component } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { getAllJobs, postUserApplyJob, getUserJobs } from '../../helpers/api';
import ViewPager from '@react-native-community/viewpager';
import { WebView } from 'react-native-webview';
import { isUndefined } from 'lodash';
export default class ExperienciaScreen extends Component {
  state = {
    empresa: '',
    cargo: '',
    searching: false,
    searchId: 0,
    search: '',
    descripcion: '',
    currentPage: 0,
    currentID: 0,
    modalIs: 'created',
    dateStart: '',
    dateFinish: '',
    listOfJobs: [],
    listOfSearchJobs: [],
    modalVisible: false,
    showNoMore: false,
    spinner: true,
    comeOutside: false,
    firstOpen: true,
    subarea: null,
  };

  viewPager = React.createRef();

  async componentDidMount() {
    const [isValid, Jobs] = await getAllJobs();
    const [isValid2, JobsUser] = await getUserJobs();

    let array = [];
    Jobs.results.forEach(element => {
      if (isUndefined(this.findInArray(element.uid, JobsUser))) {
        array.push(element);
      }
    });

    this.setState({
      listOfSearchJobs: array,
      listOfJobs: array,
      firstOpen: true,
      spinner: false,
      comeOutside: false
    });
  }

  findInArray = (uid, array) => {
    const result = array.find(x => x.job === uid);
    return result;
  }

  onSearchClick = async () => {
    if (this.state.search === '') {
      const [isValid, Jobs] = await getAllJobs();
      const [isValid2, JobsUser] = await getUserJobs();
      let array = [];
      Jobs.results.forEach(element => {
        if (isUndefined(this.findInArray(element.uid, JobsUser))) {
          array.push(element);
        }
      });
      this.setState({
        listOfSearchJobs: array,
        listOfJobs: array,
        firstOpen: true,
        spinner: false,
      });
    } else {
      const search = this.state.search;
      const listFinded = this.state.listOfJobs.findIndex(
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
      this.go(listFinded);
    }
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  getMapbox = (latitude, longitude) => {
    return (
      `<!DOCTYPE html>
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
                center: [` +
      latitude +
      ',' +
      longitude +
      `],
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
                draggable: false
            }).setLngLat([` +
      latitude +
      ',' +
      longitude +
      `])
              .addTo(map);
    
            // After the mouse is released the following function is executed which updates the displayed lat and long
            // function onDragEnd() {
            //     var lngLat = marker.getLngLat();
            //     coordinates.style.display = 'block';
            //     coordinates.innerHTML =
            //         'Latitude: ' + lngLat.lat + '<br />Longitude: ' + lngLat.lng;
            // }
    
            // marker.on('dragend', onDragEnd);
        </script>
    </body>
    </html>`
    );
  };

  clickOk = async (uidIn) => {
    this.setState({ spinner: true });

    this.go('next');
    const [a, b] = await postUserApplyJob({
      uid: uidIn,
      status: '1',
    });

    const result = this.state.listOfJobs.filter(x => x.uid !== uidIn);
    if (result === null) {
      this.setState({
        listOfSearchJobs: [],
        listOfJobs: [],
        spinner: false,
      });
    } else {
      this.setState({
        listOfSearchJobs: result,
        listOfJobs: result,
        spinner: false,
      });
    }
  };

  move = (delta) => {
    const page = this.state.page + delta;
    this.go(page);
  };

  go = (page) => {
    if (page == 'next') {
      const goToPage = this.state.currentPage + 1;
      this.viewPager.current.setPage(goToPage);
      this.setState({
        currentPage: goToPage,
      });
    } else {
      const newPage = parseInt(page);
      this.viewPager.current.setPage(newPage);
      this.setState({
        currentPage: newPage,
      });
    }
  };

  clickNo = () => {
    this.go('next');
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor="#6948F4" barStyle="default" />
        <Spinner visible={this.state.spinner} textContent={'Carregando...'} textStyle={{ color: 'white' }} />
        <View style={{ display: 'flex', flex: 1 }}>
          {/* Search bar */}
          <View style={{ display: 'flex', flex: 0.1, backgroundColor: '#6948F4', paddingHorizontal: 20, justifyContent: 'center' }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
              <TextInput value={this.state.search} onChangeText={this.updateSearch} placeholder="Buscar Vagas" placeholderTextColor="white" style={{ width: '85%', backgroundColor: '#5A3DD6', borderRadius: 3, paddingHorizontal: 10 }} />
              <Text onPress={this.onSearchClick} style={{ color: 'white', marginLeft: 10 }}>Buscar</Text>
            </View>
          </View>
          {/* View Pager */}
          <ViewPager
            style={{ flex: 0.9, marginVertical: 30 }}
            initialPage={0}
            ref={this.viewPager}
            transitionStyle="curl">
            {this.state.listOfJobs.length > this.state.currentPage ?
              this.state.listOfJobs.map((element, index) => {
                return (
                  <View key={element.id} collapsable={false} style={{ display: 'flex', flex: 1, paddingRight: 25, paddingLeft: 25 }}>
                    <View style={{ flex: 0.4 }}>
                      <WebView
                        javaScriptEnabled={true}
                        source={{
                          html: this.getMapbox(
                            element.latitude,
                            element.longitude,
                          ),
                        }}
                      />
                    </View>
                    <View style={{ flex: 0.5, backgroundColor: 'white' }}>
                      <ScrollView>
                        <Text style={{ fontWeight: 'bold', fontSize: 22, marginTop: 50, marginLeft: 30 }}>
                          {element.title}
                        </Text>
                        <Text style={{ fontSize: 16, marginLeft: 30 }}>
                          {`[${element.company_name}]`}
                        </Text>
                        <View style={{ marginLeft: 30, marginTop: 20, paddingRight: 40, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', alignContent: 'flex-start' }}>
                          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            Local
                        </Text>
                          <Text style={{ fontSize: 16, marginLeft: 55 }}>
                            {element.state} - {element.country}
                          </Text>
                        </View>
                        <View style={{ marginLeft: 30, marginTop: 20, paddingRight: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', alignContent: 'flex-start' }}>
                          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            Detalhes
                        </Text>
                          <Text style={{ fontSize: 16, marginLeft: 30, marginRight: 20 }}>
                            {element.description}
                          </Text>
                        </View>
                        <View style={{ marginLeft: 30, marginTop: 20, paddingRight: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', alignContent: 'flex-start' }}>
                          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            Requisitos
                        </Text>
                          <Text style={{ fontSize: 16, marginLeft: 15, marginRight: 20 }}>
                            {element.requirements}
                          </Text>
                        </View>
                      </ScrollView>
                      {element.logo !== null && element.logo !== '' ? (
                        <Image
                          source={{
                            uri: element.logo
                              .replace('//', '/')
                              .replace('//', '/'),
                          }}
                          style={{
                            position: 'absolute',
                            resizeMode: 'contain',
                            alignSelf: 'center',
                            borderColor: '#686868',
                            borderWidth: 1,
                            height: 70,
                            width: 70,
                            backgroundColor: '#FFFFFF',
                            top: -50,
                            padding: 5,
                            borderRadius: 5,
                          }}
                        />
                      ) : null}
                    </View>
                    <View style={{ flex: 0.1, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 40, alignContent: 'center', alignItems: 'center', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, backgroundColor: 'white', marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                      <TouchableOpacity
                        onPress={() => this.clickNo()}
                        style={{
                          borderWidth: 1,
                          borderColor: 'transparent',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          backgroundColor: '#ff0000',
                          borderRadius: 50,
                        }}>
                        <MaterialCommunityIcons
                          name="close"
                          size={20}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          Share.open({
                            title: element.title,
                            message: element.description,
                          })
                            .then((res) => {

                            })
                            .catch((err) => {
                            })
                        }
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
                          size={30}
                          color="#6948F4"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.clickOk(element.uid)}
                        style={{
                          borderWidth: 1,
                          borderColor: 'transparent',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          backgroundColor: '#26bd26',
                          borderRadius: 50,
                        }}>
                        <MaterialCommunityIcons
                          name="check"
                          size={20}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
              :
              <View key="99" style={{ paddingLeft: 25, paddingRight: 25 }}>
                <View style={{ height: '100%', alignSelf: 'center' }}>
                  <Text style={{ top: 250, color: '#686868', fontSize: 20 }}>
                    volte mais tarde para procurar mais vagas
                  </Text>
                </View>
              </View>}
          </ViewPager>
        </View>
      </>
    );
  }
}
