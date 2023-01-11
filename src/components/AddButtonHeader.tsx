import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, isAndroid, WIDTH } from '../assets/Colors'
import Icon from 'react-native-vector-icons/Ionicons';

const AddButtonHeader = ({ onPress, lable, onClose, loading, saveOption }) => {

    return (
        <View style={{
            flexDirection: 'row', width: WIDTH, alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: 'white',
            // borderBottomWidth: 1,
            paddingHorizontal: Colors.spacing * 2,
            shadowRadius: 2,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: .3,
            elevation: 3,
            height: 55,
            shadowColor: Colors.grayOne,
            marginBottom: Colors.spacing * 1,
            position: 'relative',
        }}>
            <Pressable onPress={onClose} style={{}}>
                <Icon name="chevron-back" size={22} color={Colors.black} />
            </Pressable>
            <View style={{ top: 0, left: 10, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "600" }}>{lable}</Text>
            </View>
            <Pressable onPress={saveOption ? onPress : null}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: Colors.spacing * 4, justifyContent: "flex-end" }}>
                    {loading ? <ActivityIndicator color={Colors.madidlyThemeBlue} size={'small'} animating={loading} style={{ transform: [{ scale: .8 }], }} />
                        : <Text style={{ fontSize: 14, color: saveOption ? Colors.madidlyThemeBlue : 'transparent', fontWeight: isAndroid ? "900" : "600" }}>{'Save'}</Text>}
                </View>
            </Pressable>
        </View>
    )
}

export default AddButtonHeader

const styles = StyleSheet.create({



})