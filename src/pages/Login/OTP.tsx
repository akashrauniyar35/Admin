import { Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../assets/Colors'
import BackButton from './BackButton'

const OTP = ({ navigation }) => {
    const [OTP, setOTP] = useState(['', '', '', '4', '', '2'])
    const [currentInput, setCurrentInput] = useState('');



    const OTPInput = () => {

        OTP.map(() => {
            return (
                <View>
                    <Text>hello</Text>
                </View>
            )
        })
    }


    return (
        <>
              <StatusBar  barStyle='dark-content' />
            <SafeAreaView style={{ backgroundColor: Colors.skyColor }} />
            <View style={{ backgroundColor: Colors.skyColor, flex: 1 }}>
                <View style={{ paddingHorizontal: Colors.spacing * 2, }}>

                    <BackButton nav={navigation} />
                    <View style={{ marginBottom: Colors.spacing * 2 }} />

                    <Text style={{ color: Colors.black, fontWeight: '600', fontSize: 26 }}>Recover Your Password</Text>

                    <View style={{ marginBottom: Colors.spacing * 10 }} />

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 14, textAlign: 'left', }}>We sent an email to  </Text>
                        <Text style={{ fontSize: 16, color: Colors.darkBlue, fontWeight: '600' }}>milanAdhikari@gmail.com</Text>
                    </View>
                    <Text style={{ marginTop: Colors.spacing, color: 'white', fontSize: 14, textAlign: 'left', }}>If this email is connected to a WeDo Cleaners account, you'll be able to reset your password.</Text>



                    <View style={{ marginBottom: Colors.spacing * 2 }} />
                    <Text style={{ marginBottom: Colors.spacing * .5, color: 'white', fontSize: 14, textAlign: 'left', }}>Please enter the OTP we sent you on your email.</Text>

                    <View style={{}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            {
                                OTP.map((item) => {
                                    console.log('ITEM', item)
                                    return (
                                        <View style={{ width: Colors.spacing * 4, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderRadius: 5, paddingBottom: Colors.spacing * .5 }}>
                                            <TextInput
                                                keyboardType='numeric'
                                                placeholder={item}
                                                maxLength={1}
                                                placeholderTextColor={Colors.black}
                                                style={{
                                                    padding: Colors.spacing,
                                                    borderBottomWidth: 1,
                                                    borderColor: Colors.black,
                                                    backgroundColor: '#fff',
                                                    alignItems: 'center', justifyContent: 'center'


                                                }}
                                            />
                                        </View>
                                    )
                                })
                            }
                        </View>

                    </View>

                    <View style={{ marginBottom: Colors.spacing * 5 }} />
                    <Pressable onPress={() => navigation.navigate('signup')}>
                        <View style={{ backgroundColor: Colors.darkBlue, borderRadius: 5, padding: Colors.spacing, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>Verify</Text>
                        </View>
                    </Pressable>

                </View>
            </View>
        </>
    )
}

export default OTP

const styles = StyleSheet.create({})