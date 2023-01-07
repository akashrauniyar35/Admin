import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Agenda, CalendarList } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors, HEIGHT, isAndroid } from '../assets/Colors';
import ViewAppointmentModal from '../pages/Drawer/ViewAppointmentModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getInitials } from './dataConverters';
import { useDispatch } from 'react-redux';
import { getAppointmentsFail, getAppointmentsPending, getAppointmentsSuccess } from '../redux/bookingSlice';
import { fetchAppointments } from '../config/BookingApi';
import ViewBookingModal from '../pages/Bookings/ViewBookingModal';


const JobsAgenda = ({ nav, data }) => {
    const dispatch = useDispatch();
    const [openAppointment, setOpenAppointment] = useState(false)
    const [dot, setDot] = useState({ key: '', color: Colors.red, selectedDotColor: Colors.red })
    const [itemDate, setItemDate] = useState(String)

    const [items, setItems] = useState({
        bookingDate: [{ name: '', price: '', address: '', contact: '', time: '', assigned: false, }]
    })

    // var obj = { '': [{ name: '', price: '', address: '', contact: '', time: '', assigned: false, }] }

    const renderer = () => {

        data.map((item: any) => {
            setItems({ bookingDate: item.bookingDate })
        })

        console.log('object', data)
    }



    function toggleAppointment() {
        setOpenAppointment(!openAppointment)
    }

    useEffect(() => {
        renderer()
    }, [])


    const AgendaItems = ({ item, nav }) => {





        return (
            <Pressable onPress={toggleAppointment}>
                <View style={{ backgroundColor: '#fff', padding: Colors.spacing * 2, borderRadius: 5, position: 'relative' }}>
                    <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", marginBottom: Colors.spacing }}>{item.time}</Text>
                    <Text style={{ fontSize: 16, color: Colors.madidlyThemeBlue, fontWeight: isAndroid ? "900" : "600", }}>{item.name}</Text>

                    <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, marginTop: Colors.spacing * .5 }}>{item.address}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing * .5 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                            <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, }}>{item.contact}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, marginRight: Colors.spacing, fontWeight: isAndroid ? "600" : "300", }}>Assigned</Text>
                                <Icon name={item.assigned ? "checkmark-circle" : "close-circle"} size={16} style={{ color: item.assigned ? Colors.green : Colors.red }} />
                            </View>

                        </View>
                    </View>
                    <View style={{
                        position: 'absolute', backgroundColor: Colors.madidlyThemeBlue, alignItems: 'center', justifyContent: 'center', width: 40, height: 40, right: 20, top: 20, borderRadius: 100,
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff', }}>{getInitials(item.name)}</Text>
                    </View >
                </View >
            </Pressable >
        )
    }


    return (
        <View style={{ backgroundColor: Colors.madlyBGBlue, }}>
            <View style={{
                height: HEIGHT * .8,
                backgroundColor: Colors.madlyBGBlue,
            }}>

                <Agenda

                    pastScrollRange={1}
                    futureScrollRange={1}
                    onRefresh={() => console.log('refreshing...')}

                    items={{

                        '2022-12-28': [{ name: 'Sankar Thapa', price: '400', address: 'Strathfield NS@ 2135', contact: '0451569865', time: '9:00 AM', assigned: false, },
                        { name: 'Pankar Thapa', price: '400', address: 'Strathfield NS@ 2135', contact: '0451569865', time: '9:00 AM', assigned: false, }],

                        '2022-12-29': [{ name: 'Bijay Chamling', address: 'Strathfield NS@ 2135', time: '2:00 PM', assigned: true, contact: '0451569865' }],
                        '2022-12-30': [{ name: 'item 4' }],
                        '2022-12-31': [{ name: 'item 3 - any js object' }, { name: 'item 3 any js object', }]
                    }}


                    markingType={'multi-dot'}
                    markedDates={{
                        '2022-12-25': { dots: [dot, dot, dot, dot], },
                        '2022-12-26': { dots: [dot, dot, dot, dot], },
                    }}

                    style={{
                    }}

                    theme={{

                        agendaDayTextColor: Colors.black,
                        agendaDayNumColor: Colors.madidlyThemeBlue,
                        agendaTodayColor: Colors.red,
                        calendarBackground: Colors.madlyBGBlue, //agenda background
                        agendaKnobColor: Colors.madidlyThemeBlue, // knob color
                        // backgroundColor: Colors.green, // background color below agenda
                        // todayBackgroundColor: Colors.paid,
                        textSectionTitleColor: Colors.madidlyThemeBlue,
                        selectedDayBackgroundColor: Colors.madidlyThemeBlue, // selected
                        // dayTextColor: Colors.maidlyGrayText, // calendar day
                    }}


                    renderItem={(item, firstItemInDay) => {

                        const spacing = firstItemInDay ? Colors.spacing * 3.5 : null
                        return (
                            <>
                                <View style={{}} />
                                <View style={{ marginTop: spacing, flex: 1, justifyContent: 'center', paddingRight: Colors.spacing, marginBottom: Colors.spacing }}>
                                    <AgendaItems item={item} nav={nav} />
                                </View>
                            </>)
                    }}

                />
            </View>
            <ViewBookingModal isOpen={openAppointment} onClose={toggleAppointment} id={"1231231231"} />

            {/* {openAppointment ? <ViewAppointmentModal isOpen={openAppointment} onPress={toggleAppointment} onClose={toggleAppointment} /> : null} */}


        </View>
    )
}

export default JobsAgenda

const styles = StyleSheet.create({})