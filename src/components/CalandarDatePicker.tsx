import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CalendarPicker from 'react-native-calendar-picker';
import { Colors, HEIGHT } from '../assets/Colors';


const { width, height } = Dimensions.get('screen')

const CalandarDatePicker = ({ onPress, date }) => {

    let p = new Date(date).toISOString().substring(0, 10);
    return (
        <View style={styles.shadowBox}>
            <View style={styles.container}>

                <CalendarPicker
                    width={width * .8}
                    monthYearHeaderWrapperStyle={{}}
                    startFromMonday={true}
                    restricted={false}
                    selectedStartDate={p}
                    selectedDayColor={Colors.madidlyThemeBlue}
                    selectedDayTextColor={'white'}
                    monthYearTextStyle={{ textColor: Colors.maidlyGrayText, }}
                    onDateChange={(date: any) => { onPress(date) }}
                    previousTitleStyle={{ fontSize: 12, fontWeight: '300', color: Colors.maidlyGrayText }}
                    nextTitleStyle={{ fontSize: 12, fontWeight: '300', color: Colors.maidlyGrayText }}
                />
                {/* <Text style={{ color: 'black' }}>{p}</Text> */}

            </View>

        </View>
    )
}

export default CalandarDatePicker

const styles = StyleSheet.create({
    container: {
        height: 300,
        alignItems: 'center',
        width: width * .75,
    },
    shadowBox: {
        alignItems: 'center',
        backgroundColor: '#fff',
        width: width * .8,
        alignSelf: 'center',
        padding: 10,
        paddingHorizontal: 30,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: .2,
        borderRadius: 10,

    }
})