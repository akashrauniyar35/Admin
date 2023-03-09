import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC, useState } from 'react'
import InputBox from './InputBox'
import { Colors, HEIGHT, isAndroid, WIDTH } from '../assets/Colors'
import CalandarDatePicker from "./CalandarDatePicker";
import SelectionCard from './SelectionCard'
import PickTimeModal from './PickTimeModal'



const ScheduleCard = ({ date, onDateChangeHandler, notes, jobNotesHandler, startHour, startMin, startMode, endHour, endMin, endMode, startTimeHandler, endTimeHandler, }: any) => {
    // date, onDateChangeHandler, notes, jobNotesHandler 
    const [calendarVisible, setCalendarVisible] = useState(false)
    const [startTimeVisible, setstartTimeVisible] = useState(false)
    const [endTimeVisible, setEndTimeVisible] = useState(false)




    const handleDatePicker = (value: any) => {
        const x = value.toISOString()
        onDateChangeHandler(x)
        setCalendarVisible(false)
    }

    const handleStartTimePicker = (value: string) => {
        console.log("time value", value)
        startTimeHandler(value)
        setstartTimeVisible(false)
    }
    const handleEndTimePicker = (value: string) => {
        endTimeHandler(value)
        setEndTimeVisible(false)
    }

    const handleNotes = (value: any) => {
        jobNotesHandler(value)
    }

    return (

        <>
            <View>
                <Text style={{ fontSize: 18, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", marginBottom: Colors.spacing * 2 }}>Schedule</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Booking date</Text>
                    <Pressable style={{ width: "70%" }} onPress={() => setCalendarVisible(true)}>
                        <InputBox onPress={() => setCalendarVisible(true)} placeholderSize={12} width="70%" size={40} rounded={true} placeholder={new Date(date).toDateString()} editable={false} />
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Start Time</Text>
                    <Pressable onPress={() => setstartTimeVisible(true)} style={{ width: "70%" }}>
                        <InputBox onPress={() => setstartTimeVisible(true)} placeholderSize={12} size={40} rounded={true} placeholder={startHour && `${startHour}:${startMin} ${startMode}`} editable={false} />
                    </Pressable >
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>End Time</Text>
                    <Pressable onPress={() => setEndTimeVisible(true)} style={{ width: "70%" }}>
                        <InputBox onPress={() => setEndTimeVisible(true)} placeholderSize={12} size={40} rounded={true} placeholder={endHour && `${endHour}:${endMin} ${endMode}`} editable={false} />
                    </Pressable >
                </View>

                <View style={{ marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing, }}>Job notes</Text>
                    <View style={{}}>
                        <TextInput autoCapitalize={"sentences"} value={notes} placeholder={notes} onChangeText={(value) => handleNotes(value)} style={styles.notes} multiline={true} maxLength={300} />
                    </View>
                </View>

                <View>
                    <Modal style={{ flex: 1, }} animationType="fade" transparent={true} visible={calendarVisible} >
                        <View style={styles.container}>
                            <View style={styles.selectonContainer}>
                                <CalandarDatePicker onPress={handleDatePicker} date={date} />
                                <Pressable style={{ alignSelf: 'flex-end', marginTop: Colors.spacing, marginRight: Colors.spacing }} onPress={() => setCalendarVisible(false)}>
                                    <Text style={{ fontSize: 14, color: 'white', fontFamily: 'Outfit-Bold', }}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={{ width: "70%", marginRight: Colors.spacing * .25, }}>
                    <PickTimeModal isVisible={startTimeVisible} onPress={handleStartTimePicker} onClose={() => { setstartTimeVisible(false) }} />
                    <PickTimeModal isVisible={endTimeVisible} onPress={handleEndTimePicker} onClose={() => setEndTimeVisible(false)} />
                </View>

                <View style={{ opacity: .35, marginVertical: Colors.spacing * 2, borderBottomWidth: 2, borderColor: Colors.borderColor }} />
            </View>


        </>
    )
}

export default ScheduleCard

const styles = StyleSheet.create({
    notes: {
        textAlignVertical: "top",
        fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "600" : "300",
        backgroundColor: 'white',
        borderColor: Colors.borderColor,
        alignItems: 'center',
        width: "100%",
        height: HEIGHT * .2,
        shadowRadius: 2,
        paddingTop: Colors.spacing * 1,
        paddingHorizontal: Colors.spacing * 2,
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: .2,
        elevation: 2,
        shadowColor: Colors.black,
        borderWidth: isAndroid ? .35 : 0,
        borderRadius: Colors.spacing * 1.5,
        fontFamily: 'Outfit-Light',

    },
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.transparentGloss },
    selectonContainer: {

        // backgroundColor: Colors.black,
        // width: WIDTH * .9,
        // padding: Colors.spacing * 2,
        // position: 'relative',
        // paddingVertical: Colors.spacing * 4,

    },
})