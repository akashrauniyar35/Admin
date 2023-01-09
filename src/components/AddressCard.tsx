import { StyleSheet, Text, Dimensions, View, TextInput, Animated, LayoutAnimation, Image, TouchableWithoutFeedback, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useState, useRef } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, isAndroid } from '../assets/Colors';
import InputBox from './InputBox';
import SelectionCard from './SelectionCard';

const { width, height } = Dimensions.get('screen')


const bathroomsData = [
    {
        id: '00',
        name: 'NSW',
    },
    {
        id: '01',
        name: 'VIC',
    },
    {
        id: '02',
        name: 'TAS',
    },
    {
        id: '03',
        name: 'WA',
    },
    {
        id: '04',
        name: 'SA',
    },
    {
        id: '05',
        name: 'QLD',
    },
];
const AddressCard = ({ unit, streetAddress, suburb, postCode, state,
    unitHandler, streetAddressHandler, suburbHandler, postCodeHandler, stateHandler }) => {

    const regionHandler = (value) => {
        const x = value.substring(0, 1)
        stateHandler(value)
    }


    return (
        <>

            <View style={styles.container}>

                <View style={{}}>
                    <Text style={{ fontSize: 18, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", marginBottom: Colors.spacing * 2 }}>Address</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "600", }}>Unit</Text>
                        <View style={{ width: "70%", }}>
                            <InputBox value={unit} keyboardType="numeric" capitalize={"characters"} placeholder={unit} size={40} maxLength={4} rounded={true} placeholderSize={12} onChange={unitHandler} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2 }}>
                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "600", }}>Street Address</Text>
                        <View style={{ width: "70%" }}>
                            <InputBox value={streetAddress} capitalize={"words"} onChange={streetAddressHandler} size={40} rounded={true} placeholder={streetAddress} placeholderSize={12} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2 }}>
                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "600", }}>Suburb</Text>
                        <View style={{ width: "70%" }}>
                            <InputBox value={suburb} capitalize={"words"} onChange={suburbHandler} size={40} rounded={true} placeholder={suburb} placeholderSize={12} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * 2, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "22%", }}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "600", }}>Post code</Text>
                        </View>

                        <View style={{ marginLeft: Colors.spacing * 3, marginRight: Colors.spacing * .25, width: '70%', flexDirection: 'row', alignItems: 'center', }}>

                            <View style={{ width: "40%", marginRight: Colors.spacing * 2 }}>
                                <InputBox value={postCode} size={40} rounded={true} placeholder={postCode} onChange={postCodeHandler} keyboardType="numeric" placeholderSize={12} maxLength={4} />
                            </View>
                            <View style={{ width: "40%" }}>
                                <SelectionCard onPress={regionHandler} size={40} fontSize={12} phColor={Colors.maidlyGrayText} rounded={true} data={bathroomsData} type={'filter'} placeholder={state.toUpperCase()} />
                            </View>
                        </View>


                    </View>

                </View>

            </View >

        </>
    )
}

export default AddressCard

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    taskTitle: {
        justifyContent: 'center',
        paddingHorizontal: Colors.spacing,
        borderColor: Colors.black,
        backgroundColor: 'white',
        shadowRadius: 2,
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: .2,
        elevation: 2,

        // height: isAndroid ? 50 : 40,
    },

    drowpDown: {
        paddingTop: Colors.spacing * 1
    },

    box: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        alignItems: 'center',

        paddingHorizontal: 10,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#7E7E7E',
        position: 'relative',
    },

    unlocation: {
        alignItems: 'center',
        padding: 14,
        paddingHorizontal: 10,
        paddingVertical: 18,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#7E7E7E',
        position: 'relative',
    },


})