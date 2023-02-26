import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, isAndroid } from '../assets/Colors'


const InputBox = ({ onChange, placeholderSize, placeholder, size, value, editable, bg }: any) => {

    return (
        <>
            <View style={[styles.box, { height: size, backgroundColor: bg ? bg : Colors.grayBG }]}>

                <Text style={{ color: Colors.maidlyGrayText, top: isAndroid ? -1 : 0, marginRight: isAndroid ? 0 : 5 }}>$</Text>
                <TextInput editable={editable} maxLength={10} value={value} keyboardType="numeric" onChangeText={(value) => onChange(value)} placeholderTextColor={Colors.maidlyGrayText} placeholder={placeholder ? placeholder : "0.00"}
                    style={{
                        flex: 1,
                        fontSize: placeholderSize ? placeholderSize : 16, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light',
                    }}
                    onSubmitEditing={Keyboard.dismiss}
                />
            </View>
        </>

    )
}



const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: Colors.spacing * 2,
        borderRadius: 100,
        borderWidth: isAndroid ? .35 : 0,
        borderColor: Colors.borderColor,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: .2,
        elevation: 2,
        shadowColor: Colors.maidlyGrayText,
    },
    input: {
        borderColor: Colors.borderColor, fontWeight: isAndroid ? "900" : "600",
    },
})

export default InputBox