import { Pressable, SafeAreaView, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';


import { Colors, isAndroid } from '../../assets/Colors'
import Header from '../../components/Header'
import Divider from '../../components/Divider';
import Icon from 'react-native-vector-icons/Ionicons';
import Filter from '../../components/Filter';
import Donut from '../../components/Donut';
import QuoteBanner from '../../components/QuoteBanner';
import ShowToast from '../../components/ShowToast';
import BookingsCard from './BookingsCard';
import { fetchAllBookings, fetchBookingByID, fetchDeleteJobBooking } from '../../config/BookingApi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookingFail, deleteBookingPending, deleteBookingSuccess, getAllBookingFail, getAllBookingPending, getAllBookingSuccess, getBookingbyIDFail, getBookingbyIDPending, getBookingbyIDSuccess } from '../../redux/bookingSlice';
import ViewBookingModal from './ViewBookingModal';
import { Swipeable } from 'react-native-gesture-handler';
import DeleteModal from '../../components/DeletetModal';
import Toast from 'react-native-toast-message';
import AddJob from '../Add/AddJob';
import AddNotes from '../../components/AddNotes';

const Bookings = ({ navigation }) => {
    const [data, setData] = useState([])
    const [filtersVisible, setFiltersVisible] = useState(false)
    const [pageCount, setPageCount] = useState(1);
    const [openBooking, setOpenBooking] = useState(false);
    const [editBooking, setEditBooking] = useState(false);
    const [addNotesVisible, setAddNotesVisible] = useState(false);
    const [deleteBooking, setDeleteBooking] = useState(false);
    const [markCompleteVisible, setMarkCompleteVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState()
    const [dateRange, setDateRange] = useState({ from: "", to: "" })

    const refreshLoading = useSelector((state: any) => state.bookingReducer.bookingLoading)
    const deleteLoading = useSelector((state: any) => state.bookingReducer.deleteLoading)

    const dispatch = useDispatch()

    const phoneNumber = [selectedBooking?.phone.slice(0, 4), " ", selectedBooking?.phone.slice(4, 7), " ", selectedBooking?.phone.
        slice(7)].join('')
    const price = [selectedBooking?.subtotal.toString().slice(0, 3), ".", selectedBooking?.subtotal.toString().slice(2)].join('')

    const swipeableOptions = [
        {
            id: '00',
            title: 'Mark as complete',
            icon: 'calendar-check',
            type: 'markComplete',
        },
        {
            id: '01',
            title: 'Edit booking details',
            icon: 'file-document-edit',
            type: 'editBooking',
        },
        {
            id: '02',
            title: 'Add notes',
            icon: 'text-box-plus',
            type: 'addNotes',
        },
        {
            id: '03',
            title: 'View/Send invoice',
            icon: 'file-pdf-box',
            type: 'viewPDF',
        },
        {
            id: '04',
            title: 'Delete',
            icon: 'trash-can',
            type: 'delete',
        },

    ]


    const getAllBookings = async (page: number) => {
        dispatch(getAllBookingPending())
        const x: any = await fetchAllBookings(page)
        if (x.data.status === "error") {
            return dispatch(getAllBookingFail(x.data.status));
        }
        dispatch(getAllBookingSuccess())
        pageCount <= 1 ? setData(x.data.paginatedResults) : setData([...data, ...x.data.paginatedResults])

    }



    const renderItem = (item: any, index) => {
        return (
            < BookingsCard editBookingHandler={editBookingHandler} selectedBooking={() => setSelectedBooking(item)} item={item} index={index} swipeableOptions={swipeableOptions} onPress={() => viewBookingHandler(item)} toggleDelete={() => setDeleteBooking(true)} toggleNotes={() => setAddNotesVisible(!addNotesVisible)} />

        )
    }


    const viewBookingHandler = async (item: any) => {
        let id = item._id
        setSelectedBooking(item)
        setOpenBooking(!openBooking)
        dispatch(getBookingbyIDPending())
        const x: any = await fetchBookingByID(id)
        if (x.data.status === "error") {
            return dispatch(getBookingbyIDFail(x.data.status));
        }
        dispatch(getBookingbyIDSuccess(x.data.result))
    }

    const editBookingHandler = async (item: any) => {
        let id = item._id
        setEditBooking(!editBooking)
        dispatch(getBookingbyIDPending())
        const x: any = await fetchBookingByID(id)
        if (x.data.status === "error") {
            return dispatch(getBookingbyIDFail(x.data.status));
        }
        dispatch(getBookingbyIDSuccess(x.data.result))
    }

    const toggleFilter = () => {
        setFiltersVisible(!filtersVisible)
    }



    const deleteBookingHandler = async (id: any) => {
        dispatch(deleteBookingPending())
        const x: any = await fetchDeleteJobBooking(id)
        if (x.data.status === "error") {
            return dispatch(deleteBookingFail());
        }
        dispatch(deleteBookingSuccess())
        getAllBookings(1)
        setDeleteBooking(false);
        Toast.show({
            type: 'deleteToast',
            visibilityTime: 3000,
            text1: `${selectedBooking?.bookingReference}`,
            props: { message: 'Deleted Successfully' }
        });
        setPageCount(1)
    }

    useEffect(() => {
        getAllBookings(pageCount)
    }, [pageCount])

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />

                <Header nav={navigation} title="Bookings" route="booking" />

                <View style={{ paddingHorizontal: Colors.spacing * 2, marginTop: Colors.spacing * 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '35%', }}>
                        <Donut lable={"Total Bookings"} percentage={80} max={200} radius={40} />
                    </View>
                    <View style={{ width: '60%' }}>
                        <QuoteBanner />
                    </View>
                </View>

                <Filter dateRange={dateRange} title={"Filter jobs"} isOpen={filtersVisible} onPress={toggleFilter} setDateRange={setDateRange} />

                <Text style={{ color: 'red' }}>{"pageCount" + pageCount}</Text>

                <View style={{ flex: 1, }}>
                    <FlatList
                        data={data}
                        onEndReached={() => setPageCount(pageCount + 1)}
                        refreshing={refreshLoading}
                        onRefresh={() => { getAllBookings(1); setPageCount(1) }}
                        onEndReachedThreshold={.5}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Colors.spacing }}
                        keyExtractor={item => item._id}
                        renderItem={({ item, index }) => renderItem(item, index)}
                    />
                </View>
            </View>

            <ViewBookingModal isOpen={openBooking} onClose={() => { setOpenBooking(false); getAllBookings(1) }} id={selectedBooking?._id} refresh={() => getAllBookings(1)} deleteHandler={deleteBookingHandler} />

            <DeleteModal loading={deleteLoading} id={selectedBooking?._id} phone={phoneNumber} price={price} animation="slide" quoteReference={selectedBooking?.bookingReference} customerName={selectedBooking?.firstName + " " + selectedBooking?.lastName} title="Delete Job" onClose={() => setDeleteBooking(false)} isOpen={deleteBooking} onPress={deleteBookingHandler} />
            <AddJob isOpen={editBooking} onClose={() => setEditBooking(false)} lable={"Edit Booking"} id={selectedBooking?._id} />

            <AddNotes id={selectedBooking?._id} reference={selectedBooking?.bookingReference} animation="slide" title="Add notes" onClose={() => setAddNotesVisible(false)} isOpen={addNotesVisible} />

            <ShowToast />
        </>
    )
}

export default Bookings

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.madlyBGBlue, },

}) 