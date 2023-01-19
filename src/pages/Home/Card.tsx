import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, isAndroid } from '../../assets/Colors'
import Divider from '../../components/Divider'

const Card = ({ onPress, id, fName, status, lName, price }) => {
    return (
        <Pressable onPress={() => onPress(id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Regular', width: isAndroid ? "35%" : "35%" }}>{fName + " " + lName}</Text>
                <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Regular', width: '25%' }}>Umesh Ji</Text>


                <View style={{ width: isAndroid ? '25%' : '23%', }}>
                    <View style={{ backgroundColor: status.toLowerCase() === "in progress" ? Colors.orangeBG : status.toLowerCase() === "completed" ? Colors.paidBG : status.toLowerCase() === "cancelled" ? Colors.redBG : Colors.orangeBG, padding: Colors.spacing * .55, borderRadius: Colors.spacing, alignItems: 'center', width: isAndroid ? "80%" : "100%", marginLeft: isAndroid ? -Colors.spacing * .5 : -Colors.spacing * 1 }}>
                        <Text style={{ fontSize: 10, color: status.toLowerCase() === "in progress" ? Colors.orange : status.toLowerCase() === "completed" ? Colors.green : status.toLowerCase() === "cancelled" ? Colors.red : Colors.orange, fontFamily: 'Outfit-ExtraBold', }}>{status}</Text>
                    </View>
                </View>

                <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Regular', width: isAndroid ? '20%' : '20%' }}>${price.toFixed(2)}</Text>
            </View>
            <View style={{ marginVertical: Colors.spacing * 1 }}>
                <Divider height={.6} color={Colors.borderColor} width="100%" opacity={.1} />
            </View>
        </Pressable>
    )
}

export default Card

const styles = StyleSheet.create({})