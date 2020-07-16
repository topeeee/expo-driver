import React from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView, TextInput, Vibration } from 'react-native'
import { welcome_banner, placeholder_image } from "../../images";
import { Text } from '../../Components';
import { SimpleHeader, LargeHeader, Button, Input, GoogleLoginButton, FacebookLoginButton } from '../../Components'
import PhoneInput from 'react-native-phone-input'
// import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const SignUp = ({ navigation }) => {


    const renderPhoneInput = () => {
        return (<View>
            <Text style={{ color: '#7A869A', fontSize: 15, }} >{'Phone Number'}</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderWidth: 1, borderRadius: 5, borderColor: '#E6E6EB', marginVertical: 10, paddingHorizontal: 10, paddingVertical: 2 }}>
                <View style={{ flexDirection: 'row', width: 80 }}>
                    <PhoneInput value={'+92'} />
                </View>
                <TextInput style={{ textAlign: 'center', flex: 1, borderLeftColor: '#E6E6EB', borderLeftWidth: 1 }} />
            </View>
        </View>)
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={{ marginHorizontal: 25 }}>
                <SimpleHeader />
                <View style={{}}>
                    <Image style={{ alignSelf: 'center' }} resizeMode={'contain'} source={placeholder_image} />
                </View>
                <Input label={'First Name'} value={'Tumi'} style={{ marginVertical: 5, }} />
                <Input label={'last Name'} value={'Tumi suan'} style={{ marginVertical: 5 }} />
                <Input label={'Email Address'} value={'Tumi@gmail.com'} style={{ marginVertical: 5 }} />
                {renderPhoneInput()}
                <Input label={'Password'} value={'************'} style={{ marginVertical: 5 }} />
                <Input label={'Password'} value={'************'} style={{ marginVertical: 5 }} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                        {/*<MIcon name={'check-circle'} size={20} />*/}
                    </View>
                    <View>
                        <Text style={{ marginVertical: 5, color: '#7A869A' }}>{`By creating an account, you aggree to our`}</Text>
                        <Text style={{ marginVertical: 5 }}>{`Term and Conditions`}</Text>
                    </View>
                </View>
                <Button onPress={() => navigation.navigate('Home')} text={'CREATE ACCOUNT'} style={{ marginVertical: 20 }} />
                <Text style={{ marginVertical: 10, textAlign: 'center', color: '#7A869A' }}>{`Or sign in account`}</Text>
            </View>
        </ScrollView >
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 25,
        backgroundColor: '#fff'
    }
})
