import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, AsyncStorage} from 'react-native';
import Text from '../../Components/Text/index';
import {offline_moon_black} from '../../images';
import axios from 'axios';
import api from '../../environments/environment';

const BottomContentDriverOffline = () => {
    const [driver, setDriver] = useState([]);
    const [driverDetails, setDriverDetails] = useState('');
    const [isEmail, setIsEmail] = useState('');
    const [greeting, setGreeting] = useState('');

    async function getDriverEmail() {
        try {
            let userData = await AsyncStorage.getItem('driverEmail');
            let data = JSON.parse(userData);
            await searchDriver(data);
            setIsEmail(data);
        } catch (error) {
            console.log('Something went wrong', error);
        }
    }

    async function searchDriver(id) {
        try {
            const res = await axios.get(
                `${api.driver}/api/email/?email=${id}`,
            );
            setDriverDetails(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getDriverEmail();
    }, []);

    function formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'Evening' : 'Morning';
        let strTime = ampm;
        setGreeting(strTime);
    }

    useEffect(() => {
        formatAMPM(new Date());
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Good {greeting}, {driverDetails.firstname}
            </Text>
            <Image style={styles.imageMoon} source={offline_moon_black} />
            <Text style={styles.subHeading}>
                {'You are offline !\nGo online to start acceptingTrips'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        backgroundColor: '#fff',
        flex: 1,
    },
    heading: {
        color: '#000',
        marginVertical: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageMoon: {
        marginHorizontal: 20,
        alignSelf: 'center',
    },
    subHeading: {
        color: '#000',
        marginVertical: 5,
        fontSize: 18,
        textAlign: 'center',
        // marginVertical: 10,
    },
});

export default BottomContentDriverOffline;
