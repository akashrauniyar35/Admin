import { Pressable, StyleSheet, Text, View, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { contains } from '@firebase/util'
import { Colors } from '../../assets/Colors'



const OTPInput = (props: any) => {
    const [isBoxFocused, setIsBoxFocused] = useState(false)
    const { code, setCode, setPinReady, maxLength, pinReady } = props
    const ref = useRef<any>(null)
    const codeDigitsArray = new Array(maxLength).fill(0)

    const handleOnPress = () => {
        setIsBoxFocused(true)
        ref?.current?.focus()
    }

    const handleBlurr = () => {
        setIsBoxFocused(false);
    }

    useEffect(() => {
        setPinReady(code.length === maxLength);
        return () => setPinReady(false)
    }, [code])

    useEffect(() => {
        pinReady && Keyboard.dismiss()
    }, [pinReady])

    const toCodeDigits = (value: any, index: any) => {

        const emptyInputChar = " ";
        const digit = code[index] || emptyInputChar;
        const isCurrentDigit = index === code.length;
        const isLastDigit = index === maxLength - 1;
        const isCodeFull = code.length === maxLength;

        const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);
        let focused = isBoxFocused && isDigitFocused

        return (

            <View key={index}>
                <TextInput placeholderTextColor={Colors.madidlyThemeBlue} editable={false} maxLength={1} style={focused ? styles.focusedBox : styles.box} placeholder={digit} ref={ref} onPressIn={handleOnPress} />
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <Pressable style={styles.boxContainer} onPress={handleOnPress}>
                {codeDigitsArray.map(toCodeDigits)}
            </Pressable>

            <TextInput value={code} onChangeText={setCode} ref={ref}
                maxLength={maxLength} keyboardType="number-pad"
                textContentType="oneTimeCode"
                style={styles.heddenTextInput} onBlur={handleBlurr} onPressIn={handleOnPress} />
        </View>
    )
}

export default OTPInput


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15
    },

    boxContainer: {
        width: "70%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    box: {
        borderColor: "#fff",
        minWidth: "20%",
        borderWidth: 2,
        borderRadius: 5,
        fontSize: 20,
        textAlign: 'center',
        fontFamily: "Outfit-Bold",
        padding: 12,
        backgroundColor: 'transparent'
    },

    focusedBox: {
        minWidth: "20%",
        borderWidth: 2,
        borderRadius: 5,
        fontSize: 20,
        textAlign: 'center',
        fontFamily: "Outfit-Bold",
        padding: 12,
        borderColor: Colors.madidlyThemeBlue,
    },

    otpText: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000",
        fontFamily: "Outfit"
    },

    heddenTextInput: {
        position: 'absolute',
        width: "70%",
        opacity: 0,
        bottom: 5,
        backgroundColor: 'teal'
    }
})