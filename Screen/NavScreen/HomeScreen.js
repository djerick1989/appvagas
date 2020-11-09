import React, {useState, Component } from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity,Dimensions} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
const SLIDER_1_FIRST_ITEM = 0;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(100);
const itemHorizontalMargin = wp(2);
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../../Image/1.png'),
        require('../../Image/2.png'),
        require('../../Image/3.png'),
      ],
      ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
    
  }
  _renderItem = ( {item} ) =>{
     return   <View style={{alignItems:"center"}}>
                <Image
                  source={item}
                  style={{width:"100%",height:viewportHeight*0.55,
                    resizeMode: 'contain',}}
                />
              </View>;
  }
  onPressBtn (){
    this._slider1Ref.snapToNext();
  }

  render() {
    const buttonText1 = 'Avançar';
    const buttonText2 = 'Começar';
    let btntxt;
    if (this.state.ActiveSlide=='2') {
        btntxt = buttonText2
    } else {
        btntxt = buttonText1
    }
    const regText = <View style={{flexDirection: 'row',marginBottom:20}}>
                      <Text style={{color:"#000000"}}>Já tem cadastro? </Text>
                      <TouchableOpacity
                      onPress={() =>this.props.navigation.navigate('StartScreen')}
                      activeOpacity={0.5}
                      >
                      <Text style={{fontWeight: 'bold'}}>Começar</Text>
                      </TouchableOpacity>
                    </View>;
    return (
        <View style={styles.container}>
          <View style={{ alignItems: 'center',flex:1 }}>
              <Image
              source={require('../../Image/Logo-Pesquisa-Vagas.png')}
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
              
              <Carousel
                ref={c => this._slider1Ref = c}
                data={this.state.images}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                hasParallaxImages={false}
                firstItem={SLIDER_1_FIRST_ITEM}
                inactiveSlideScale={0}
                inactiveSlideOpacity={0}
                inactiveSlideShift={0}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                loop={false}
                loopClonesPerSide={0}
                autoplay={false}
                autoplayDelay={500}
                autoplayInterval={3000}
                layout={'default'}
                onSnapToItem={(index) => this.setState({ ActiveSlide: index }) }
              />
              <Pagination
                dotsLength={this.state.images.length}
                activeDotIndex={this.state.ActiveSlide}
                containerStyle={styles.paginationContainer}
                dotColor={'#9984f1'}
                dotStyle={styles.paginationDot}
                inactiveDotColor={'#90A4AE'}
                inactiveDotOpacity={0.5}
                inactiveDotScale={0.8}
                carouselRef={this._slider1Ref}
                tappableDots={!!this._slider1Ref}
              />
          </View>
          <View style={{alignItems:'center',flex:1}}>
            <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() =>this.state.ActiveSlide=='2'?this.props.navigation.navigate('StartScreen'):this.onPressBtn()}
            >
            <Text style={styles.buttonTextStyle}>{btntxt}</Text>
            </TouchableOpacity>
            {this.state.ActiveSlide=='0'&&regText}
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
    // height: 450,
    marginTop: 0,
    // margin: 10,
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
    marginTop: 10,
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },

  slider: {
    // marginTop: 15,
    // overflow: 'visible' // for custom animations
},
sliderContentContainer: {
  paddingVertical: 10 // for custom animation
},

slideInnerContainer: {
  width: "100%",
  height: 350,
},

paginationContainer: {
  alignItems:'center',
  paddingVertical: 8
},
paginationDot: {
  width: 12,
  height: 12,
  borderRadius: 6,
}
  
});