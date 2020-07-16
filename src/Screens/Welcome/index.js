import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {welcome_banner} from '../../images';
import Text from '../../Components/Text';
import SimpleHeader from '../../Components/Headers/SimpleHeader';
import LargeHeader from "../../Components/Headers/LargeHeader";
import Button from "../../Components/Button";
const {width} = Dimensions.get('window');
const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: 25}}>
        <SimpleHeader />
        <LargeHeader
          subHeadeing={'Hello, nice to meet you!'}
          heading={'Get the Zeno experience'}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: width, height: 270}}
          resizeMode={'contain'}
          source={welcome_banner}
        />
      </View>
      <View style={{marginHorizontal: 25}}>
        {/*<Button*/}
        {/*  onPress={() => navigation.navigate('SignUp')}*/}
        {/*  text={'SIGN UP'}*/}
        {/*/>*/}
        <Button onPress={() => navigation.navigate('Login')} text={'SIGN IN'} />
        {/*<Text*/}
        {/*  onPress={() => navigation.navigate('Login')}*/}
        {/*  style={{textAlign: 'center', marginVertical: 15, fontSize: 15}}>*/}
        {/*  Already have an account? Sign in.*/}
        {/*</Text>*/}
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              textAlign: 'center',
            }}>
            {"By Signing in, you agree to Zeno's"}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: '#008751',
            }}>
            {'terms and conditions.'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 25,
    backgroundColor: '#fff',
  },
});
