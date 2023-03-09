import { ActivityIndicator, Image, PermissionsAndroid, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../../components/Header'
import { Colors, isAndroid } from '../../assets/Colors'
import Divider from '../../components/Divider';
import { fetchUserProfile, updatePrifileDetails, updateProfilePic } from '../../config/UserApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker'
import { getUserFail, getUserPending, getUserSuccess, updateUserFail, updateUserPending, updateUserSuccess } from '../../redux/userSlice';
import Toast from 'react-native-toast-message';
import ShowToast from '../../components/ShowToast';

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

const Profile = ({ navigation }: any) => {
    const dispatch = useDispatch()
    const [data, setData] = useState<any>([])
    const loading = useSelector((state: any) => state.userReducer.loading)
    const detailsLoading = useSelector((state: any) => state.userReducer.detailsLoading)
    const pic = useSelector((state: any) => state.userReducer.data.profilePic.src)

    console.log("pic pic", pic)

    const phoneNumber = [data?.phone?.toString().slice(0, 4), " ", data?.phone?.toString().slice(4, 7), " ", data?.phone?.toString().
        slice(7)].join('')

    const [editedData, setEditedData] = useState({ firstName: data?.firstName, lastName: data?.lastName, postcode: data?.postcode, phone: data?.phone, email: data?.email, username: data?.username, state: data?.state })

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

    const uploadProfileHandler = async () => {
        const pic = data?.profilePic.src
        const id = data._id
        const options: any = {
            mediaType: 'photo',
            maxWidth: 1024,
            maxHeight: 1024,
            quality: 1,
        }
        const result: any = await launchImageLibrary(options)
        const file = result?.assets[0]
        updateProfilePic(file, pic, id, getUserProfile)
    }

    useEffect(() => {
        getUserProfile()
    }, [])

    return (
        <>
            <SafeAreaView />
            <View style={styles.container}>
                <Header nav={navigation} title="Profile" searchEnabled={true} />

                <ScrollView style={{ marginTop: Colors.spacing * 2, marginBottom: Colors.spacing * 3, paddingHorizontal: Colors.spacing * 2, flex: 1 }}>

                    <View style={[styles.shadow, { marginBottom: Colors.spacing * 2, }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, marginBottom: Colors.spacing * .5, color: Colors.black, fontWeight: isAndroid ? "900" : "700" }}>Profile Picture</Text>
                            <Pressable onPress={uploadProfileHandler}>
                                <IconM name="image-edit-outline" style={{ color: Colors.madidlyThemeBlue, }} size={25} />
                            </Pressable>
                        </View>

                        <View style={{ alignSelf: 'center', borderRadius: 100, alignItems: 'center', borderWidth: 5, borderColor: Colors.madidlyThemeBlue, justifyContent: 'center', padding: 4, }}>
                            {loading ? <View style={{ width: 120, height: 120, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator color={Colors.madidlyThemeBlue} animating={loading} size={'small'} style={{}} />
                            </View>
                                : <Image source={{ uri: pic }} style={{ width: 120, height: 120, borderRadius: 100 }} />}
                        </View>
                    </View>


                    <View style={[styles.shadow, { marginBottom: Colors.spacing * 2 }]}>

                        <Text style={{ fontSize: 16, color: Colors.black, fontWeight: isAndroid ? "900" : "700" }}>{'Profile Details'}</Text>

                        <View style={{ marginVertical: Colors.spacing * 2, }}>
                            <Divider height={.5} colors={Colors.borderColor} width="110%" opacity={.1} />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", fontFamily: "Outfit", }}>Username</Text>
                            <View style={{ width: "40%", }}>
                                <Text style={{ fontFamily: "Outfit", fontSize: 12, color: Colors.maidlyGrayText, }}>{data?.username}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", fontFamily: "Outfit", }}>First Name</Text>
                            <View style={{ width: "40%", }}>
                                <Text style={{ fontFamily: "Outfit", fontSize: 12, color: Colors.maidlyGrayText, }}>{data?.firstName}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", fontFamily: "Outfit", }}>Last Name</Text>
                            <View style={{ width: "40%", }}>
                                <Text style={{ fontFamily: "Outfit", fontSize: 12, color: Colors.maidlyGrayText, }}>{data?.lastName}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", fontFamily: "Outfit", }}>Phone number</Text>
                            <View style={{ width: "40%", }}>
                                <Text style={{ fontFamily: "Outfit", fontSize: 12, color: Colors.maidlyGrayText, }}>0{data?.phone}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", fontFamily: "Outfit", }}>Email</Text>
                            <View style={{ width: "40%", }}>
                                <Text style={{ fontFamily: "Outfit", fontSize: 12, color: Colors.maidlyGrayText, }}>{data?.email}</Text>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>
            <ShowToast />
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