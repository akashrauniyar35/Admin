import { Dimensions, FlatList, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, HEIGHT, WIDTH } from '../assets/Colors';
import SelectTechnicianCard from './SelectionCard';
import PeriodSelector from './PeriodSelector';
import StatusCard from './Sc';
import SelectionCard from './SelectionCard';
import SearchJobCard from './SearchJobCard';
import SearchCustomerCard from './SearchCustomerCard';
import { G } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { confirmBookingFail, confirmBookingSuccess, searchJobFail, searchJobPending, searchJobuccess, viewJobFail, viewJobPending, viewJobSuccess, confirmBookingPending, deleteJobPending, deleteJobFail, deleteJobSuccess } from '../redux/jobSlice';
import { fetchConfirmBooking, fetchDeleteJob, fetchJobByID, fetchQuoteSearch } from '../config/JobApi';
import ViewJobModal from '../pages/Jobs/ViewJobModal';
import ViewBookingModal from '../pages/Bookings/ViewBookingModal';
import { deleteBookingFail, deleteBookingPending, deleteBookingSuccess, getBookingbyIDFail, getBookingbyIDPending, getBookingbyIDSuccess, } from '../redux/bookingSlice';
import { fetchBookingByID, fetchDeleteJobBooking } from '../config/BookingApi';
import Toast from 'react-native-toast-message';
import ShowToast from './ShowToast';
import ConfirmBookingModal from './ConfirmBookingModal';
const isAndroid = Platform.OS == 'android' ? true : false
const { width, height } = Dimensions.get('screen')




