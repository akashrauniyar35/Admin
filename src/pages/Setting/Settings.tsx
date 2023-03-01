import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Header from '../../components/Header'
import { Colors } from '../../assets/Colors'
import { getNewRefreshTolken } from '../../config/UserApi'

import Icon from 'react-native-vector-icons/Ionicons';


const Settings = ({ navigation }: any) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />
                <View style={{}}>
                    <Header nav={navigation} title="Settings" />
                    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                        <Pressable style={styles.button} onPress={() => navigation.navigate("personalInfo")}>
                            <Text style={styles.text}>Update personal information</Text>
                            <Icon name="chevron-forward" size={18} color={Colors.black} />
                        </Pressable>

                        <Pressable style={styles.button} onPress={() => navigation.navigate("updatePassword")}>
                            <Text style={styles.text}>Update pessword</Text>
                            <Icon name="chevron-forward" size={18} color={Colors.black} />
                        </Pressable>
                    </View>

                </View>
            </View>
        </>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.madlyBGBlue, },
    text: {
        fontFamily: "Outfit",
        fontSize: 14
    },
    button: {
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }

})