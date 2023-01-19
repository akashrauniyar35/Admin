import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, isAndroid } from '../assets/Colors'
import { getInitials } from './dataConverters'


const JobNotesCard = () => {
    return (
        <View style={styles.container}>

            <View style={{ marginRight: Colors.spacing, width: 35, height: 35, borderRadius: 100, backgroundColor: Colors.madidlyThemeBlue, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Outfit-Bold', }}>{getInitials('Sagar Thapa')}</Text>
            </View>

            <View style={{}}>

                <View style={{ width: isAndroid ? '77%' : '77%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 1 }}>
                    <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', }}>{"Sagar Thapa"}</Text>
                    <Text style={{ fontSize: 10, color: Colors.black, fontFamily: 'Outfit-Medium', }}>{'10 Oct 2022 9 AM'}</Text>

                </View>
                <View style={{ width: isAndroid ? '77%' : '77%', }}>
                    <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{'30 Genley Rd Homebush West 2140 NSW 30 Genley Rd Homebush West 2140 NSW 30 Genley Rd Homebush West 2140 NSW'}</Text>
                </View>

            </View>


        </View >
    )
}

export default JobNotesCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    }
})