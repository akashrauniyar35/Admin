import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, isAndroid } from '../assets/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
import CalandarDatePicker from './CalandarDatePicker';
import InputBox from './InputBox';

const PeriodSelector = ({ fromPicker, setFromPicker, toPicker, setToPicker, handleDatePicker, dateRange }) => {


    const fromHandler = (value) => {
        const x = value.toISOString()
        handleDatePicker({ ...dateRange, from: x.substring(0, 10) })
        setFromPicker(false)
    }

    const toHandler = (value) => {
        const x = value.toISOString()
        handleDatePicker({ ...dateRange, to: x.substring(0, 10) })
        setToPicker(false)
    }

    return (
        <>

            <Text style={{ fontSize: 16, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", marginBottom: Colors.spacing * 1 }}>Period</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ width: '45 %' }}>
                    <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", marginBottom: Colors.spacing }}>From</Text>
                    <Pressable onPress={() => setFromPicker(true)} >
                        <InputBox placeholderSize={14} size={40} rounded={true} placeholder={dateRange.from} bg={'white'} itemsCenter={false} editable={false} />
                    </Pressable>
                </View>
                <View style={{ width: '45 %' }}>
                    <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", marginBottom: Colors.spacing }}>To</Text>
                    <Pressable onPress={() => setToPicker(true)}>
                        <InputBox placeholderSize={14} size={40} rounded={true} placeholder={dateRange.to} bg={'white'} itemsCenter={false} editable={false} />
                    </Pressable>
                </View>
            </View>

            <View style={{ height: .25, width: '100%', marginVertical: Colors.spacing * 2, backgroundColor: Colors.maidlyGrayText }} />


            <View>
                <Modal style={{ flex: 1, }} animationType="fade" transparent={true} visible={fromPicker} >
                    <View style={styles.container}>
                        <View style={{}}>
                            <CalandarDatePicker onPress={fromHandler} date={new Date()} />
                            <Pressable style={{ alignSelf: 'flex-end', marginTop: Colors.spacing, marginRight: Colors.spacing }} onPress={() => setFromPicker(false)}>
                                <Text style={{ fontSize: 14, color: 'white', fontWeight: isAndroid ? "900" : "600", }}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>

            <View>
                <Modal style={{ flex: 1, }} animationType="fade" transparent={true} visible={toPicker} >
                    <View style={styles.container}>
                        <View style={{}}>
                            <CalandarDatePicker onPress={toHandler} date={new Date()} />
                            <Pressable style={{ alignSelf: 'flex-end', marginTop: Colors.spacing, marginRight: Colors.spacing }} onPress={() => setToPicker(false)}>
                                <Text style={{ fontSize: 14, color: 'white', fontWeight: isAndroid ? "900" : "600", }}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>


        </>
    )
}

export default PeriodSelector

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.transparentGloss, },
    box: {
        backgroundColor: 'white',
        borderColor: Colors.maidlyGrayText,
        padding: Colors.spacing * 1,
        paddingHorizontal: Colors.spacing * 2,
        borderRadius: Colors.spacing * Colors.spacing,
        shadowRadius: 2,
        marginTop: Colors.spacing,
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: .2,
        elevation: 2,
        shadowColor: Colors.grayOne,
        borderWidth: isAndroid ? .35 : 0,

    },
})