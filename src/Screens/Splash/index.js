import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Dimensions, AsyncStorage} from 'react-native';
import {logo, splash_bottom_banner} from '../../images';
import {Text} from '../../Components';

const {width} = Dimensions.get('window');

const Splash = ({navigation}) => {
  async function isAuthorize() {
    try {
      let userData = await AsyncStorage.getItem('userData');
      let data = JSON.parse(userData);
      if (data) {
          navigation.navigate('Login');
        // navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      // console.log('Something went wrong', error);
    }
  }



  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={logo} />
        <Text style={{marginVertical: 10, fontSize: 22}}>{'Driver'}</Text>
        <Text
          onPress={isAuthorize}
          style={{
            marginVertical: 10,
            fontSize: 20,
            borderWidth: 1,
            paddingHorizontal: 20,
            borderRadius: 10,
            paddingVertical: 10,
            color: '#000',
            marginTop: 30,
            borderColor: '#000',
          }}>
          {'START'}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <View style={{}}>
          <Image
            style={{width: width + 20, height: 430}}
            source={splash_bottom_banner}
          />
        </View>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
