import React, { Component,useState }from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity, TextInput,  KeyboardAvoidingView,ScrollView,Keyboard,TouchableWithoutFeedback} from "react-native";
import Loader from '../Components/Loader';
import FadeInView from 'react-native-fade-in-view';
export default class RegiterScreen extends Component {
// const RegisterScreen = props => {
//   let [userPhon, setUserPhon] = useState('');
//   let [loading, setLoading] = useState(false);
//   let [errortext, setErrortext] = useState('');
//   let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
constructor(props) {
  super(props);
  this.state = {
    UserName:'',
    FirstName:'',
    LastName:'',
    PhonNumber:'',
    Password:'',
    RenderTextState:'0',
  };
  
}
   handleSubmitButton(){
    if (this.state.UserName!='') {
      if(this.state.RenderTextState<5)
        this.setState({RenderTextState:5});
    }else {
      console.log(this.state.RenderTextState);
      return;
    }
    if(this.state.PhonNumber){
      if(this.state.RenderTextState<8)
        this.setState({RenderTextState:8});
    }else {
      console.log(this.state.RenderTextState);
      return;
    }

    if(this.state.Password){
      if(this.state.RenderTextState<10)
        this.setState({RenderTextState:10});
    }else {
      console.log(this.state.RenderTextState);
      return;
    }
    if(this.state.UserName.indexOf(' ')>0){
      const firstSpace = this.state.UserName.indexOf(' ');
      const length = this.state.UserName.length;
      this.setState({FirstName:this.state.UserName.substring(0,firstSpace)});
      this.setState({LastName:this.state.UserName.substring(firstSpace,length)});
    }
    // if('a'=='a')
    //   console.log(this.state.LastName);
    // var formBody = [];
    // for (var key in dataToSend) {
    //   var encodedKey = encodeURIComponent(key);
    //   var encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    
    fetch('https://mywebsite.com/endpoint/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue'
      })
    })
    // fetch('https://aboutreact.herokuapp.com/register.php', {
    //   method: 'POST',
    //   body: formBody,
    //   headers: {
    //     //Header Defination
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // })
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
        //Hide Loader
        // setLoading(false);
        console.error(error);
      });
  }

  render(){
      const text_1 =<View style={{width:"70%", alignSelf:'flex-start'}}>
                      <FadeInView 
                          duration={750} 
                          style={{backgroundColor:'#e2dcfc',borderRadius:10, padding:10, marginBottom:15}}
                          onFadeComplete={() => this.setState({RenderTextState:1})}>
                          <Text style={{fontSize:18,color:'#000000'}}>Olá, muito bem vindo!</Text>
                          <Image style={{
                                          width: 25,
                                          height: 25,
                                          resizeMode: 'contain',
                                          marginTop:10
                                        }}
                                source={require('../Image/smile.png')}/>
                      </FadeInView>
                    </View>;

      const text_2 = <View style={{width:"70%",alignSelf:'flex-start'}}>
                      <FadeInView 
                            duration={750} 
                            style={{backgroundColor:'#e2dcfc',borderRadius:10, padding:10,marginBottom:15}}
                            onFadeComplete={() => this.setState({RenderTextState:2})}>
                      <Text style={{fontSize:18,color:'#000000'}}>Sou o Pesquisa Vagas e estou aqui para ajuda-lo a conseguir um novo trabalho. Vamos lá?</Text>
                      </FadeInView>
                    </View>
      const text_3 = <View style={{width:"70%",alignSelf:'flex-start'}}>
                        <FadeInView 
                            duration={750} 
                            onFadeComplete={() => this.setState({RenderTextState:3})}    
                            style={{backgroundColor:'#e2dcfc',borderRadius:10, padding:10,marginBottom:15, width:'100%'}}>
                          <Text style={{fontSize:18,color:'#000000'}}>Muito bem, que tal começar se apresentando?</Text>
                        </FadeInView>
                      </View>
      const text_4 =<View style={{width:"70%",alignSelf:'flex-start'}}>
                      <FadeInView 
                          duration={750} 
                          onFadeComplete={() => this.setState({RenderTextState:4})} 
                          style={{backgroundColor:'#e2dcfc',borderRadius:10, padding:10,marginBottom:15, width:'100%'}}>
                        <Text style={{fontSize:18,color:'#000000'}}>Como você se chama?</Text>
                      </FadeInView>
                    </View>

      const input_1 = <KeyboardAvoidingView enabled >
                        <FadeInView 
                          duration={750} 
                          style={{width:"70%", marginBottom:15,alignSelf:'flex-end',height:40}}>
                          <TextInput
                              style={styles.inputStyle}
                              onChangeText={text => this.setState({UserName:text})}
                              onEndEditing={() => this.handleSubmitButton()}
                              // underlineColorAndroid="#FFFFFF"
                              placeholder="User Name"
                              placeholderTextColor="#6948F4"
                              autoCapitalize="sentences"
                              returnKeyType="next"
                              blurOnSubmit={false}
                              />
                      </FadeInView>
                      </KeyboardAvoidingView>
      const text_6=<View style={{width:"70%",alignSelf:'flex-start'}}>
                    <FadeInView 
                      duration={750} 
                      onFadeComplete={() => this.setState({RenderTextState:6})}  
                      style={{backgroundColor:'#e2dcfc',borderRadius:10, padding:10,marginBottom:15}}>
                      <Text style={{fontSize:18,color:'#000000'}}>Lindo nome!</Text>
                    </FadeInView>
                    </View>
      const text_7=<View style={{width:"70%",alignSelf:'flex-start'}}>
                    <FadeInView 
                      duration={750} 
                      onFadeComplete={() => this.setState({RenderTextState:7})}
                      style={{backgroundColor:'#e2dcfc',borderRadius:10, padding:10,marginBottom:15, width:'100%'}}>
                      <Text style={{fontSize:18,color:'#000000'}}>Qual o número do seu celular?</Text>
                    </FadeInView>
                    </View>
      const input_2 = <KeyboardAvoidingView enabled >
                      <FadeInView 
                          duration={750} 
                          style={{width:"70%", marginBottom:15,alignSelf:'flex-end',height:40}}>
                          <TextInput
                              style={styles.inputStyle}
                              keyboardType='phone-pad'
                              onChangeText={number => this.setState({PhonNumber:number})}
                              onEndEditing={() => this.handleSubmitButton()}
                              placeholder="(11) 98877 5566"
                              placeholderTextColor="#6948F4"
                              autoCapitalize="sentences"
                              returnKeyType="next"
                              blurOnSubmit={false}
                              />
                      </FadeInView>
                      </KeyboardAvoidingView>
      const text_9=<View style={{width:"70%",alignSelf:'flex-start'}}>
                    <FadeInView 
                        duration={750} 
                        onFadeComplete={() => this.setState({RenderTextState:9})}
                        style={{backgroundColor:'#e2dcfc',borderRadius:10, padding:10,marginBottom:15}}>
                      <Text style={{fontSize:18,color:'#000000'}}>Cadastre agora a sua senha de acesso</Text>
                    </FadeInView>
                    </View>
      const input_3=<KeyboardAvoidingView enabled >
                    <FadeInView 
                        duration={750} 
                        
                        style={{width:"70%",alignSelf:'flex-end',height:40,marginBottom:15}}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={text => this.setState({Password:text})}
                            onEndEditing={() => this.handleSubmitButton()}
                            placeholder="*******"
                            placeholderTextColor="#6948F4"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            />
                    </FadeInView>
                    </KeyboardAvoidingView>
    return (
        <ScrollView style={styles.container} >
          <TouchableWithoutFeedback >
            <View style={{padding:20,}}>
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
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
    );
  }
}

// export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  SectionStyle: {
    
    height: 70,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  LabelStyle: {
    fontWeight:'bold',
    fontSize:25,
    paddingTop: 70,
    paddingLeft: 30,
    paddingBottom: 30,
  }, 
  InputLabelStyle: {
    fontWeight:'bold',
    fontSize:18,
    paddingBottom: 10,
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
    paddingTop: 10,
    paddingBottom: 10,
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
      zIndex:0,
      position:"absolute",
      color: '#6948F4',
      fontWeight: "bold",
      fontSize: 16,
      textAlign:"center",
      bottom:20,
      right:0,
      left:0,
  },
  
});