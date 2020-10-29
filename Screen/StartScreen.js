import React, { Component } from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity, Dimensions} from "react-native";
 
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
 
  render() {
    return (
        <View style={styles.container}>
            
                <View style={{ alignItems: 'center',flex:1 }}>
                    <Image
                    source={require('../Image/Logo-Pesquisa-Vagas.png')}
                    style={{
                        width: '70%',
                        height: 100,
                        resizeMode: 'contain',
                        margin: 20,
                        top:0,
                        
                      }}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <Image 
                    source={require('../Image/6.png')}
                    style={{
                        width: '100%',
                        height:viewportHeight*0.55,
                        resizeMode: 'contain',
                        top:0,
                        
                      }}/>
                </View>
                <View style={{alignItems:'center',}}>
                    
                  <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={() =>this.props.navigation.navigate('RegisterScreen')}
                  >
                  <Text style={styles.buttonTextStyle}>Cadastrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={styles.loginbuttonStyle}
                  activeOpacity={0.5}
                  onPress={() =>this.props.navigation.navigate('LoginScreen')}
                  >
                  <Text style={styles.loginbuttonTextStyle}>Login</Text>
                  </TouchableOpacity>
                
                </View>
            
        </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  SectionStyle: {
    flex:4,
    marginTop: 0,
  },
  buttonStyle: {
    backgroundColor: '#6948F4',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#6948F4',
    height: 40,
    width:viewportWidth*0.45,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 10,
  },
  loginbuttonStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    color: '#6948F4',
    borderColor: '#6948F4',
    height: 40,
    width:viewportWidth*0.45,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    
    paddingVertical: 8,
    fontSize: 18,
  },
  loginbuttonTextStyle: {
    color: '#6948F4',
    paddingVertical: 5,
    fontSize: 18,
  },
  
});