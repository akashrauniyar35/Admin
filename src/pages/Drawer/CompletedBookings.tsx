import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import Header from '../../components/Header'
import { Colors } from '../../assets/Colors'


const CompletedBookings = ({ navigation }) => {


    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />
                <View style={{}}>
                    <Header nav={navigation} title="Completed Bookings" />

                </View>
            </View>
        </>
    )
}

export default CompletedBookings

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.madlyBGBlue, },
})