import React from 'react';
import { Text, StyleSheet } from "react-native";

const Textt = ({ text, style, children, onPress }) => {
    return (
        <Text onPress={onPress} style={[styles.text, style]}>{children}</Text>
    )
}

export default Textt

const styles = StyleSheet.create({
    text: {
        // fontFamily: 'BreezeSans-Regular'
    }
})
