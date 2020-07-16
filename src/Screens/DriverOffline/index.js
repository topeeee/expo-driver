import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Switch,
  TouchableHighlightBase,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import {
  offline_moon,
  menu,
  curruncy_logo,
  mobile_icon,
  marker,
} from '../../images';
import {Text} from '../../Components';
import RBSheet from 'react-native-raw-bottom-sheet';
import Switches from 'react-native-switches';
import MapView, {Marker} from 'react-native-maps';
// import LinearGradient from 'react-native-linear-gradient';
import BottomContentDriverOffline from './BottomContentDriverOffline';
import BottomContentDriverOnline from './BottomContentDriverOnline';
import {Popup} from '../';
import api from '../../environments/environment';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  const DriverOfflineBottomSheetRef = useRef();
  const DriverOnlineBottomSheetRef = useRef();

  const [isDriverOnline, setIsDriverOnline] = useState(false);
  const [isLocationPermissionShow, setIsLocationPermissionShow] = useState(
    true,
  );
  const [driverId, setDriverId] = useState('');

  async function getDriverEmail() {
    try {
      let userData = await AsyncStorage.getItem('driverEmail');
      let data = JSON.parse(userData);
      await searchDriver(data);
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }

  async function searchDriver(id) {
    try {
      const res = await axios.get(`${api.driver}/api/email/?email=${id}`);
      setDriverId(res.data.id);
    } catch (e) {
      console.log(e);
    }
  }

  async function appStatus(id, status) {
    try {
      await axios.put(`http://165.22.116.11:7042/api/appstatus/${id}/?appstatus=${status}`)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getDriverEmail();
  }, []);

  useEffect(() => {
    if (isDriverOnline && driverId) {
      appStatus(driverId, 1);
    }
    if (!isDriverOnline && driverId) {
      appStatus(driverId, 0);
    }
  }, [driverId, isDriverOnline]);

  useEffect(() => {
    if (!isLocationPermissionShow) {
      if (!isDriverOnline) {
        DriverOfflineBottomSheetRef.current.open();
      } else {
        DriverOnlineBottomSheetRef.current.open();
      }
    }
  }, [isLocationPermissionShow, isDriverOnline]);

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.menuIconContainer}>
          <Image source={menu} />
        </View>
        <View style={styles.switchContainer}>
          <View style={styles.mobileIconContainer}>
            <Image source={mobile_icon} />
            <Text>2</Text>
          </View>
          {/*<View style={styles.currancyLogoContainer}>*/}
          {/*  <Image source={curruncy_logo} />*/}
          {/*</View>*/}
        </View>
        <View>
          <Switches
            buttonSize={24}
            sliderHeight={29}
            sliderWidth={50}
            colorSwitchOff={'#fff'}
            colorSwitchOn={'#fff'}
            buttonColor={'#679C4C'}
            borderColor={'#000'}
            value={isDriverOnline}
            shape={'pill'}
            showText={false}
            onChange={() => {
              setIsDriverOnline(!isDriverOnline);
            }}
          />
        </View>
      </View>
    );
  };

  const renderDriverOfflineBottomSheet = () => {
    return (
      <RBSheet
        closeOnDragDown
        animationType={'slide'}
        ref={DriverOfflineBottomSheetRef}
        height={200}
        openDuration={150}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          wrapper: {
            backgroundColor: 'transparent',
          },
        }}>
        <BottomContentDriverOffline />
      </RBSheet>
    );
  };
  const backToHome = () => {
    DriverOnlineBottomSheetRef.current.close();
    DriverOfflineBottomSheetRef.current.open();
    setIsDriverOnline(false);
  };
  const renderDriverOnlineBottomSheet = () => {
    return (
      <RBSheet
        dragFromTopOnly
        ref={DriverOnlineBottomSheetRef}
        height={550}
        openDuration={150}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          wrapper: {
            // backgroundColor: 'transparent'
          },
        }}>
        <BottomContentDriverOnline setDriverOffline={backToHome} />
      </RBSheet>
    );
  };

  const renderOfflineBanner = () => {
    return !isDriverOnline ? (
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.1)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.offlineBannerContainer}>
        <Image style={{marginHorizontal: 10}} source={offline_moon} />
        <Text style={styles.offlineBannerText}>
          {'You are offline !\nGo online to start accepting Trips'}
        </Text>
      </LinearGradient>
    ) : null;
  };

  const renderMap = () => {
    return (
      <MapView
        style={{flex: 1, borderWidth: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0000000922,
          longitudeDelta: 0.00421,
        }}>
        {isDriverOnline && (
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}>
            <Image source={marker} />
          </Marker>
        )}
      </MapView>
    );
  };

  const renderLocationPermissionModal = () => {
    const closeLocationPermissionModal = () =>
      setIsLocationPermissionShow(false);
    return (
      isLocationPermissionShow && (
        <Popup
          visible={isLocationPermissionShow}
          closeLocationPermissionModal={closeLocationPermissionModal}
        />
      )
    );
  };

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      {renderMap()}
      {renderDriverOfflineBottomSheet()}
      {renderDriverOnlineBottomSheet()}
      <LinearGradient
        colors={['rgba(255,255,255,0.7)', 'rgba(255,255,255,0.5)']}
        style={{borderWidth: 0, position: 'absolute', width: '100%'}}>
        {renderHeader()}
        {/*<Text style={{textAlign: 'center', marginVertical: 10, color: '#000'}}>*/}
        {/*  Offline Booking*/}
        {/*</Text>*/}
        {renderOfflineBanner()}
      </LinearGradient>
      {renderLocationPermissionModal()}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: 70,
    borderWidth: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    width: 100,
    height: 30,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 100,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  mobileIconContainer: {
    flexDirection: 'row',
    width: 50,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  currancyLogoContainer: {
    width: 50,
    height: 30,
    backgroundColor: '#679C4C',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  offlineBannerContainer: {
    flexDirection: 'row',
    backgroundColor: '#6D6D6D',
    height: 64,
    alignItems: 'center',
  },
  offlineBannerText: {
    flex: 1,
    marginHorizontal: 15,
    color: '#fff',
    fontSize: 16,
  },
});
