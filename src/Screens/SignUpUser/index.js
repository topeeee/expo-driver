import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {View, ScrollView, StyleSheet, Picker, FlatList, AsyncStorage} from 'react-native';
import Text from '../../Components/Text';
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import api from '../../environments/environment';

const PassengerPickupModal = ({
                                  dismiss,
                                  hideSignUpUser,
                                  pickUp,
                                  driverPin,
                                  route,
                                  busStop,
                                  isBooked,
                              }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [homeLocation, setHomeLocation] = useState('');
    const [phone, setPhone] = useState('');
    // const [pin, setPin] = useState('');
    const [passengerPin, setPassengerPin] = useState('');
    const [email] = useState('not available');
    const [mode] = useState('not available');
    const [dateOfBirth] = useState('not available');
    const [status] = useState(1);
    // const [pickStatus] = useState('');
    const [distance] = useState('200km');
    const [cost] = useState(200);
    const [dropOff, setDropOff] = useState('');
    const [bookingResponse, setBookingResponse] = useState('');
    const [operatorId, setOperatorId] = useState('');



    async function getUserPin() {
        const phoneNumber = '+234' + phone.substr(1);
        try {
            const res = await axios.post(`${api.login}/admin/users/`, {
                username: phoneNumber,
                password: 'password',
            });
            await registerUser(res.data.id);
        } catch (e) {
            console.log(e);
        }
    }

    async function registerUser(pin) {
        const phoneNumber = '+234' + phone.substr(1);
        const body = {
            firstName,
            lastName,
            email,
            dateOfBirth,
            phoneNumber,
            homeLocation,
            pin,
            status,
        };
        try {
            const res = await axios.post(`${api.user}/api/me/userdetails/`, body);
            setPassengerPin(res.data.pin);
            // hideSignUpUser();
        } catch (e) {
            console.log(e);
        }
    }

    async function setTrip() {
        const body1 = {
            passengerPin,
            mode,
            pickUp,
            driverPin,
            operatorId,
            route,
            distance,
            cost,
            dropOff,
        };
        try {
            const res = await axios.post(`${api.trip}/api/me/trips/`, body1);
            await pickUser(res.data.id);
        } catch (e) {
            console.log(e);
        }
    }


    async function pickUser(id) {
        try {
            const res = await axios.put(`http://165.22.116.11:7500/api/pick/${id}/?status=1&driverPin=${driverPin}`);
            isBooked(res.data.dropOff);
            setBookingResponse('Booking Successful');
            setFirstName('');
            setLastName('');
            setHomeLocation('');
            setDropOff('');
            setPhone('');
            setTimeout(() => {
                setBookingResponse('');
            }, 5000);
        } catch (e) {
            setBookingResponse('Booking Not Successful');
            setTimeout(() => {
                setBookingResponse('');
            }, 5000);
        }
    }

    async function getOperatorId() {
        let driverData = await AsyncStorage.getItem('driverEmail');
        let driverEmail = JSON.parse(driverData);
        try {
            const res = await axios.get(`http://165.22.116.11:7042/api/email/?email=${driverEmail}`);
            setOperatorId(res.data.operatorid);
        } catch (e) {}
    }

    useEffect(() => {
        if (passengerPin) {
            setTrip();
        }
    }, [passengerPin]);

    useEffect(() => {
        if (!operatorId) {
            getOperatorId();
        }
    },[operatorId]);


    return (
        <View style={{flex: 1}}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, .5)',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <View style={styles.modal}>
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 16,
                            paddingVertical: 10,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: '#000',
                            marginHorizontal: -20,
                        }}>
                        SignUp new User
                    </Text>
                    <View style={styles.listCont}>
                        <Text style={{color: 'green'}}>{bookingResponse}</Text>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{width: '100%', borderWidth: 0}}>
                            <Text
                                style={{
                                    fontSize: 17,
                                    marginVertical: 0,
                                    fontWeight: 'bold',
                                }}
                            />
                            <Input
                                label={'First Name'}
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                            <Input
                                label={'Last Name'}
                                value={lastName}
                                onChangeText={setLastName}
                            />
                            <Input
                                label={'Phone Number'}
                                value={phone}
                                onChangeText={setPhone}
                            />
                            <Input
                                label={'Address'}
                                value={homeLocation}
                                onChangeText={setHomeLocation}
                            />
                            <Text style={{paddingVertical: 10}}>Drop Off</Text>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: '#E6E6EB',
                                }}>
                                <Picker
                                    selectedValue={dropOff}
                                    style={{width: '100%'}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setDropOff(itemValue)
                                    }>
                                    <Picker.Item label="Select" value="" />
                                    {busStop &&
                                    busStop.map((bus) => (
                                        <Picker.Item label={bus.busstop} value={bus.busstop} />
                                    ))}
                                </Picker>
                            </View>
                        </ScrollView>
                        <Button onPress={getUserPin} text={'Sign Up'} style={{backgroundColor: 'green'}} />
                        <Button onPress={hideSignUpUser} text={'Back'} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        width: '85%',
        height: 500,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 20,
        overflow: 'hidden',
    },
    listCont: {
        flex: 1,
        // borderWidth: 0,
        marginVertical: 15,
        borderWidth: 0,
        marginHorizontal: 0,
    },
});
export default PassengerPickupModal;
