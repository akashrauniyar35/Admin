import { Dimensions, Modal, Pressable, TextInput, SafeAreaView, StyleSheet, TouchableWithoutFeedback, FlatList, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import AddButtonHeader from '../../components/AddButtonHeader';
import { Colors, isAndroid, WIDTH } from '../../assets/Colors';
import InputBox from '../../components/InputBox';
import SelectionCard from '../../components/SelectionCard';



const EditContractor = ({ id, isOpen, onClose, editHandler, loading }) => {

    return (
        <>
            <View style={{}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isOpen}
                >
                    <SafeAreaView />
                    <View style={styles.centeredView}>
                        <AddButtonHeader loading={loading} onClose={onClose} lable={'Edit Technician'} saveOption={true} onPress={editHandler} />
                        <View style={styles.modalView}>
                            <Text style={{ color: 'red' }}>{id}</Text>
                        </View>
                    </View >
                </Modal >
            </View >

        </>
    )
}

export default EditContractor

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
    },
    modalView: {
        backgroundColor: "white",
        width: WIDTH,
        paddingHorizontal: Colors.spacing * 1,
        flex: 1,
        paddingTop: Colors.spacing * 2,

    },
    buttonsFull: {
        alignItems: "center",
        marginBottom: Colors.spacing * 2,
        justifyContent: "center",
        flexDirection: 'row',
        backgroundColor: Colors.madidlyThemeBlue,
        height: isAndroid ? 45 : 45,
        borderRadius: Colors.spacing * Colors.spacing,

    },


})
