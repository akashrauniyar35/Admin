import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Header from '../../components/Header'
import { Colors } from '../../assets/Colors'

import google from '../../assets/newlogo.png'

const About = ({ navigation }: any) => {
    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />
                <Header nav={navigation} title="Abouts" searchEnabled={true} />

                <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                    <Text style={[styles.text, { fontSize: 16, fontWeight: "bold", color: Colors.madidlyThemeBlue }]}>Welcome to the About page for our app! We're excited to share more information about what our app is and what it can do for you.</Text>
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <Text style={styles.text}>Our app is designed to help you o top of your job. Whether you're looking for  scheduling your job, or simply a way to assigning jops to local contractors, our app has you covered.</Text>
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                    <Text style={styles.text}>Here are just a few of the key features of our app:</Text>
                </View>

                <View style={{ paddingLeft: 20, paddingRight: 30, marginTop: 10, flexDirection: 'row', }}>
                    <View style={{ backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, top: 8, marginRight: Colors.spacing * 1, borderRadius: 100, }} />
                    <Text style={[styles.text, { fontSize: 12 }]}>Creating Quote: This feature allows you to create quotes for your job and handle all the job informations.</Text>
                </View>

                <View style={{ paddingLeft: 20, paddingRight: 30, marginTop: 10, flexDirection: 'row', }}>
                    <View style={{ backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, top: 8, marginRight: Colors.spacing * 1, borderRadius: 100, }} />
                    <Text style={[styles.text, { fontSize: 12 }]}>Booking: You can now book a job as per customer's date requirement and assign to local contractor.</Text>
                </View>

                <View style={{ paddingLeft: 20, paddingRight: 30, marginTop: 10, flexDirection: 'row', }}>
                    <View style={{ backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, top: 8, marginRight: Colors.spacing * 1, borderRadius: 100, }} />
                    <Text style={[styles.text, { fontSize: 12 }]}>Add Contractors: If you have found new contractor, simply add a new contractor and start assigning them jobs.</Text>
                </View>

                <View style={{ paddingLeft: 20, paddingRight: 30, marginTop: 10, flexDirection: 'row', }}>
                    <View style={{ backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, top: 8, marginRight: Colors.spacing * 1, borderRadius: 100, }} />
                    <Text style={[styles.text, { fontSize: 12 }]}>Appointments: You can see all of your appointments / bookings and schedule your work accordingly.</Text>
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                    <Text style={styles.text}>In addition to these features, our app is designed with ease of use in mind. We know that you don't want to spend a lot of time figuring out how to use a new app, so we've made sure that ours is intuitive and user-friendly.</Text>
                </View>

            </View>
        </>
    )
}

export default About

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.madlyBGBlue },
    text: { fontFamily: "Outfit", color: Colors.black, fontSize: 14 }
})