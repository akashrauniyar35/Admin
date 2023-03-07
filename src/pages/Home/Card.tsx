import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, isAndroid } from '../../assets/Colors'
import Divider from '../../components/Divider'

const Card = ({ onPress, id, fName, status, lName, price, tech }: any) => {
    return (
        <Pressable onPress={() => onPress(id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <View style={{ width: "25%" }}>
                    <Text numberOfLines={1} style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Regular', width: "90%" }}>{fName + " " + lName}</Text>
                </View>
                {tech ?
                    <View style={{ width: "25%", }}>
                        <Text numberOfLines={1} style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Regular', maxWidth: "75%", }}>{tech}</Text>
                    </View> :
                    <View style={{ width: "25%", justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'red', width: 25, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                            <Text style={{ fontSize: 10, color: "white", fontFamily: 'Outfit-Bold', }}>NA</Text>
                        </View>
                    </View>
                }

                <View style={{ width: "25%" }}>
                    <View style={{ backgroundColor: status.toLowerCase() === "in progress" ? Colors.orangeBG : status.toLowerCase() === "completed" ? Colors.paidBG : status.toLowerCase() === "cancelled" ? Colors.redBG : status.toLowerCase() === "recall" ? Colors.redBG : Colors.orangeBG, padding: Colors.spacing * .55, borderRadius: Colors.spacing, alignItems: 'center', width: "100%", marginLeft: isAndroid ? -Colors.spacing * .5 : -Colors.spacing * 1 }}>
                        <Text numberOfLines={1} style={{ fontSize: 10, color: status.toLowerCase() === "in progress" ? Colors.orange : status.toLowerCase() === "completed" ? Colors.green : status.toLowerCase() === "cancelled" ? Colors.red : status.toLowerCase() === "recall" ? Colors.red : Colors.orange, fontFamily: 'Outfit-ExtraBold', }}>{status}</Text>
                    </View>
                </View>

                <View style={{ width: "25%" }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Regular', }}>${price.toFixed(2)}</Text>
                </View>
            </View>
            <View style={{ marginVertical: Colors.spacing * 1 }}>
                <Divider height={.6} color={Colors.borderColor} width="100%" opacity={.1} />
            </View>
        </Pressable >
    )
}

export default Card

const styles = StyleSheet.create({})