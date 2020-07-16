import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '..'
import { google_logo } from '../../images'
const GoogleLoginButton = ({ style }) => {

    return (
        <View style={[styles.container, { ...style }]}>
            <Image source={google_logo} />
            <Text style={styles.btnText}>{'Connect with Google'}</Text>
            <View />
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', height: 50, backgroundColor: '#fff', justifyContent: 'space-around', alignItems: 'center', borderRadius: 10, borderColor: '#707070', borderWidth: .2, marginVertical: 5,
    },
    btnText: {
        color: '#11243D', fontSize: 15, letterSpacing: 1
    }
})
export default GoogleLoginButton;