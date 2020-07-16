import React, {useState, useEffect} from 'react';
import {View, Picker, StyleSheet, AsyncStorage} from 'react-native';
import Text from '../../Components/Text';
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import axios from 'axios';
import api from '../../environments/environment';

const SetPassengerModal = ({
                               showSignUpUser,
                               backToHome,
                               busStop,
                               openModal,
                               isBooked,
                               pickUp,
                               driverPin,
                               route,
                               selected,
                               setSelected,
                           }) => {
    const [dropOff, setDropOff] = useState('');
    const [pin, setPin] = useState('');
    const [verifySuccess, setVerifySuccess] = useState('');
    const [verifyError, setVerifyError] = useState('');
    // const [pickStatus] = useState(1);
    const [distance] = useState('200km');
    const [cost] = useState(200);
    const [mode] = useState('not available');
    const [pinValidation, setPinValidation] = useState('');
    const [dropOffValidation, setDropOffValidation] = useState('');
    const [operatorId, setOperatorId] = useState('');

    async function verifyPin() {
        try {
            const res = await axios.get(`${api.user}/api/check/?pin=${pin}`);
            await setTrip(res.data.pin);
        } catch (e) {
            setVerifyError('Incorrect Pin');
            setTimeout(() => {
                setVerifyError('');
            }, 5000);
        }
    }

    async function setTrip(passengerPin) {
        const body = {
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
            const res = await axios.post(`${api.trip}/api/me/trips/`, body);
            await pickUser(res.data.id);
        } catch (e) {
            console.log(e);
        }
    }

    async function pickUser(id) {
        try {
            const res = await axios.put(`http://165.22.116.11:7500/api/pick/${id}/?status=1&driverPin=${driverPin}`);
            if (res.data) {
                isBooked(dropOff);
                setVerifySuccess('Booking Successful');
                setPin('');
                setDropOff('');
                setSelected(selected - 1);
                setTimeout(() => {
                    setVerifySuccess('');
                }, 5000);
            }
        } catch (e) {
            setVerifyError('Booking Not Successful');
            setTimeout(() => {
                setVerifyError('');
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

    function register() {
        if (!pin) {
            setPinValidation('Enter Pin');
            setTimeout(() => {
                setPinValidation('');
            }, 5000);
        }
        if (!dropOff) {
            setDropOffValidation('Select Drop Bus Stop');
            setTimeout(() => {
                setDropOffValidation('');
            }, 5000);
        }

        if (pin && dropOff) {
            verifyPin();
        }
    }

    useEffect(() => {
        if (!operatorId) {
            getOperatorId();
        }
    },[operatorId]);

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.modalCont}>
                    <Text
                        onPress={backToHome}
                        style={{fontSize: 20, top: -30, left: 300, color: 'red'}}>
                        X
                    </Text>
                    <Text style={styles.header}>Passenger {selected}</Text>
                    <View style={styles.itemCont}>
                        <View style={{flex: 1, marginHorizontal: 5}}>
                            <Input
                                label={'Enter PIN'}
                                placeholder={'1234'}
                                value={pin}
                                onChangeText={setPin}
                            />
                            {verifyError ? (
                                <Text style={{color: 'red', fontSize: 15, marginTop: 10}}>
                                    {verifyError}
                                </Text>
                            ) : null}
                            {pinValidation ? (
                                <Text style={{color: 'red', fontSize: 15, marginTop: 10}}>
                                    {pinValidation}
                                </Text>
                            ) : null}
                            {verifySuccess ? (
                                <Text style={{color: 'green', fontSize: 15, marginTop: 10}}>
                                    {verifySuccess}
                                </Text>
                            ) : null}
                        </View>
                        <View style={{flex: 1, marginHorizontal: 5}}>
                            <Text style={{color: '#7A869A', fontSize: 15}}>
                                Drop Bus stop
                            </Text>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: '#E6E6EB',
                                }}>
                                <Picker
                                    style={{width: '100%'}}
                                    selectedValue={dropOff}
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

                            {dropOffValidation ? (
                                <Text style={{color: 'red', fontSize: 15}}>
                                    {dropOffValidation}
                                </Text>
                            ) : null}
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button
                            // onPress={backToHome}
                            onPress={register}
                            text={'Book'}
                            style={{
                                flex: 1,
                                marginHorizontal: 5,
                                left: 80,
                                backgroundColor: 'green',
                            }}
                        />
                        <View style={{flex: 1}} />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button
                            onPress={showSignUpUser}
                            text={'Sign Up User'}
                            style={{flex: 1, marginHorizontal: 5}}
                        />
                        <Button
                            onPress={openModal}
                            text={'Pick More'}
                            style={{flex: 1, marginHorizontal: 5}}
                        />
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
    modalCont: {
        height: 388,
        backgroundColor: '#fff',
        width: '90%',
        borderRadius: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 18,
        marginVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    itemCont: {
        flexDirection: 'row',
        borderWidth: 0,
        height: 90,
        alignItems: 'center',
    },
});
export default SetPassengerModal;
