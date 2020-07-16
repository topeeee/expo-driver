import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '..'
import { facebook_logo } from '../../images';

const FacebookLoginButton = ({ style }) => {

    return (
        <View style={[styles.container, { ...style }]}>
            <Image source={facebook_logo} />
            <Text style={styles.btnText}>{'Connect with Facebook'}</Text>
            <View />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', height: 50, backgroundColor: '#4267B2', justifyContent: 'space-around', alignItems: 'center', borderRadius: 10, borderColor: '#707070', borderWidth: .2, marginVertical: 5,
    },
    btnText: {
        color: '#fff', fontSize: 15, letterSpacing: 1
    }
})
export default FacebookLoginButton;