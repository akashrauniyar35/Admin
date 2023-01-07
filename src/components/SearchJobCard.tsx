import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, isAndroid, WIDTH } from '../assets/Colors'

const SearchJobCard = ({ customerName, subTotal, jobNumber, quoteStatus, phone, service, onPress }) => {
    const price = [subTotal.toString().slice(0, 3), ".", subTotal.toString().slice(2)].join('')
    
    return (
        <>
            <Pressable onPress={onPress}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 16, fontWeight: isAndroid ? "900" : "600", color: Colors.madidlyThemeBlue, marginBottom: isAndroid ? Colors.spacing * .5 : Colors.spacing * 1 }}>#{jobNumber}</Text>
                        <Text style={{ fontSize: 14, fontWeight: isAndroid ? "600" : "300", color: Colors.maidlyGrayText }}>{customerName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: isAndroid ? '20%' : '25%' }}>
                        <Text style={{ fontSize: 16, fontWeight: isAndroid ? "900" : "700", color: Colors.madidlyThemeBlue }}>$ </Text>
                        <Text style={{ fontSize: 16, fontWeight: isAndroid ? "900" : "700", color: Colors.madidlyThemeBlue, }}>{parseInt(price).toFixed(2)}</Text>
                    </View>
                </View>
            </Pressable>
        </>
    )
}

export default SearchJobCard

const styles = StyleSheet.create({})