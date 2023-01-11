import { Dimensions, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../assets/Colors';
import SelectTechnicianCard from './SelectionCard';
import PeriodSelector from './PeriodSelector';
import SelectionCard from './SelectionCard';
import CalandarDatePicker from './CalandarDatePicker';
import HeaderComponent from './AddButtonHeader'

const isAndroid = Platform.OS == 'android' ? true : false
const { width, height } = Dimensions.get('screen')


const data = [
    {
        id: '00',
        name: 'Ninja Prasad',
    },
    {
        id: '01',
        name: 'Ashwin Nigga',
    },
    {
        id: '02',
        name: 'Milan Prasad',
    },
    {
        id: '03',
        name: 'Rajesh Hamal',
    },
];

const scheduleData = [
    {
        id: '00',
        name: 'Cancelled',
        color: "",
    },
    {
        id: '01',
        name: 'Scheduled',
        color: "",
    },
    {
        id: '02',
        name: 'In Progress',
        color: "",
    },
    {
        id: '03',
        name: 'Completed',
        color: "",
    },
]

const Filter = ({ onPress, isOpen, title, setDateRange, dateRange, onClose, setFilter, onClear, setPageCount }) => {
    const [fromPicker, setFromPicker] = useState(false);
    const [toPicker, setToPicker] = useState(false);


    const handleDatePicker = (value) => {
        const x = value.toISOString()
        setDateRange({ ...dateRange, from: x.substring(0, 10) })
        console.log("handleDatePicker",)
    }

    const data = [
        {
            id: '00',
            title: 'Completed'
        },
        {
            id: '00',
            title: 'Amit Raja'
        },
        {
            id: '00',
            title: 'From 2023/01-01 To 2023/01-31'
        },
    ]

    return (

        <>

            <View>
                <View style={[styles.filterStyling,]}>
                    <Pressable onPress={() => { onClose(); setPageCount(1) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Icon name="filter" size={22} color={Colors.littleGray} />
                            <Text style={{ marginLeft: Colors.spacing * 1.5, color: Colors.madidlyThemeBlue, fontWeight: isAndroid ? "900" : "600" }}>{title}</Text>
                        </View>
                    </Pressable>

                    <View style={{ width: '60%', alignItems: "center" }}>
                        <ScrollView horizontal contentContainerStyle={{ alignItems: "center" }}>
                            {data.map((item) => {
                                return (
                                    <Pressable>
                                        <View style={{ backgroundColor: Colors.completedGreenBG, padding: Colors.spacing * .55, borderRadius: Colors.spacing, marginRight: Colors.spacing, paddingHorizontal: Colors.spacing, alignItems: 'center' }}>
                                            <Text style={{ marginRight: Colors.spacing, fontSize: 10, color: Colors.green, fontWeight: isAndroid ? "900" : "600" }}>{item.title}</Text>
                                        </View>
                                    </Pressable>
                                )
                            })}
                        </ScrollView>
                    </View>

                    <Pressable onPress={onClear}>
                        <Icon name="md-close-circle" color={Colors.madidlyThemeBlue} size={20} />
                    </Pressable>

                </View>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isOpen}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <SafeAreaView />
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white',
                        width: width,
                        borderTopRightRadius: Colors.spacing * 2,
                    }}>

                        <View style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white',
                            paddingHorizontal: Colors.spacing * 2,
                            paddingVertical: Colors.spacing * 1,
                            shadowRadius: 2,
                            shadowOffset: { width: 0, height: .5 },
                            shadowOpacity: .2,
                            elevation: 2,
                            shadowColor: Colors.grayOne,

                        }}>
                            <Pressable
                                style={{}}
                                onPress={onClose}
                            ><Icon name="chevron-back" size={22} color={Colors.black} /></Pressable>
                            <Text style={{ fontSize: 14, color: Colors.grayOne, fontWeight: isAndroid ? "900" : "600" }}>{"Filter Jobs"}</Text><Icon name="chevron-back" size={28} color={'white'} />
                        </View>


                        <View style={styles.container}>

                            <SelectionCard phColor={Colors.maidlyGrayText} border={true} rounded={true} data={data} type={'filter'} label="Technician" placeholder="Select Technician" />

                            <View style={{ marginTop: Colors.spacing }}>
                                <PeriodSelector
                                    fromPicker={fromPicker} setFromPicker={setFromPicker}
                                    toPicker={toPicker} setToPicker={setToPicker}
                                    handleDatePicker={setDateRange} dateRange={dateRange}
                                />
                            </View>

                            <View style={{ marginTop: Colors.spacing }}>
                                <SelectionCard onPress={(value) => setFilter(value)} phColor={Colors.maidlyGrayText} border={true} rounded={true} data={scheduleData} type={'filter'} label="Status" placeholder="Select status" />
                            </View>

                            <Pressable style={styles.applyButton} onPress={onPress}>
                                <Text style={{ fontSize: 16, color: 'white', fontWeight: isAndroid ? "900" : "600", }}>Apply Filter</Text>
                            </Pressable>

                        </View>
                    </View>
                </View>
            </Modal >
        </>

    )
}

export default Filter

const styles = StyleSheet.create({
    filterStyling: {
        backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', marginVertical: Colors.spacing * 1.5, paddingHorizontal: Colors.spacing * 2, height: 55,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: .2,
        shadowColor: Colors.grayOne, elevation: 2,
        justifyContent: 'space-between'
    },

    container: {
        padding: Colors.spacing * 2,
    },
    applyButton: {
        backgroundColor: Colors.madidlyThemeBlue, flexDirection: 'row',
        borderRadius: Colors.spacing * Colors.spacing, alignItems: 'center', justifyContent: 'center', paddingVertical: Colors.spacing * 1.3,
    }

})