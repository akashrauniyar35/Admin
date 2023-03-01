import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, ActivityIndicator, TurboModuleRegistry, Dimensions } from 'react-native';
import { Colors } from '../assets/Colors';
import signal from '../assets/signal.png'
import NetInfo from "@react-native-community/netinfo";

const { width, height } = Dimensions.get('screen')
const NoInternetModal = ({ isOpen }: any) => {
    const [timer, SetTimer] = useState<boolean>()
    const [netInfo, setNetInfo] = useState<boolean | null>(true);

    useEffect(() => {
        const data = NetInfo.addEventListener((state) => {
            setNetInfo(state.isConnected)
        })
        return data
    }, [])

    const onPress = () => {
        SetTimer(true)
        setTimeout(function () { SetTimer(false) }, 3000)
    }
    return (
        <View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={!netInfo}
            >
                <View style={styles.centeredView}>
                    <View style={styles.container}>
                        <Image source={signal} resizeMode="cover" style={{ height: 100, width: 100 }} />
                        <Text style={styles.text}>Opps, No Internet Connection</Text>
                        <Text style={styles.text2}>Make sure wifi or cellular data is turned on and then try again.</Text>

                        <Pressable style={styles.button} onPress={() => onPress()}>

                            {timer ? <ActivityIndicator color={"#fff"} size={'small'} animating={timer} style={{ transform: [{ scale: .8 }], }} />
                                : <Text style={{ color: '#fff', fontFamily: "Outfit-Bold", fontSize: 12 }}>TRY AGAIN</Text>
                            }
                        </Pressable>
                    </View>

                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 60
    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: Colors.madlyBGBlue,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontFamily: "Outfit-Bold",
        color: Colors.madidlyThemeBlue,
        fontSize: 16,
        marginTop: Colors.spacing * 4
    },
    text2: {
        fontFamily: "Outfit-Medium",
        color: Colors.madidlyThemeBlue,
        fontSize: 14,
        textAlign: 'center',
        marginTop: Colors.spacing * 1,
        width: "60%"
    },
    button: {
        backgroundColor: Colors.red,
        height: 35,
        width: "30%",
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: Colors.spacing * 10,
        marginTop: Colors.spacing * 4
    }

});

export default NoInternetModal;