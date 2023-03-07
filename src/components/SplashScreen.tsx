import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import google from '../assets/newlogo.png'
import { Colors } from '../assets/Colors'

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={google} style={{ width: 150, height: 100, marginTop: 30 }} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.skyColor
    }
})