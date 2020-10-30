import React, { Component,useState }from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity, TextInput,  
  KeyboardAvoidingView,ScrollView,Keyboard,TouchableWithoutFeedback,
  Modal,TouchableHighlight, Alert,ActivityIndicator} 
from "react-native";
import Loader from '../Components/Loader';
import FadeInView from 'react-native-fade-in-view';
import DropdownItems from '../Components/DropdownItems'
import DropDownPicker from 'react-native-dropdown-picker';
import MapPicker from "react-native-map-picker";

export default class RegiterScreen extends Component {
  
constructor(props) {
  super(props);
  this.state = {
    showIndicator: false,
    phon_flag: '0',
    UserName:'',
    FirstName:'',
    LastName:'',
    PhonNumber:'',
    Password:'',
    CPF:'',
    Email:'',
    EmailYN:'',
    Address:'',
    subarea:'',
    RenderTextState:'0',
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
  };
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
  return    <View style={styles.anserboxStyle}>
              <FadeInView 
                    duration={750} 
                    style={styles.ChatContainerStyle}
                    onFadeComplete={() => this.setState({RenderTextState:key})}>
              <Text style={styles.ChatTextStyle}>{item}</Text>
              </FadeInView>
            </View>;
}

  handleSubmitButton(){
    if (this.state.UserName!='') {
      if(this.state.RenderTextState<5)
        this.setState({RenderTextState:5});
    }else {
      console.log(this.state.RenderTextState);
      return;
    }
    if(this.state.UserName.indexOf(' ')>0){
      const firstSpace = this.state.UserName.indexOf(' ');
      const length = this.state.UserName.length;
      this.setState({ FirstName:this.state.UserName.substring(0,firstSpace)}, function() { });
      this.setState({LastName:this.state.UserName.substring(firstSpace+1,length)}, function() { });
    }
    if(this.state.PhonNumber){
      if(this.state.PhonNumber.length!=11 )
      return;
      if(this.state.RenderTextState<8)
        this.setState({RenderTextState:8});
    }else {
      return;
    }

    if(this.state.Password){
      // if(this.state.RenderTextState<10)
      //   this.setState({RenderTextState:10});
    }else {
      return;
    }
    

    if(this.state.RegisterSuccess=='0' && this.state.RenderTextState==9){
      this.setState({showIndicator:true});
      fetch('https://mobapivagas.jobconvo.com/v1/user/create/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.PhonNumber,
          first_name: this.state.FirstName,
          last_name: this.state.LastName,
          password: this.state.Password
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          this.setState({showIndicator:false});
          if(responseJson.first_name){
            this.setState({RenderTextState:10});
          }
          else {
            Alert.alert(responseJson.username[0]);
            return;
          }
            console.log('Registration Successful. Please Login to proceed');
        })
        .catch(error => {
          console.error(error);
        });
    }
    if(this.state.CPF){
      if(this.state.RenderTextState==11){
        this.setState({showIndicator:true});
        fetch('https://mobapivagas.jobconvo.com/v1/user/cpf/1/update/', {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization":"Token 73f4f21cccd760fc5147fc821f94a54c954c31e0",
          },
          body: JSON.stringify({
            cpf: this.state.CPF,
          })
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson);
            this.setState({showIndicator:false});
            if(responseJson.user){
              this.setState({RenderTextState:12});
            }
            else {
              Alert.alert(responseJson.message);
              return;
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    }else {
      return;
    }
    if(this.state.EmailYN=='Y')
    if(this.state.Email){
      if(this.state.RenderTextState==14){
        this.setState({showIndicator:true});
        fetch('https://mobapivagas.jobconvo.com/v1/user/1/update/', {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization":"Token 73f4f21cccd760fc5147fc821f94a54c954c31e0",
          },
          body: JSON.stringify({
            email: this.state.Email,
          })
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson);
            this.setState({showIndicator:false});
            if(responseJson.email){
              this.setState({RenderTextState:16});
            }
            else {
              Alert.alert(responseJson.message);
              return;
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    }else {
      return;
    }

    // if(this.state.Address){
    //   if(this.state.RenderTextState==17){
    //     fetch('https://mobapivagas.jobconvo.com/v1/user/1/update/', {
    //       method: 'PATCH',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         "Authorization":"Token 73f4f21cccd760fc5147fc821f94a54c954c31e0",
    //       },
    //       body: JSON.stringify({
    //         email: this.state.Email,
    //       })
    //     })
    //       .then(response => response.json())
    //       .then(responseJson => {
    //         console.log(responseJson);
    //         if(responseJson.email){
    //           this.setState({RenderTextState:18});
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
    //   return;
    // }
  }
  render(){
    
      const input_1 = <KeyboardAvoidingView enabled >
                        <FadeInView 
                          duration={750} 
                          style={styles.InputBoxStyle}>
                          <TextInput
                              style={styles.inputStyle}
                              onChangeText={text => this.setState({UserName:text})}
                              onSubmitEditing={() => this.handleSubmitButton()}
                              // underlineColorAndroid="#FFFFFF"
                              placeholder="User Name"
                              placeholderTextColor="#aaaaaa"
                              autoCapitalize="sentences"
                              returnKeyType="next"
                              blurOnSubmit={false}
                              />
                      </FadeInView>
                      </KeyboardAvoidingView>
      const input_2 = <KeyboardAvoidingView enabled >
                      <FadeInView 
                          duration={750} 
                          style={styles.InputBoxStyle}>
                          <TextInput
                              ref='mobileNo'
                              style={styles.inputStyle}
                              keyboardType='phone-pad'
                              onChangeText={number => this.setState({PhonNumber:number.replace(/[^0-9]/g, '')})}
                              onSubmitEditing={() => this.handleSubmitButton()}
                              placeholder="(11) 98877 5566"
                              placeholderTextColor="#aaaaaa"
                              autoCapitalize="sentences"
                              returnKeyType="next"
                              blurOnSubmit={false}
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
                            />
                    </FadeInView>
                    </KeyboardAvoidingView>
      const input_4=<KeyboardAvoidingView enabled >
                    <FadeInView 
                        duration={750} 
                        style={styles.InputBoxStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={text => this.setState({CPF:text.replace(/[^0-9]/g, '')})}
                            onSubmitEditing={() => this.handleSubmitButton()}
                            placeholder="CPF"
                            placeholderTextColor="#aaaaaa"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            />
                    </FadeInView>
                    </KeyboardAvoidingView>   
      const YN =  <View style={styles.InputBoxStyle}>
                  <FadeInView 
                      duration={750} 
                      style={styles.InputBoxStyle}>
                    <Text 
                      style={styles.ChatTextStyle}
                      onPress={()=> this.setState({RenderTextState:14,EmailYN:'Y'})}
                      // this.setState({EmailYN:'Y'})
                      >SIM</Text>
                    <Text 
                    style={styles.ChatTextStyle}
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
                            onChangeText={text => this.setState({Email:text})}
                            onSubmitEditing={() => this.handleSubmitButton()}
                            placeholder="Email"
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
            // onPress={() =>this.setState({modalVisible_l:!this.state.modalVisible_l})}
            onPress={()=> this.setState({RenderTextState:18})}
            >
            <Text style={styles.buttonTextStyle}>CADASTRAR ENDEREÇO</Text>
            </TouchableOpacity>
          </View> 
      // const input_6=<KeyboardAvoidingView enabled >
      //               <FadeInView 
      //                   duration={750} 
      //                   style={styles.MultiLineInputBoxStyle}>
      //                   <TextInput
      //                       style={styles.inputStyle}
      //                       onChangeText={text => this.setState({Address:text})}
      //                       onEndEditing={() => this.handleSubmitButton()}
      //                       onSubmitEditing={() => this.handleSubmitButton()}
      //                       placeholder="Address"
      //                       placeholderTextColor="#aaaaaa"
      //                       autoCapitalize="sentences"
      //                       returnKeyType="next"
      //                       blurOnSubmit={false}
      //                       multiline
      //                       numberOfLines={4}
      //                       />
      //               </FadeInView>
      //               </KeyboardAvoidingView>   
      const button_1= <View style={styles.chatboxStyle}>
                        <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() =>this.setState({modalVisible:!this.state.modalVisible})}
                        >
                        <Text style={styles.buttonTextStyle}>ESCOLHER AREA</Text>
                        </TouchableOpacity>
                      </View>            
    return (
        <ScrollView 
            style={styles.container} 
            ref={ref => {this.scrollView = ref}}
            onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
              <Loader loading={this.state.showIndicator} />
          <TouchableWithoutFeedback >
            <View style={{padding:20}}>
                {this.state.RenderTextState >-1 && this.renderChatBox('1','Olá, muito bem vindo!')}
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
                {this.state.RenderTextState > 15 && this.renderChatBox('17','Legal. Seu cadastro foi realizado com sucesso!')}
                {this.state.RenderTextState > 16 && button_map}
                {this.state.RenderTextState > 17 && this.renderChatBox('19','Agora me diga em que área você quer trabalhar?')}
                {this.state.RenderTextState > 18 && button_1}
                {this.state.RenderTextState > 19 && this.renderAnswerBox('21',this.state.subarea)}

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
               
               <View style = {styles.modal}>
                 <View style={{ flex: 5, justifyContent: 'flex-start' }}>
                  <MapPicker
                    initialCoordinate={{
                      latitude: 37.78825,
                      longitude: -122.4324,
                    }}
                    onLocationSelect={({latitude, longitude})=>console.log(longitude)}
                  />
                 </View>
                </View>
            </Modal>
        </ScrollView>
    );
  }
}

// export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  // SectionStyle: {
  //   height: 70,
  //   marginTop: 20,
  //   marginLeft: 35,
  //   marginRight: 35,
  //   margin: 10,
  // },
  chatboxStyle: {
    width:"70%",
    alignSelf:'flex-start'
  },
  anserboxStyle:{
    width:"70%",
    alignSelf:'flex-end'
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