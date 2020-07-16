import React from 'react';
import {View, Image} from 'react-native';
import {Text, Button} from '../../Components';
import {bus, my_location, green_circle, arrow_left} from '../../images';

const OnlineBottomContent = () => {
  const renderPickUpDetails = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: 80,
            borderWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F7F7F7',
            borderRadius: 10,
            paddingHorizontal: 5,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, borderWidth: 0, marginHorizontal: 10}}>
              <Text style={{fontSize: 12}}>Trip ID : 0001</Text>
              <View
                style={{
                  backgroundColor: '#C2354D',
                  paddingHorizontal: 10,
                  paddingVertical: 7,
                  borderRadius: 6,
                  width: 75,
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Drop
                </Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <Text />
              <View
                style={{
                  backgroundColor: '#679C4C',
                  paddingHorizontal: 10,
                  paddingVertical: 7,
                  borderRadius: 6,
                  width: 75,
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Pin: 1234
                </Text>
              </View>
            </View>
            <Text style={{fontSize: 20}}>₦240.00</Text>
          </View>
        </View>

        <View style={{width: '50%', alignSelf: 'center', marginVertical: 10}}>
          <Button text={'Drop All'} />
        </View>
      </View>
    );
  };

  const renderPickUpByPassenger = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          backgroundColor: '#000',
          paddingHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Image source={arrow_left} />
        </View>
        <View>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>
            Drop Off Passenger
          </Text>
        </View>
        <View />
      </View>
    );
  };

  return (
    <View
      style={{
        marginTop: 30,
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 20,
        marginHorizontal: 20,
        overflow: 'hidden',
      }}>
      {renderPickUpByPassenger()}
      <Text
        style={{
          color: '#000',
          marginVertical: 10,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        Good afternoon, Abayomrunkoje
      </Text>
      <View style={{flexDirection: 'row', marginVertical: 10}}>
        <Image source={bus} />
        <Text
          style={{color: '#000', fontSize: 16, flex: 1, marginHorizontal: 10}}>
          AA79 - AKK
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginVertical: 15}}>
        <Text style={{fontSize: 16}}>Zone:</Text>
        <Text style={{fontWeight: 'bold', marginHorizontal: 10, fontSize: 16}}>
          01
        </Text>
        <Text style={{marginHorizontal: 10}}>|</Text>
        <Text style={{fontSize: 16}}>Area:</Text>
        <Text style={{fontWeight: 'bold', marginHorizontal: 10, fontSize: 16}}>
          Ikeja
        </Text>
      </View>
      <Text style={{fontSize: 16}}>Rout:</Text>
      <Text style={{marginVertical: 5, fontSize: 16, flexDirection: 'row'}}>
        Opebi: <Image source={my_location} /> --------------{' '}
        <Image source={my_location} /> Oluyole, Ojota
      </Text>
      <View
        style={{
          marginVertical: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Image source={green_circle} />
        <Text style={{fontSize: 14, marginHorizontal: 5}}>
          Current Bus Stop : Bola llori
        </Text>
        <View
          style={{
            backgroundColor: '#679C4C',
            paddingHorizontal: 10,
            paddingVertical: 7,
            borderRadius: 6,
          }}>
          <Text style={{color: '#fff', fontSize: 12, fontWeight: 'bold'}}>
            3 Seats Vacant
          </Text>
        </View>
      </View>
      {renderPickUpDetails()}
    </View>
  );
};
export default OnlineBottomContent;
