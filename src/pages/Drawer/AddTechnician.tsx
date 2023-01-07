import { Dimensions, Modal, Pressable, TextInput, SafeAreaView, StyleSheet, TouchableWithoutFeedback, FlatList, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import AddButtonHeader from '../../components/AddButtonHeader';
import { Colors, WIDTH } from '../../assets/Colors';






const data = [

]


const AddTechnician = ({ isOpen, onClose }) => {

    const onSaveHandler = () => {
        console.log('tech saved')
    }


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

                        <AddButtonHeader saveOption={true} onClose={onClose} lable={'Add Technician'} onPress={onSaveHandler} />

                        <View style={styles.modalView}>

                        </View>


                    </View >
                </Modal >
            </View >


        </>
    )
}

export default AddTechnician

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
        flex: 1,
        paddingBottom: Colors.spacing,

    },


})
