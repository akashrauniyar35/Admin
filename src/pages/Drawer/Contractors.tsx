import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import Header from '../../components/Header'
import { Colors } from '../../assets/Colors'


const Contractors = ({ navigation }) => {
  

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />
                <View style={{}}>
                    <Header nav={navigation} title="Contractors" />

                
                </View>
            </View>
        </>
    )
}

export default Contractors

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.madlyBGBlue, },
})