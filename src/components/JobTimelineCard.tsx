import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, isAndroid } from '../assets/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
const JobTimelineCard = ({ date, icon, title, createdBy }: any) => {

    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString('default', { month: 'long' })
    const year = new Date(date).getFullYear()
    const time = new Date(date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    return (
        <View style={styles.container}>

            <Icon size={24} name={icon === "AiOutlinePlusCircle" ? "checkmark-circle-outline" : "close-circle-outline"} color={Colors.green} />

            <View style={{ marginLeft: Colors.spacing, }}>

                <View style={{ width: "90%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * .5, }}>
                    <Text style={{ width: "60%", fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', }}>{title}</Text>
                    <Text style={{ fontSize: 10, color: Colors.black, fontFamily: 'Outfit-Medium', }}>{`${day} ${month.slice(0, 3)} ${year} ${time}`}</Text>

                </View>
                <Text style={{ color: Colors.grayOne, fontSize: 12, fontFamily: 'Outfit-Light', }}>{createdBy}</Text>
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