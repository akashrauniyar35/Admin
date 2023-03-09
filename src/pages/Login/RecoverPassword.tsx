import { ActivityIndicator, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../assets/Colors'
import BackButton from './BackButton'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

const RecoverPassword = ({ navigation }: any) => {

    const reEmail = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

    const [loading, setLoading] = useState<boolean>()
    const [email, setEmail] = useState<any>()
    const [error, setError] = useState<boolean>()

    const onPressHandler = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigation.navigate('otp', { email: email })
        }, 3000)
    }


    useEffect(() => {
        reEmail.test(email) ? setError(true) : setError(false)
    }, [email])


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
                    <Text style={{ color: Colors.black, fontWeight: '600', fontSize: 26, fontFamily: 'Outfit-Bold', }}>Recover Your Password</Text>
                    <View style={{ marginTop: Colors.spacing * 2 }}>
                        <Text style={{ color: Colors.grayOne, fontSize: 14, textAlign: 'left', marginBottom: Colors.spacing, fontFamily: 'Outfit-light', }}>What's your email?</Text>

                        {email?.length > 4 && !error &&
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * 1 }}>
                                <IconM name="alert-circle-outline" size={18} style={{ color: Colors.red }} />
                                <Text style={{ color: Colors.red, fontFamily: 'Outfit-medium', fontSize: 12, marginLeft: Colors.spacing * .5 }}>Please enter a valid email</Text>
                            </View>}

                        <TextInput
                            keyboardType="email-address"
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            placeholderTextColor={Colors.grayText}
                            style={{ fontSize: 16, backgroundColor: '#fff', padding: Colors.spacing, borderRadius: 5, fontFamily: 'Outfit-Light', color: Colors.black, }}
                            placeholder={'Enter email'}
                        />
                    </View>

                    <View style={{ marginBottom: Colors.spacing * 4 }} />

                    <Pressable onPress={error ? onPressHandler : null}>
                        <View style={{ opacity: !error ? .5 : 1, height: 40, backgroundColor: Colors.madidlyThemeBlue, borderRadius: 5, padding: Colors.spacing, alignItems: 'center', justifyContent: 'center' }}>

                            {loading ? <ActivityIndicator color={"#fff"} animating={loading} size={'small'} style={{}} />
                                :
                                <Text style={{ fontFamily: "Outfit-Bold", fontSize: 14, color: '#fff', fontWeight: '600' }}>Reset Password</Text>
                            }

                        </View>
                    </Pressable>

                </View>
            </View>
        </>
    )
}

export default RecoverPassword

const styles = StyleSheet.create({})