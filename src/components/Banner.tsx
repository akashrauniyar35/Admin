import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, isAndroid } from '../assets/Colors'
import Divider from './Divider';


const x = new Date();
const date = x.toDateString().substring(4, 10)
const Banner = () => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ color: 'white', fontSize: 14, fontWeight: isAndroid ? "900" : "700", }}>Today</Text>
                <Text style={{ color: 'white', fontSize: 14, fontWeight: isAndroid ? "900" : "700", opacity: .7, marginLeft: Colors.spacing }}>{date}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: Colors.spacing * .5 }}>

                <View style={{ width: '45%', alignItems: 'center', }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: isAndroid ? "900" : "800", }}>$ 0.00</Text>
                    <Text style={{ marginTop: Colors.spacing * .25, fontSize: 10, color: 'white', fontWeight: isAndroid ? "900" : "600", opacity: .7, }}>Gross sales</Text>
                </View>

                <View style={{ width: 35, marginVertical: Colors.spacing * 2, borderBottomWidth: 2, borderColor: 'white', transform: [{ rotate: '90deg' }], opacity: .7, }} />

                <View style={{ width: '45%', alignItems: 'center', }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: isAndroid ? "900" : "800", }}>0</Text>
                    <Text style={{ marginTop: Colors.spacing * .25, fontSize: 10, color: 'white', fontWeight: isAndroid ? "900" : "600", opacity: .7, }}>Recalls</Text>
                </View>

            </View>

            <View style={{ marginTop: Colors.spacing * .5, marginBottom: Colors.spacing }}>
                <Divider height={1} color={'white'} width="105%" opacity={.5} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: Colors.spacing * .5 }}>

                <View style={{ width: '45%', alignItems: 'center', }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: isAndroid ? "900" : "800", }}>0</Text>
                    <Text style={{ marginTop: Colors.spacing * .25, fontSize: 10, color: 'white', fontWeight: isAndroid ? "900" : "600", opacity: .7, }}>Cancelled jobs</Text>
                </View>

                <View style={{ width: 35, marginVertical: Colors.spacing * 2, borderBottomWidth: 2, borderColor: 'white', transform: [{ rotate: '90deg' }], opacity: .7, }} />

                <View style={{ width: '45%', alignItems: 'center', }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: isAndroid ? "900" : "800", }}>0%</Text>
                    <Text style={{ marginTop: Colors.spacing * .25, fontSize: 10, color: 'white', fontWeight: isAndroid ? "900" : "600", opacity: .7, }}>Recurring Jobs</Text>
                </View>

            </View>

        </View>
    )
}

export default Banner

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.madidlyThemeBlue,
        borderRadius: Colors.spacing * 2,
        padding: Colors.spacing * 1,
        paddingHorizontal: Colors.spacing * 2

    },

})