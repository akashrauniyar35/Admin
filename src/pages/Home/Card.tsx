import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, isAndroid } from '../../assets/Colors'
import Divider from '../../components/Divider'

const Card = ({ onPress, id, fName, status, lName, price }) => {
    return (
        <Pressable onPress={() => onPress(id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "600" : "300", width: isAndroid ? "35%" : "40%" }}>{fName + " " + lName}</Text>
                <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "600" : "300", width: '25%' }}>Umesh Ji</Text>


                <View style={{ width: isAndroid ? '25%' : '23%', }}>
                    <View style={{ backgroundColor: status.toLowerCase() === "in progress" ? Colors.orangeBG : status.toLowerCase() === "completed" ? Colors.paidBG : status.toLowerCase() === "cancelled" ? Colors.redBG : Colors.orangeBG, padding: Colors.spacing * .55, borderRadius: Colors.spacing, alignItems: 'center', width: isAndroid ? "80%" : "100%", marginLeft: isAndroid ? -Colors.spacing * .5 : -Colors.spacing * 1 }}>
                        <Text style={{ fontSize: 10, color: status.toLowerCase() === "in progress" ? Colors.orange : status.toLowerCase() === "completed" ? Colors.green : status.toLowerCase() === "cancelled" ? Colors.red : Colors.orange, fontWeight: isAndroid ? "900" : "600" }}>{status}</Text>
                    </View>
                </View>

                <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "600" : "300", width: isAndroid ? '20%' : '20%' }}>${price}</Text>
            </View>
            <View style={{ marginTop: Colors.spacing * .5, marginBottom: Colors.spacing }}>
                <Divider height={.6} colors={'gray'} width="110%" opacity={.1} />
            </View>
        </Pressable>
    )
}

export default Card

const styles = StyleSheet.create({})