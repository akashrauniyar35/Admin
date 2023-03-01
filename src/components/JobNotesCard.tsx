import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, isAndroid } from '../assets/Colors'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { getInitials } from './dataConverters';

const JobNotesCard = ({ text, date, id, onPress, by, selectedNote, loading }: any) => {

    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString('default', { month: 'long' })
    const year = new Date(date).getFullYear()
    const time = new Date(date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    return (
        <View style={styles.container}>

            {by ? <View style={{ marginRight: Colors.spacing, width: 35, height: 35, borderRadius: 100, backgroundColor: Colors.madidlyThemeBlue, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Outfit-Bold', }}>{getInitials(by)}</Text>
            </View> : null}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <View style={{}}>
                    <Text style={{ fontSize: 10, color: Colors.black, fontFamily: 'Outfit-Medium', }}>{`${day} ${month.slice(0, 3)} ${year} ${time}`}</Text>
                    <View style={{ marginTop: Colors.spacing * .5 }}>
                        <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{text}</Text>
                    </View>
                </View>

                {id === selectedNote ? <ActivityIndicator color={Colors.red} size={'small'} animating={loading} style={{ transform: [{ scale: .8 }], }} />
                    :
                    <Pressable onPress={() => onPress(id)}>
                        <Text style={{ fontSize: 12, color: Colors.red, fontFamily: 'Outfit-Light', }}>delete</Text>
                    </Pressable>}
            </View>

        </View >
    )
}

export default JobNotesCard

const styles = StyleSheet.create({
    container: {
        marginBottom: Colors.spacing * 2,
        flexDirection: 'row',
        flex: 1
    }
})