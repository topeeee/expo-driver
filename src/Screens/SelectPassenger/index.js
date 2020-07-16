import React from 'react';
import {View, Picker, StyleSheet} from 'react-native';
import Text from '../../Components/Text';
import Button from "../../Components/Button";


const SelectPassenger = ({
                             showSetPassengerModal,
                             setIsShowSelectPassenger,
                             setIsShowPassengerModal,
                             selected,
                             setSelected,
                         }) => {

    function closeModal() {
        setIsShowPassengerModal(false);
        setIsShowSelectPassenger(false);
    }
    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Select number of Passengers to Pick</Text>
                    <View style={styles.inputContainer}>
                        <Text style={{color: '#7A869A', fontSize: 15}}>
                            Number of passengers
                        </Text>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Picker
                                selectedValue={selected}
                                onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
                                style={{width: '100%'}}>
                                <Picker.Item label="1" value="1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="5" value="5" />
                                <Picker.Item label="6" value="6" />
                                <Picker.Item label="7" value="7" />
                            </Picker>
                        </View>
                        <Button
                            onPress={showSetPassengerModal}
                            text={'Done'}
                            style={{marginVertical: 5}}
                        />
                        <Text
                            onPress={closeModal}
                            style={{
                                textAlign: 'center',
                                fontSize: 14,
                                marginVertical: 15,
                                color: '#7A869A',
                            }}>
                            Cancel
                        </Text>
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
    headerContainer: {
        width: '85%',
        height: 250,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 20,
        overflow: 'hidden',
    },
    header: {
        color: '#fff',
        fontSize: 16,
        paddingVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: '#000',
        marginHorizontal: -20,
    },
    inputContainer: {
        flex: 1,
        // borderWidth: 0,
        marginVertical: 15,
        borderWidth: 0,
        marginHorizontal: 0,
    },
});
export default SelectPassenger;
