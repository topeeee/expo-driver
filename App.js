import 'react-native-gesture-handler';
import React from 'react';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./src/Screens/DriverOffline";
import Login from "./src/Screens/Login";
import Splash from "./src/Screens/Splash";

const Stack = createStackNavigator();

export default function App() {

    axios.interceptors.request.use(
        async (config) => {
            let userData = await AsyncStorage.getItem('userData');
            let data = JSON.parse(userData);
            config.headers.authorization = data;
            return config;
        },
        (error) => Promise.reject(error),
    );
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Splash'}  headerMode={'none'}>
          <Stack.Screen name="Splash" component={Splash} />
          {/*<Stack.Screen name="Welcome" component={Welcome} />*/}
          <Stack.Screen name="Login" component={Login} />
          {/*<Stack.Screen name="ForgetPassword" component={ForgetPassword} />*/}
          {/*<Stack.Screen name="SignUp" component={SignUp} />*/}
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
