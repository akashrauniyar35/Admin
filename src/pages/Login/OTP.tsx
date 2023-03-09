import { ActivityIndicator, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../assets/Colors'
import BackButton from './BackButton'
import OTPInput from './OTPInput'

const OTP = ({ navigation, route }: any) => {

    const { email } = route.params
    const [code, setCode] = useState("")
    const [pinReady, setPinReady] = useState(false);
    const MAX_CODE_LENGTH = 4
    const [seconds, setSeconds] = useState(60);
    const [error, setError] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>()

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (seconds > 0) {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [seconds]);

    const handleOTP = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setError(true)
        }, 3000)
    }

    return (
        <>
            <StatusBar barStyle='light-content' />
            <SafeAreaView style={{ backgroundColor: Colors.skyColor }} />
            <View style={{ backgroundColor: Colors.skyColor, flex: 1 }}>
                <View style={{ paddingHorizontal: Colors.spacing * 2, }}>

                    <View style={{ marginTop: Colors.spacing }}>
                        <BackButton nav={navigation} />
                    </View>
                    <View style={{ marginBottom: Colors.spacing * 2 }} />

                    <Text style={{ fontFamily: 'Outfit-Bold', color: Colors.black, fontWeight: '600', fontSize: 26 }}>Recover Your Password</Text>
                    <View style={{ marginBottom: Colors.spacing * 4 }} />

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Outfit-Bold', color: 'white', fontSize: 14, textAlign: 'left', }}>We sent an email to  </Text>
                        <Text style={{ fontFamily: 'Outfit-Bold', color: Colors.madidlyThemeBlue, fontSize: 14, textAlign: 'left', }}>{email}</Text>
                    </View>
                    <Text style={{ fontFamily: "Outfit-Light", marginTop: Colors.spacing, color: Colors.black, fontSize: 14, textAlign: 'left', }}>If this email is connected to a WeDo Admin account, you'll be able to reset your password.</Text>


                    <View style={{ marginBottom: Colors.spacing * 2 }} />
                    <Text style={{ marginBottom: Colors.spacing * .5, fontFamily: 'Outfit-Bold', color: Colors.black, fontSize: 14, textAlign: 'left', }}>Please enter the OTP we sent you on your email.</Text>

                    <View style={{ marginTop: Colors.spacing * 1 }} />

                    {error ? <Text style={{ color: Colors.red, fontSize: 14, alignSelf: 'center', fontFamily: 'Outfit-Medium', position: 'relative' }}>Invalid OTP</Text> : null}

                    <OTPInput pinReady={pinReady} code={code} setCode={setCode} setPinReady={setPinReady} maxLength={MAX_CODE_LENGTH} />

                    <View style={{ marginTop: Colors.spacing * 1 }} />

                    {
                        seconds === 0 ?
                            <Text onPress={() => setSeconds(60)} style={{ color: Colors.black, fontSize: 14, alignSelf: 'center', fontFamily: 'Outfit-Medium', position: 'relative' }}>Resend Code</Text> :
                            <Text style={{ color: Colors.black, fontSize: 14, alignSelf: 'center', fontFamily: 'Outfit-Medium' }}>
                                Time Remaining: <Text style={{ color: Colors.red, fontSize: 14, alignSelf: 'center', fontFamily: 'Outfit-Medium', position: "absolute" }}>
                                    {seconds}
                                </Text> seconds
                            </Text>
                    }

                    <View style={{ marginTop: Colors.spacing * 4 }} />
                    <Pressable onPress={pinReady ? handleOTP : null}>
                        <View style={{ height: 40, backgroundColor: Colors.madidlyThemeBlue, borderRadius: 5, padding: Colors.spacing, alignItems: 'center', justifyContent: 'center', opacity: pinReady ? 1 : .4 }}>

                            {loading ? <ActivityIndicator color={"#fff"} animating={loading} size={'small'} style={{}} /> :
                                <Text style={{ fontFamily: "Outfit-Bold", fontSize: 14, color: '#fff', fontWeight: '600', }}>Verify</Text>
                            }
                        </View>
                    </Pressable>

                </View>
            </View>
        </>
    )
}

export default OTP

const styles = StyleSheet.create({


})