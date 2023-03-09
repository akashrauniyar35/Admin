import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, isAndroid } from '../assets/Colors'
import Divider from './Divider';


const x = new Date();
const date = x.toDateString().substring(4, 10)
const QuoteBanner = ({ count, lable }: any) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Outfit-Bold', }}>Today</Text>
                <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Outfit-Medium', opacity: .7, marginLeft: Colors.spacing }}>{date}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: Colors.spacing * .5 }}>

                <View style={{ width: '45%', alignItems: 'center', }}>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Outfit-Bold' }}>{0}</Text>
                    <Text style={{ marginTop: Colors.spacing * .25, fontSize: 10, color: 'white', fontFamily: 'Outfit-Light', opacity: .7, }}>New {lable}</Text>
                </View>

                <View style={{ width: 35, marginVertical: Colors.spacing * 2, borderBottomWidth: 2, borderColor: 'white', transform: [{ rotate: '90deg' }], opacity: .7, }} />

                <View style={{ width: '45%', alignItems: 'center', }}>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Outfit-Bold' }}>0</Text>
                    <Text style={{ marginTop: Colors.spacing * .25, fontSize: 10, color: 'white', fontFamily: 'Outfit-Light', opacity: .7, }}>Converted</Text>
                </View>

            </View>

        </View>
    )
}

export default QuoteBanner

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.madidlyThemeBlue,
        borderRadius: Colors.spacing * 2,
        padding: Colors.spacing * 1,
        paddingHorizontal: Colors.spacing * 2

    },

})