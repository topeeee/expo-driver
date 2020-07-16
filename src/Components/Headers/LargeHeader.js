import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from '../Text';
import { logo_mini } from '../../images'
const LargeHeader = ({ heading, subHeadeing, titleImageSource }) => {
    return (
        <View style={{}}>
            <Image source={titleImageSource ? titleImageSource : logo_mini} style={styles.imageLogo} resizeMode={'contain'} />
            {subHeadeing && <Text style={styles.subHeading} >{subHeadeing}</Text>}
            {heading && <Text style={styles.heading}  >{heading}</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
    imageLogo: {
        marginVertical: 5,
    },
    subHeadeing: {
        color: '#000', marginVertical: 5, fontSize: 16,
    },
    heading: {
        color: '#000', marginVertical: 5, fontSize: 24, fontWeight: 'bold'
    }
})
export default LargeHeader;
