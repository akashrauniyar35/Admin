import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Colors} from '../../assets/Colors'
import Icon from 'react-native-vector-icons/Ionicons'

const BackButton = ({ nav }) => {
    return (
        <Pressable onPress={() => nav.goBack()}>
            <View style={{ backgroundColor: '#fff', borderRadius: 100, width: Colors.spacing * 2.5, height: Colors.spacing * 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="chevron-back" size={18} color={Colors.skyColor} />
            </View>
        </Pressable>
    )
}

export default BackButton

const styles = StyleSheet.create({})