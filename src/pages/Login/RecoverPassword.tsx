import { Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors } from '../../assets/Colors'
import BackButton from './BackButton'

const RecoverPassword = ({ navigation }) => {
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={{ backgroundColor: Colors.skyColor }} />
            <View style={{ backgroundColor: Colors.skyColor, flex: 1 }}>
                <View style={{ paddingHorizontal: Colors.spacing * 2, }}>

                    <SafeAreaView />
                    <BackButton nav={navigation} />
                    <View style={{ marginBottom: Colors.spacing * 2 }} />
                    <Text style={{ color: Colors.black, fontWeight: '600', fontSize: 26 }}>Recover Your Password</Text>
                    <View style={{ marginTop: Colors.spacing * 10 }}>
                        <Text style={{ color: 'white', fontSize: 14, textAlign: 'left', marginBottom: Colors.spacing }}>What's your email?</Text>
                        <TextInput
                            style={{ fontSize: 16, backgroundColor: '#fff', padding: Colors.spacing, borderRadius: 5, }}
                            placeholderTextColor={Colors.black}
                            placeholder={'Enter eamil'}
                        />
                    </View>
                    <View style={{ marginBottom: Colors.spacing * 5 }} />
                    <Pressable onPress={() => navigation.navigate('otp')}>
                        <View style={{ backgroundColor: Colors.darkBlue, borderRadius: 5, padding: Colors.spacing, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>Reset Password</Text>
                        </View>
                    </Pressable>

                </View>
            </View>
        </>
    )
}

export default RecoverPassword

const styles = StyleSheet.create({})