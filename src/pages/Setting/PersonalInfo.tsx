import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Colors, isAndroid } from '../../assets/Colors'
import { fetchUserProfile, updatePrifileDetails } from '../../config/UserApi'

import AddButtonHeader from '../../components/AddButtonHeader'
import InputBox from '../../components/InputBox'
import { getUserFail, getUserPending, getUserSuccess, updateUserFail, updateUserPending, updateUserSuccess } from '../../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import ShowToast from '../../components/ShowToast'

const PersonalInfo = ({ navigation }: any) => {
    const [data, setData] = useState<any>([])
    const dispatch = useDispatch()
    const detailsLoading = useSelector((state: any) => state.userReducer.detailsLoading)
    const [editedData, setEditedData] = useState({ firstName: data?.firstName, lastName: data?.lastName, postcode: data?.postcode, phone: data?.phone, email: data?.email, username: data?.username, state: data?.state })

    const phoneNumber = [data?.phone?.toString().slice(0, 4), " ", data?.phone?.toString().slice(4, 7), " ", data?.phone?.toString().
        slice(7)].join('')

    const getUserProfile = async () => {
        const access_token = await AsyncStorage.getItem('@access_Token')
        dispatch(getUserPending());
        const x: any = await fetchUserProfile(access_token)
        if (x.message === "") {
            dispatch(getUserFail());
            console.log("--user access token expired --", x)
        } else {
            dispatch(getUserSuccess(x))
            setData(x)
        }
    }
    useEffect(() => {
        getUserProfile()
    }, [])


    const updateDetailsHandler = async () => {
        const id = data._id
        console.log(id)
        dispatch(updateUserPending())
        const res: any = await updatePrifileDetails(id, editedData)
        if (res.status === "success") {
            dispatch(updateUserSuccess())
            Toast.show({
                type: 'success',
                visibilityTime: 3000,
                text1: "Success",
                text2: Colors.green,
                props: { message: 'User updated successfully' }
            });
            getUserProfile()
        } else {
            dispatch(updateUserFail())
        }
    }

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />

                <AddButtonHeader loading={detailsLoading} onPress={updateDetailsHandler} saveOption={true} onClose={() => navigation.goBack()} lable={"Personal Information"} />

                <View style={styles.shadow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Username</Text>
                        <View style={{ width: "70%", }}>
                            <InputBox placeholder={data?.username} onChange={(val: any) => setEditedData({ ...editedData, username: val })} size={40} rounded={true} placeholderSize={12} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>First Name</Text>
                        <View style={{ width: "70%", }}>
                            <InputBox placeholder={data?.firstName} onChange={(val: any) => setEditedData({ ...editedData, firstName: val })} size={40} rounded={true} placeholderSize={12} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Last Name</Text>
                        <View style={{ width: "70%", }}>
                            <InputBox placeholder={data?.lastName} size={40} rounded={true} placeholderSize={12} onChange={(val) => setEditedData({ ...editedData, lastName: val })} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Phone number</Text>
                        <View style={{ width: "70%", }}>
                            <InputBox maxLength={10} onChange={(val: any) => setEditedData({ ...editedData, phone: val })} placeholder={phoneNumber} size={40} rounded={true} placeholderSize={12} keyboardType="phone-pad" />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Email</Text>
                        <View style={{ width: "70%", }}>
                            <InputBox keyboardType={"email-address"} capitalize={"none"} onChange={(val: any) => setEditedData({ ...editedData, email: val })} placeholder={data.email} size={40} rounded={true} placeholderSize={12} />
                        </View>
                    </View>

                </View>

            </View>
            <ShowToast />
        </>
    )
}

export default PersonalInfo

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.madlyBGBlue, },
    text: {
        fontFamily: "Outfit",
        fontSize: 14
    },
    shadow: {
        marginTop: Colors.spacing * 2,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .2,
        elevation: 2,
        borderRadius: Colors.spacing * 2,
        backgroundColor: 'white',
        shadowColor: Colors.grayOne,
        paddingHorizontal: Colors.spacing * 2,
        marginHorizontal: Colors.spacing * 2,
        paddingVertical: Colors.spacing * 2
    },
    buttonsFull: {
        alignItems: "center",
        marginHorizontal: Colors.spacing * 2,
        justifyContent: "center",
        backgroundColor: Colors.madidlyThemeBlue,
        height: isAndroid ? 45 : 45,
        borderRadius: Colors.spacing * Colors.spacing,

    },

})