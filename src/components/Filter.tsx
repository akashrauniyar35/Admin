import { Dimensions, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../assets/Colors';
import SelectTechnicianCard from './SelectionCard';
import PeriodSelector from './PeriodSelector';
import SelectionCard from './SelectionCard';
import CalandarDatePicker from './CalandarDatePicker';
import HeaderComponent from './AddButtonHeader'
import { getAllTechPending } from '../redux/technicianSlice';
import { fetchAllTechnician } from '../config/TechApi';

import AssignTech from './AssignTech';

const isAndroid = Platform.OS == 'android' ? true : false
const { width, height } = Dimensions.get('screen')


const filterTypeData = [
    {
        id: '00',
        name: 'Technician',
    },
    {
        id: '01',
        name: 'By Date',
    },
    {
        id: '02',
        name: 'Job Status',
    },
];

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

const Filter = ({ onPress, isOpen, title, setDateRange, filter, dateRange, onClose, setFilter, onClear, setPageCount, setFilterType, filterType }: any) => {
    const [fromPicker, setFromPicker] = useState(false);
    const [toPicker, setToPicker] = useState(false);
    const [techData, setTechData] = useState();



    const getAllTech = async () => {
        const x: any = await fetchAllTechnician()
        if (x.data.status === "error") {
        } else {
            setTechData(x.data.paginatedResults)
        }
    }

    const handleTech = (item: any) => {
        let techName = item.firstName + " " + item.lastName
        setFilter(techName)
    }

    useEffect(() => {
        getAllTech()
    }, [])
    return (
        <>
            <View>
                <View style={[styles.filterStyling,]}>
                    <Pressable onPress={() => { onClose(); setPageCount(1) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Icon name="filter" size={22} color={Colors.black} />
                            <Text style={{ marginLeft: Colors.spacing * 1.5, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Medium', }}>{title}</Text>
                        </View>
                    </Pressable>

                    <View style={{ width: '50%', alignItems: "flex-start", marginLeft: Colors.spacing, paddingRight: Colors.spacing }}>
                        <ScrollView horizontal contentContainerStyle={{ alignItems: "center" }}>

                            {filter &&
                                <View style={{ backgroundColor: Colors.completedGreenBG, padding: Colors.spacing * .55, borderRadius: Colors.spacing, marginRight: Colors.spacing, paddingHorizontal: Colors.spacing, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 10, color: Colors.green, fontWeight: isAndroid ? "900" : "600", fontFamily: 'Outfit-Medium', }}>{filter}</Text>
                                </View>
                            }

                            {
                                dateRange.from && dateRange.to &&
                                <View style={{ backgroundColor: Colors.completedGreenBG, padding: Colors.spacing * .55, borderRadius: Colors.spacing, marginRight: Colors.spacing, paddingHorizontal: Colors.spacing, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 10, color: Colors.green, fontWeight: isAndroid ? "900" : "600" }}>{`${dateRange.from} - ${dateRange.to}`}</Text>
                                </View>
                            }

                        </ScrollView>
                    </View>

                    {dateRange.from !== "" && dateRange.to !== "" || filter !== "" &&
                        <Pressable onPress={onClear}>
                            <Icon name="md-close-circle" color={Colors.madidlyThemeBlue} size={20} />
                        </Pressable>
                    }

                    {dateRange.from && dateRange.to &&
                        <Pressable onPress={onClear}>
                            <Icon name="md-close-circle" color={Colors.madidlyThemeBlue} size={20} />
                        </Pressable>
                    }

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
                            <Text style={{ fontSize: 14, color: Colors.grayOne, fontFamily: 'Outfit-Bold', }}>{"Filter Jobs"}</Text><Icon name="chevron-back" size={28} color={'white'} />
                        </View>


                        <View style={styles.container}>

                            <View style={{ marginTop: Colors.spacing }}>
                                <SelectionCard onPress={(value: any) => setFilterType(value)} phColor={Colors.maidlyGrayText} border={true} rounded={true} data={filterTypeData} type={'filter'} label="Filter by" placeholder={filterType ? filterType : ""} />
                            </View>

                            {filterType === "Technician" ?
                                <View>
                                    <AssignTech rounded={true} loading={false} data={techData} onPress={(value: any) => handleTech(value)} placeholder={"Select a technician"} clearEnabled={true} />
                                    <View style={{ height: .25, width: '100%', marginVertical: Colors.spacing * 2, backgroundColor: Colors.maidlyGrayText }} />
                                </View>
                                : null
                            }


                            {filterType === "By Date" ? <View style={{ marginTop: Colors.spacing }}>
                                <PeriodSelector
                                    fromPicker={fromPicker} setFromPicker={setFromPicker}
                                    toPicker={toPicker} setToPicker={setToPicker}
                                    handleDatePicker={setDateRange} dateRange={dateRange}
                                />
                            </View> : null}

                            {filterType === "Job Status" ? <View style={{ marginTop: Colors.spacing }}>
                                <SelectionCard onPress={(value: any) => setFilter(value)} phColor={Colors.maidlyGrayText} border={true} rounded={true} data={scheduleData} type={'filter'} label="Status" placeholder={filter ? filter : "Select status"} />
                            </View> : null}

                        </View>
                        <Pressable style={styles.applyButton} onPress={onPress}>
                            <Text style={{ fontSize: 14, color: 'white', fontFamily: 'Outfit-Bold', }}>Apply Filter</Text>
                        </Pressable>
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
        position: 'absolute',
        bottom: 300,
        width: "90%",
        alignSelf: 'center',
        backgroundColor: Colors.madidlyThemeBlue, flexDirection: 'row',
        borderRadius: Colors.spacing * Colors.spacing, alignItems: 'center', justifyContent: 'center', paddingVertical: Colors.spacing * 1.3, height: 45
    }

})