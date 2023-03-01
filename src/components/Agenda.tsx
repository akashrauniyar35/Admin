import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Agenda } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, HEIGHT, isAndroid } from '../assets/Colors';
import { getInitials } from './dataConverters';
import { useDispatch } from 'react-redux';
import { deleteBookingFail, deleteBookingPending, deleteBookingSuccess, getBookingbyIDFail, getBookingbyIDPending, getBookingbyIDSuccess } from '../redux/bookingSlice';
import { fetchBookingByID, fetchDeleteJobBooking } from '../config/BookingApi';
import ViewBookingModal from '../pages/Bookings/ViewBookingModal';
import Toast from 'react-native-toast-message';


const JobsAgenda = ({ nav, data, refresh }: any) => {
    const dispatch = useDispatch();
    const [openAppointment, setOpenAppointment] = useState(false)
    const [markedDates, setMarkedDates] = useState<any>({});
    const [items, setItems] = useState<any>([]);
    const [_id, set_id] = useState<string>()
    const [ref, setRef] = useState<string>();
    const [deleteBooking, setDeleteBooking] = useState(false);
    const [emptyDate, setEmptyDate] = useState<any>()



    const deleteBookingHandler = async (id: any,) => {
        dispatch(deleteBookingPending())
        const x: any = await fetchDeleteJobBooking(id)
        if (x.data.status === "error") {
            return dispatch(deleteBookingFail());
        }
        dispatch(deleteBookingSuccess())
        setDeleteBooking(false);
        refresh()
        setOpenAppointment(false)
        Toast.show({
            type: 'deleteToast',
            visibilityTime: 3000,
            text1: `${ref}`,
            props: { message: 'Deleted Successfully' }
        });
    }


    const renderer = () => {
        setItems(data.reduce((x: any, item: any) => ({
            ...x, [item.bookingDate.substring(0, 10)]:
                [{
                    id: item._id,
                    ref: item.bookingReference,
                    name: `${item.firstName} ${item.lastName}`,
                    price: item.subtotal,
                    city: item.city,
                    state: item.state,
                    postcode: item.postcode,
                    contact: item.phone,
                    time: `${item.startHour}:${item.startMin} ${item.startMode}`,
                    assigned: item.assignedTech[0],
                },
                ]
        }), {}))
    }


    useEffect(() => {
        data.map((x: any) => {
            Object.keys(items).forEach(key => {

                if (x.bookingDate.substring(0, 10) === key && x.bookingReference !== items[key][0].ref) {
                    console.log("match found", key + " -- " + x.bookingDate.substring(0, 10) + " -- " + x.firstName)
                    items[key].push({
                        id: x._id,
                        ref: x.bookingReference,
                        name: `${x.firstName} ${x.lastName}`,
                        price: x.subtotal,
                        city: x.city,
                        state: x.state,
                        postcode: x.postcode,
                        contact: x.phone,
                        time: `${x.startHour}:${x.startMin} ${x.startMode}`,
                        assigned: x.assignedTech[0],
                    })

                } return key
            });
        })

    }, [items])


    const viewAppointmentHandler = async (id: string, ref: string) => {
        set_id(id)
        setRef(ref)
        setOpenAppointment(true)
        dispatch(getBookingbyIDPending())
        const x: any = await fetchBookingByID(id)
        if (x.data.status === "error") {
            return dispatch(getBookingbyIDFail(x.data.status));
        }
        dispatch(getBookingbyIDSuccess(x.data.result))
    }

    useEffect(() => {
        renderer()
    }, [data])


    useEffect(() => {
        Object.keys(items).forEach(key => {
            console.log(key);        // the name of the current key.
            console.log(items[key]); // the value of the current key.
            let dots: any = []
            for (let i = 0; i < items[key].length; i++) {
                let dot = { key: i, color: Colors.red, selectedDotColor: Colors.red }
                dots.push(dot)
            }
            let pp = {
                [key]: { dots: dots }
            }


            setMarkedDates((prevPerson: any) => {
                return {
                    ...prevPerson,
                    [key]: { dots: dots }
                }
            })
        });
    }, [items])


    const renderEmptyDate = () => {
        return (
            <View style={{ backgroundColor: 'white', width: "80%", alignSelf: 'center', marginTop: Colors.spacing, padding: Colors.spacing, borderRadius: Colors.spacing * .5 }}>
                <Text style={{ fontSize: 18, color: 'red', fontFamily: 'Outfit-Bold', marginBottom: Colors.spacing }}>No items found!</Text>
                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Bold' }}>No job has been scheduled on this day.</Text>
            </View>
        );
    };


    const AgendaItems = ({ item }: any) => {
        const { city, state, postcode, assigned, id, ref } = item
        return (
            <Pressable onPress={() => viewAppointmentHandler(id, ref)}>
                <View style={{ backgroundColor: '#fff', padding: Colors.spacing * 2, borderRadius: 5, position: 'relative' }}>
                    <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", marginBottom: Colors.spacing }}>{item.time}</Text>
                    <Text numberOfLines={1} style={{ width: "60%", fontSize: 16, color: Colors.madidlyThemeBlue, fontWeight: isAndroid ? "900" : "600", }}>{item.name}</Text>

                    <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, marginTop: Colors.spacing * .5 }}>{city.charAt(0).toUpperCase() + city.slice(1) + " " + postcode + " " + state.toUpperCase()}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing * .5 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                            <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, }}>{item.contact}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, marginRight: Colors.spacing, fontWeight: isAndroid ? "600" : "300", }}>Assigned</Text>
                                <Icon name={assigned ? "checkmark-circle" : "close-circle"} size={16} style={{ color: assigned ? Colors.green : Colors.red }} />
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


                    renderEmptyData={renderEmptyDate}

                    pastScrollRange={1}
                    futureScrollRange={1}
                    onRefresh={() => refresh()}
                    items={items}
                    markingType={'multi-dot'}
                    markedDates={markedDates}
                    theme={{
                        agendaDayTextColor: Colors.black,
                        agendaDayNumColor: Colors.madidlyThemeBlue,
                        agendaTodayColor: Colors.green,
                        calendarBackground: Colors.madlyBGBlue, //agenda background
                        agendaKnobColor: Colors.madidlyThemeBlue, // knob color
                        todayBackgroundColor: Colors.green,
                        todayTextColor: 'white',
                        textSectionTitleColor: Colors.madidlyThemeBlue,
                        selectedDayBackgroundColor: Colors.madidlyThemeBlue, // selected
                    }}


                    renderItem={(item, firstItemInDay) => {

                        const spacing = firstItemInDay ? Colors.spacing * 3.5 : null
                        return (
                            <>
                                <View style={{}} />
                                <View style={{ marginTop: Colors.spacing, flex: 1, justifyContent: 'center', paddingRight: Colors.spacing, marginBottom: Colors.spacing, }}>
                                    <AgendaItems item={item} />
                                </View>
                            </>)
                    }}

                />
            </View>

            <ViewBookingModal isOpen={openAppointment} onClose={() => setOpenAppointment(false)} id={_id} refresh={viewAppointmentHandler}
                deleteOpen={deleteBooking} deleteHandler={deleteBookingHandler} toggleDelete={() => setDeleteBooking(!deleteBooking)} />


        </View>
    )
}

export default JobsAgenda

const styles = StyleSheet.create({})