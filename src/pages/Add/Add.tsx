import React, { useEffect, useState } from 'react'
import { Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native'
import { Colors, isAndroid, lightenColor, WIDTH } from '../../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderComponent from '../../components/AddButtonHeader';
import ScheduleCard from './ScheduleCard';
import SelectionCard from '../../components/SelectionCard';
import MapCard from './JobMapCard';
import { getInitials } from '../../components/dataConverters';
import JobNotesCard from '../../components/JobNotesCard';
import CheckList from '../../components/CheckList';
import AddNotes from '../../components/AddNotes';




const ViewJobModal = ({ }) => {

    return (
        < View >
            <View style={styles.centeredView}>

                <Text>add butt dupe</Text>
            </View >
        </View>
    )
}

export default ViewJobModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
    },
    modalView: {
        backgroundColor: "white",
        width: WIDTH,
        flex: 1,
        paddingVertical: Colors.spacing * 2,
    },


})