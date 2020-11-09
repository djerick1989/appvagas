import React, { Component,useState }from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity, TextInput,  
  KeyboardAvoidingView,ScrollView,Keyboard,TouchableWithoutFeedback,
  Modal,TouchableHighlight, Alert,ActivityIndicator} 
from "react-native";
import Loader from '../Components/Loader';
import FadeInView from 'react-native-fade-in-view';
import DropdownItems from '../Components/DropdownItems'
import DropDownPicker from 'react-native-dropdown-picker';
import MapView, {Marker,Callout  } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LocationIQ from 'react-native-locationiq';
import {TextInputMask} from 'react-native-masked-text'
import DatePicker from 'react-native-datepicker'
import AsyncStorage from '@react-native-community/async-storage';
import {WebView} from 'react-native-webview';

export default class RegiterScreen extends Component {
  
constructor(props) {
  super(props);
  this.state = {
    showIndicator: false,
    UserName:'',
    FirstName:'',
    LastName:'',
    PhonNumber:'',
    Password:'',
    isregistered:false,
    CPF:'',
    Email:'',
    EmailYN:'',
    ExpYN:'',
    Address:'',
    subarea:'',
    Y_exp:'',
    R_exp:'',
    unemployeed:false,
    RenderTextState:'17',
    RegisterSuccess:'0',
    modalVisible: false,
    modalVisible_l:false,
    item1: null,
    isVisible1: false,
    item2: null,
    isVisible2: false,
    item3: null,
    isVisible3: false,
    item4: null,
    isVisible4: false,
    item5: null,
    isVisible5: false,
    item6: null,
    isVisible6: false,
    item7: null,
    isVisible7: false,
    item8: null,
    isVisible8: false,
    item9: null,
    isVisible9: false,
    item10: null,
    isVisible10: false,
    item11: null,
    isVisible11: false,
    item12: null,
    isVisible12: false,
    x:null,
    region:null,
    mapRegion: null,
    confirm_location:false,
    user_info:null,
    
  };

}

componentDidMount() {
  
  Geolocation.getCurrentPosition(
    (position) => {
        console.log(position);
        let region = { latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                      latitudeDelta:  0.00922*0.8,
                      longitudeDelta: 0.00421*0.5
                    }
        this.onRegionChange(region, region.latitude, region.longitude);
    },
    (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
}

onRegionChange(region,lat,lon) { 
  this.setState({
    mapRegion: region,

    x: {latitude: lat,
      longitude: lon}
  });
  
}

changeVisibility(state) {
  this.setState({
      isVisible1: false,isVisible2:false,isVisible3:false,isVisible4:false,isVisible5:false,isVisible6:false,
      isVisible7: false,isVisible8:false,isVisible9:false,isVisible10:false,isVisible11:false,isVisible12:false,
      ...state
  });
}
changValue(state){
  this.setState({
    subarea:null,
    item1: null,item2: null,item3: null,item4: null,item5: null,item6: null,
    item7: null,item8: null,item9: null,item10: null,item11: null,item12: null,
    ...state
});
}

ConfirmLocation(state){
  this.setState({
    modalVisible_l:!this.state.modalVisible_l,
    confirm_location:true,
    ...state
},function(){this.handleSubmitButton()});

}
renderImage(key){
  if(key==1){
      return <Image 
            style={{ width: 25,height: 25,resizeMode: 'contain',marginTop:10}}
            source={require('../Image/smile.png')}>
              </Image>
  }else{
     return null;
  }
}

renderChatBox(key,item){
  return    <View style={styles.chatboxStyle}>
              <FadeInView 
                    duration={750} 
                    style={styles.ChatContainerStyle}
                    onFadeComplete={() => this.setState({RenderTextState:key})}>
              <Text style={styles.ChatTextStyle}>{item}</Text>
              {this.renderImage(key)}
              </FadeInView>
            </View>;
}

renderAnswerBox(key,item){
  return    <View style={styles.answerboxStyle}>
              <FadeInView 
                    duration={750} 
                    style={styles.ChatContainerStyle}
                    onFadeComplete={() => this.setState({RenderTextState:key})}>
              <Text style={styles.ChatTextStyle}>{item}</Text>
              </FadeInView>
            </View>;
}

email_validate () {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.Email) === false) {
      console.log("Email is Not Correct");
      Alert.alert('Valid Email')
      return false;
    }
    else {
      console.log("Email is Correct");
      this.handleSubmitButton();
      
    }
  }

