import { ActivityIndicator, Dimensions, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, HEIGHT, isAndroid, WIDTH } from '../../assets/Colors';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

import Header from '../../components/Header';

import { useSelector, useDispatch } from 'react-redux'

import Divider from '../../components/Divider';
import Banner from '../../components/Banner';
import BookingsCard from './Card';
import ViewBookingModal from '../Bookings/ViewBookingModal';
import { fetchBookingByID, fetchDeleteJobBooking, fetchTodayBookings } from '../../config/BookingApi';
import { deleteBookingFail, deleteBookingPending, deleteBookingSuccess, getBookingbyIDFail, getBookingbyIDPending, getBookingbyIDSuccess, getTodayBookingsFail, getTodayBookingsPending, getTodayBookingsSuccess } from '../../redux/bookingSlice';
import ShowToast from '../../components/ShowToast';
import moment from 'moment';


const Home = ({ navigation }: any) => {
    const dispatch = useDispatch()



    const homeFilters = [
        {
            id: '00',
            label: 'Today',
            date: { from: moment().format('YYYY-MM-DD'), to: moment().add(1, 'days').format('YYYY-MM-DD') }
        },
        {
            id: '01',
            label: 'Yesterday',
            date: { from: moment().subtract(1, 'days').startOf('day').format('YYYY-MM-DD'), to: moment().format('YYYY-MM-DD') }
        },
        {
            id: '02',
            label: 'Tomorrow',
            date: { from: moment().add(1, 'days').format('YYYY-MM-DD'), to: moment().add(2, 'days').format('YYYY-MM-DD') }
        },
        {
            id: '03',
            label: 'This Week',
            date: { from: moment().startOf('week').toDate().toISOString().substring(0, 10), to: moment().endOf('week').toDate().toISOString().substring(0, 10) }
        },

    ];

    const [selectedPeriod, setSelectdPeriod] = useState(homeFilters[0])
    const [bokingVisible, setBookingVisible] = useState(false)
    const [selectedBookingID, setSelectedBookingID] = useState(String)
    const [deleteBooking, setDeleteBooking] = useState(false);
    const [ref, setRef] = useState<string>();

    const loading = useSelector((state: any) => state.bookingReducer.dashboardLoading)
    const data = useSelector((state: any) => state.bookingReducer.dashboardData)
    const user = useSelector((state: any) => state.userReducer.data)


    const viewBookingHandler = async (id: string, ref: string) => {
        setSelectedBookingID(id)
        setRef(ref)
        setBookingVisible(true)
        dispatch(getBookingbyIDPending())
        const x: any = await fetchBookingByID(id)
        if (x.data.status === "error") {
            return dispatch(getBookingbyIDFail(x.data.status));
        }
        dispatch(getBookingbyIDSuccess(x.data.result))
    }


    const todayBookingsHandler = async () => {
        dispatch(getTodayBookingsPending())
        const x: any = await fetchTodayBookings(selectedPeriod?.date?.from, selectedPeriod?.date?.to)
        if (x.data.status === "error") {
            return dispatch(getTodayBookingsFail(x.data.status));
        }
        dispatch(getTodayBookingsSuccess(x.data.paginatedResults))

    }

    const deleteBookingHandler = async (id: any) => {
        dispatch(deleteBookingPending())
        const x: any = await fetchDeleteJobBooking(id)
        if (x.data.status === "error") {
            return dispatch(deleteBookingFail());
        }
        dispatch(deleteBookingSuccess())
        setDeleteBooking(false);
        todayBookingsHandler()
        setBookingVisible(false)
        Toast.show({
            type: 'deleteToast',
            visibilityTime: 3000,
            text1: ref,
            props: { message: 'Deleted Successfully' }
        });
    }



    const renderItem = ({ item }: any) => {
        return (
            <BookingsCard tech={item.assignedTech[0] ? `${item.assignedTech[0].firstName}` : ""} onPress={() => viewBookingHandler(item._id, item.bookingReference)} id={item._id} fName={item.firstName} lName={item.lastName} status={item.bookingStatus} price={item.subtotal} />
        )
    }

    useEffect(() => {
        todayBookingsHandler()
    }, [selectedPeriod])

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />

                <Header nav={navigation} title={`Hey, ${user.firstName}`} />

                <View style={{ flex: 1 }}>
                    <View style={{ paddingHorizontal: Colors.spacing * 2, marginTop: Colors.spacing * 2, }}>
                        <Banner  />
                    </View>
                    <View style={[styles.padding, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: Colors.spacing * 2, }]}>

                        {homeFilters.map((item) => {
                            return (
                                <Pressable key={item.id} onPress={() => setSelectdPeriod(item)} style={{ backgroundColor: item.label == selectedPeriod?.label ? Colors.madidlyThemeBlue : 'transparent', width: '25%', paddingVertical: Colors.spacing * .5, borderRadius: Colors.spacing * .5 }}>
                                    <Text style={{ fontSize: 12, color: item.label == selectedPeriod?.label ? 'white' : Colors.black, alignSelf: 'center', fontFamily: 'Outfit-Medium', }}>{item.label}</Text>
                                </Pressable>
                            )
                        })}
                    </View>

                    <View style={{ paddingHorizontal: Colors.spacing * 2, flex: 1, }}>
                        <View style={[styles.viewBox, { flex: .95, }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <IconM name={'calendar-check'} size={18} color={Colors.black} />
                                <Text style={{ fontSize: 18, color: Colors.black, marginLeft: Colors.spacing, fontFamily: 'Outfit-Bold', }}>Jobs</Text>
                            </View>

                            <View style={{ marginTop: Colors.spacing, marginBottom: Colors.spacing * 1 }}>
                                <Divider height={.5} colors={Colors.borderColor} width="110%" />
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                                <Text style={{ fontSize: 14, color: Colors.black, width: isAndroid ? "35%" : "35%", fontFamily: 'Outfit-Medium', }}>Customer</Text>
                                <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: isAndroid ? '25%' : '20%' }}>Assigned</Text>
                                <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: isAndroid ? '25%' : '23%', }}>Status</Text>
                                <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: isAndroid ? '20%' : '20%' }}>Total</Text>

                            </View>

                            <View style={{ marginTop: Colors.spacing * 1, marginBottom: Colors.spacing, }}>
                                <Divider height={.5} color={Colors.borderColor} width="110%" />
                            </View>

                            <View style={{}}>
                                {loading ?
                                    <ActivityIndicator color={Colors.madidlyThemeBlue} animating={loading} size={'small'} style={{}} /> :

                                    data.length <= 0 ?
                                        <View style={{ backgroundColor: Colors.red, marginTop: Colors.spacing, justifyContent: "center", alignItems: "center", padding: Colors.spacing * .5, borderRadius: Colors.spacing * .5 }}>
                                            <Text style={{ color: '#fff', fontFamily: "Outfit-Light" }}>No jobs found!</Text>
                                        </View> :
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            contentContainerStyle={{
                                                paddingBottom: Colors.spacing * 4,
                                            }}
                                            data={data}
                                            keyExtractor={item => item._id}
                                            renderItem={(item: any) => renderItem(item)} />

                                }
                            </View>
                        </View>
                    </View>
                </View>




            </View>

            <ShowToast />

            <ViewBookingModal isOpen={bokingVisible} onClose={() => setBookingVisible(false)} id={selectedBookingID} refresh={viewBookingHandler}
                deleteOpen={deleteBooking} deleteHandler={deleteBookingHandler} toggleDelete={() => setDeleteBooking(!deleteBooking)} />
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    container: { backgroundColor: Colors.madlyBGBlue, flex: 1 },
    padding: { paddingHorizontal: Colors.spacing * 2, },

    viewBox: {
        paddingHorizontal: Colors.spacing * 2,
        paddingVertical: Colors.spacing,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .2,
        elevation: 2,
        borderRadius: Colors.spacing * 2,
        backgroundColor: 'white',
        shadowColor: Colors.grayOne,
    }
})