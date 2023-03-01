import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Header from '../../components/Header'
import { Colors, isAndroid } from '../../assets/Colors'
import { getNewRefreshTolken } from '../../config/UserApi'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddButtonHeader from '../../components/AddButtonHeader'
import InputBox from '../../components/InputBox'
import AsyncStorage from '@react-native-async-storage/async-storage'



const Password = ({ navigation }: any) => {
    const [passwordOne, setPasswordOne] = useState("")
    const [passwordTwo, setPasswordTwo] = useState("")
    const [error, setError] = useState(false);

    const updateHandler = async () => {
        const refresh_token = await AsyncStorage.getItem('@refresh_Token')
        const x: any = await getNewRefreshTolken()
        console.log("previous Token", refresh_token)
        console.log("New Token", x)
    }

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />

                <AddButtonHeader saveOption={false} onClose={() => navigation.goBack()} lable={"Update Password"} />

                <View style={[styles.shadow, { marginBottom: Colors.spacing * 2 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Password</Text>
                        <View style={{ width: "70%", }}>
                            <InputBox secureTextEntry={false} placeholder={''} size={40} rounded={true} placeholderSize={12} onChange={(val: any) => setPasswordOne(val)} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", width: "30%", }}>Confirm password</Text>
                        <View style={{ width: "70%", }}>
                            <InputBox secureTextEntry={false} placeholder={""} size={40} rounded={true} placeholderSize={12} onChange={(val: any) => setPasswordTwo(val)} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Icon name="alert-circle-outline" size={18} style={{ color: Colors.red }} />
                        <Text style={{ color: Colors.red, fontFamily: 'Outfit-medium', fontSize: 12, marginLeft: Colors.spacing * .5 }}>Error password didn't match</Text>
                    </View>
                </View>

                <Pressable onPress={updateHandler}>
                    <View style={[styles.buttonsFull, { marginTop: Colors.spacing * 1 }]}>
                        <Text style={{
                            fontSize: 14,
                            color: 'white', fontWeight: isAndroid ? "900" : "700"
                        }}>Update password</Text>
                    </View>
                </Pressable>
            </View>
        </>
    )
}

export default Password

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.madlyBGBlue, },
    text: {
        fontFamily: "Outfit",
        fontSize: 14
    },
    shadow: {
        marginTop: Colors.spacing * 2,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .2,
        elevation: 2,
        borderRadius: Colors.spacing * 2,
        backgroundColor: 'white',
        shadowColor: Colors.grayOne,
        paddingHorizontal: Colors.spacing * 2,
        marginHorizontal: Colors.spacing * 2,
        paddingVertical: Colors.spacing * 2
    },
    buttonsFull: {
        alignItems: "center",
        marginHorizontal: Colors.spacing * 2,
        justifyContent: "center",
        backgroundColor: Colors.madidlyThemeBlue,
        height: 45,
        borderRadius: Colors.spacing * Colors.spacing,

    },

})