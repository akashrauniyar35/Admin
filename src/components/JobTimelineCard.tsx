import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, isAndroid } from '../assets/Colors'
import { getInitials } from './dataConverters'
import Icon from 'react-native-vector-icons/Ionicons';
const JobTimelineCard = ({ date, icon, title, createdBy }) => {
    return (
        <View style={styles.container}>


            <Icon size={24} name={icon === "AiOutlinePlusCircle" ? "checkmark-circle-outline" : "close-circle-outline"} color={Colors.green} />

            <View style={{ marginLeft: Colors.spacing, }}>

                <View style={{ width: isAndroid ? '80%' : '83%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * .5,}}>
                    <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', }}>{title}</Text>
                    <Text style={{ fontSize: 10, color: Colors.black, fontFamily: 'Outfit-Medium', }}>{date.substring(0, 19)}</Text>

                </View>
                <Text style={{ color: Colors.grayText, fontSize: 12, fontFamily: 'Outfit-Light', }}>{createdBy}</Text>
            </View>

        </View >
    )
}

export default JobTimelineCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Colors.spacing * 2,
    }
})