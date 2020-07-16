import React, {useEffect, useState} from 'react';
import {
    AsyncStorage,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    View,
} from 'react-native';
import Text from '../../Components/Text';
import Button from '../../Components/Button'
import {green_circle, my_location} from '../../images';
import SelectPassenger from '../SelectPassenger';
import SetPassengerModal from '../SetPassengerModal';
import SignUpUser from '../SignUpUser';
import ReciptsModal from '../ReciptsModal';
import axios from 'axios';
import api from '../../environments/environment';


const OnlineBottomContent = ({driverEmail}) => {
    const [isShowBusStopsList, setIsShowBusStopsList] = useState(true);
    const [isShowSelectPassenger, setIsShowSelectPassenger] = useState(true);
    const [isShowSetPassenger, setIsShowSetPassenger] = useState(false);
    const [isShowPassengerModal, setIsShowPassengerModal] = useState(false);
    const [isShowSignUpUser, setIsShowSignUpUser] = useState(false);
    const [isShowReciptsModal, setIsShowReciptsModal] = useState(false);
    const [driverVehicle, setDriverVehicle] = useState([]);
    const [driverId, setDriverId] = useState('');
    const [driverPin, setDriverPin] = useState('');
    const [driverRoute, setDriverRoute] = useState('');
    const [vehicle, setVehicle] = useState([]);
    const [busStop, setBusStop] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [capacity, setCapacity] = useState(null);
    const [greeting, setGreeting] = useState('');
    const [driver, setDriver] = useState([]);
    const [driverDetails, setDriverDetails] = useState('');
    const [isEmail, setIsEmail] = useState('');
    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');
    const [trips, setTrips] = useState([]);
    const [tripsLength, setTripsLength] = useState('');
    const [selected, setSelected] = useState('');
    const [dropId, setDropId] = useState('');
    const [tripRec, setTripRec] = useState([]);

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
            const res = await axios.get(`${api.driver}/api/email/?email=${id}`);
            setDriverId(res.data.id);
            setDriverPin(res.data.pin);
            setDriverRoute(res.data.route);
            setDriverDetails(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        // getDriver();
        getDriverEmail();
    }, []);

    async function getDriverVehicle(id) {
        try {
            const res = await axios.get(
                `${api.driverVehicle}/api/vehicle/?driverId=${id}`,
            );
            res.data.map((data) => {
                setVehicleId(data.vehicleId);
            });
        } catch (e) {
            console.log(e);
        }
    }
    async function getVehicle(id) {
        try {
            const res = await axios.get(`${api.vehicle}/api/vehicles/${id}/`);
            setVehicle(res.data);
            setCapacity(Number(res.data.capacity));
        } catch (e) {
            console.log(e);
        }
    }

    async function getBusStop(route) {
        try {
            const res = await axios.get(
                `${api.busStop}/api/routecode/?search=${route}`,
            );
            const newBusStop = res.data.map((v) => ({...v, pickNumber: 0}));
            setBusStop(newBusStop);
        } catch (e) {
            console.log(e);
        }
    }

    function formatAMPM(date) {
        let hours = date.getHours();
        let strTime = hours >= 12 ? 'Evening' : 'Morning';
        setGreeting(strTime);
    }
    function isBooked(isdrop) {
        setCapacity(capacity - 1);
        const newProjects = busStop.map((p) =>
            p.busstop === isdrop ? {...p, pickNumber: p.pickNumber + 1} : p,
        );

        setBusStop(newProjects);
    }

    function isDropped() {
        setCapacity(capacity + 1);
        const newProjects = busStop.map((p) =>
            p.busstop === drop ? {...p, pickNumber: p.pickNumber - 1} : p,
        );

        setBusStop(newProjects);
    }

    async function getTrips() {
        try {
            const res = await axios.get(
                `${api.trip}/api/trips/?search=${driverRoute}`,
            );
            setTrips(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function isDrop(tripId) {
        try {
            const res = await axios.put(
                `${api.trip}/api/drop/${tripId}/?status=1&driverPin=${driverPin}`,
            );
            if (res.data) {
                getTrips();
                isDropped();
                setTripsLength(tripsLength - 1);
                setIsShowReciptsModal(true);
                setDropId(tripId);
                setTimeout(() => {
                    setIsShowReciptsModal(false);
                }, 3000);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function isDropAll() {
        try {
            const res = await axios.post(
                `${api.trip}/api/dropall/?dropOff=${drop}&driverPin=${driverPin}&pickedStatus=1&dropStatus=1`,
            );
            if (res) {
                getTrips();
                isDroppedAll(tripsLength);
                setIsShowReciptsModal(true);
            }
        } catch (e) {
            console.log(e);
        }
    }
    function isDroppedAll(amount) {
        setCapacity(capacity + amount);
        const newProjects = busStop.map((p) =>
            p.busstop === drop ? {...p, pickNumber: p.pickNumber - amount} : p,
        );

        setBusStop(newProjects);
    }

    useEffect(() => {
        if (trips && drop) {
            const filtered = trips.filter(
                (user) =>
                    user.pickStatus == 1 && user.dropStatus == 0 && user.dropOff === drop,
            );
            setTripsLength(filtered.length);
            setTripRec(filtered);
        }
    }, [trips, drop]);

    useEffect(() => {
        formatAMPM(new Date());
    }, []);

    useEffect(() => {
        if (driverRoute) {
            getBusStop(driverRoute);
        }
    }, [driverRoute]);

    useEffect(() => {
        if (driverId) {
            getDriverVehicle(driverId);
        }
    }, [driverId]);

    useEffect(() => {
        if (vehicleId) {
            getVehicle(vehicleId);
        }
    }, [vehicleId]);

    function openModal() {
        setIsShowSelectPassenger(true);
        setIsShowSetPassenger(false);
    }

    const renderBusStopsList = () => {
        return (
            <View>
                <View style={styles.renderBusStopHeaderCont}>
                    <Text style={[styles.busStopHeader, {flex: 2}]}>BUS Stops</Text>
                    <Text style={styles.busStopHeader}>Drop</Text>
                    <Text style={styles.busStopHeader}>Pick</Text>
                </View>
                <FlatList
                    style={{height: 400}}
                    showsVerticalScrollIndicator={false}
                    data={busStop}
                    keyExtractor={(item, index) => {
                        return item.id;
                    }}
                    renderItem={(item) => (
                        <View style={styles.oneBusStopCont}>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                {/*<Text style={{width: 25, fontSize: 16}}>{item.index}</Text>*/}
                                <Text style={{fontSize: 16}}>{item.item.busstop}</Text>
                            </View>
                            <Text
                                onPress={() => {
                                    if (item.item.pickNumber > 0) {
                                        getTrips();
                                        setIsShowBusStopsList(!isShowBusStopsList);
                                        setDrop(item.item.busstop);
                                    }
                                }}
                                style={{
                                    flex: 1,
                                    fontSize: 14,
                                    // flex: 1,
                                    textAlign: 'center',
                                    marginHorizontal: 10,
                                    paddingVertical: 7,
                                    borderRadius: 5,
                                    backgroundColor: '#FF0000',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                }}>
                                {item.item.pickNumber}
                            </Text>
                            <Text
                                onPress={() => {
                                    setIsShowSelectPassenger(true);
                                    setIsShowPassengerModal(true);
                                    setPickup(item.item.busstop);
                                }}
                                style={{
                                    flex: 1,
                                    fontSize: 14,
                                    // flex: 1,
                                    textAlign: 'center',
                                    marginHorizontal: 10,
                                    paddingVertical: 7,
                                    borderRadius: 5,
                                    backgroundColor: '#679C4C',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                }}>
                                PICK
                            </Text>
                        </View>
                    )}
                />
            </View>
        );
    };

    const renderDropOffPassenger = () => {
        return (
            <View style={{flex: 1}}>
                {trips &&
                trips
                    .filter(
                        (user) =>
                            user.pickStatus == 1 &&
                            user.dropStatus == 0 &&
                            user.dropOff === drop &&
                            user.username === isEmail,
                    )
                    .map((trip) => (
                        <View
                            style={{
                                height: 80,
                                borderWidth: 0,
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#F7F7F7',
                                borderRadius: 10,
                                paddingHorizontal: 5,
                                marginVertical: 3,
                            }}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex: 1, borderWidth: 0, marginHorizontal: 10}}>
                                    <Text style={{fontSize: 12}}>Trip ID : {trip.id}</Text>
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
                                            onPress={() => isDrop(trip.id)}
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
                                            Pin: {trip.passengerPin}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text />
                                    <View
                                        style={{
                                            backgroundColor: 'gray',
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
                                            Extend
                                        </Text>
                                    </View>
                                </View>
                                {/*<Text style={{fontSize: 20}}>₦24</Text>*/}
                            </View>
                        </View>
                    ))}

                <View style={{width: '50%', alignSelf: 'center', marginVertical: 10}}>
                    <Button
                        onPress={() => isDropAll()}
                        text={'Drop All'}
                        style={{backgroundColor: 'green'}}
                    />
                    <Button onPress={() => backToHome()} text={'Home'} />
                </View>
            </View>
        );
    };

    const showSetPassengerModal = () => {
        setIsShowSelectPassenger(false);
        setIsShowSetPassenger(true);
    };
    const showSignUpUser = () => {
        setIsShowSelectPassenger(false);
        setIsShowSetPassenger(false);
        setIsShowSignUpUser(true);
    };

    const dismiss = () => {
        setTimeout(() => {
            setIsShowSetPassenger(false);
            setIsShowSignUpUser(false);
            setIsShowPassengerModal(false);
        }, 0);
    };
    const hideSignUpUser = () => {
        setIsShowSignUpUser(false);
        setIsShowSetPassenger(false);
        setIsShowSetPassenger(true);
    };
    const renderSelectPassenger = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isShowPassengerModal}>
                {isShowSelectPassenger && (
                    <SelectPassenger
                        showSetPassengerModal={showSetPassengerModal}
                        setIsShowSelectPassenger={setIsShowSelectPassenger}
                        setIsShowPassengerModal={setIsShowPassengerModal}
                        selected={selected}
                        setSelected={setSelected}
                    />
                )}
                {isShowSetPassenger && (
                    <SetPassengerModal
                        showSignUpUser={showSignUpUser}
                        backToHome={backToHome}
                        busStop={busStop}
                        openModal={openModal}
                        isBooked={isBooked}
                        pickUp={pickup}
                        driverPin={driverPin}
                        route={driverRoute}
                        selected={selected}
                        setSelected={setSelected}
                    />
                )}
                {isShowSignUpUser && (
                    <SignUpUser
                        dismiss={dismiss}
                        hideSignUpUser={hideSignUpUser}
                        pickUp={pickup}
                        driverPin={driverPin}
                        route={driverRoute}
                        busStop={busStop}
                        isBooked={isBooked}
                    />
                )}
            </Modal>
        );
    };

    const backToHome = () => {
        setIsShowSetPassenger(false);
        setIsShowBusStopsList(true);
        setIsShowSelectPassenger(true);
        setIsShowPassengerModal(false);
        setIsShowSignUpUser(false);
        setIsShowReciptsModal(false);
    };

    const renderReciptsModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isShowReciptsModal}>
                <ReciptsModal
                    dismiss={backToHome}
                    trips={trips}
                    drop={drop}
                    dropId={dropId}
                    tripRec={tripRec}
                />
            </Modal>
        );
    };

    return (
        <View style={styles.mainCont}>
            <View style={{marginHorizontal: 20}}>
                <Text
                    style={{
                        color: '#000',
                        marginVertical: 10,
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>
                    Good {greeting}, {driverDetails.firstname}
                </Text>
                <View style={{flexDirection: 'row', marginVertical: 15}}>
                    <Text style={{fontSize: 16}}>Zone:</Text>
                    <Text
                        style={{fontWeight: 'bold', marginHorizontal: 10, fontSize: 16}}>
                        {driverDetails.zone}
                    </Text>
                    <Text style={{marginHorizontal: 10}}>|</Text>
                    <Text style={{fontSize: 16}}>Area:</Text>
                    <Text
                        style={{fontWeight: 'bold', marginHorizontal: 10, fontSize: 16}}>
                        {driverDetails.area}
                    </Text>
                </View>
                <Text
                    style={{
                        marginVertical: 5,
                        fontSize: 16,
                        flexDirection: 'row',
                        fontWeight: 'bold',
                    }}>
                    {/*{driverName.route}: <Image source={my_location} /> --------------{' '}*/}
                    <Image source={my_location} /> {driverDetails.route}
                </Text>
                <View
                    style={{
                        marginVertical: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Image source={green_circle} />
                    {drop ? (
                        <Text style={{fontSize: 14, marginHorizontal: 5}}>
                            Current Bus Stop : {drop}
                        </Text>
                    ) : null}
                    {busStop.length > 0 && !drop ? (
                        <Text style={{fontSize: 14, marginHorizontal: 5}}>
                            Current Bus Stop : {busStop[0].busstop}
                        </Text>
                    ) : null}
                    <View
                        style={{
                            backgroundColor: '#679C4C',
                            paddingHorizontal: 10,
                            paddingVertical: 7,
                            borderRadius: 6,
                        }}>
                        <Text style={{color: '#fff', fontSize: 12, fontWeight: 'bold'}}>
                            {capacity} Seats Vacant
                        </Text>
                    </View>
                </View>
                {isShowPassengerModal && renderSelectPassenger()}
                {isShowBusStopsList ? renderBusStopsList() : renderDropOffPassenger()}
                {renderReciptsModal()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainCont: {
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 20,
    },
    renderBusStopHeaderCont: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#000',
        marginHorizontal: -20,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    busStopHeader: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    oneBusStopCont: {
        flexDirection: 'row',
        height: 60,
        borderWidth: 0,
        alignItems: 'center',
    },
});


export default OnlineBottomContent;
