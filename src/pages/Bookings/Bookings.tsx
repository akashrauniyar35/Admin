import { Pressable, SafeAreaView, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { Colors, isAndroid } from '../../assets/Colors'
import Header from '../../components/Header'
import Divider from '../../components/Divider';
import Icon from 'react-native-vector-icons/Ionicons';
import Filter from '../../components/Filter';
import Donut from '../../components/Donut';
import QuoteBanner from '../../components/QuoteBanner';
import ShowToast from '../../components/ShowToast';
import BookingsCard from './BookingsCard';
import { fetchAllBookings, fetchBookingByID, fetchDeleteJobBooking, fetchFilteredBookings } from '../../config/BookingApi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookingFail, deleteBookingPending, deleteBookingSuccess, filterBookingFail, filterBookingPending, filterBookingSuccess, getAllBookingFail, getAllBookingPending, getAllBookingSuccess, getBookingbyIDFail, getBookingbyIDPending, getBookingbyIDSuccess } from '../../redux/bookingSlice';
import ViewBookingModal from './ViewBookingModal';
import { Swipeable } from 'react-native-gesture-handler';
import DeleteModal from '../../components/DeletetModal';
import Toast from 'react-native-toast-message';
import AddJob from '../Add/AddJob';
import AddNotes from '../../components/AddNotes';

const Bookings = ({ navigation }) => {
    const [data, setData] = useState([])
    const [filtersVisible, setFiltersVisible] = useState(false)
    const [filterBY, setFilterBY] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [pageCount, setPageCount] = useState(1);
    const [openBooking, setOpenBooking] = useState(false);
    const [editBooking, setEditBooking] = useState(false);
    const [addNotesVisible, setAddNotesVisible] = useState(false);
    const [deleteBooking, setDeleteBooking] = useState(false);
    const [deleteBookingSlider, setDeleteBookingSlider] = useState(false);
    const [markCompleteVisible, setMarkCompleteVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState()
    const [dateRange, setDateRange] = useState({ from: "", to: "" })
    const [nextPage, setNextPage] = useState();

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


    const getAllBookings = async () => {
        dispatch(getAllBookingPending())
        const x: any = await fetchAllBookings(pageCount)
        if (x.data.status === "error") {
            return dispatch(getAllBookingFail(x.data.status));
        }
        dispatch(getAllBookingSuccess())
        setNextPage(x.data.next.page)
        pageCount <= 1 ? setData(x.data.paginatedResults) : setData([...data, ...x.data.paginatedResults])
    }

    const renderItem = (item: any, index) => {
        return (
            < BookingsCard editBookingHandler={editBookingHandler} selectedBooking={() => setSelectedBooking(item)} item={item} index={index} swipeableOptions={swipeableOptions} onPress={() => viewBookingHandler(item)} toggleDelete={() => setDeleteBookingSlider(!deleteBookingSlider)} toggleNotes={() => setAddNotesVisible(!addNotesVisible)} />
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


    const deleteBookingHandler = async (id: any) => {
        dispatch(deleteBookingPending())
        const x: any = await fetchDeleteJobBooking(id)
        if (x.data.status === "error") {
            return dispatch(deleteBookingFail());
        }
        dispatch(deleteBookingSuccess())
        setDeleteBooking(false);
        setDeleteBookingSlider(false)
        getAllBookings()
        setOpenBooking(false)
        Toast.show({
            type: 'deleteToast',
            visibilityTime: 3000,
            text1: `${selectedBooking?.bookingReference}`,
            props: { message: 'Deleted Successfully' }
        });
        setPageCount(1)
    }

    const filterHandler = async () => {
        setPageCount(1)
        dispatch(filterBookingPending())
        const x: any = await fetchFilteredBookings(pageCount, filterBY)
        if (x.data.status === "error") {
            return dispatch(filterBookingFail(x.data.status));
        }
        dispatch(filterBookingSuccess())
        setData(x.data.paginatedResults)
        setFiltersVisible(false)
        setNextPage(x.data.next.page)
        pageCount <= 1 ? setFilteredData(x.data.paginatedResults) : setFilteredData([...data, ...x.data.paginatedResults])
    }

    useEffect(() => {
        filteredData.length > 0 ? filterHandler() : getAllBookings()
    }, [pageCount])

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />

                <Header nav={navigation} title="Bookings" route="booking" />

                <View style={{ paddingHorizontal: Colors.spacing * 2, marginTop: Colors.spacing * 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '35%', }}>
                        <Donut lable={"Total Bookings"} percentage={80} max={400} radius={40} color={Colors.madidlyThemeBlue} />
                    </View>
                    <View style={{ width: '60%' }}>
                        <QuoteBanner />
                    </View>
                </View>

                <Filter setPageCount={setPageCount} dateRange={dateRange} title={"Filter jobs"} isOpen={filtersVisible} onClose={() => setFiltersVisible(!filtersVisible)} onPress={filterHandler} setDateRange={setDateRange} setFilter={setFilterBY} onClear={() => { setFilteredData([]); setPageCount(1) }} />

                <Text style={{ color: 'red', fontSize: 14, fontWeight: isAndroid ? "900" : "700", }}>{"pagecount -" + pageCount + " - next -" + nextPage + " Bdata " + data.length}</Text>
                <Text style={{ color: 'red', fontSize: 14, fontWeight: isAndroid ? "900" : "700", }}>{"pagecount -" + pageCount + " - next -" + nextPage + " Fildata " + filteredData.length}</Text>


                <View style={{ flex: 1, }}>
                    <FlatList
                        data={filteredData.length === 0 ? data : filteredData}
                        onEndReached={() => { nextPage > 0 && setPageCount(pageCount + 1) }}
                        refreshing={refreshLoading}
                        onRefresh={() => { setPageCount(1) }}
                        onEndReachedThreshold={.5}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Colors.spacing }}
                        keyExtractor={item => item._id}
                        renderItem={({ item, index }) => renderItem(item, index)}
                    />
                </View>

                {/* <View style={{ flex: 1, }}>
                    <FlatList
                        data={filteredData.length === 0 ? data : filteredData}
                        onEndReached={() => { nextPage > 0 && setPageCount(pageCount + 1) }}
                        refreshing={refreshLoading}
                        onRefresh={() => { setPageCount(1); getAllBookings(1) }}
                        onEndReachedThreshold={.5}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Colors.spacing }}
                        keyExtractor={item => item._id}
                        renderItem={({ item, index }) => renderItem(item, index)}
                    />
                </View> */}


            </View>

            <ViewBookingModal isOpen={openBooking} onClose={() => { setOpenBooking(false); setPageCount(1) }} id={selectedBooking?._id} refresh={() => setPageCount(1)} deleteHandler={deleteBookingHandler} deleteOpen={deleteBooking} toggleDelete={() => setDeleteBooking(!deleteBooking)} />

            <DeleteModal loading={deleteLoading} id={selectedBooking?._id} phone={phoneNumber} price={price} animation="slide" quoteReference={selectedBooking?.bookingReference} customerName={selectedBooking?.firstName + " " + selectedBooking?.lastName} title="Delete Job" onClose={() => setDeleteBookingSlider(false)} isOpen={deleteBookingSlider} onPress={deleteBookingHandler} />
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