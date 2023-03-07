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
import { fetchAllBookings, fetchBookingByID, fetchBookingCount, fetchDeleteJobBooking, fetchFilteredBookings } from '../../config/BookingApi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookingFail, deleteBookingPending, deleteBookingSuccess, filterBookingFail, filterBookingPending, filterBookingSuccess, getAllBookingFail, getAllBookingPending, getAllBookingSuccess, getBookingbyIDFail, getBookingbyIDPending, getBookingbyIDSuccess } from '../../redux/bookingSlice';
import ViewBookingModal from './ViewBookingModal';
import { Swipeable } from 'react-native-gesture-handler';
import DeleteModal from '../../components/DeletetModal';
import Toast from 'react-native-toast-message';
import AddJob from '../Add/AddJob';
import AddNotes from '../../components/AddNotes';
import { addNoteFail, addNotePending, addNoteSuccess } from '../../redux/noteSlice';
import { AddSystemNote } from '../../config/NoteApi';
import uuid from 'react-uuid';
import AddPayment from '../../components/AddPayment';
import { quoteStatusFail, quoteStatusPending, quoteStatusSuccess } from '../../redux/jobSlice';
import { fetchStatusUpdate } from '../../config/JobApi';
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
        title: 'Mark as paid',
        icon: 'currency-usd',
        type: 'addPayment',
    },
    {
        id: '04',
        title: 'Delete',
        icon: 'trash-can',
        type: 'delete',
    },
]


