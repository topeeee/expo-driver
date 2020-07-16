import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {Text, Button} from '../../Components';
import {
  bus,
  my_location,
  green_circle,
  circle_check,
  arrow_left,
} from '../../images';

const ReciptsModal = ({dismiss, dropId, tripRec}) => {
  const [trip, setTrip] = useState('');

  // useEffect(() => {
  //   if (tripRec) {
  //     setTrips(tripRec);
  //   }
  // }, [tripRec]);
  //
  // console.log(tripRec)

  useEffect(() => {
    if (dropId) {
      setTrip(dropId);
    }
  }, [dropId]);

  function home() {
    dismiss();
    setTrip('');
  }
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
      }}>
      <View
        style={{
          marginTop: 30,
          borderRadius: 20,
          marginHorizontal: 20,
          overflow: 'hidden',
          borderWidth: 1,
          paddingBottom: 20,
          backgroundColor: '#fff',
        }}>
        {renderPickUpByPassenger()}
        <View style={{alignItems: 'center'}}>
          {/*{trips.map((trip) => (*/}
          {/*  <Text style={{fontSize: 12, marginVertical: 20}}>*/}
          {/*    Trip ID : {trip.id}*/}
          {/*  </Text>*/}
          {/*))}*/}
          {trip ? (
            <Text style={{fontSize: 12, marginVertical: 20}}>
              Trip ID : {trip}
            </Text>
          ) : null}
          {/*<Text style={{fontSize: 24, marginVertical: 20}}>₦240.00</Text>*/}
          <Image source={circle_check} />
          <Text style={{fontSize: 18, textAlign: 'center', marginVertical: 20}}>
            Trip Has Been Successfully Dropped Off{' '}
          </Text>
          <View
            style={{
              backgroundColor: '#C2354D',
              paddingHorizontal: 10,
              paddingVertical: 9,
              borderRadius: 6,
              marginVertical: 5,
            }}>
            {/*<Text*/}
            {/*  onPress={dismiss}*/}
            {/*  style={{*/}
            {/*    color: '#fff',*/}
            {/*    fontSize: 12,*/}
            {/*    fontWeight: 'bold',*/}
            {/*    textAlign: 'center',*/}
            {/*  }}>*/}
            {/*  /!*Drop more Passengers*!/*/}
            {/*</Text>*/}
          </View>
          <Text
            onPress={home}
            style={{
              textAlign: 'center',
              fontSize: 14,
              marginVertical: 15,
              color: '#7A869A',
            }}>
            Back to home
          </Text>
        </View>
      </View>
    </View>
  );
};
export default ReciptsModal;
