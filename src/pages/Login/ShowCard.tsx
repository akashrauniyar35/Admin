import { Button, SafeAreaView, Image, StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { Colors } from '../../assets/Colors'

// import ShowCardImage from '../../assets/authImg.png';
import google from "../../assets/loginImage.png";
import Donut from '../../components/Donut';


const ShowCard = ({ navigation }) => {

    const LoginButtons = () => {
        return (
            <View style={{ backgroundColor: '#fff', width: '60%', padding: Colors.spacing * 1, borderRadius: 5, marginTop: Colors.spacing * 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                <TouchableWithoutFeedback onPress={() => navigation.navigate('login')}>

                    <View style={{ backgroundColor: Colors.skyColor, width: '100%', padding: Colors.spacing * 1, borderRadius: 4, alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ color: Colors.black, fontWeight: '600', fontSize: 12, }}>Login</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        )
    }


    return (
        <>
            <SafeAreaView />
            <View style={{ backgroundColor: 'white', flex: 1, }}>
                <View style={{ paddingHorizontal: Colors.spacing * 1, paddingTop: Colors.spacing * 1, }}>


                    <View style={{ borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={google} style={{ width: 200, height: 300 }} />
                    </View>
                    <View style={{ paddingTop: Colors.spacing * 6, alignItems: 'center', justifyContent: 'center' }}>


                        <Text style={{ fontWeight: '600', color: Colors.black, fontSize: 26, }}>Welome!</Text>
                        <Text style={{ fontWeight: '600', color: Colors.black, fontSize: 26, }}>WeDo Amin App</Text>

                        <Text style={{ color: 'white', fontSize: 14, width: '55%', paddingTop: Colors.spacing * 2, textAlign: 'center' }}>Explore all the most recent jobs based on your web bookings & phone calls.</Text>

                        <LoginButtons />
                        <Donut lable={"Total Jobs"} percentage={112} radius={40} max={200} />

                    </View>



                    {/* <View style={{ marginBottom: Colors.spacing * 1 }} /> */}
                </View>
            </View>
        </>
    )
}

export default ShowCard

const styles = StyleSheet.create({

})