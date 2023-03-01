import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native'

import HeaderComponent from './AddButtonHeader';


import { viewQuoteFail, viewQuotePending, viewQuoteSuccess } from '../../redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuoteByID } from '../../config/JobApi';
import ViewJobModalComponent from '../pages/Jobs/ViewJobModalComponent';
import { Colors, isAndroid, WIDTH } from '../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import Divider from './Divider';


const NoNotificationsCard = () => {
    return (
        <View style={{ opacity: .5, alignSelf: 'center', alignItems: 'center', marginTop: Colors.spacing * 2 }}>
            <IconM name="message-text" size={60} color={Colors.maidlyGrayText} />
            <Text style={{ marginTop: Colors.spacing * 1, fontSize: 16, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "700", }}>All clear!  No notifications!</Text>
        </View>
    )
}


const Card = () => {
    return (
        <View style={{ width: WIDTH * .9 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <View style={{ backgroundColor: Colors.madidlyThemeBlue, width: 65, height: 65, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <IconM name="bullhorn-outline" size={40} color={'white'} />
                </View>

                <View style={{ marginLeft: -Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 14, color: Colors.black, fontWeight: isAndroid ? "900" : "700", marginBottom: Colors.spacing }}>New Quote Created</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * .5 }}>

                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "600" : "300", }}>Samsung Chaudhary</Text>
                        <View style={{ backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, marginHorizontal: Colors.spacing, borderRadius: 100, }} />
                        <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "400" }}>$ 400.00</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * .5 }}>
                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "600" : "300", }}>Strathfield NSW 2135</Text>
                        <View style={{ backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, marginHorizontal: Colors.spacing, borderRadius: 100, }} />
                        <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "400" }}>EOL</Text>
                    </View>

                </View>


                <Pressable>
                    <View style={{ opacity: .7 }}>
                        <Icon name="close-circle" color={Colors.red} size={20} style={{ marginRight: Colors.spacing, }} />
                    </View>
                </Pressable>

            </View>

            <View style={{ marginVertical: Colors.spacing * 2 }}>
                <Divider height={.6} colors={'gray'} width="120%" opacity={.1} />
            </View>
        </View>
    )
}


const NotificationModal = ({ isOpen, onPress, onClose, id }: any) => {

    const jobData: any = useSelector((state: any) => state.jobReducer.jobByIdData)
    // const loading = useSelector((state: any) => state.jobReducer.selectedJobLoading)

    const dispatch = useDispatch()

    return (
        < View >
            <View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isOpen}
                    onRequestClose={onClose}

                >
                    <SafeAreaView />
                    <View style={styles.centeredView}>


                        <Pressable>
                            <HeaderComponent onClose={onClose} lable={"Notification"} saveOption={false} />
                        </Pressable>

                        {/* {loading && <ActivityIndicator color={Colors.madidlyThemeBlue} animating={loading} size={'small'} style={{}} />} */}

                        <View style={{ flex: 1 }}>

                            <ScrollView style={{ }}>
                                <NoNotificationsCard />
                                {/* <Card />
                                <Card />
                                <Card />
                                <Card /> */}
                            </ScrollView>

                        </View>

                    </View>
                </Modal >
            </View >
        </View>
    )
}

export default NotificationModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
    },
    modalView: {
        backgroundColor: "white",
        paddingVertical: Colors.spacing * 1,
    },
})