  handleSubmitButton(){
    // if (this.state.UserName!='') {
    //   if(this.state.RenderTextState<5)
    //     this.setState({RenderTextState:5});
    // }else {
    //   console.log(this.state.RenderTextState);
    //   return;
    // }
    // if(this.state.UserName.indexOf(' ')>0){
    //   const firstSpace = this.state.UserName.indexOf(' ');
    //   const length = this.state.UserName.length;
    //   this.setState({ FirstName:this.state.UserName.substring(0,firstSpace)}, function() { });
    //   this.setState({LastName:this.state.UserName.substring(firstSpace+1,length)}, function() { });
    // }
    // if(this.state.PhonNumber){
    //   console.log(this.state.PhonNumber);
    //  console.log(this.state.PhonNumber.length);
    //   if(this.state.PhonNumber.length!=11 )
    //   return;
    //   if(this.state.RenderTextState<8)
    //     this.setState({RenderTextState:8});
    // }else {
    //   return;
    // }

    // if(this.state.Password){
    //   // if(this.state.RenderTextState<10)
    //   //   this.setState({RenderTextState:10});
    // }else {
    //   return;
    // }
    

    // if(this.state.RegisterSuccess=='0' && this.state.RenderTextState==9){
    //   this.setState({showIndicator:true});
    //   fetch('https://mobapivagas.jobconvo.com/v1/user/create/', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       username: this.state.PhonNumber,
    //       first_name: this.state.FirstName,
    //       last_name: this.state.LastName,
    //       password: this.state.Password
    //     })
    //   })
    //     .then(response => response.json())
    //     .then(responseJson => {
    //       console.log(responseJson);
          
    //       if(responseJson.first_name){
            
    //         fetch('https://mobapivagas.jobconvo.com/v1/rest/login/', {
    //           method: 'POST',
    //           headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //           },
    //           body: JSON.stringify({
    //             username: this.state.PhonNumber,
    //             password: this.state.Password
    //           })
    //         })
    //           .then(response => response.json())
    //           .then(responseJson => {
    //             this.setState({RenderTextState:10});
    //             //Hide Loader
    //             this.setState({showIndicator:false});
    //             this.setState({isregistered:true})
    //             // If server response message same as Data Matched
    //             if (responseJson.token) {
    //               this.setState({user_info:responseJson});
    //               console.log(responseJson);
    //             } else {
                  
    //             }
    //           })
    //           .catch(error => {
    //             //Hide Loader
    //             this.setState({showIndicator:false});
    //             console.error(error);
    //           });
            
    //       }
    //       else {
    //         this.setState({showIndicator:false});
    //         Alert.alert(responseJson.username[0]);
    //         return;
    //       }
    //         console.log('Registration Successful. Please Login to proceed');
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // }
    // if(this.state.CPF){
    //   if(this.state.RenderTextState==11){
    //     this.setState({showIndicator:true});
    //     fetch('https://mobapivagas.jobconvo.com/v1/user/cpf/'+this.state.user_info.id+'/update/', {
    //       method: 'PATCH',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         "Authorization":"Token "+this.state.user_info.token.api_key,
    //       },
    //       body: JSON.stringify({
    //         cpf: this.state.CPF,
    //       })
    //     })
    //       .then(response => response.json())
    //       .then(responseJson => {
    //         console.log(responseJson);
    //         this.setState({showIndicator:false});
    //         if(responseJson.user){
    //           this.setState({RenderTextState:12});
    //         }
    //         else {
    //           if(responseJson.message)
    //           Alert.alert(responseJson.message);
    //           else
    //           Alert.alert('Vimos que já há um outro cadastro com seu CPF em nosso sistema. \n'+
    //           'Favor entrar em contato com nosso suporte em: \n'+'suporte@jobconvo.com');
    //           return;
    //         }
    //       })
    //       .catch(error => {
    //         console.error(error);
    //         Alert.alert('server error');
    //       });
    //   }
    // }else {
    //   return;
    // }
    // if(this.state.EmailYN=='Y')
    // if(this.state.Email){
    //   if(this.state.RenderTextState==14){
    //     this.setState({showIndicator:true});
    //     fetch('https://mobapivagas.jobconvo.com/v1/user/'+this.state.user_info.id+'/update/', {
    //       method: 'PATCH',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         "Authorization":"Token "+this.state.user_info.token.api_key,
    //       },
    //       body: JSON.stringify({
    //         email: this.state.Email,
    //       })
    //     })
    //       .then(response => response.json())
    //       .then(responseJson => {
    //         console.log(responseJson);
    //         this.setState({showIndicator:false});
    //         if(responseJson.email){
    //           this.setState({RenderTextState:16});
    //         }
    //         else {
    //           Alert.alert(responseJson.message);
    //           return;
    //         }
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });
    //   }
    // }else {
    //   Alert.alert('Valid Email!')
    //   return;
    // }

    if(this.state.confirm_location){
        if(this.state.RenderTextState==17){
          this.setState({showIndicator:true});
          LocationIQ.init("5417ddeaa4502b");
          LocationIQ.reverse(this.state.x.latitude, this.state.x.longitude)
          .then(json => {
              // var address = json.address;
              console.log(this.state.x);
              console.log(json.address);
              fetch('https://mobapivagas.jobconvo.com/v1/user/profile/'+this.state.user_info.id+'/update/', {
                method: 'PATCH',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  "Authorization":"Token "+this.state.user_info.token.api_key,
                },
                body: JSON.stringify({
                  country_code: json.address.country_code,
                  country: json.address.country,
                  state: json.address.state,
                  city: json.address.county,
                  zipcode: json.address.postcode,
                  addressnumber: json.address.house_number,
                  address: json.address.road
                })
              })
                .then(response => response.json())
                .then(responseJson => {
                  console.log(responseJson);
                  this.setState({showIndicator:false});
                  if(responseJson.user){
                    this.setState({RenderTextState:18});
                  }
                  else {
                    Alert.alert(responseJson.message);
                    return;
                  }
                })
                .catch(error => {
                  console.error(error);
                });
          })
          .catch(error => console.warn(error));
          
         
        }
      }else {
        return;
      }
    if(this.state.RenderTextState==32){
      this.setState({showIndicator:true});
      fetch('https://mobapivagas.jobconvo.com/v1/user/resume/exp/'+this.state.user_info.id+'/update/', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Authorization":"Token "+this.state.user_info.token.api_key,
        },
        body: JSON.stringify({
          years_of_experience: this.state.Y_exp,
          range_of_experience: this.state.R_exp,
          unemployed:this.state.unemployed,
          career_objective: this.state.subarea,
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({showIndicator:false});
          console.log(responseJson);
          this.setState({RenderTextState:33})
        })
        .catch(error => {
          console.error(error);
        });
    }

  }
  render(){
     const mapbox = this.state.x !== null && `<script src='https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.js'></script>
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
                // center: ['${this.state.x.latitude}', '${this.state.x.longitude}'],
                // center: ['current_latitude', 'current_longitude'],
                center: ['-122.42', '37.779'],
                style: 'https://tiles.locationiq.com/v2/streets/vector.json?key='+locationiqKey,
                zoom: 15,
                
            });
                
            // First create DOM element for the marker
            var el = document.createElement('div');
            el.className = 'marker';
            el.id = 'marker';
            // Set marker properties using JS
            el.style.backgroundImage = url(${'../Image/marker.png'});
    
            var marker = new mapboxgl.Marker(el, {
                draggable: true
            }).setLngLat([-122.444733, 37.767443])
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
    </body>`;
    
      const input_1 = <KeyboardAvoidingView enabled >
                        <FadeInView 
                          duration={750} 
                          style={styles.InputBoxStyle}>
                          <TextInput
                              style={styles.inputStyle}
                              onChangeText={text => this.setState({UserName:text})}
                              onSubmitEditing={() => this.handleSubmitButton()}
                              // underlineColorAndroid="#FFFFFF"
                              placeholder="NOME E SOBRENOME"
                              placeholderTextColor="#aaaaaa"
                              autoCapitalize="sentences"
                              returnKeyType="next"
                              blurOnSubmit={false}
                              editable={this.state.RenderTextState>10?false:true}
                              />
                      </FadeInView>
                      </KeyboardAvoidingView>
      const input_2 = <KeyboardAvoidingView enabled >
                      <FadeInView 
                          duration={750} 
                          style={styles.InputBoxStyle}>

                            <TextInputMask
                            style={styles.inputStyle}
                              type={'cel-phone'}
                              options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                              }}
                              value={this.state.PhonNumber}
                              onChangeText={text => {
                                this.setState({
                                  PhonNumber: text.replace(/[^0-9]/g, '')
                                })
                              }}
                              onSubmitEditing={() => this.handleSubmitButton()}
                              placeholder="(11) 98877 5566"
                              placeholderTextColor="#aaaaaa"
                              blurOnSubmit={false}
                              editable={this.state.RenderTextState>10?false:true}
                              // add the ref to a local var
                              ref={(ref) => this.phoneField = ref}
                            />
                      </FadeInView>
                      </KeyboardAvoidingView>
      const input_3=<KeyboardAvoidingView enabled >
                    <FadeInView 
                        duration={750} 
                        
                        style={styles.InputBoxStyle}>
                          
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={text => this.setState({Password:text})}
                            onSubmitEditing={() => this.handleSubmitButton()}
                            placeholder="*******"
                            placeholderTextColor="#aaaaaa"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            editable={this.state.RenderTextState>10?false:true}
                            />
                    </FadeInView>
                    </KeyboardAvoidingView>
      const input_4=<KeyboardAvoidingView enabled >
                    <FadeInView 
                        duration={750} 
                        style={styles.InputBoxStyle}>
                          <TextInputMask
                            style={styles.inputStyle}
                            type={'cpf'}
                            value={this.state.CPF}
                            onChangeText={text => {
                              this.setState({
                                CPF: text.replace(/[^0-9]/g, '')
                              })
                            }}
                            onSubmitEditing={() => this.handleSubmitButton()}
                            placeholderTextColor="#aaaaaa"
                            returnKeyType="next"
                            editable={this.state.RenderTextState>13?false:true}
                            />
                    </FadeInView>
                    </KeyboardAvoidingView>   
      const YN =  <View style={styles.InputBoxStyle}>
                  <FadeInView 
                      duration={750} 
                      style={styles.InputBoxStyle,{flexDirection:"row"}}>
                    <Text 
                      style={styles.YbuttonStyle}
                      onPress={()=> this.setState({RenderTextState:14,EmailYN:'Y'})}
                      >SIM</Text>
                    <Text 
                    style={styles.NbuttonStyle}
                    onPress={()=> this.setState({RenderTextState:14,EmailYN:'N'})}
                    >NÃO</Text>
                  </FadeInView>
                  </View>  
      const input_5=<KeyboardAvoidingView enabled >
                    <FadeInView 
                        duration={750} 
                        style={styles.InputBoxStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={text => this.setState({ Email: text })}
                            onSubmitEditing={() => this.email_validate()}
                            placeholder="INSERIR EMAIL"
                            placeholderTextColor="#aaaaaa"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            />
                    </FadeInView>
                    </KeyboardAvoidingView>   
      const button_map= <View style={styles.chatboxStyle}>
            <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() =>this.setState({modalVisible_l:!this.state.modalVisible_l})}
            // onPress={()=> this.setState({RenderTextState:18})}
            >
            <Text style={styles.buttonTextStyle}>CADASTRAR ENDEREÇO</Text>
            </TouchableOpacity>
          </View> 
      const button_1= <View style={styles.chatboxStyle}>
                        <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() =>this.setState({modalVisible:!this.state.modalVisible})}
                        >
                        <Text style={styles.buttonTextStyle}>ESCOLHER AREA</Text>
                        </TouchableOpacity>
                      </View> 
    const YN2 =  <View style={styles.InputBoxStyle}>
                  <FadeInView 
                      duration={750} 
                      style={styles.InputBoxStyle}>
                    <Text 
                      style={styles.ChatTextStyle}
                      onPress={()=> this.setState({RenderTextState:25,ExpYN:'Y'})}
                      // this.setState({EmailYN:'Y'})
                      >SIM</Text>
                    <Text 
                    style={styles.ChatTextStyle}
                    onPress={()=> this.setState({RenderTextState:25,ExpYN:'N'})}
                    >NÃO</Text>
                  </FadeInView>
                  </View>  
    const input_6=<KeyboardAvoidingView enabled >
                  <FadeInView 
                      duration={750} 
                      style={styles.InputBoxStyle}>
                      <TextInput
                          style={styles.inputStyle}
                          keyboardType='phone-pad'
                          onChangeText={num => this.setState({Y_exp:num})}
                          onSubmitEditing={() => this.setState({RenderTextState:27})}
                          placeholder="Years of experience"
                          placeholderTextColor="#aaaaaa"
                          autoCapitalize="sentences"
                          returnKeyType="next"
                          blurOnSubmit={false}
                          />
                  </FadeInView>
                  </KeyboardAvoidingView>  
    const input_7=<KeyboardAvoidingView enabled >
                  <FadeInView 
                      duration={750} 
                      style={styles.InputBoxStyle}>
                      <TextInput
                          style={styles.inputStyle}
                          onChangeText={num => this.setState({R_exp:num})}
                          onSubmitEditing={() => this.setState({RenderTextState:29})}
                          placeholder="Years of experience"
                          placeholderTextColor="#aaaaaa"
                          autoCapitalize="sentences"
                          returnKeyType="next"
                          blurOnSubmit={false}
                          />
                  </FadeInView>
                  </KeyboardAvoidingView> 
      const YN3 =  <View style={styles.InputBoxStyle}>
                   <FadeInView 
                       duration={750} 
                       style={styles.InputBoxStyle}>
                     <Text 
                       style={styles.ChatTextStyle}
                       onPress={()=> this.setState({RenderTextState:32,unemployeed:false},function(){this.handleSubmitButton()})}
                       // this.setState({EmailYN:'Y'})
                       >TRABALHANDO</Text>
                     <Text 
                     style={styles.ChatTextStyle}
                     onPress={()=> this.setState({RenderTextState:32,unemployeed:true},function(){this.handleSubmitButton()})}
                     >DESEMPREGADO</Text>
                   </FadeInView>
                   </View>  

      

    return ( this.state.x !== null && <ScrollView 
            style={styles.container} 
            ref={ref => {this.scrollView = ref}}
            onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
              <Loader loading={this.state.showIndicator} />
          <TouchableWithoutFeedback >
            <View style={{padding:20}}>
                {/* {this.state.RenderTextState >-1 && this.renderChatBox('1','Olá, muito bem vindo!')}
                {this.state.RenderTextState > 0 && this.renderChatBox('2','Sou o Pesquisa Vagas e estou aqui para ajuda-lo a conseguir um novo trabalho. Vamos lá?')}
                {this.state.RenderTextState > 1 && this.renderChatBox('3','Muito bem, que tal começar se apresentando?')}
                {this.state.RenderTextState > 2 && this.renderChatBox('4','Como você se chama?')}
                {this.state.RenderTextState > 3 && input_1}
                {this.state.RenderTextState > 4 && this.renderChatBox('6','Lindo nome!')}
                {this.state.RenderTextState > 5 && this.renderChatBox('7','Qual o número do seu celular?')}
                {this.state.RenderTextState > 6 && input_2}
                {this.state.RenderTextState > 7 && this.renderChatBox('9','Cadastre agora a sua senha de acesso')}
                {this.state.RenderTextState > 8 && input_3}
                {this.state.RenderTextState > 9 && this.renderChatBox('11','Qual o seu CPF?')}
                {this.state.RenderTextState > 10 && input_4}
                {this.state.RenderTextState > 11 && this.renderChatBox('13','Você tem email?')}
                {this.state.RenderTextState == 13 && YN} 
                {this.state.RenderTextState > 13 && this.state.EmailYN=='Y'&&input_5}
                {this.state.RenderTextState > 13 && this.state.EmailYN=='N'&&this.renderAnswerBox('15','Eu não tenho email')}
                {this.state.RenderTextState > 14 && this.state.EmailYN=='N'&&this.renderChatBox('16','Tudo bem, vamos continuar.')}
                {this.state.RenderTextState > 15 && this.renderChatBox('17','Legal. Seu cadastro foi realizado com sucesso!')} */}
                {this.state.RenderTextState > 16 && button_map}
                {this.state.RenderTextState > 17 && this.renderChatBox('19','Agora me diga em que área você quer trabalhar?')}
                {this.state.RenderTextState > 18 && button_1}
                {this.state.RenderTextState > 19 && this.renderAnswerBox('21',this.state.subarea)}
                {this.state.RenderTextState > 20 && this.renderChatBox('22','Ótima escolha!')}
                {this.state.RenderTextState > 21 && this.renderChatBox('23','Se quiser adicionar outras áreas de interesse, é super fácil. Basta ir em sua página de perfil.')}
                {this.state.RenderTextState > 22 && this.renderChatBox('24','Você têm experiência em '+this.state.subarea+'?')}
                {this.state.RenderTextState == 24 && YN2} 
                {this.state.RenderTextState > 24 && this.state.ExpYN=='Y'&& this.renderChatBox('26','QUANTOS ANOS DE EXPERIÊNCIA?')}
                {this.state.RenderTextState > 25 && this.state.ExpYN=='Y'&& input_6}
                {this.state.RenderTextState > 26 && this.state.ExpYN=='Y'&& this.renderChatBox('28','Me fale sobre seus trabalhos, atual e anteriores.')}
                {this.state.RenderTextState > 26 && this.state.ExpYN=='Y'&& input_7}
                {this.state.RenderTextState > 24 && this.state.ExpYN=='N'&&this.renderAnswerBox('28','Eu não tenho experiência')}
                {this.state.RenderTextState > 27 && this.state.ExpYN=='N'&&this.renderChatBox('29','Tranquilo, temos vagas sem experência também')}
                {this.state.RenderTextState > 28 && this.renderChatBox('30','Estamos quase acabando. Vou te mostrar vagas já já.')}
                {this.state.RenderTextState > 29 && this.renderChatBox('31','Você está trabalhando neste momento ou está desempregado?')}
                {this.state.RenderTextState == 31 && YN3} 
                {this.state.RenderTextState > 32 && this.renderChatBox('34','Entendi.')}
                {this.state.RenderTextState > 33 && this.renderChatBox('35','Me fale sobre sua formação acadêmica. Onde você estudou e qual o seu nível de instrução?')}
            </View>
          </TouchableWithoutFeedback>
          <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
               <View style = {styles.modal}>
                 <View style={{ flex: 5, justifyContent: 'flex-start' }}>
                  <DropDownPicker
                      items={DropdownItems.items1}
                      defaultValue={this.state.item1}
                      containerStyle={{height: 40}}
                      isVisible={this.state.isVisible1}
                      onOpen={() => this.changeVisibility({
                          isVisible1: true
                      })}
                      onClose={() => this.setState({
                          isVisible1: false
                      })}
                      onChangeItem={item => this.changValue({
                          item1: item.value,
                          subarea:item.value,
                      })}
                      placeholder={DropdownItems.mainarea[0].title}
                      labelStyle={styles.dLabelStyle}
                      itemStyle={styles.dItemStyle}
                      placeholderStyle={styles.dPlaceholderStyle}
                      dropDownStyle={styles.dStyle}
                  />
                  </View>
                  <View>
                  <DropDownPicker
                      items={DropdownItems.items2}
                      defaultValue={this.state.item2}
                      containerStyle={{height: 40}}
                      isVisible={this.state.isVisible2}
                      onOpen={() => this.changeVisibility({
                          isVisible2: true
                      })}
                      onClose={() => this.setState({
                          isVisible2: false
                      })}
                      onChangeItem={item => this.changValue({
                          item2: item.value,
                          subarea:item.value,
                      })}
                      placeholder={DropdownItems.mainarea[1].title}
                      labelStyle={styles.dLabelStyle}
                      itemStyle={styles.dItemStyle}
                      placeholderStyle={styles.dPlaceholderStyle}
                      dropDownStyle={styles.dStyle}
                  />
                  </View>
                  <DropDownPicker
                      items={DropdownItems.items3}
                      defaultValue={this.state.item3}
                      containerStyle={{height: 40}}
                      isVisible={this.state.isVisible3}
                      onOpen={() => this.changeVisibility({
                          isVisible3: true
                      })}
                      onClose={() => this.setState({
                          isVisible3: false
                      })}
                      onChangeItem={item => this.changValue({
                          item3: item.value,
                          subarea:item.value,
                      })}
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
                      isVisible={this.state.isVisible4}
                      onOpen={() => this.changeVisibility({
                          isVisible4: true
                      })}
                      onClose={() => this.setState({
                          isVisible4: false
                      })}
                      onChangeItem={item => this.changValue({
                          item4: item.value,
                          subarea:item.value,
                      })}
                      placeholder={DropdownItems.mainarea[3].title}
                      labelStyle={styles.dLabelStyle}
                      itemStyle={styles.dItemStyle}
                      placeholderStyle={styles.dPlaceholderStyle}
                      dropDownStyle={styles.dStyle}
                  />
                  <DropDownPicker
                      items={DropdownItems.items5}
                      defaultValue={this.state.item5}
                      containerStyle={{height: 40}}
                      isVisible={this.state.isVisible5}
                      onOpen={() => this.changeVisibility({
                          isVisible5: true
                      })}
                      onClose={() => this.setState({
                          isVisible5: false
                      })}
                      onChangeItem={item => this.changValue({
                          item5: item.value,
                          subarea:item.value,
                      })}
                      placeholder={DropdownItems.mainarea[4].title}
                      labelStyle={styles.dLabelStyle}
                      itemStyle={styles.dItemStyle}
                      placeholderStyle={styles.dPlaceholderStyle}
                      dropDownStyle={styles.dStyle}
                  />
                  <DropDownPicker
                      items={DropdownItems.items6}
                      defaultValue={this.state.item6}
                      containerStyle={{height: 40}}
                      isVisible={this.state.isVisible6}
                      onOpen={() => this.changeVisibility({
                          isVisible6: true
                      })}
                      onClose={() => this.setState({
                          isVisible6: false
                      })}
                      onChangeItem={item => this.changValue({
                          item6: item.value,
                          subarea:item.value,
                      })}
                      placeholder={DropdownItems.mainarea[5].title}
                      labelStyle={styles.dLabelStyle}
                      itemStyle={styles.dItemStyle}
                      placeholderStyle={styles.dPlaceholderStyle}
                      dropDownStyle={styles.dStyle}
                  />
                  <DropDownPicker
                      items={DropdownItems.items7}
                      defaultValue={this.state.item7}
                      containerStyle={{height: 40}}
                      isVisible={this.state.isVisible7}
                      onOpen={() => this.changeVisibility({
                          isVisible7: true
                      })}
                      onClose={() => this.setState({
                          isVisible7: false
                      })}
                      onChangeItem={item => this.changValue({
                          item7: item.value,
                          subarea:item.value,
                      })}
                      placeholder={DropdownItems.mainarea[6].title}
                      labelStyle={styles.dLabelStyle}
                      itemStyle={styles.dItemStyle}
                      placeholderStyle={styles.dPlaceholderStyle}
                      dropDownStyle={styles.dStyle}
                  />
                  <DropDownPicker
                      items={DropdownItems.items8}
                      defaultValue={this.state.item8}
                      containerStyle={{height: 40}}
                      isVisible={this.state.isVisible8}
                      onOpen={() => this.changeVisibility({
                          isVisible8: true
                      })}
                      onClose={() => this.setState({
                          isVisible8: false
                      })}
                      onChangeItem={item => this.changValue({
                          item8: item.value,
                          subarea:item.value,
                      })}
                      placeholder={DropdownItems.mainarea[7].title}
                      labelStyle={styles.dLabelStyle}
                      itemStyle={styles.dItemStyle}
                      placeholderStyle={styles.dPlaceholderStyle}
                      dropDownStyle={styles.dStyle}
                  />
                  <DropDownPicker
                      items={DropdownItems.items9}
                      defaultValue={this.state.item9}
                      containerStyle={{height: 40}}
                      isVisible={this.state.isVisible9}
                      onOpen={() => this.changeVisibility({
                          isVisible9: true
                      })}
                      onClose={() => this.setState({
                          isVisible9: false
                      })}
                      onChangeItem={item => this.changValue({
                          item9: item.value,
                          subarea:item.value,
                      })}
                      placeholder={DropdownItems.mainarea[8].title}
                      labelStyle={styles.dLabelStyle}
                      itemStyle={styles.dItemStyle}
                      placeholderStyle={styles.dPlaceholderStyle}
                      dropDownStyle={styles.dStyle}
                  />
                  <DropDownPicker
                      items={DropdownItems.items10}
                      defaultValue={this.state.item10}
                      containerStyle={{height: 40}}
                      isVisible={this.state.isVisible10}
                      onOpen={() => this.changeVisibility({
                          isVisible10: true
                      })}
                      onClose={() => this.setState({
                          isVisible10: false
                      })}
                      onChangeItem={item => this.changValue({
                          item10: item.value,
                          subarea:item.value,
                      })}
                      placeholder={DropdownItems.mainarea[9].title}
                      labelStyle={styles.dLabelStyle}
                      itemStyle={styles.dItemStyle}
                      placeholderStyle={styles.dPlaceholderStyle}
                      dropDownStyle={styles.dStyle}
                  />
                  <DropDownPicker
                      items={DropdownItems.items11}
                      defaultValue={this.state.item11}
                      containerStyle={{height: 40}}
                      isVisible={this.state.isVisible11}
                      onOpen={() => this.changeVisibility({
                          isVisible11: true
                      })}
                      onClose={() => this.setState({
                          isVisible11: false
                      })}
                      onChangeItem={item => this.changValue({
                          item11: item.value,
                          subarea:item.value,
                      })}
                      placeholder={DropdownItems.mainarea[10].title}
                      labelStyle={styles.dLabelStyle}
                      itemStyle={styles.dItemStyle}
                      placeholderStyle={styles.dPlaceholderStyle}
                      dropDownStyle={styles.dStyle}
                  />
                  <DropDownPicker
                      items={DropdownItems.items12}
                      defaultValue={this.state.item12}
                      containerStyle={{height: 40}}
                      isVisible={this.state.isVisible12}
                      onOpen={() => this.changeVisibility({
                          isVisible12: true
                      })}
                      onClose={() => this.setState({
                          isVisible12: false
                      })}
                      onChangeItem={item => this.changValue({
                          item12: item.value,
                          subarea:item.value,
                      })}
                      placeholder={DropdownItems.mainarea[11].title}
                      labelStyle={styles.dLabelStyle}
                      itemStyle={styles.dItemStyle}
                      placeholderStyle={styles.dPlaceholderStyle}
                      dropDownStyle={styles.dStyle}
                  />
                  
               </View>
               <View style={{ flex:1,justifyContent: 'flex-end',alignItems:'stretch',}}>
                 <View style={{backgroundColor:'#6948F4',alignItems:'center',padding:20,}}>
               <TouchableHighlight onPress = {() => {
                    this.setState({modalVisible:!this.state.modalVisible,RenderTextState:20})}}
                    >
                    
                    <Text style = {{color: '#FFFFFF',}}>Confirmar</Text>
                </TouchableHighlight>
                </View>
                </View>
            </Modal>
            <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modalVisible_l}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
               
               <View style = {{flex: 1}}>
                 <View style={{ flex: 3, justifyContent: 'flex-start',}}>

                    <WebView
                    javaScriptEnabled={true}
                      // originWhitelist={['*']}
                      source={{html:mapbox}}  
                    />


                  </View>
                  <View style={{ flex: 1, justifyContent: 'flex-start',alignItems:'center', padding:20}}>
                    <Text style={styles.mapLabel}>Permitir acesso à localização</Text>
                    <Text style={styles.mapText}>Isso nos ajudar a te mostrar vagas perto de onde você está ou regiões que voc6e escolher</Text>
                  </View>
                  <View style={{  flexDirection:'row', justifyContent: 'flex-start',alignSelf:'center', paddingBottom:50}}>
                    <TouchableOpacity
                      style={{borderRadius:10, padding:10, backgroundColor:'white', borderColor: '#6948F4',borderWidth: 1, margin:10}}
                      activeOpacity={0.5}
                      onPress={() =>this.setState({modalVisible_l:!this.state.modalVisible_l})}
                      >
                      <Text style={styles.WhiteButtonTextStyle}>Agora Não</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{borderRadius:10, padding:10, backgroundColor:'#6948F4', borderColor: '#ffffff',borderWidth: 1,margin:10}}
                      activeOpacity={0.5}
                      onPress={() =>{this.ConfirmLocation()
                                    }}
                      >
                      <Text style={styles.blueButtonTextStyle}>Permitir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </Modal>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mapLabel:{
    color:'#6948F4',
    fontWeight: 'bold',
    fontSize:22,
  },
  mapText:{
    padding:20,
    color:'black',
    fontSize:18,
    alignItems: 'center'
  },
  map: {
    height:400 ,
    borderRadius:20,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  chatboxStyle: {
    width:"70%",
    alignSelf:'flex-start'
  },
  answerboxStyle:{
    width:"70%",
    alignSelf:'flex-end'
  },

  YbuttonStyle: {
    backgroundColor:'#6948F4',
    color:'white', 
    fontWeight:'bold',
    fontSize:14,
    borderWidth:0,
    textAlignVertical:'center',
    paddingHorizontal:10,
    paddingVertical:8,
    borderRadius:10,
    marginHorizontal:10,
    
  },
  NbuttonStyle: {
    backgroundColor:'white',
    borderColor:'#6948F4',
    color:'#6948F4', 
    fontWeight:'bold',
    fontSize:14,
    borderWidth:2,
    textAlignVertical:'center',
    paddingHorizontal:10,
    paddingVertical:8,
    borderRadius:10,
    marginHorizontal:10,
  },
  ChatContainerStyle: {
    backgroundColor:'#e2dcfc',
    borderRadius:10, 
    padding:10,
    marginBottom:15
  },
  ChatTextStyle: {
    fontSize:18,
    color:'#000000'
  },
  MultiLineInputBoxStyle: {
    width:"70%", 
    marginBottom:15,
    alignSelf:'flex-end',
    height:100
  },
  InputBoxStyle:{
    width:"70%", 
    marginBottom:15,
    alignSelf:'flex-end',
    height:40
  },
  inputStyle: {
    color: '#000000',
    paddingLeft: 10,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#6948F4',
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
    fontSize: 14,
  },
  WhiteButtonTextStyle: {
    color: '#6948F4',
    fontWeight:'bold',
    padding: 5,
    fontSize: 16,
  },

  blueButtonTextStyle: {
    color: '#ffffff',
    fontWeight:'bold',
    padding: 5,
    fontSize: 16,
  },
  dLabelStyle:{
    fontWeight:'bold',
    textAlign: 'left',
    color:'#6948F4'
  },
  dItemStyle:{
    justifyContent: 'flex-start',
  },
  dPlaceholderStyle:{
    textAlign: 'left',
    color:'black',
    fontWeight:'200',
  },
  dStyle:{
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20,
    minHeight:300
  }
  
});