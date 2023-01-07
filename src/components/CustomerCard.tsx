import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, isAndroid } from '../assets/Colors'
import InputBox from './InputBox'
import AddressCard from './AddressCard'


const CustomerCard = ({ firstName, lastName, phone, email, unit, streetAddress, suburb, postCode, state,
    firstNameHandler, lastNameHandler, phoneHandler, emailHandler, unitHandler, streetAddressHandler, suburbHandler, postCodeHandler, stateHandler, companyName, companyNameHandler }) => {

    const [predectionsVisible, setPredectionsVisible] = useState(false)
    const toggleLocations = () => { setPredectionsVisible(!predectionsVisible) }


    const onAddressChange = (value) => {
        console.log('123124', value)
    }


    return (

        <View style={{}}>
            <Text style={{ fontSize: 18, color: Colors.black, fontWeight: isAndroid ? "900" : "700", marginBottom: Colors.spacing * 2 }}>Customer info</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>First Name</Text>
                <View style={{ width: "70%", }}>
                    <InputBox placeholder={firstName} value={firstName} size={40} capitalize={"words"} rounded={true} onChange={firstNameHandler} placeholderSize={12} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>Last Name</Text>
                <View style={{ width: "70%", }}>
                    <InputBox placeholder={lastName} value={lastName} size={40} capitalize={"words"} rounded={true} onChange={lastNameHandler} placeholderSize={12} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>Company Name</Text>
                <View style={{ width: "70%", }}>
                    <InputBox value={companyName} placeholder={companyName} size={40} capitalize={"words"} rounded={true} onChange={companyNameHandler} placeholderSize={12} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2 }}>
                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>Number</Text>
                <View style={{ width: "70%" }}>
                    <InputBox value={phone} maxLength={10} size={40} rounded={true} placeholder={phone} onChange={phoneHandler} keyboardType="phone-pad" placeholderSize={12} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2 }}>
                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>Email</Text>
                <View style={{ width: "70%", }}>
                    <InputBox value={email} size={40} rounded={true} capitalize={"none"} placeholder={email} onChange={emailHandler} keyboardType="email-address" placeholderSize={12} />
                </View>
            </View>

            <View style={{}}>

                <View style={{ width: "100%" }}>
                    <AddressCard unit={unit} streetAddress={streetAddress} suburb={suburb} postCode={postCode} state={state} unitHandler={unitHandler} streetAddressHandler={streetAddressHandler} suburbHandler={suburbHandler} postCodeHandler={postCodeHandler} stateHandler={stateHandler} />
                </View>

            </View>

            <View style={{ width: '100%', opacity: .35, marginVertical: Colors.spacing * 2, borderBottomWidth: 2, borderColor: Colors.maidlyGrayText }} />

        </View>

    )
}

export default CustomerCard

const styles = StyleSheet.create({})