import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../Text'

const Button = ({ text, style, onPress }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: 50, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginVertical: 5,
                ...style
            }}>
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', letterSpacing: 1 }}>{text}</Text>
        </TouchableOpacity >
    )
}
export default Button;
