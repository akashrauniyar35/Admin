import { View, Text, StyleSheet, Platform, Dimensions, Pressable, Animated, ActivityIndicator, Linking } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors, isAndroid, WIDTH } from '../assets/Colors';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import ViewJobModal from '../pages/Jobs/ViewJobModal';
import { useSelector, useDispatch } from 'react-redux'

import { confirmBookingFail, confirmBookingPending, confirmBookingSuccess, deleteJobFail, deleteJobPending, deleteJobSuccess, viewJobFail, viewJobPending, viewJobSuccess } from '../redux/jobSlice';

import { fetchConfirmBooking, fetchDeleteJob, fetchJobByID } from '../config/JobApi';
import Toast from 'react-native-toast-message';
import { Swipeable, } from 'react-native-gesture-handler';
import AddJob from '../pages/Add/AddJob';
import AddNotes from './AddNotes';

import DeleteModal from './DeletetModal';
import ConfirmBookingModal from './ConfirmBookingModal';


const JobCard = ({ item, index, refresh, setPageCount }: any) => {


    console.log("item item", item)

    const [isOpen, setIsOpen] = useState(false);
    const [editJobVisible, setEditJobVisible] = useState(false);
    const [addNotesVisible, setAddNotesVisible] = useState(false);
    const [deleteJob, setDeleteJob] = useState(false);
    const [deleteJobInternal, setDeleteJobInternal] = useState(false);
    const [confirmBookingVisible, setConfirmBookingVisible] = useState(false);
    const [confirmBookingInternalVisible, setConfirmBookingInternalVisible] = useState(false);
    const swipeableRef = useRef<Swipeable | null>(null);
    const [jobId, setJobId] = useState(String)
    let loading = useSelector((state: any) => state.jobReducer.deleteLoading)

    const street = item.address2.split(" ")
    const streetOne = item.address1.split(" ")

    let newState = item.state.toLowerCase().substring(0, 1) === "q" ? "QLD" : item.state.toLowerCase().substring(0, 1) === "v" ? "VIC" : item.state.toLowerCase().substring(0, 1) === "t" ? "TAS" : item.state.toLowerCase().substring(0, 1) === "w" ? "WA" : item.state.toLowerCase().substring(0, 1) === "s" ? "SA" : item.state.toLowerCase().substring(0, 1) === "s" ? "SA" : "NSW"


    const dispatch = useDispatch()
    const phoneNumber = [item.phone.slice(0, 4), " ", item.phone.slice(4, 7), " ", item.phone.
        slice(7)].join('')

    const price = [item.subtotal.toString().slice(0, 3), ".", item.subtotal.toString().slice(2)].join('')
    const bookingDate = new Date(item.createdAt)


    const openJobHandler = async () => {
        const jobID = item._id
        dispatch(viewJobPending(jobID))
        // setIsOpen(!isOpen)

        const x: any = await fetchJobByID(jobID);
        console.log('response quote id', x)
        if (x.data.status === "error") {
            dispatch(viewJobFail(x.data.status))
        }
        dispatch(viewJobSuccess(x.data.result));
    }

    const closeJobHandler = () => {
        setPageCount(1)
        setIsOpen(!isOpen)
        refresh()
    }

    const editJobHandler = async () => {
        const jobID = item._id
        dispatch(viewJobPending(jobID))
        setEditJobVisible(!editJobVisible)
        const x: any = await fetchJobByID(jobID);
        if (x.data.status === "error") {
            dispatch(viewJobFail(x.data.status))
        }
        dispatch(viewJobSuccess(x.data.result));
    }


    const swipeableOptions = [
        {
            id: '00',
            title: 'Convert to booking',
            icon: 'calendar-check',
            type: 'confirmBooking',
        },
        {
            id: '01',
            title: 'Edit job details',
            icon: 'file-document-edit',
            type: 'editJob',
        },
        {
            id: '04',
            title: 'Delete',
            icon: 'trash-can',
            type: 'delete',
        },

    ]


    const leftSwipe = (progress: any, dragX: any) => {

        const lastIndex = swipeableOptions.length - 1
        const lastItemID = swipeableOptions[lastIndex].id
        const scale = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
            extrapolate: 'clamp'
        });
        return (
            <View style={[styles.leftContainer, {}]} >
                {swipeableOptions.map((item) => {
                    return (
                        <>
                            <Pressable
                                onPress={() => onSwipeablePress(item.type)} key={item.id} style={[styles.leftCard, { borderBottomWidth: item.id === lastItemID ? 0 : .35, borderColor: 'white' }]}>
                                <Animated.View style={{ transform: [{ scale: scale }], flexDirection: 'row', alignItems: 'center', paddingHorizontal: Colors.spacing * 2, justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: "Outfit-Medium", fontSize: 12, color: 'white' }}>{item.title}</Text>
                                    <IconM name={item.icon} size={18} color="white" />
                                </Animated.View>
                            </Pressable>
                            {item.id === lastItemID ? null : <View style={{ height: .35, width: '100%', backgroundColor: "#fff", }} />}
                        </>
                    )
                })
                }


            </View >
        )
    }

    const onSwipeablePress = (value) => {
        console.log(value)
        if (value === "editJob") {
            setEditJobVisible(true)
            editJobHandler()
        }
        if (value === "delete") {
            setDeleteJob(true)
        }
        if (value === "confirmBooking") {
            setConfirmBookingVisible(true);
        }

        if (swipeableRef.current) {
            swipeableRef.current.close();
        }
    }


    const swipeableOpen = () => {
        if (swipeableRef.current) {
            swipeableRef.current.openLeft()
        }
    }

    const deleteJobHandler = async () => {
        let id = item._id
        dispatch(deleteJobPending())

        const x: any = await fetchDeleteJob(id)
        if (x.data.status === "error") {
            return dispatch(deleteJobFail(x.data.status));
        }
        // setData(x.data.paginatedResults)
        dispatch(deleteJobSuccess(id))
        refresh()
        setDeleteJob(false)
        setDeleteJobInternal(false)
        setIsOpen(false)
        Toast.show({
            type: 'deleteToast',
            visibilityTime: 3000,
            text1: `${item.quoteReference}`,
            props: { message: 'Deleted Successfully' }
        });
    }

    const confirmBookingVisibleHandler = async () => {
        let id = item._id;
        dispatch(confirmBookingPending());
        const x: any = await fetchConfirmBooking(id);
        if (x.data.status === "error") {
            return dispatch(confirmBookingFail(x.data.status));
        }
        dispatch(confirmBookingSuccess(id))
        refresh();
        setConfirmBookingVisible(false);
        setConfirmBookingInternalVisible(false)
        setIsOpen(false)
        Toast.show({
            type: 'successToast',
            visibilityTime: 3000,
            text1: `${item.quoteReference}`,
            props: { message: 'Booking Confirmed Successfully' }
        });
    }

    return (
        <>
            <Swipeable renderLeftActions={leftSwipe} ref={swipeableRef}
                friction={1}
            >
                <Pressable onPress={() => { openJobHandler(), setIsOpen(true) }}>
                    <View style={[styles.container, { backgroundColor: index % 2 === 0 ? 'white' : "transparent", elevation: index % 2 === 0 ? 0 : 1 },]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                            <View style={{}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 20, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Bold', }}>#{item.quoteReference}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing * .5 }}>
                                    <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium' }}>{bookingDate.toDateString()}</Text>
                                    <View style={{ backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, marginHorizontal: Colors.spacing * .5, borderRadius: 100, }} />
                                    <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium' }}>$ {price}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <View style={{ backgroundColor: item.quoteStatus.toLowerCase() === "in progress" ? Colors.orangeBG : item.quoteStatus.toLowerCase() === "completed" ? Colors.paidBG : item.quoteStatus.toLowerCase() === "cancelled" ? Colors.redBG : Colors.orangeBG, padding: Colors.spacing * .55, borderRadius: Colors.spacing, marginRight: Colors.spacing, width: Colors.spacing * 7, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 9, color: item.quoteStatus.toLowerCase() === "in progress" ? Colors.orange : item.quoteStatus.toLowerCase() === "completed" ? Colors.green : item.quoteStatus.toLowerCase() === "cancelled" ? Colors.red : Colors.orange, fontFamily: 'Outfit-ExtraBold', }}>{item.quoteStatus}</Text>
                                </View>
                                <Pressable onPress={swipeableOpen}>
                                    <IconM name="dots-horizontal" size={28} color={Colors.maidlyGrayText} />
                                </Pressable>
                            </View>
                        </View>

                        <View style={{ width: '100%', marginVertical: Colors.spacing * 2, borderBottomWidth: .35, borderColor: Colors.borderColor, }} />

                        <View style={{}}>

                            <Text style={{ fontSize: 16, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Medium' }}>{item.firstName} {item.lastName}</Text>

                            <View style={{ marginTop: Colors.spacing * .5, marginBottom: Colors.spacing * .5 }}>


                                <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium' }}>
                                    {streetOne[0] ? <Text>{streetOne[0]} </Text> : null}
                                    {streetOne[1] ? <Text>{streetOne[1]?.slice(0, 1).toUpperCase() + streetOne[1]?.slice(1)} </Text> : null}
                                    {streetOne[2] ? <Text>{streetOne[2]?.slice(0, 1).toUpperCase() + streetOne[2]?.slice(1)} </Text> : null}
                                    {streetOne[3] ? <Text>{streetOne[3]?.slice(0, 1).toUpperCase() + streetOne[3]?.slice(1)} </Text> : null}

                                    {item.address2 !== "" ? <Text>{street[0] ? street[0]?.slice(0, 1).toUpperCase() + street[0]?.slice(1) : null} {street[1] ? street[1]?.slice(0, 1).toUpperCase() + street[1]?.slice(1) : null} {street[2] ? street[2]?.slice(0, 1).toUpperCase() + street[2]?.slice(1) : null} </Text> : ""}
                                    {"\n"}
                                    {item.city !== "" ? <Text>{item.city.toUpperCase()} </Text> : ""}
                                    {item.postcode !== "" ? <Text>{item.postcode.toUpperCase()} </Text> : ""}
                                    {item.state !== "" ? <Text>{item.state.toUpperCase()} </Text> : ""}
                                </Text>
                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Pressable onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
                                    <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium' }}>{phoneNumber}</Text>
                                </Pressable>
                                <View style={{ backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, marginHorizontal: Colors.spacing * .5, borderRadius: 100, }} />
                                <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium' }}>{item.email}</Text>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </Swipeable>

            <ViewJobModal refresh={openJobHandler} isOpen={isOpen} onPress={openJobHandler} onClose={closeJobHandler} id={item._id} deletOpen={deleteJobInternal} toggleDelete={() => setDeleteJobInternal(!deleteJobInternal)} deleteHandler={deleteJobHandler} confirmOpen={confirmBookingInternalVisible} toggleConfirm={() => setConfirmBookingInternalVisible(!confirmBookingInternalVisible)} confirmHandler={confirmBookingVisibleHandler} />

            <AddJob refresh={refresh} isOpen={editJobVisible} onClose={() => setEditJobVisible(false)} lable={"Edit Quote"} id={item._id} />

            <DeleteModal loading={loading} id={item._id} phone={phoneNumber} price={price} animation="slide" quoteReference={item.quoteReference} customerName={item.firstName + " " + item.lastName} title="Delete Job" onClose={() => setDeleteJob(false)} isOpen={deleteJob} onPress={deleteJobHandler} />

            <ConfirmBookingModal id={item._id} phone={phoneNumber} price={price} animation="slide" quoteReference={item.quoteReference} customerName={item.firstName + " " + item.lastName} title="Confirm Job" onClose={() => setConfirmBookingVisible(!confirmBookingVisible)} isOpen={confirmBookingVisible} onPress={confirmBookingVisibleHandler} />

        </>
    )
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: Colors.spacing * 2.5,
        paddingTop: Colors.spacing * 2.5,
    },
    leftContainer: {
        width: 200,
        marginVertical: 10,
        backgroundColor: Colors.madidlyThemeBlue,
        justifyContent: 'center',
        overflow: 'hidden'
    },
    leftCard: {
        width: 200,
        justifyContent: 'center',
        paddingVertical: Colors.spacing * 1,
        backgroundColor: Colors.madidlyThemeBlue,
        overflow: 'hidden'
    }

})

export default JobCard