import React, { Component,useState }from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity, TextInput,  
  KeyboardAvoidingView,ScrollView,Keyboard,TouchableWithoutFeedback,
  Modal,TouchableHighlight} 
from "react-native";
import Loader from '../Components/Loader';
import FadeInView from 'react-native-fade-in-view';

import DropDownPicker from 'react-native-dropdown-picker';

export default class RegiterScreen extends Component {

constructor(props) {
  super(props);
  this.state = {
    UserName:'',
    FirstName:'',
    LastName:'',
    PhonNumber:'',
    Password:'',
    CPF:'',
    Email:'',
    EmailYN:'',
    Address:'',
    RenderTextState:'0',
    RegisterSuccess:'1',
    modalVisible: false,
    itemA: null,
    isVisibleA: false,

    itemB: null,
    isVisibleB: false
  };
  
}
changeVisibility(state) {
  this.setState({
      isVisibleA: false,
      isVisibleB: false,
      ...state
  });
}

// rednderChatbox({key,})
  handleSubmitButton(){
    if (this.state.UserName!='') {
      if(this.state.RenderTextState<5)
        this.setState({RenderTextState:5});
    }else {
      console.log(this.state.RenderTextState);
      return;
    }
    if(this.state.PhonNumber){
      if(this.state.PhonNumber.length!=11 )
      // return;
      if(this.state.RenderTextState<8)
        this.setState({RenderTextState:8});
    }else {
      return;
    }

    if(this.state.Password){
      if(this.state.RenderTextState<10)
        this.setState({RenderTextState:10});
    }else {
      return;
    }
    if(this.state.UserName.indexOf(' ')>0){
      const firstSpace = this.state.UserName.indexOf(' ');
      const length = this.state.UserName.length;
      this.setState({ FirstName:this.state.UserName.substring(0,firstSpace)}, function() { });
      this.setState({LastName:this.state.UserName.substring(firstSpace+1,length)}, function() { });
    }
    
    if(this.state.RegisterSuccess==0&&this.state.RenderTextState>9)
      fetch('https://mobapivagas.jobconvo.com/v1/user/create/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.PhonNumber,
          first_name:this.state.FirstName,
          last_name:this.state.LastName,
          password: this.state.Password
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          //Hide Loader
          // setLoading(false);
          console.log(responseJson);
          // If server response message same as Data Matched
          if (responseJson.status == 1) {
            // setIsRegistraionSuccess(true);
            console.log('Registration Successful. Please Login to proceed');
          } else {
            // setErrortext('Registration Unsuccessful');
          }
        })
        .catch(error => {
          console.error(error);
        });
    if(this.state.CPF){
      if(this.state.RenderTextState<12)
        this.setState({RenderTextState:12});
    }else {
      return;
    }
    if(this.state.EmailYN=='Y')
    if(this.state.Email){
      if(this.state.RenderTextState<16)
        this.setState({RenderTextState:16});
    }else {
      return;
    }

