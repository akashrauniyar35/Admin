import { Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../assets/Colors'
import BackButton from './BackButton'
import Icon from 'react-native-vector-icons/Ionicons';
const RecoverPassword = ({ navigation }: any) => {
    const [visible, setVisible] = useState(false);


    return (
        <>
            <StatusBar barStyle='light-content' />
            <SafeAreaView style={{ backgroundColor: Colors.skyColor }} />
            <View style={{ backgroundColor: Colors.skyColor, flex: 1 }}>
                <View style={{ paddingHorizontal: Colors.spacing * 2, }}>

                    <SafeAreaView />
                    <View style={{ marginTop: Colors.spacing }}>
                        <BackButton nav={navigation} />
                    </View>
                    <View style={{ marginBottom: Colors.spacing * 2 }} />
                    <Text style={{ color: Colors.black, fontWeight: '600', fontSize: 26, fontFamily: 'Outfit-Bold', }}>Password</Text>
                    <View style={{ marginTop: Colors.spacing * 2 }}>
                        <Text style={{ color: Colors.grayOne, fontSize: 14, textAlign: 'left', marginBottom: Colors.spacing, fontFamily: 'Outfit-light', }}>Please enter your new password</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TextInput
                                secureTextEntry={!visible}
                                placeholderTextColor={Colors.grayText}
                                style={{ color: Colors.black, fontSize: 16, backgroundColor: '#fff', padding: Colors.spacing, borderRadius: 5, fontFamily: 'Outfit-Light', width: "100%" }}
                                placeholder={''}
                            />
                            <Pressable onPress={() => setVisible(!visible)} style={{ position: 'absolute', right: 10 }}>
                                <Icon name={visible ? "eye" : "eye-off"} size={24} color={Colors.black} />
                            </Pressable>
                        </View>

                    </View>
                    <View style={{ marginTop: Colors.spacing * 5 }} />
                    <Pressable onPress={() => navigation.navigate('login')}>
                        <View style={{ height: 40, backgroundColor: Colors.madidlyThemeBlue, borderRadius: 5, padding: Colors.spacing, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: "Outfit-Bold", fontSize: 14, color: '#fff', fontWeight: '600' }}>Reset Password</Text>
                        </View>
                    </Pressable>

                </View>
            </View>
        </>
    )
}

export default RecoverPassword

const styles = StyleSheet.create({})