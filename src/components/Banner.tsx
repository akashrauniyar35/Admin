import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, isAndroid } from '../assets/Colors'
import Divider from './Divider';





const Banner = ({ selectedPeriod }: any) => {

    const x = new Date(selectedPeriod?.date?.from);
    const y = new Date(selectedPeriod?.date?.to);
    const date = x.toDateString().substring(4, 10)
    const dateTwo = y.toDateString().substring(4, 10)

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Outfit-Bold', }}>{selectedPeriod.label}</Text>
                <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Outfit-Medium', opacity: .7, marginLeft: Colors.spacing }}>{selectedPeriod.label === "This Week" ? date + " - " + dateTwo : date}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: Colors.spacing * .5 }}>

                <View style={{ width: '45%', alignItems: 'center', }}>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Outfit-Medium', }}>$ 530.00</Text>
                    <Text style={{ marginTop: Colors.spacing * .25, fontSize: 10, color: 'white', fontFamily: 'Outfit-Light', opacity: .7, }}>Gross sales</Text>
                </View>

                <View style={{ width: 35, marginVertical: Colors.spacing * 2, borderBottomWidth: 2, borderColor: 'white', transform: [{ rotate: '90deg' }], opacity: .7, }} />

                <View style={{ width: '45%', alignItems: 'center', }}>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Outfit-Medium', }}>0</Text>
                    <Text style={{ marginTop: Colors.spacing * .25, fontSize: 10, color: 'white', fontFamily: 'Outfit-Light', opacity: .7, }}>Recalls</Text>
                </View>

            </View>

            <View style={{ marginTop: Colors.spacing * .5, marginBottom: Colors.spacing }}>
                <Divider height={1} color={'white'} width="105%" opacity={.5} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: Colors.spacing * .5 }}>

                <View style={{ width: '45%', alignItems: 'center', }}>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Outfit-Medium', }}>0</Text>
                    <Text style={{ marginTop: Colors.spacing * .25, fontSize: 10, color: 'white', fontFamily: 'Outfit-Light', opacity: .7, }}>Cancelled jobs</Text>
                </View>

                <View style={{ width: 35, marginVertical: Colors.spacing * 2, borderBottomWidth: 2, borderColor: 'white', transform: [{ rotate: '90deg' }], opacity: .7, }} />

                <View style={{ width: '45%', alignItems: 'center', }}>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Outfit-Medium', }}>0%</Text>
                    <Text style={{ marginTop: Colors.spacing * .25, fontSize: 10, color: 'white', fontFamily: 'Outfit-Light', opacity: .7, }}>Recurring Jobs</Text>
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