    if(this.state.Address){
      if(this.state.RenderTextState<19)
        this.setState({RenderTextState:19});
    }else {
      return;
    }
    
  }
  
  render(){
    
      const text_1 =<View style={styles.chatboxStyle}>
                      <FadeInView 
                          duration={750} 
                          style={styles.ChatContainerStyle}
                          onFadeComplete={() => this.setState({RenderTextState:1})}>
                          <Text style={styles.ChatTextStyle}>Olá, muito bem vindo!</Text>
                          <Image style={{ width: 25,height: 25,resizeMode: 'contain',marginTop:10}}
                                source={require('../Image/smile.png')}/>
                      </FadeInView>
                    </View>;

      const text_2 = <View style={styles.chatboxStyle}>
                      <FadeInView 
                            duration={750} 
                            style={styles.ChatContainerStyle}
                            onFadeComplete={() => this.setState({RenderTextState:2})}>
                      <Text style={styles.ChatTextStyle}>Sou o Pesquisa Vagas e estou aqui para ajuda-lo a conseguir um novo trabalho. Vamos lá?</Text>
                      </FadeInView>
                    </View>
      const text_3 = <View style={styles.chatboxStyle}>
                        <FadeInView 
                            duration={750} 
                            onFadeComplete={() => this.setState({RenderTextState:3})}    
                            style={styles.ChatContainerStyle}>
                          <Text style={styles.ChatTextStyle}>Muito bem, que tal começar se apresentando?</Text>
                        </FadeInView>
                      </View>
      const text_4 =<View style={styles.chatboxStyle}>
                      <FadeInView 
                          duration={750} 
                          onFadeComplete={() => this.setState({RenderTextState:4})} 
                          style={styles.ChatContainerStyle}>
                        <Text style={styles.ChatTextStyle}>Como você se chama?</Text>
                      </FadeInView>
                    </View>

      const input_1 = <KeyboardAvoidingView enabled >
                        <FadeInView 
                          duration={750} 
                          style={styles.InputBoxStyle}>
                          <TextInput
                              style={styles.inputStyle}
                              onChangeText={text => this.setState({UserName:text})}
                              onEndEditing={() => this.handleSubmitButton()}
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
      const text_6=<View style={styles.chatboxStyle}>
                    <FadeInView 
                      duration={750} 
                      onFadeComplete={() => this.setState({RenderTextState:6})}  
                      style={styles.ChatContainerStyle}>
                      <Text style={styles.ChatTextStyle}>Lindo nome!</Text>
                    </FadeInView>
                    </View>
      const text_7=<View style={styles.chatboxStyle}>
                    <FadeInView 
                      duration={750} 
                      onFadeComplete={() => this.setState({RenderTextState:7})}
                      style={styles.ChatContainerStyle}>
                      <Text style={styles.ChatTextStyle}>Qual o número do seu celular?</Text>
                    </FadeInView>
                    </View>
      const input_2 = <KeyboardAvoidingView enabled >
                      <FadeInView 
                          duration={750} 
                          style={styles.InputBoxStyle}>
                          <TextInput
                              style={styles.inputStyle}
                              keyboardType='phone-pad'
                              onChangeText={number => this.setState({PhonNumber:number})}
                              onEndEditing={() => this.handleSubmitButton()}
                              onSubmitEditing={() => this.handleSubmitButton()}
                              placeholder="(11) 98877 5566"
                              placeholderTextColor="#aaaaaa"
                              autoCapitalize="sentences"
                              returnKeyType="next"
                              blurOnSubmit={false}
                              />
                      </FadeInView>
                      </KeyboardAvoidingView>
      const text_9=<View style={styles.chatboxStyle}>
                    <FadeInView 
                        duration={750} 
                        onFadeComplete={() => this.setState({RenderTextState:9})}
                        style={styles.ChatContainerStyle}>
                      <Text style={styles.ChatTextStyle}>Cadastre agora a sua senha de acesso</Text>
                    </FadeInView>
                    </View>
      const input_3=<KeyboardAvoidingView enabled >
                    <FadeInView 
                        duration={750} 
                        
                        style={styles.InputBoxStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={text => this.setState({Password:text})}
                            onEndEditing={() => this.handleSubmitButton()}
                            onSubmitEditing={() => this.handleSubmitButton()}
                            placeholder="*******"
                            placeholderTextColor="#aaaaaa"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            />
                    </FadeInView>
                    </KeyboardAvoidingView>
      const text_11=<View style={styles.chatboxStyle}>
                    <FadeInView 
                        duration={750} 
                        onFadeComplete={() => this.setState({RenderTextState:11})}
                        style={styles.ChatContainerStyle}>
                      <Text style={styles.ChatTextStyle}>Qual o seu CPF?</Text>
                    </FadeInView>
                    </View>
      const input_4=<KeyboardAvoidingView enabled >
                    <FadeInView 
                        duration={750} 
                        style={styles.InputBoxStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={text => this.setState({CPF:text})}
                            onEndEditing={() => this.handleSubmitButton()}
                            onSubmitEditing={() => this.handleSubmitButton()}
                            placeholder="CPF"
                            placeholderTextColor="#aaaaaa"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            />
                    </FadeInView>
                    </KeyboardAvoidingView>   
      const text_13=<View style={styles.chatboxStyle}>
                    <FadeInView 
                        duration={750} 
                        onFadeComplete={() => this.setState({RenderTextState:13})}
                        style={styles.ChatContainerStyle}>
                      <Text style={styles.ChatTextStyle}>Você tem email?</Text>
                    </FadeInView>
                    </View>   
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
                            onEndEditing={() => this.handleSubmitButton()}
                            onSubmitEditing={() => this.handleSubmitButton()}
                            placeholder="Email"
                            placeholderTextColor="#aaaaaa"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            />
                    </FadeInView>
                    </KeyboardAvoidingView>   
      const text_15=<View style={styles.InputBoxStyle}>
                    <FadeInView 
                        duration={750} 
                        onFadeComplete={() => this.setState({RenderTextState:15})}
                        style={styles.ChatContainerStyle}>
                      <Text style={styles.ChatTextStyle}>"Eu não tenho email</Text>
                    </FadeInView>
                    </View>
      const text_16=<View style={styles.chatboxStyle}>
                    <FadeInView 
                        duration={750} 
                        onFadeComplete={() => this.setState({RenderTextState:16})}
                        style={styles.ChatContainerStyle}>
                      <Text style={styles.ChatTextStyle}>Tudo bem, vamos continuar.</Text>
                    </FadeInView>
                    </View> 
      const text_17=<View style={styles.chatboxStyle}>
                    <FadeInView 
                        duration={750} 
                        onFadeComplete={() => this.setState({RenderTextState:17})}
                        style={styles.ChatContainerStyle}>
                      <Text style={styles.ChatTextStyle}>Legal. Seu cadastro foi realizado com sucesso!</Text>
                    </FadeInView>
                    </View> 
      const text_18=<View style={styles.chatboxStyle}>
                    <FadeInView 
                        duration={750} 
                        onFadeComplete={() => this.setState({RenderTextState:18})}
                        style={styles.ChatContainerStyle}>
                      <Text style={styles.ChatTextStyle}>Legal. Seu cadastro foi realizado com sucesso!</Text>
                    </FadeInView>
                    </View>  
      const input_6=<KeyboardAvoidingView enabled >
                    <FadeInView 
                        duration={750} 
                        style={styles.MultiLineInputBoxStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={text => this.setState({Address:text})}
                            onEndEditing={() => this.handleSubmitButton()}
                            onSubmitEditing={() => this.handleSubmitButton()}
                            placeholder="Address"
                            placeholderTextColor="#aaaaaa"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            multiline
                            numberOfLines={4}
                            />
                    </FadeInView>
                    </KeyboardAvoidingView>   
      const text_20=<View style={styles.chatboxStyle}>
                    <FadeInView 
                        duration={750} 
                        onFadeComplete={() => this.setState({RenderTextState:20})}
                        style={styles.ChatContainerStyle}>
                      <Text style={styles.ChatTextStyle}>Agora me diga em que área você quer trabalhar?</Text>
                    </FadeInView>
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
    return (
        <ScrollView 
            style={styles.container} 
            ref={ref => {this.scrollView = ref}}
            onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
          <TouchableWithoutFeedback >
            
            <View style={{padding:20}}>
                {this.state.RenderTextState >-1 && text_1}
                {this.state.RenderTextState > 0 && text_2}
                {this.state.RenderTextState > 1 && text_3}
                {this.state.RenderTextState > 2 && text_4}
                {this.state.RenderTextState > 3 && input_1}
                {this.state.RenderTextState > 4 && text_6}
                {this.state.RenderTextState > 5 && text_7}
                {this.state.RenderTextState > 6 && input_2}
                {this.state.RenderTextState > 7 && text_9}
                {this.state.RenderTextState > 8 && input_3}
                {this.state.RenderTextState > 9 && text_11}
                {this.state.RenderTextState > 10 && input_4}
                {this.state.RenderTextState > 11 && text_13}
                {this.state.RenderTextState == 13 && YN} 
                {this.state.RenderTextState > 13 && this.state.EmailYN=='Y'&&input_5}
                {this.state.RenderTextState > 13 && this.state.EmailYN=='N'&&text_15}
                {this.state.RenderTextState > 14 && this.state.EmailYN=='N'&&text_16}
                {this.state.RenderTextState > 15 &&text_17}
                {this.state.RenderTextState > 16 &&text_18}
                {this.state.RenderTextState > 17 &&input_6}
                {this.state.RenderTextState > 18 &&text_20}
                {this.state.RenderTextState > 19 &&button_1}
            </View>
          </TouchableWithoutFeedback>
          <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
               
               <View style = {styles.modal}>
                  <DropDownPicker
                      items={[
                          {label: 'UK', value: 'uk'},
                          {label: 'France', value: 'france'},
                      ]}
                      defaultValue={this.state.itemA}
                      containerStyle={{height: 40}}
                      isVisible={this.state.isVisibleA}
                      onOpen={() => this.changeVisibility({
                          isVisibleA: true
                      })}
                      onClose={() => this.setState({
                          isVisibleA: false
                      })}
                      onChangeItem={item => this.setState({
                          itemA: item.value,
                          itemB: null
                      })}
                      placeholder="Area!"
                  />

                  
                  <DropDownPicker
                      items={[
                          {label: 'UK', value: 'uk'},
                          {label: 'France', value: 'france'},
                      ]}
                      defaultValue={this.state.itemB}
                      containerStyle={{height: 40}}

                      isVisible={this.state.isVisibleB}
                      onOpen={() => this.changeVisibility({
                          isVisibleB: true
                      })}
                      onClose={() => this.setState({
                          isVisibleB: false
                      })}
                      onChangeItem={item => this.setState({
                          itemB: item.value,
                          itemA: null
                      })}
                  />
                  
                  <TouchableHighlight onPress = {() => {
                     this.setState({modalVisible:!this.state.modalVisible})}}>
                     
                     <Text style = {styles.text}>Close Modal</Text>
                  </TouchableHighlight>
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
  ChatContainerStyle: {
    backgroundColor:'#e2dcfc',
    borderRadius:10, 
    padding:10,
    marginBottom:15
  },
  ChatTextStyle: {
    fontSize:14,
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
    height:30
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
    fontSize: 18,
  },
  
});