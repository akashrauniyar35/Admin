import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../assets/Colors'
import Icon from 'react-native-vector-icons/Ionicons'

const BackButton = ({ nav }: any) => {
    return (
        <Pressable onPress={() => nav.goBack()}>
            <Icon name="chevron-back" size={24} color={"#fff"} />
        </Pressable>
    )
}

export default BackButton

const styles = StyleSheet.create({})