const Bookings = ({ navigation }: any) => {
    const [data, setData] = useState<any>([])
    const [filtersVisible, setFiltersVisible] = useState(false)
    const [filterBY, setFilterBY] = useState("")
    const [filterType, setFilterType] = useState("")
    const [filteredData, setFilteredData] = useState<any>([])
    const [pageCount, setPageCount] = useState(1);
    const [openBooking, setOpenBooking] = useState(false);
    const [editBooking, setEditBooking] = useState(false);
    const [addNotesVisible, setAddNotesVisible] = useState(false);
    const [addPaymentsVisible, setAddaddPaymentsVisible] = useState(false);
    const [deleteBooking, setDeleteBooking] = useState(false);
    const [deleteBookingSlider, setDeleteBookingSlider] = useState(false);
    const [selectedBookingID, setSelectedBookingID] = useState(String)
    const [selectedBooking, setSelectedBooking] = useState<any>()
    const [dateRange, setDateRange] = useState({ from: "", to: "" })
    const [nextPage, setNextPage] = useState<any>();
    const [pieCount, setPieCount] = useState<any>();
    const [flatlistRef, setFlatlistRef] = useState<any>();
    const user = useSelector((state: any) => state.userReducer.data)
    const refreshLoading = useSelector((state: any) => state.bookingReducer.bookingLoading)
    const deleteLoading = useSelector((state: any) => state.bookingReducer.deleteLoading)
    const notesLoading = useSelector((state: any) => state.noteReducer.loading)

    const dispatch = useDispatch()
    const phoneNumber = [selectedBooking?.phone?.slice(0, 4), " ", selectedBooking?.phone?.slice(4, 7), " ", selectedBooking?.phone?.
        slice(7)].join('')
    const price = [selectedBooking?.subtotal?.toString().slice(0, 3), ".", selectedBooking?.subtotal?.toString().slice(2)].join('')

    const max = pieCount < 50 ? 50 : pieCount < 100 ? 100 : pieCount > 100 ? 150 : pieCount > 200 ? 300 : pieCount > 300 ? 400 : pieCount > 400 ? 500 : 1000

    const getBookingCounts = async () => {
        const x: any = await fetchBookingCount()
        if (x.data.status === 'success') {
            setPieCount(parseInt(x.data.result))
        }
    }

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

    const viewBookingHandler = async (id: any) => {
        setSelectedBookingID(id);
        setOpenBooking(true)
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

    const addPaymentHandler = async () => {
        const x: any = await fetchBookingByID(selectedBooking?._id)

        if (x.data.status === "success") {
            console.log("addPaymentHandler wwww", x.data.result[0].totals)
        }

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

    const addNotesHandler = async (text: string) => {
        let id = selectedBooking._id
        dispatch(addNotePending())
        const x: any = await fetchBookingByID(id)
        const previousNote = x.data.result[0].notes
        const newNote = {
            id: uuid(), by: `${user.firstName} ${user.lastName}`, addedDate: new Date(), text: text
        }
        const res: any = await AddSystemNote(id, previousNote, newNote)
        console.log("res notes", id)
        if (res.status === "error") {
            return dispatch(addNoteFail());
        }
        dispatch(addNoteSuccess())
        getAllBookings()
        setAddNotesVisible(false)
        Toast.show({
            type: 'successToast',
            visibilityTime: 3000,
            text1: `${selectedBooking?.bookingReference} `,
            props: { message: 'Booking note added successfully' }
        });
    }


    const statusHandler = async () => {
        let id = selectedBooking._id
        let data = { bookingStatus: "Completed" }
        let lable = "booking"
        dispatch(quoteStatusPending())
        const x: any = await fetchStatusUpdate(id, data, lable)
        if (x.data.status === "error") {
            return dispatch(quoteStatusFail());
        }
        dispatch(quoteStatusSuccess())
        getAllBookings()
    }


    const filterHandler = async () => {
        setPageCount(1)
        dispatch(filterBookingPending())
        const x: any = await fetchFilteredBookings(pageCount, filterType, filterBY, dateRange)
        if (x.data.status === "error") {
            return dispatch(filterBookingFail(x.data.status));
        }
        dispatch(filterBookingSuccess())
        setData(x.data.paginatedResults)
        setFiltersVisible(false)
        setNextPage(x.data.next.page)
        pageCount <= 1 ? setFilteredData(x.data.paginatedResults) : setFilteredData([...data, ...x.data.paginatedResults])
    }

    const renderItem = (item: any, index: any) => {
        return (
            < BookingsCard statusHandler={statusHandler} addPaymentHandler={() => setAddaddPaymentsVisible(true)} editBookingHandler={editBookingHandler} selectedBooking={() => setSelectedBooking(item)} item={item} index={index} swipeableOptions={swipeableOptions} onPress={() => viewBookingHandler(item._id)} toggleDelete={() => setDeleteBookingSlider(!deleteBookingSlider)} toggleNotes={() => setAddNotesVisible(!addNotesVisible)} />
        )
    }

    useEffect(() => {
        getBookingCounts()
    }, [pieCount])

    useEffect(() => {
        filteredData.length > 0 ? filterHandler() : getAllBookings()
    }, [pageCount])

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />
                <Header nav={navigation} title="Bookings" route="booking" />


                <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                    <View style={{ marginVertical: Colors.spacing * 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ width: '35%', }}>
                            <Donut lable={"Total Bookings"} percentage={pieCount} max={max} radius={40} color={Colors.madidlyThemeBlue} />
                        </View>
                        <View style={{ width: '60%' }}>
                            <QuoteBanner count={pieCount} />
                        </View>
                    </View>
                </View>

                <Filter setPageCount={setPageCount} dateRange={dateRange} filter={filterBY} title={"Filter Bookings"} isOpen={filtersVisible} onClose={() => { setFiltersVisible(!filtersVisible), setFilterBY(""), setDateRange({ from: "", to: "" }) }} onPress={filterHandler} setDateRange={setDateRange} setFilter={setFilterBY} onClear={() => { setFilteredData([]), setPageCount(1), getAllBookings(), flatlistRef.scrollToOffset({ y: 0, animated: true }), setFilterBY(""), setDateRange({ from: "", to: "" }), setFilterType("") }} filterType={filterType} setFilterType={setFilterType} />



                <View style={{ flex: 1, }}>
                    <FlatList
                        ref={(ref) => setFlatlistRef(ref)}
                        data={filteredData.length === 0 ? data : filteredData}
                        onEndReached={() => { nextPage > 0 && setPageCount(pageCount + 1) }}
                        refreshing={refreshLoading}
                        onRefresh={() => { setPageCount(1); getAllBookings() }}
                        onEndReachedThreshold={.5}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Colors.spacing }}
                        keyExtractor={item => item._id}
                        renderItem={({ item, index }) => renderItem(item, index)}
                    />
                </View>

            </View>

            <ViewBookingModal isOpen={openBooking} onClose={() => { setOpenBooking(false), setPageCount(1) }} id={selectedBookingID} refresh={viewBookingHandler} deleteHandler={deleteBookingHandler} deleteOpen={deleteBooking} toggleDelete={() => setDeleteBooking(!deleteBooking)} />

            <DeleteModal loading={deleteLoading} id={selectedBooking?._id} phone={phoneNumber} price={price} animation="slide" quoteReference={selectedBooking?.bookingReference} customerName={selectedBooking?.firstName + " " + selectedBooking?.lastName} title="Delete Job" onClose={() => setDeleteBookingSlider(false)} isOpen={deleteBookingSlider} onPress={deleteBookingHandler} />

            <AddJob refresh={getAllBookings} isOpen={editBooking} onPress={editBookingHandler} onClose={() => setEditBooking(false)} lable={"Edit Booking"} id={selectedBookingID} />

            <AddNotes loading={notesLoading} id={selectedBooking?.bookingReference} reference={selectedBooking?.bookingReference} animation="slide" title="Add notes" onClose={() => setAddNotesVisible(false)} isOpen={addNotesVisible} onPress={addNotesHandler} />

            <AddPayment id={selectedBooking?._id} customerName={selectedBooking?.firstName + " " + selectedBooking?.lastName} quoteReference={selectedBooking?.bookingReference} title="Add payment" isOpen={addPaymentsVisible} onClose={() => setAddaddPaymentsVisible(false)} price={price} onPress={addPaymentHandler} />
            <ShowToast />
        </>
    )
}

export default Bookings

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.madlyBGBlue, },

}) 