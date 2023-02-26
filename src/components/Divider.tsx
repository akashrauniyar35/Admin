import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../assets/Colors'

const Divider = ({ width, color, height, opacity }: any) => {
    return (
        <View style={{
            width: width, borderBottomWidth: height ? height : 2, alignSelf: 'center',
            borderColor: color ? color : Colors.borderColor,
            opacity: opacity ? .3 : 1,
        }} />
    )
}

export default Divider

const styles = StyleSheet.create({

})