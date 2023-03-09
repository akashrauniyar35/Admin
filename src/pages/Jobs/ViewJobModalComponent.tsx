import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, isAndroid, WIDTH } from '../../assets/Colors'
import SelectionCard from '../../components/SelectionCard'
import MapCard from '../../components/MapCard'
import JobNotesCard from '../../components/JobNotesCard'
import Checklist from '../../components/CheckList'
import AddNotes from '../../components/AddNotes'

import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import JobTimelineCard from '../../components/JobTimelineCard'
import AddJob from '../Add/AddJob'
import ShowToast from '../../components/ShowToast'
import { confirmBookingFail, confirmBookingPending, confirmBookingSuccess, deleteJobFail, deleteJobPending, deleteJobSuccess, quoteStatusFail, quoteStatusPending, quoteStatusSuccess, viewJobFail, viewJobPending, viewJobSuccess } from '../../redux/jobSlice'
import { fetchConfirmBooking, fetchDeleteJob, fetchJobByID, fetchStatusUpdate } from '../../config/JobApi'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import DeleteModal from '../../components/DeletetModal'
import ConfirmBookingModal from '../../components/ConfirmBookingModal'




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
];


const ViewJobModalComponent = ({ id, item, refresh, onClose, deletOpen, toggleDelete, deleteHandler, confirmOpen, toggleConfirm, confirmHandler }: any) => {
    console.log('job component modal item', id)
    const [addNoteVisible, setAddNoteVisible] = useState(false)
    const [editJobVisible, setEditJobVisible] = useState(false);

    const statusLoading = useSelector((state: any) => state.jobReducer.statusUpdateLoading)
    const deleteLoading = useSelector((state: any) => state.jobReducer.deleteLoading)

    const dispatch = useDispatch()


    const x = String(item.subtotal).slice(0, 3);
    const quotePrice = Number(x).toFixed(2);

    const phoneNumber = [item.phone.slice(0, 4), " ", item.phone.slice(4, 7), " ", item.phone.slice(7)].join('')

    const date = [item.createdAt.slice(0, 4), "/", item.createdAt.slice(5, 7), "/", item.createdAt.slice(8, 15), item.createdAt.slice(8)].join('').substring(0, 10)

    const street = item.address2.split(" ")
    const streetOne = item.address1.split(" ")

    const bd = item.products.find((x: any) => x.title.toLowerCase() === "bedrooms")
    const ba = item.products.find((x: any) => x.title.toLowerCase() === "bathrooms")


    const addNotesHandler = () => {
        setAddNoteVisible(!addNoteVisible)
    }

    const statusHandler = async (value: string) => {
        let data = { quoteStatus: value }
        let lable = "quote"
        dispatch(quoteStatusPending())
        const x: any = await fetchStatusUpdate(id, data, lable)
        if (x.data.status === "error") {
            return dispatch(quoteStatusFail(x.data.status));
        }
        dispatch(quoteStatusSuccess())
    }

    return (
        <>
            <View>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: Colors.spacing * 2 }}>
                        <Text style={{ fontSize: 20, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Bold', }}>#{item.quoteReference}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium', }}>  -  {date}</Text>
                            <View style={{ opacity: .5, backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, marginHorizontal: Colors.spacing * .5, borderRadius: 100, }} />
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Bold', }}>$ {quotePrice}</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: Colors.spacing * 1.5, paddingHorizontal: Colors.spacing * 2, }}>
                        <SelectionCard phColor={Colors.maidlyGrayText} data={scheduleData} type={'schedule'} placeholder={item.quoteStatus} onPress={statusHandler} loading={statusLoading} />
                        <Text style={{ fontSize: 20, color: Colors.madidlyThemeBlue, marginTop: Colors.spacing * 2, fontFamily: 'Outfit-Medium', }}>{new Date(item.bookingDate).toDateString()}</Text>
                        <View style={{ height: .35, width: '100%', marginVertical: Colors.spacing * 2, backgroundColor: Colors.maidlyGrayText }} />
                    </View>

                    <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                        <Text style={{ fontSize: 20, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Medium', }}>{item.firstName} {item.lastName}</Text>

                        <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', marginTop: Colors.spacing * 1 }}>
                            {streetOne[0] ? <Text>{streetOne[0]} </Text> : null}
                            {streetOne[1] ? <Text>{streetOne[1]?.slice(0, 1).toUpperCase() + streetOne[1]?.slice(1)} </Text> : null}
                            {streetOne[2] ? <Text>{streetOne[2]?.slice(0, 1).toUpperCase() + streetOne[2]?.slice(1)} </Text> : null}
                            {streetOne[3] ? <Text>{streetOne[3]?.slice(0, 1).toUpperCase() + streetOne[3]?.slice(1)} </Text> : null}
                            {item.address2 !== "" ? <Text>{street[0] ? street[0]?.slice(0, 1).toUpperCase() + street[0]?.slice(1) : null} {street[1] ? street[1]?.slice(0, 1).toUpperCase() + street[1]?.slice(1) : null} {street[2] ? street[2]?.slice(0, 1).toUpperCase() + street[2]?.slice(1) : null} </Text> : ""}
                            {item.city !== "" ? <Text>{item.city.toUpperCase()} </Text> : ""}
                            {item.postcode !== "" ? <Text>{item.postcode.toUpperCase()} </Text> : ""}
                            {item.state !== "" ? <Text>{item.state.toUpperCase()} </Text> : ""}
                        </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing * .5 }}>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{phoneNumber}</Text>
                            <View style={{ opacity: .5, backgroundColor: Colors.maidlyGrayText, width: 6, height: 6, marginHorizontal: Colors.spacing, borderRadius: 100, }} />
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{item.email}</Text>
                        </View>

                        <View style={{ marginVertical: Colors.spacing * 2, }}>
                            <MapCard address={`${item.address2} ${item.city} ${item.state} ${item.postcode}`} />
                        </View>

                        <View style={{ height: .35, width: '100%', marginBottom: Colors.spacing * 2, backgroundColor: Colors.maidlyGrayText }} />
                    </View>


                    <View style={{ paddingHorizontal: Colors.spacing * 2, }}>

                        <Pressable onPress={toggleConfirm}>
                            <View style={[styles.buttonsFull]}>
                                <Text style={{
                                    fontSize: 12,
                                    color: 'white', fontFamily: 'Outfit-Bold',
                                }}>Convert to booking</Text>
                            </View>
                        </Pressable>


                        <Pressable onPress={toggleDelete}>
                            <View style={[styles.buttonsFull, { backgroundColor: Colors.red, borderRadius: Colors.spacing * Colors.spacing }]}>
                                <Text style={{
                                    fontSize: 12,
                                    color: 'white', fontFamily: 'Outfit-Bold',
                                }}>Delete</Text>
                            </View>
                        </Pressable>


                        <View style={{ height: .35, width: '100%', marginBottom: Colors.spacing * 2, marginTop: Colors.spacing, backgroundColor: Colors.borderColor }} />
                    </View>


                    <View style={{ paddingHorizontal: Colors.spacing * 2, }}>


                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Medium', }}>Job details</Text>

                            <Pressable onPress={() => setEditJobVisible(!editJobVisible)}>
                                <Text style={{ fontSize: 12, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Light', }}>Edit details</Text>
                            </Pressable>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing, }}>

                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: '20%' }}>Size</Text>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{bd?.quantity} bd | {ba?.quantity} ba</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing, }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: '20%' }}>Service</Text>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{item.service.charAt(0).toUpperCase() + item.service.slice(1)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing, }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: '20%' }}>Date</Text>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{new Date(item.createdAt).toDateString()}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing, }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: '20%' }}>Time</Text>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{item.startHour + ":" + item.startMin + " " + item.startMode} - {item.endHour + ":" + item.endMin + " " + item.endMode}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing, }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: '20%' }}>Address</Text>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light' }}>
                                {streetOne[0] ? <Text>{streetOne[0]} </Text> : null}
                                {streetOne[1] ? <Text>{streetOne[1]?.slice(0, 1).toUpperCase() + streetOne[1]?.slice(1)} </Text> : null}
                                {streetOne[2] ? <Text>{streetOne[2]?.slice(0, 1).toUpperCase() + streetOne[2]?.slice(1)} </Text> : null}
                                {streetOne[3] ? <Text>{streetOne[3]?.slice(0, 1).toUpperCase() + streetOne[3]?.slice(1)} </Text> : null}
                                {item.address2 !== "" ? <Text>{street[0] ? street[0]?.slice(0, 1).toUpperCase() + street[0]?.slice(1) : null} {street[1] ? street[1]?.slice(0, 1).toUpperCase() + street[1]?.slice(1) : null} {street[2] ? street[2]?.slice(0, 1).toUpperCase() + street[2]?.slice(1) : null} </Text> : ""}
                                {item.city !== "" ? <Text>{item.city.toUpperCase()} </Text> : ""}
                                {item.postcode !== "" ? <Text>{item.postcode.toUpperCase()} </Text> : ""}
                                {item.state !== "" ? <Text>{item.state.toUpperCase()} </Text> : ""}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: Colors.spacing, marginBottom: Colors.spacing * .5 }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: '20%' }}>Add ons</Text>
                            <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', }}>


                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', width: '100%', }}>

                                    {item.products.slice(2).map((x: any) => {
                                        if (x.quantity > 0) {
                                            return (
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * .5, marginRight: Colors.spacing }}>
                                                    <View style={{ backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, marginRight: Colors.spacing * .5, borderRadius: 100, }} />
                                                    <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{x.title} ({x.quantity})</Text>
                                                </View>
                                            )
                                        } else { null }
                                    })}
                                </View>

                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', width: '20%' }}>Notes</Text>
                            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{''}</Text>
                        </View>
                        <View style={{ height: .35, width: '100%', marginVertical: Colors.spacing * 2, backgroundColor: Colors.maidlyGrayText }} />
                    </View>

                    <View style={{ paddingHorizontal: Colors.spacing * 2 }}>
                        <Text style={{ fontSize: 20, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing }}>Timeline</Text>

                        {item.timelines.map((item: any) => <JobTimelineCard createdBy={item.createdBy} key={item.id} date={item.date} icon={item.icon} title={item.title} />)}
                    </View>

                </ScrollView>

                <AddJob refresh={refresh} isOpen={editJobVisible} onClose={() => setEditJobVisible(false)} lable={"Edit Quote"} id={id} from="modal" />

                <DeleteModal loading={deleteLoading} id={id} phone={phoneNumber} price={quotePrice} animation="slide" quoteReference={item.quoteReference} customerName={item.firstName + " " + item.lastName} title="Delete Job" onClose={toggleDelete} isOpen={deletOpen} onPress={deleteHandler} />
                <ConfirmBookingModal id={item._id} phone={phoneNumber} price={quotePrice} animation="slide" quoteReference={item.quoteReference} customerName={item.firstName + " " + item.lastName} title="Confirm Job" onClose={toggleConfirm} isOpen={confirmOpen} onPress={confirmHandler} />
            </View>
            <ShowToast />
        </>
    )
}

export default ViewJobModalComponent

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    buttonsFull: {
        alignItems: "center",
        marginBottom: Colors.spacing * 1,
        justifyContent: "center",
        backgroundColor: Colors.madidlyThemeBlue,
        height: isAndroid ? 45 : 45,
        borderRadius: Colors.spacing * Colors.spacing,

    },
    buttonsHalf: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.madidlyThemeBlue,
        paddingVertical: Colors.spacing * 1.5,
        width: WIDTH * .40,
        borderRadius: Colors.spacing * Colors.spacing,
    },

})