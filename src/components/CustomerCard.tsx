import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, isAndroid } from '../assets/Colors'
import InputBox from './InputBox'
import AddressCard from './AddressCard'


const CustomerCard = ({ firstName, lastName, phone, email, unit, streetAddress, suburb, postCode, state,
    firstNameHandler, lastNameHandler, phoneHandler, emailHandler, unitHandler, streetAddressHandler, suburbHandler, postCodeHandler, stateHandler, companyName, companyNameHandler }: any) => {

    const [predectionsVisible, setPredectionsVisible] = useState(false)
    const toggleLocations = () => { setPredectionsVisible(!predectionsVisible) }


    const onAddressChange = (value) => {
        console.log('123124', value)
    }

    let newState = state.toLowerCase().substring(0, 1) === "q" ? "QLD" : state.toLowerCase().substring(0, 1) === "v" ? "VIC" : state.toLowerCase().substring(0, 1) === "t" ? "TAS" : state.toLowerCase().substring(0, 1) === "w" ? "WA" : state.toLowerCase().substring(0, 1) === "s" ? "SA" : state.toLowerCase().substring(0, 1) === "s" ? "SA" : "NSW"

    return (

        <View style={{}}>
            <Text style={{ fontSize: 18, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing * 2 }}>Customer info</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>First Name</Text>
                <View style={{ width: "70%", }}>
                    <InputBox placeholder={firstName} value={firstName} size={40} capitalize={"words"} rounded={true} onChange={firstNameHandler} placeholderSize={12} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Last Name</Text>
                <View style={{ width: "70%", }}>
                    <InputBox placeholder={lastName} value={lastName} size={40} capitalize={"words"} rounded={true} onChange={lastNameHandler} placeholderSize={12} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Company Name</Text>
                <View style={{ width: "70%", }}>
                    <InputBox value={companyName} placeholder={companyName} size={40} capitalize={"words"} rounded={true} onChange={companyNameHandler} placeholderSize={12} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2 }}>
                <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Number</Text>
                <View style={{ width: "70%" }}>
                    <InputBox value={phone} maxLength={10} size={40} rounded={true} placeholder={phone} onChange={phoneHandler} keyboardType="numeric" placeholderSize={12} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2 }}>
                <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Email</Text>
                <View style={{ width: "70%", }}>
                    <InputBox value={email} size={40} rounded={true} capitalize={"none"} placeholder={email} onChange={emailHandler} keyboardType="email-address" placeholderSize={12} />
                </View>
            </View>

            <View style={{}}>

                <View style={{ width: "100%" }}>
                    <AddressCard unit={unit} streetAddress={streetAddress} suburb={suburb} postCode={postCode} state={newState} unitHandler={unitHandler} streetAddressHandler={streetAddressHandler} suburbHandler={suburbHandler} postCodeHandler={postCodeHandler} stateHandler={stateHandler} />
                </View>

            </View>

            <View style={{ width: '100%', opacity: .35, marginVertical: Colors.spacing * 2, borderBottomWidth: 2, borderColor: Colors.borderColor }} />

        </View>

    )
}

export default CustomerCard

const styles = StyleSheet.create({})