import { ActivityIndicator, Image, PermissionsAndroid, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../../components/Header'
import { Colors, isAndroid, HEIGHT } from '../../assets/Colors'
import InputBox from '../../components/InputBox';
import Divider from '../../components/Divider';
import SelectionCard from '../../components/SelectionCard';
import { fetchUserProfile, updatePrifileDetails, updateProfilePic } from '../../config/UserApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker'
import { getUserFail, getUserPending, getUserSuccess, updateUserFail, updateUserPending, updateUserSuccess } from '../../redux/userSlice';
import Toast from 'react-native-toast-message';
import ShowToast from '../../components/ShowToast';
import { clockRunning } from 'react-native-reanimated';

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
        } else {
            dispatch(updateUserFail())
        }
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
                                <IconM name="pencil-circle" style={{ color: Colors.madidlyThemeBlue, }} size={25} />
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
                                <Text style={{ fontFamily: "Outfit", fontSize: 12, color: Colors.maidlyGrayText, }}>{phoneNumber}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", fontFamily: "Outfit", }}>Email</Text>
                            <View style={{ width: "40%", }}>
                                <Text style={{ fontFamily: "Outfit", fontSize: 12, color: Colors.maidlyGrayText, }}>{data?.email}</Text>
                            </View>
                        </View>

                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Unit</Text>
                            <View style={{ width: "70%", }}>
                                <InputBox placeholder={'Lname'} size={40} rounded={true} placeholderSize={12} capitalize={"characters"} maxLength={4} />
                            </View>
                        </View> */}

                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", width: "30%", }}>Street address</Text>
                            <View style={{ width: "70%", }}>
                                <InputBox placeholder={'Lname'} size={40} rounded={true} placeholderSize={12} />
                            </View>
                        </View> */}

                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Suburb</Text>
                            <View style={{ width: "70%", }}>
                                <InputBox placeholder={'Lname'} size={40} rounded={true} placeholderSize={12} />
                            </View>
                        </View> */}


                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * 1, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "22%", }}>
                                <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Post code</Text>
                            </View>

                            <View style={{ marginLeft: Colors.spacing * 3, marginRight: Colors.spacing * .25, width: '70%', flexDirection: 'row', alignItems: 'center', }}>
                                <View style={{ width: "40%", marginRight: Colors.spacing * 2 }}>
                                    <InputBox size={40} rounded={true} placeholder={data?.postcode} keyboardType="numeric" maxLength={4} placeholderSize={12} onChange={(val: any) => setEditedData({ ...editedData, postcode: val })} />
                                </View>
                                <View style={{ width: "40%" }}>
                                    <SelectionCard onPress={(val: any) => setEditedData({ ...editedData, state: val })} size={40} fontSize={12} phColor={Colors.maidlyGrayText} rounded={true} data={bathroomsData} type={'filter'} placeholder={data?.state?.slice(0, 1).toLowerCase() === "n" ? "NSW" : data?.state?.slice(0, 1).toLowerCase() === "v" ? "VIC" : data?.state?.slice(0, 1).toLowerCase() === "w" ? "WA" : data?.state?.slice(0, 1).toLowerCase() === "q" ? "QLD" : data?.state?.slice(0, 1).toLowerCase() === "s" ? "SA" : "TAS"} />
                                </View>
                            </View>
                        </View> */}
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