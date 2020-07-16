import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '../'
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { arrow_back_left } from "../../images";
const SimpleHeader = ({ }) => {

    return (
        <View style={styles.container}>
            <Image source={arrow_back_left} />
            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}  >{'Sign up'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    }
})
export default SimpleHeader;