import { FlatList, Modal, Pressable, SectionList, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, isAndroid, WIDTH } from '../assets/Colors'
import { timeDataAM, timeDataPM } from './timeData'





const PickTimeModal = ({ isVisible, onPress, onClose, lable }) => {
    return (
        <View>
            <Modal style={{ flex: 1, }} animationType="fade" transparent={true} visible={isVisible} >
                <View style={styles.container}>
                    <View style={styles.selectonContainer}>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {timeDataAM.map((item) => {
                                return (
                                    <Pressable style={styles.timeCard} onPress={() => onPress(item.title)}>
                                        <Text style={{ fontSize: 12, color: 'white', fontFamily: 'Outfit-Medium', }}>{item.title}</Text>
                                    </Pressable>
                                )
                            })}
                        </View>

                        <View style={{ opacity: .35, marginVertical: Colors.spacing * 2, marginBottom: Colors.spacing * 3, borderBottomWidth: 2, borderColor: 'white' }} />



                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {timeDataPM.map((item) => {
                                return (
                                    <Pressable style={styles.timeCard} onPress={() => onPress(item.title)}>
                                        <Text style={{ fontSize: 12, color: 'white',fontFamily: 'Outfit-Medium', }}>{item.title}</Text>
                                    </Pressable>
                                )
                            })}
                        </View>
                        <Pressable style={{ alignSelf: 'flex-end', marginTop: Colors.spacing, marginRight: Colors.spacing }} onPress={onClose}>
                            <Text style={{ fontSize: 14, color: 'white', fontFamily: 'Outfit-Bold',}}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal >
        </View >
    )
}

export default PickTimeModal

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.transparentGloss, },
    selectonContainer: {
        width: WIDTH * .8,
        padding: Colors.spacing * 2,
        position: 'relative',
        backgroundColor: Colors.maidlyGrayText,
        paddingVertical: Colors.spacing * 4,

    },
    timeCard: {
        width: Colors.spacing * 8,
        borderWidth: .35, borderColor: 'white',
        paddingVertical: Colors.spacing * 1,
        alignItems: 'center',
        marginRight: Colors.spacing,
        marginBottom: Colors.spacing,
        borderRadius: Colors.spacing * .5
    }
})