const SearchModal = ({ onClose, isOpen, search, route }: any) => {
    const [searchValue, setSearchValue] = useState(String)
    const [selected, setSelected] = useState({ id: "", ref: "" })
    const [isVisible, setIsVisible] = useState(false)
    const [deleteBooking, setDeleteBooking] = useState(false)
    const [deleteQuote, setDeleteQuote] = useState(false)
    const [confirmBookingVisible, setConfirmBookingVisible] = useState(false)
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const p = route === "quote" ? "quote" : "booking"

    const quoteSearchRequest = async () => {
        const p = route === "quote" ? "quote" : "booking"

        const x: any = await fetchQuoteSearch(p, searchValue)
        if (x.data.status === "error") {
            return dispatch(searchJobFail(x.data.status));
        }
        setData(x.data.paginatedResults)
        dispatch(searchJobuccess())
    }

    const openJobHandler = async (id: string, ref: string) => {
        const jobID: any = id
        setSelected({ id: id, ref: ref })
        setIsVisible(true)
        if (route === "quote") {
            dispatch(viewJobPending(jobID))
            const x: any = await fetchJobByID(jobID);
            console.log('response quote id', x)
            if (x.data.status === "error") {
                dispatch(viewJobFail(x.data.status))
            }
            dispatch(viewJobSuccess(x.data.result));
        } else {
            dispatch(getBookingbyIDPending())
            const x: any = await fetchBookingByID(id)
            if (x.data.status === "error") {
                return dispatch(getBookingbyIDFail(x.data.status));
            }
            dispatch(getBookingbyIDSuccess(x.data.result))
        }

    }


    const deleteBookingHandler = async () => {
        dispatch(deleteBookingPending())
        const x: any = await fetchDeleteJobBooking(selected.id)
        if (x.data.status === "error") {
            return dispatch(deleteBookingFail());
        }
        dispatch(deleteBookingSuccess())
        setDeleteBooking(false);
        setIsVisible(false)
        setSearchValue("")
        Toast.show({
            type: 'deleteToast',
            visibilityTime: 3000,
            text1: `${selected.ref}`,
            props: { message: 'Deleted Successfully' }
        });
    }

    const deleteQuoteHandler = async () => {
        dispatch(deleteJobPending())
        const x: any = await fetchDeleteJob(selected.id)
        if (x.data.status === "error") {
            return dispatch(deleteJobFail());
        }
        dispatch(deleteJobSuccess())
        setDeleteQuote(false);
        setIsVisible(false)
        setSearchValue("")
        Toast.show({
            type: 'deleteToast',
            visibilityTime: 3000,
            text1: `${selected.ref}`,
            props: { message: 'Deleted Successfully' }
        });
    }


    const confirmBookingVisibleHandler = async () => {
        dispatch(confirmBookingPending());

        const x: any = await fetchConfirmBooking(selected.id);
        if (x.data.status === "error") {
            return dispatch(confirmBookingFail(x.data.status));
        }
        dispatch(confirmBookingSuccess())
        setConfirmBookingVisible(false)
        setIsVisible(false)
        Toast.show({
            type: 'successToast',
            visibilityTime: 3000,
            text1: `${selected.ref}`,
            props: { message: 'Booking Confirmed Successfully' }
        });
    }

    useEffect(() => {
        quoteSearchRequest()
    }, [searchValue])

    return (
        <>
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

                            <View style={[styles.box, { justifyContent: 'space-between', width: '90%' }]}>
                                <Icon name="search" color={Colors.maidlyGrayText} size={20} style={{ marginLeft: Colors.spacing, }} />

                                <TextInput
                                    autoCapitalize="none"
                                    value={searchValue}
                                    onChangeText={setSearchValue}
                                    placeholderTextColor={Colors.maidlyGrayText}
                                    placeholder={searchValue ? searchValue : "Type here to search"}
                                    style={[styles.searchBox, {
                                        width: isAndroid ? "80%" : '75%',
                                        paddingVertical: isAndroid ? Colors.spacing * .7 : Colors.spacing * 1, color: Colors.maidlyGrayText
                                    }]}
                                />
                                <Pressable onPress={() => setSearchValue("")}>
                                    <Icon name="close-circle" color={Colors.maidlyGrayText} size={20} style={{ marginRight: Colors.spacing, }} />
                                </Pressable>

                            </View>


                            <Pressable onPress={() => { onClose(); setSearchValue("") }} style={{ marginLeft: Colors.spacing, }}>
                                <Text style={{ fontSize: 10, fontWeight: isAndroid ? "600" : "300", color: Colors.maidlyGrayText, paddingVertical: Colors.spacing, paddingRight: Colors.spacing, }}>Cancle</Text>
                            </Pressable>

                        </View>




                        <View style={styles.container}>

                            <View style={{}}>
                                <Text style={{ fontSize: 16, fontWeight: isAndroid ? "900" : "600", color: Colors.maidlyGrayText, marginBottom: Colors.spacing * 2 }}>{p.charAt(0).toUpperCase() + p.slice(1) + 's'}</Text>
                            </View>

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={true}
                                contentContainerStyle={{ paddingBottom: Colors.spacing * 10 }}
                                ItemSeparatorComponent={() =>
                                    <View style={{ width: '100%', marginVertical: Colors.spacing * 2, borderBottomWidth: .35, borderColor: Colors.maidlyGrayText }} />
                                }
                                data={data} keyExtractor={item => item.id}
                                renderItem={({ item }) =>
                                    <SearchJobCard onPress={() => openJobHandler(item._id, route === "quote" ? item.quoteReference : item.bookingReference)} key={item._id} jobNumber={route === "quote" ? item.quoteReference : item.bookingReference} customerName={item.firstName + " " + item.lastName} subTotal={item.subtotal} />
                                } />
                        </View>
                    </View>
                </View>

                {
                    route === "quote" ?
                        <ViewJobModal refresh={openJobHandler} isOpen={isVisible} onClose={() => setIsVisible(false)} id={selected.id} deletOpen={deleteQuote} toggleDelete={() => setDeleteQuote(!deleteQuote)} deleteHandler={deleteQuoteHandler} confirmOpen={confirmBookingVisible} toggleConfirm={() => setConfirmBookingVisible(!confirmBookingVisible)} confirmHandler={confirmBookingVisibleHandler} />
                        :
                        <ViewBookingModal refresh={openJobHandler} isOpen={isVisible} onClose={() => setIsVisible(false)} id={selected.id} deleteHandler={deleteBookingHandler} deleteOpen={deleteBooking} toggleDelete={() => setDeleteBooking(!deleteBooking)} />
                }
                <ShowToast />
            </Modal >
        </>






    )
}

export default SearchModal

const styles = StyleSheet.create({


    container: {
        padding: Colors.spacing * 2,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.grayBG,
        borderRadius: Colors.spacing * .5,

    },
    searchBox: { fontWeight: isAndroid ? "900" : "600", fontSize: 16, },
    customerTable: {
        marginBottom: Colors.spacing * 2,
        flexDirection: 'row', justifyContent: 'space-between', fontSize: 14,
        borderBottomWidth: .35, borderColor: Colors.maidlyGrayText, paddingBottom: Colors.spacing * 1
    }
})