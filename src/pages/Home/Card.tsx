import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, isAndroid } from '../../assets/Colors'
import Divider from '../../components/Divider'

const Card = ({ onPress, id, fName, status, lName, price, tech }: any) => {
    return (
        <Pressable onPress={() => onPress(id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <View style={{ width: isAndroid ? "35%" : "35%" }}>
                    <Text numberOfLines={1} style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Regular', width: isAndroid ? "90%" : "90%" }}>{fName + " " + lName}</Text>
                </View>
                {tech ?
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Regular', width: isAndroid ? '25%' : "20%" }}>{tech}</Text> :
                    <View style={{ width: isAndroid ? '25%' : "20%", justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'red', width: 25, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                            <Text style={{ fontSize: 10, color: "white", fontFamily: 'Outfit-Bold', }}>NA</Text>
                        </View>
                    </View>
                }

                <View style={{ width: isAndroid ? '25%' : '23%', }}>
                    <View style={{ backgroundColor: status.toLowerCase() === "in progress" ? Colors.orangeBG : status.toLowerCase() === "completed" ? Colors.paidBG : status.toLowerCase() === "cancelled" ? Colors.redBG : status.toLowerCase() === "recall" ? Colors.redBG : Colors.orangeBG, padding: Colors.spacing * .55, borderRadius: Colors.spacing, alignItems: 'center', width: isAndroid ? "80%" : "100%", marginLeft: isAndroid ? -Colors.spacing * .5 : -Colors.spacing * 1 }}>
                        <Text style={{ fontSize: 10, color: status.toLowerCase() === "in progress" ? Colors.orange : status.toLowerCase() === "completed" ? Colors.green : status.toLowerCase() === "cancelled" ? Colors.red : status.toLowerCase() === "recall" ? Colors.red : Colors.orange, fontFamily: 'Outfit-ExtraBold', }}>{status}</Text>
                    </View>
                </View>

                <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Regular', width: isAndroid ? '20%' : '20%' }}>${price.toFixed(2)}</Text>
            </View>
            <View style={{ marginVertical: Colors.spacing * 1 }}>
                <Divider height={.6} color={Colors.borderColor} width="100%" opacity={.1} />
            </View>
        </Pressable >
    )
}

export default Card

const styles = StyleSheet.create({})