import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import {  Image, Pressable, ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'


import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, isAndroid } from '../assets/Colors';
import Divider from '../components/Divider';
import { logoutFail, logoutPending, logoutSuccess } from '../redux/authenticationSlice';


const CustomDrawer = (props: any) => {
    const logoutRequest = useSelector((state: any) => state.authReducer.logoutRequest)
    const dispatch = useDispatch()
    const data = useSelector((state: any) => state.userReducer.data)
    const navigation: any = useNavigation()

    const logoutHandler = async () => {
        dispatch(logoutPending())
        try {
            const value = await AsyncStorage.removeItem('@access_Token')
            const refresh = await AsyncStorage.removeItem('@refresh_Token')
            if (value !== null) {
                console.log("GET ASYNC STORAGE ACCESS", value);
                dispatch(logoutSuccess())

            }
        } catch (e) {
            dispatch(logoutFail())
        }
    }



    const DrawerLabel = ({ label, icon, navigateTo }: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate(navigateTo)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: Colors.spacing * 3, marginBottom: Colors.spacing * 2, }}>
                    <IconM name={icon} size={22} color={Colors.black} />
                    <Text style={{ fontFamily: "Outfit", marginLeft: Colors.spacing * 2, fontSize: 14, color: Colors.black, fontWeight: isAndroid ? "900" : "400" }}>{label}</Text>
                </View>
            </TouchableWithoutFeedback >
        )
    }


    const DrawerHeader = ({ }) => {
        return (
            <View style={{ padding: Colors.spacing, paddingHorizontal: Colors.spacing * 2, alignItems: 'center', backgroundColor: Colors.madlyBGBlue, paddingVertical: Colors.spacing * 4 }}>
                <View style={{ backgroundColor: 'white', padding: 4, alignItems: 'center', justifyContent: 'center', position: 'relative', borderRadius: 100, borderWidth: 3, borderColor: Colors.madidlyThemeBlue }}>
                    <Image source={{ uri: data?.profilePic?.src }} style={{ width: 100, height: 100, borderRadius: 100 }} />
                </View>

                <View style={{ marginTop: Colors.spacing, alignItems: 'center' }}>
                    <Text style={{ fontFamily: "Outfit", fontSize: 20, color: Colors.black, fontWeight: isAndroid ? "900" : "700" }}>{`${data.firstName} ${data.lastName}`}</Text>
                    <Text style={{ fontFamily: "Outfit", color: Colors.madidlyThemeBlue, marginTop: Colors.spacing * .5, fontSize: 12, fontWeight: isAndroid ? "900" : "500" }}>{data?.email}</Text>
                </View>

                <Pressable onPress={() => props.navigation.navigate("profile")}>
                    <View style={{ backgroundColor: Colors.madidlyThemeBlue, paddingHorizontal: Colors.spacing * 2, paddingVertical: Colors.spacing * .5, borderRadius: Colors.spacing * 10, marginVertical: Colors.spacing }}>
                        <Text style={{ fontFamily: "Outfit", fontSize: 14, fontWeight: isAndroid ? "900" : "500", color: 'white' }}>View profile</Text>
                    </View>
                </Pressable>

            </View>
        )
    }


    const DrawerFooter = () => {
        return (
            <Pressable onPress={() => logoutHandler()} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.madidlyThemeBlue, padding: Colors.spacing, paddingHorizontal: Colors.spacing * 2, }}>
                    <Text style={{ fontFamily: "Outfit", color: 'white', fontSize: 18, fontWeight: '600', }}>Logout</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {logoutRequest ? <ActivityIndicator animating={logoutRequest} size={20} color={'white'} /> : <Icon name="log-out-outline" size={22} color={'white'} />}
                    </View>
                </View>
            </Pressable>
        )
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ backgroundColor: Colors.madlyBGBlue }} />

                <DrawerHeader />


                <View style={{ marginTop: Colors.spacing * 2 }}>


                    <DrawerLabel icon={"view-dashboard-variant"} label={"Dashboard"} navigateTo={"BottomTabs"} />

                    <DrawerLabel icon="calendar" label="Appointments" navigateTo={"appointments"} />

                    <DrawerLabel icon="account-hard-hat" label="Technicians" navigateTo={"contractors"} />

                    <DrawerLabel icon="alpha-p-circle" label="Products" navigateTo={"expenses"} />

                </View>

                <Divider width={'80%'} color={Colors.black} opacity={.5} />


                <View style={{ marginTop: Colors.spacing * 2 }}>


                    <DrawerLabel icon="lifebuoy" label="Help & Support" navigateTo={"about"} />
                    <DrawerLabel icon="cog-outline" label="Settings" navigateTo={"settingStack"} />
                    <DrawerLabel icon="information-outline" label="Abouts" navigateTo={"about"} />


                </View>


            </View >

            <DrawerFooter />
            <SafeAreaView />
        </>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({})