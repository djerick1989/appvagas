import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const SplashScreen = (props) => {
  let [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('user_id').then((value) =>
        props.navigation.navigate(
          value === null ? 'SlideScreen' : 'DrawerNavigationRoutes',
        ),
      );
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/JobConvo-LIVE-App-icon_v1.png')}
        style={{width: '33%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 100,
  },
});
