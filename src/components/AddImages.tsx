import { Alert, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, isAndroid, lightenColor, WIDTH } from '../assets/Colors'
import Icon from 'react-native-vector-icons/Ionicons';




const AddImages = ({ label, type, placeholder, rounded, border, placeHolderTextColor, }) => {
    const [selected, setSelected] = useState();
    const [isOpen, setIsOpen] = useState(false)



    const onClickHandle = (visible) => {
        setIsOpen(visible)
    }

    const onTechSelect = (value) => {
        setIsOpen(false)
        setSelected(value)
    }

    return (
        <>
            <Pressable >
                <Text style={{ fontSize: 16, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing }}>Upload image</Text>
                <View style={[styles.box, { paddingHorizontal: rounded === true ? Colors.spacing * 2 : Colors.spacing, borderRadius: rounded === true ? Colors.spacing * Colors.spacing : Colors.spacing * .75, borderWidth: isAndroid ? .35 : 0, borderColor: Colors.maidlyGrayText }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ fontSize: 16, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{selected ? selected : "Upload image"}</Text>
                        </View>
                    </View>
                </View>
                {border === true && <View style={{ height: .25, width: '100%', marginVertical: Colors.spacing * 2, backgroundColor: Colors.maidlyGrayText }} />}
            </Pressable>

            <View style={{ marginTop: Colors.spacing, flexDirection: 'row' }}>
                <Text style={{ fontSize: 13, color: Colors.cancelledRed, marginTop: -4 }}>*</Text>
                <Text style={{ fontSize: 13, color: Colors.madidlyThemeBlue, lineHeight: Colors.spacing * 1.5, fontFamily: 'Outfit-Light', }}>Image must be in jpg, jpeg or png format and hte image size should not exceed 5mb</Text>
            </View>

        </>)
}

export default AddImages

const styles = StyleSheet.create({

    container: { flex: 1, alignItems: 'center', justifyContent: 'center', },
    box: {
        backgroundColor: 'white',
        borderColor: Colors.maidlyGrayText,
        padding: Colors.spacing * 1,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: .2,
        elevation: 2,
        shadowColor: Colors.madidlyThemeBlue,
    },


})