import React, { Component } from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity, } from "react-native";
 
import { SliderBox } from "react-native-image-slider-box";
 
export default class SlideScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../Image/1.png'),
        require('../Image/2.png'),
        require('../Image/2.png'),
      ]
    };
  }
 
  render() {
    const buttonText1 = 'Avançar';
    const buttonText2 = 'Começar';
    let btntxt;
    if (this.state.currentImage=='2') {
        btntxt = buttonText2
    } else {
        btntxt = buttonText1
    }
    
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
              <SliderBox
              images={this.state.images}
              sliderBoxHeight={400}
              onCurrentImagePressed={index =>
                  console.log(`image ${index} pressed`)
              }
              currentImageEmitter={index => this.setState({
                  currentImage: index,
                  }, function(){  })}
              dotColor="#9984f1"
              inactiveDotColor="#90A4AE"
              resizeMethod={'resize'}
              resizeMode={'cover'}
              paginationBoxStyle={{
                  position: "absolute",
                  bottom: 0,
                  padding: 0,
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  paddingVertical: 10
              }}
              ImageComponentStyle={{ width: '100%', padding: 5}}
              
              />
          </View>
          <View style={{alignItems:'center',flex:1}}>
            <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            >
            <Text style={styles.buttonTextStyle}>{btntxt}</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row',marginBottom:50}}>
              <Text style={{color:"#000000"}}>Já tem cadastro? </Text>
              <TouchableOpacity
              onPress={() =>this.props.navigation.navigate('StartScreen')}
              activeOpacity={0.5}
              >
              <Text style={{fontWeight: 'bold'}}>Começar</Text>
              </TouchableOpacity>
            </View>
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
    flexDirection: 'row',
    width:"80%",
    // height: 40,
    marginTop: 0,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#6948F4',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#6948F4',
    height: 40,
    width:200,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  
});