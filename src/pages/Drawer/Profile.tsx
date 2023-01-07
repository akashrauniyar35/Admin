import { Image, PermissionsAndroid, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../../components/Header'
import { Colors, isAndroid } from '../../assets/Colors'
import InputBox from '../../components/InputBox';
import Divider from '../../components/Divider';
import SelectionCard from '../../components/SelectionCard';
import { fetchUserProfile } from '../../config/UserApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker'

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

const Profile = ({ navigation }) => {
    const dispatch = useDispatch()
    const data = useSelector((state: any) => state.userReducer.data)

    const phoneNumber = [data.phone.toString().slice(0, 4), " ", data.phone.toString().slice(4, 7), " ", data.phone.toString().
        slice(7)].join('')

    // const regionHandler = (value) => {
    //     const x = value.substring(0, 1)
    // }

    const [editedData, setEditedData] = useState({ firstName: "", lastName: "", phone: 0, email: "" })
    const [uploadingToggle, isUploadingToggle] = useState(false)


    const updateButtonHandler = () => {
        console.log("editedData", editedData)
    }

    const uploadProfileHandler = async () => {
        const options = {
            mediaType: "photo"
        }
        const result = await launchImageLibrary(options)
        console.log("sourcexxx", result.assets[0].uri)
    }


    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />
                <Header nav={navigation} title="Profile" searchEnabled={true} />
                <ScrollView style={{ marginTop: Colors.spacing * 2, marginBottom: Colors.spacing * 3 }}>
                    <View style={{ paddingHorizontal: Colors.spacing * 2, }}>

                        <View style={[styles.shadow, { marginBottom: Colors.spacing * 2, }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, marginBottom: Colors.spacing * .5, color: Colors.black, fontWeight: isAndroid ? "900" : "700" }}>Profile Picture</Text>
                                <Pressable onPress={uploadProfileHandler}>
                                    <IconM name="pencil-circle" style={{ color: Colors.madidlyThemeBlue, }} size={25} />
                                </Pressable>
                            </View>

                            <View style={{ paddingVertical: Colors.spacing, alignSelf: 'center', borderRadius: 100, width: 150, height: 150, alignItems: 'center', borderWidth: 2, borderColor: Colors.maidlyGrayText }}>
                                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2922/2922510.png' }} style={{ width: 120, height: 120 }} />
                            </View>
                        </View>



                        <View style={[styles.shadow, { marginBottom: Colors.spacing * 2 }]}>
                            <Text style={{ fontSize: 16, color: Colors.black, fontWeight: isAndroid ? "900" : "700" }}>Profile info</Text>

                            <View style={{ marginVertical: Colors.spacing, }}>
                                <Divider height={.5} colors={'gray'} width="110%" opacity={.1} />
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "700", }}>First Name</Text>
                                <View style={{ width: "70%", }}>
                                    <InputBox placeholder={data.firstName} onChange={(val) => setEditedData({ ...editedData, firstName: val })} size={40} rounded={true} placeholderSize={12} />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "700", }}>Last Name</Text>
                                <View style={{ width: "70%", }}>
                                    <InputBox placeholder={data.lastName} size={40} rounded={true} placeholderSize={12} onChange={(val) => setEditedData({ ...editedData, lastName: val })} />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "700", }}>Phone number</Text>
                                <View style={{ width: "70%", }}>
                                    <InputBox maxLength={10} onChange={(val) => setEditedData({ ...editedData, phone: val })} placeholder={phoneNumber} size={40} rounded={true} placeholderSize={12} keyboardType="phone-pad" />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "700", }}>Email</Text>
                                <View style={{ width: "70%", }}>
                                    <InputBox keyboardType={"email-address"} onChange={(val) => setEditedData({ ...editedData, email: val })} placeholder={data.email} size={40} rounded={true} placeholderSize={12} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "700", }}>Unit</Text>
                                <View style={{ width: "70%", }}>
                                    <InputBox placeholder={'Lname'} size={40} rounded={true} placeholderSize={12} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "700", width: "30%", }}>Street address</Text>
                                <View style={{ width: "70%", }}>
                                    <InputBox placeholder={'Lname'} size={40} rounded={true} placeholderSize={12} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "700", }}>Suburb</Text>
                                <View style={{ width: "70%", }}>
                                    <InputBox placeholder={'Lname'} size={40} rounded={true} placeholderSize={12} />
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * 1, }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "22%", }}>
                                    <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "700", }}>Post code</Text>
                                </View>

                                <View style={{ marginLeft: Colors.spacing * 3, marginRight: Colors.spacing * .25, width: '70%', flexDirection: 'row', alignItems: 'center', }}>

                                    <View style={{ width: "40%", marginRight: Colors.spacing * 2 }}>
                                        <InputBox size={40} rounded={true} placeholder={'postCode'} keyboardType="phone-pad" placeholderSize={12} />
                                    </View>
                                    <View style={{ width: "40%" }}>
                                        <SelectionCard size={40} fontSize={12} phColor={Colors.maidlyGrayText} rounded={true} data={bathroomsData} type={'filter'} placeholder={'state'} />
                                    </View>
                                </View>
                            </View>

                            <Pressable onPress={updateButtonHandler}>
                                <View style={[styles.buttonsFull, { marginTop: Colors.spacing * 2 }]}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: 'white', fontWeight: isAndroid ? "900" : "700"
                                    }}>Update profile</Text>
                                </View>
                            </Pressable>

                        </View>

                        <View style={[styles.shadow, { marginBottom: Colors.spacing * 2 }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "700", }}>Password</Text>
                                <View style={{ width: "70%", }}>
                                    <InputBox placeholder={'Lname'} size={40} rounded={true} placeholderSize={12} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "700", width: "30%", }}>Confirm password</Text>
                                <View style={{ width: "70%", }}>
                                    <InputBox placeholder={'Lname'} size={40} rounded={true} placeholderSize={12} />
                                </View>
                            </View>

                            <Pressable >
                                <View style={[styles.buttonsFull, { marginTop: Colors.spacing * 1 }]}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: 'white', fontWeight: isAndroid ? "900" : "700"
                                    }}>Update password</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.madlyBGBlue, },
    shadow: {
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .2,
        elevation: 2,
        borderRadius: Colors.spacing * 2,
        backgroundColor: 'white',
        shadowColor: Colors.grayOne,
        paddingHorizontal: Colors.spacing * 2,
        paddingVertical: Colors.spacing * 2
    },
    buttonsFull: {
        alignItems: "center",
        marginBottom: Colors.spacing,
        justifyContent: "center",
        backgroundColor: Colors.madidlyThemeBlue,
        height: isAndroid ? 45 : 45,
        borderRadius: Colors.spacing * Colors.spacing,

    },
})