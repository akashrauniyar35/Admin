import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, isAndroid } from '../assets/Colors'
import Icon from 'react-native-vector-icons/Ionicons';

const InputBox = ({ maxLength, onChange, keyboardType, onPress, editable, rounded, placeholderSize, lable, placeholder, size, icon, bg, phColor, itemsCenter, bold, capitalize, value, isPrice }) => {


    return (
        <>
            {lable && < Text style={{ fontSize: 16, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "700", marginBottom: Colors.spacing, isPrice }}>{lable}</Text>}

            <View style={[styles.box, { height: size, justifyContent: itemsCenter ? 'center' : "flex-start", backgroundColor: bg ? bg : 'white', paddingHorizontal: rounded === true ? Colors.spacing * 2 : Colors.spacing, borderRadius: rounded === true ? Colors.spacing * Colors.spacing : Colors.spacing * .75, borderWidth: isAndroid ? .35 : 0, borderColor: Colors.maidlyGrayText }]}>

                {icon && <Icon name={icon} size={18} color={Colors.maidlyGrayText} style={{ marginRight: Colors.spacing, }} />}
                <TextInput value={value} maxLength={maxLength ? maxLength : 50} autoCapitalize={capitalize} keyboardType={keyboardType} onChangeText={(value) => onChange(value)} onPressIn={() => onPress} editable={editable} placeholderTextColor={phColor ? phColor : Colors.maidlyGrayText} placeholder={placeholder} style={{ width: '100%', textAlign: itemsCenter ? 'center' : 'left', fontSize: placeholderSize ? placeholderSize : 16, color: phColor ? phColor : Colors.maidlyGrayText, fontWeight: bold ? "bold" : isAndroid ? "600" : "300" }}
                    onSubmitEditing={Keyboard.dismiss}
                />

            </View>
        </>


    )
}

export default InputBox

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.maidlyGrayText,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: .2,
        elevation: 2,
        shadowColor: Colors.madidlyThemeBlue,
    },
    input: {
        borderColor: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600",
    },
})