import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, isAndroid } from '../assets/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
import InputBox from './InputBox';
const AddCategory = ({ rounded }) => {
    const [isVisible, setIsVisible] = useState(false)


    const toggle = () => {
        setIsVisible(!isVisible)
    }

    return (
        <View style={{}}>


            <View style={{}}>
                <Pressable onPress={toggle} style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Icon name={isVisible ? "chevron-up" : "chevron-down"} size={20} color={Colors.maidlyGrayText} />
                    <Text style={{ marginLeft: Colors.spacing, fontSize: 16, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium' }}>New Category</Text>
                </Pressable>
            </View>

            {
                isVisible &&
                <View style={{ marginTop: Colors.spacing }}>
                    <InputBox placeholder="Add new category" rounded={true} size={40} />
                    <View style={{ marginTop: Colors.spacing * 1.5 }}>
                        <Pressable style={styles.applyButton} >
                            <Text style={{ fontSize: 13, color: 'white', fontFamily: 'Outfit-Bold', }}>Add Category</Text>
                        </Pressable>
                    </View>
                </View>
            }

        </View >
    )
}

export default AddCategory

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowRadius: 2,
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: .2,
        shadowColor: Colors.grayOne, elevation: 2,

    },
    applyButton: {
        backgroundColor: Colors.madidlyThemeBlue,
        paddingHorizontal: Colors.spacing,
        width: "40%",
        borderRadius: Colors.spacing * Colors.spacing, alignItems: 'center', justifyContent: 'center', paddingVertical: Colors.spacing * 1,
    },
})