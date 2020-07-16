import React from 'react';
import { View, TextInput, Modal, Image } from 'react-native';
import { Text, Button } from '../../Components'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { popup_banner } from "../../images";
const Popup = ({ visible, closeLocationPermissionModal }) => {
    return (<View style={{ flex: 1 }}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible} >
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, .5)', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 450, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', width: '80%', borderRadius: 20 }}>
                    <Image source={popup_banner} resizeMode={'contain'} style={{ height: 170 }} />
                    <Text style={{ fontSize: 20, marginVertical: 10 }}>Enable location services</Text>
                    <Text style={{ textAlign: 'center', marginVertical: 0, marginHorizontal: 25, color: '#7A869A' }}>We wants to access your location only to provide a better experience.</Text>
                    <View style={{ borderWidth: 0, width: '60%', marginVertical: 15, borderWidth: 0, justifyContent: 'center' }}>
                        <Button onPress={closeLocationPermissionModal} text={'ENABLE'} style={{ marginVertical: 5, }} />
                        <Text onPress={closeLocationPermissionModal} style={{ textAlign: 'center', fontSize: 14, marginVertical: 15, color: '#7A869A' }}>Cancel</Text>
                    </View>
                </View>
            </View>
        </Modal>
    </View>)
}
export default Popup;