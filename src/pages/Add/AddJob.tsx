import React, { useEffect, useState } from 'react'
import { Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native'
import { Colors, isAndroid, lightenColor, WIDTH } from '../../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import AddButtonHeader from '../../components/AddButtonHeader';
import { useDispatch, useSelector } from 'react-redux';
import {
    addJobCustomerEmail, addJobCustomerState, addJobCustomerPostcode,
    addJobCustomerUnit, addJobCustomerStreetAddress, addJobCustomerNumber, addJobCustomerSuburb, addJobBookingDate, addJobCustomerNotes, addJobCustomerService, addJobCustomerBathroom, addJobCustomerBedroom, addJobCustomerProperty, addJobStartTime, addJobEndTime, addJobAddAddons, addJobRemoveAddons, postJobPending, postJobSuccess, postJobFail, addJobCustomerFirstName, addJobCustomerLastName, addJobCompanyName, postEditPending, postEditSuccess, postEditFail, addJobIncreaseAddons, addJobBedroomPrice, addJobBathroomPrice, addBasePrice
} from '../../redux/addJobSlice';
import InputBox from '../../components/InputBox';
import CustomerCard from '../../components/CustomerCard';
import ScheduleCard from '../../components/ScheduleCard';
import PropertyDetails from '../../components/PropertyDetails';
import JobTotals from '../../components/JobTotals';
import AssignTech from '../../components/AssignTech';
import { jobsData } from '../../interfaces/jobInterfaces';
import addressInterface from '../../interfaces/addressInterface';
import { iteratorSymbol } from 'immer/dist/internal';
import { fetchAllJobs, fetchEditJob, fetchPostJob } from '../../config/JobApi';
import Toast from 'react-native-toast-message';
import { getAllJobFail, getAllJobPending, getAllJobSuccess } from '../../redux/jobSlice';
import JobPayments from '../../components/JobPayments';


const AddJob = ({ isOpen, onClose, lable, id, refresh }) => {
    const dispatch = useDispatch();
    const editQuoteData: any = useSelector((state: any) => state.jobReducer.jobByIdData)
    const editBookingData: any = useSelector((state: any) => state.bookingReducer.id)
    const addJobData: any = useSelector((state: any) => state.addJobReducer.addJobData)
    const addjobLoading: any = useSelector((state: any) => state.addJobReducer.postJobLoading)
    const editLoading: any = useSelector((state: any) => state.addJobReducer.editLoading)
    const [editQuoteId, setEditQuoteID] = useState(String)
    const [editQuoteReference, seteditQuoteReference] = useState(String)
    const [notes] = useState(String)
    const [service] = useState(String)
    const [property] = useState(String)
    const today = new Date();

    const [editJobData, seteditJobData] = useState<any>(
        {
            email: "",
            companyName: "",
            firstName: "",
            lastName: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            postcode: "",
            startHour: "",
            startMin: "",
            startMode: "",
            endHour: "",
            endMin: "",
            endMode: "",
            bookingDate: "",
            subtotal: "",
            // subscription: "",
            // customerNotes: "",
            service: "",
            notes: [],
            phone: "",
            products: [],
            totals: [],
            quoteStatus: "",
        }
    );


    const resetState: any = {
        email: "",
        companyName: "WeDo Cleaning Pty Ltd",
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postcode: "",
        startHour: "",
        startMin: "",
        startMode: "",
        endHour: "",
        endMin: "",
        endMode: "",
        bookingDate: today.toISOString(),
        subscription: "One Time Cleaning",
        customerNotes: "",
        service: "",
        notes: [],
        phone: "",
        products: [],
        quoteStatus: "",
        totals: [
            {
                _id: 1,
                title: "Base Price",
                amount: 0,
                quantity: 0
            },
            {
                _id: 2,
                title: "1 Bathroom",
                amount: 0,
                quantity: 0
            },
            {
                _id: 3,
                title: "1 Bedroom",
                amount: 0,
                quantity: 0
            },
            {
                _id: 4,
                title: "Extras",
                amount: 0,
                quantity: 0
            },
            {
                _id: 5,
                title: "Tip",
                amount: 0,
                quantity: 0
            },
            {
                _id: 6,
                title: "To be paid by customer",
                amount: 0,
                quantity: 0
            }
        ]
    }

    // console.log("editJobData editJobData.service - products", editJobData.products[0])
    console.log("editJobData editJobData. - totals", editJobData.totals)

    const unitHandler = (value: string) => {

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, address1: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, address1: value })
            : lable === "Add Quote" && dispatch(addJobCustomerUnit(value))
    }
    const streetAddressHandler = (value: string) => {

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, address2: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, address2: value })
            : lable === "Add Quote" && dispatch(addJobCustomerStreetAddress(value))

    }
    const suburbHandler = (value: string) => {

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, city: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, city: value })
            : lable === "Add Quote" && dispatch(addJobCustomerSuburb(value))

    }
    const postCodeHandler = (value: string) => {

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, postcode: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, postcode: value })
            : lable === "Add Quote" && dispatch(addJobCustomerPostcode(value))

    }
    const stateHandler = (value: string) => {

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, state: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, state: value })
            : lable === "Add Quote" && dispatch(addJobCustomerState(value))

    }
    const customerFirstNameHander = (value: string) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, firstName: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, firstName: value })
            : lable === "Add Quote" && dispatch(addJobCustomerFirstName(value))
    }
    const customerLastNameHander = (value: string) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, lastName: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, lastName: value }) :
            lable === "Add Quote" && dispatch(addJobCustomerLastName(value))
    }

    const companyNameHandler = (value: string) => {

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, companyName: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, companyName: value }) :
            lable === "Add Quote" && dispatch(addJobCompanyName(value))
    }

    const customerPhoneHander = (value) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, phone: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, phone: value }) :
            lable === "Add Quote" && dispatch(addJobCustomerNumber(value))
    }
    const customerEmailHander = (value) => {

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, email: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, email: value }) :
            lable === "Add Quote" && dispatch(addJobCustomerEmail(value))

    }

    const onDateChangeHandler = (value) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, bookingDate: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, bookingDate: value }) :
            lable === "Add Quote" && dispatch(addJobBookingDate(value))

    }
    const startTimeHandler = (value) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, startHour: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, startHour: value }) :
            lable === "Add Quote" && dispatch(addJobStartTime(value))
    }
    const endTimeHandler = (value) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, endHour: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, endHour: value }) :
            lable === "Add Quote" && dispatch(addJobEndTime(value))
    }

    const jobNotesHandler = (value) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, customerNotes: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, customerNotes: value }) :
            lable === "Add Quote" && dispatch(addJobCustomerNotes(value))
    }

    const serviceHandler = (value) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, service: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, service: value }) : lable === "Add Quote" && dispatch(addJobCustomerService(value))
    }
    const propertyHandler = (value) => {

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, blinds: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, blinds: value }) :
            lable === "Add Quote" && dispatch(addJobCustomerProperty(value))
    }
    const bedroomHandler = (value: any) => {
        const newProduct: any = editJobData.products.map((x: any) => {
            if (x.title.toLowerCase() === "bedrooms") {
                return { ...x, quantity: parseInt(value.slice(0)) };
            }
            return x;
        })

        const newState: any = editJobData.totals.map((x: any) => {
            if (x.title.toLowerCase().split(" ").pop() === "bedrooms") {
                return { ...x, title: value, quantity: parseInt(value.slice(0)) };
            }
            return x;
        })

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, totals: newState, products: newProduct }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, products: newState }) :
            lable === "Add Quote" && dispatch(addJobCustomerBedroom(value))
    }

    const bedroomPriceHandler = (value: any) => {

        const bd = editJobData.totals.find((x: any) => x.title.toLowerCase().split(" ").pop() === "bedrooms")

        const newState: any = editJobData.totals.map((x: any) => {
            if (x.title.toLowerCase().split(" ").pop() === "bedrooms") {
                return { ...x, title: bd.title, quantity: bd.quantity, amount: parseInt(value) / bd.quantity };
            }
            return x;
        })

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, totals: newState }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, products: value }) :
            lable === "Add Quote" && dispatch(addJobBedroomPrice(value))
    }

    const bathroomHandler = (value: any) => {

        const newState: any = editJobData.products.map((x: any) => {
            if (x.title.toLowerCase() === "bathrooms") {
                return { ...x, quantity: value };
            }
            return x;
        })

        const newTotal: any = editJobData.totals.map((x: any) => {
            if (x.title.toLowerCase().split(" ").pop() === "bathrooms") {
                return { ...x, title: value, quantity: parseInt(value.slice(0)) };
            }
            return x;
        })

        console.log("new totals", newTotal)

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, products: newState, totals: newTotal }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, products: newState }) :
            lable === "Add Quote" && dispatch(addJobCustomerBathroom(value))
    }
    const bathroomPriceHandler = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, products: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, products: value }) :
            lable === "Add Quote" && dispatch(addJobBathroomPrice(value))
    }


    const basePriceHandler = (value: any) => {


        const newTotals: any = editJobData.totals.map((x: any) => {
            if (x.title.toLowerCase() === "base price") {
                return { ...x, title: "Base Price", quantity: 1, amount: parseInt(value) };
            }
            return x;
        })

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, totals: newTotals }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, products: value }) :
            lable === "Add Quote" && dispatch(addBasePrice(value))
    }

    const addOnsAddButtonHandler = (value) => {
        const newState: any = editJobData.products.map((x: any) => {
            if (x.title === value.title) {
                return { ...x, quantity: 1 };
            }
            return x;
        })
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, products: newState }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, products: newState }) :
            lable === "Add Quote" && dispatch(addJobAddAddons(value))
        console.log('value add ons', value)
    }


    const addOnsRemoveButtonHandler = (value) => {
        const newState: any = editJobData.products.map((x: any) => {
            if (x.title === value.title) {
                return { ...x, quantity: 0 };
            }
            return x;
        })

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, products: newState }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, products: newState }) :
            lable === "Add Quote" && dispatch(addJobRemoveAddons(value))
    }

    const addonsIncreaseHandler = (value) => {
        const newState: any = editJobData.products.map((x: any) => {
            if (x.title === value.title) {
                return { ...x, quantity: value.quantity };
            }
            return x;
        })

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, products: newState }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, products: newState }) :
            lable === "Add Quote" && dispatch(addJobIncreaseAddons(value))

        // lable === "Edit Quote" ? seteditJobData({ ...editJobData, products: newState }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, products: newState }) :
        //     lable === "Add Quote" && dispatch(addJobIncreaseAddons(value))
    }


    const getEditData = (data: any) => {

        console.log('selected data', data)
        data.map((item: any) => {
            seteditJobData({
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                companyName: item.companyName,
                phone: item.phone,
                address1: item.address1,
                address2: item.address2,
                city: item.city,
                state: item.state,
                postcode: item.postcode,
                startHour: item.startHour,
                startMin: item.startMin,
                startMode: item.startMode,
                endHour: item.endHour,
                endMin: item.endMin,
                endMode: item.endMode,
                bookingDate: item.bookingDate,
                // subscription: item.subscription,
                // customerNotes: item.customerNotes,
                service: item.service,
                notes: item.notes,
                subtotal: item.subtotal,
                products: item.products,
                totals: item.totals,
                quoteStatus: item.quoteStatus,
            })
            setEditQuoteID(item._id)
            seteditQuoteReference(item.quoteReference)
        })
    }

    useEffect(() => {
        lable === "Edit Quote" ? getEditData(editQuoteData) : getEditData(editBookingData)
    }, [editQuoteData, editBookingData])


    useEffect(() => {
    }, [])

    const onSaveJob = async () => {

        console.log('pressed save')

        dispatch(postJobPending(addJobData))
        const x: any = await fetchPostJob(addJobData)
        if (x.data.status === "success") {
            dispatch(postJobSuccess(resetState));
            console.log('pressed save', x.data)
            onClose();
            Toast.show({
                type: 'addToast',
                visibilityTime: 3000,
                text1: `${'Success'}`,
                props: { message: 'Quote creted successfully' }
            })

            dispatch(getAllJobPending('data'))
            const y: any = await fetchAllJobs(1)
            if (x.data.status === "error") {
                console.log('pressed save', x.data)
                return dispatch(getAllJobFail(y.data.status));
            }
            // setData(x.data.paginatedResults)
            dispatch(getAllJobSuccess(y.data))
        }
        dispatch(postJobFail(x.data))
    }

    const onEditSave = async () => {
        let location = lable === "Edit Quote" ? "quote" : "booking"
        dispatch(postEditPending('data'))
        const x: any = await fetchEditJob(location, editQuoteId, editJobData)
        console.log('post success res', x)

        if (x.data.status === "success") {
            dispatch(postEditSuccess(x.data.status));
            onClose();
            Toast.show({
                type: 'successToast',
                visibilityTime: 3000,
                text1: `${editQuoteReference}`,
                props: { message: `${location[0].toUpperCase() + location.substring(1)} Updated Successfully` }
            });
            refresh()
        }
        dispatch(postEditFail(x.data))
    }

    // const Addbd: any = addJobData.products.find((x: any) => x.title.toLowerCase() === "bedrooms")?.quantity
    // const p = Addbd === undefined ? 0 : Addbd
    // const Addba: any = addJobData.products.find((x: any) => x.title.toLowerCase() === "bathrooms")?.quantity
    // const q = Addba === undefined ? 0 : Addba

    return (
        <View>
            <View style={styles.centeredView}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isOpen}
                ><SafeAreaView />
                    <View style={styles.centeredView}>

                        {/* <AddButtonHeader saveOption={true} onPress={onSaveJob} onClose={onClose} lable={lable} loading={lable === "Edit Quote" && editLoading || lable === "Edit Booking" ? editLoading : addjobLoading} /> */}
                        <AddButtonHeader saveOption={true} onPress={lable === "Edit Quote" ? onEditSave : lable === "Edit Booking" ? onEditSave : onSaveJob} onClose={onClose} lable={lable} loading={lable === "Edit Quote" && editLoading || lable === "Edit Booking" ? editLoading : addjobLoading} />

                        <View style={styles.modalView}>
                            <ScrollView>
                                {/* */}

                                {lable === "Edit Quote" &&
                                    <>
                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <CustomerCard firstName={editJobData.firstName} firstNameHandler={customerFirstNameHander} lastName={editJobData.lastName} lastNameHandler={customerLastNameHander} phone={editJobData.phone} phoneHandler={customerPhoneHander} email={editJobData.email} emailHandler={customerEmailHander} unit={editJobData.address1} companyName={editJobData.companyName} companyNameHandler={companyNameHandler} streetAddress={editJobData.address2} suburb={editJobData.city} postCode={editJobData.postcode} state={editJobData.state} unitHandler={unitHandler} streetAddressHandler={streetAddressHandler} suburbHandler={suburbHandler} postCodeHandler={postCodeHandler} stateHandler={stateHandler} />
                                        </View>


                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <ScheduleCard date={editJobData.bookingDate} onDateChangeHandler={onDateChangeHandler} startHour={editJobData.startHour} startMin={editJobData.startMin} startMode={editJobData.startMode} endHour={editJobData.endHour} endMin={editJobData.endMin} endMode={editJobData.endMode} notes={editJobData.customerNotes} jobNotesHandler={jobNotesHandler} startTimeHandler={startTimeHandler} endTimeHandler={endTimeHandler} />
                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>

                                            <PropertyDetails service={editJobData.service.substring(1, 0).toLowerCase()} serviceHandler={serviceHandler} property={property} propertyHandler={propertyHandler} bedroomHandler={bedroomHandler} bathroomHandler={bathroomHandler} data={editJobData?.products} addonsIncreaseHandler={addonsIncreaseHandler} addOnsRemoveButton={addOnsRemoveButtonHandler} addOnsAddButton={addOnsAddButtonHandler} />

                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <JobTotals totals={editJobData?.totals} data={editJobData?.products}
                                                setBedroomPrice={bedroomPriceHandler}
                                                setBathroomPrice={bathroomPriceHandler}
                                                setBasePrice={basePriceHandler}
                                            />
                                        </View>
                                    </>
                                }
                                {lable === "Edit Booking" &&
                                    <>
                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <CustomerCard firstName={editJobData.firstName} firstNameHandler={customerFirstNameHander} lastName={editJobData.lastName} lastNameHandler={customerLastNameHander} phone={editJobData.phone} phoneHandler={customerPhoneHander} email={editJobData.email} emailHandler={customerEmailHander} unit={editJobData.address1} companyName={editJobData.companyName} companyNameHandler={companyNameHandler} streetAddress={editJobData.address2} suburb={editJobData.city} postCode={editJobData.postcode} state={editJobData.state} unitHandler={unitHandler} streetAddressHandler={streetAddressHandler} suburbHandler={suburbHandler} postCodeHandler={postCodeHandler} stateHandler={stateHandler} />
                                        </View>


                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <ScheduleCard date={editJobData.bookingDate} onDateChangeHandler={onDateChangeHandler} startHour={editJobData.startHour} startMin={editJobData.startMin} startMode={editJobData.startMode} endHour={editJobData.endHour} endMin={editJobData.endMin} endMode={editJobData.endMode} notes={editJobData.customerNotes} jobNotesHandler={jobNotesHandler} startTimeHandler={startTimeHandler} endTimeHandler={endTimeHandler} />
                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <PropertyDetails service={editJobData.service.substring(1, 0).toLowerCase()} serviceHandler={serviceHandler} property={property} propertyHandler={propertyHandler} bedroomHandler={bedroomHandler} bathroomHandler={bathroomHandler} data={editJobData?.products} addonsIncreaseHandler={addonsIncreaseHandler} addOnsRemoveButton={addOnsRemoveButtonHandler} addOnsAddButton={addOnsAddButtonHandler} />
                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <JobTotals total={editJobData.subtotal} data={editJobData?.products} />
                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, paddingBottom: Colors.spacing * 4 }}>
                                            <AssignTech />
                                        </View>
                                    </>
                                }

                                {lable === "Add Quote" &&
                                    <>
                                        <View style={{ paddingHorizontal: Colors.spacing * 2 }}>
                                            <CustomerCard firstName={addJobData.firstName} firstNameHandler={customerFirstNameHander} lastName={addJobData.lastName} lastNameHandler={customerLastNameHander} phone={addJobData.phone} phoneHandler={customerPhoneHander} email={addJobData.email} emailHandler={customerEmailHander} unit={addJobData.address1} companyName={addJobData.companyName} companyNameHandler={companyNameHandler} streetAddress={addJobData.address2} postCodeHandler={postCodeHandler} suburb={addJobData.city} postCode={addJobData.postcode} state={addJobData.state} unitHandler={unitHandler} streetAddressHandler={streetAddressHandler} suburbHandler={suburbHandler} stateHandler={stateHandler} />
                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <ScheduleCard date={addJobData.bookingDate} onDateChangeHandler={onDateChangeHandler} notes={addJobData.customerNotes} jobNotesHandler={jobNotesHandler} startHour={addJobData.startHour} startMin={addJobData.startMin} startMode={addJobData.startMode} endHour={addJobData.endHour} endMin={addJobData.endMin} endMode={addJobData.endMode} startTimeHandler={startTimeHandler} endTimeHandler={endTimeHandler} />
                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <PropertyDetails service={service} serviceHandler={serviceHandler} property={property} propertyHandler={propertyHandler} bedroomHandler={bedroomHandler} bathroomHandler={bathroomHandler} addOns={addJobData.addOns} addOnsAddButton={addOnsAddButtonHandler} addOnsRemoveButton={addOnsRemoveButtonHandler} data={addJobData?.products} addonsIncreaseHandler={addonsIncreaseHandler} />
                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <JobTotals totals={addJobData.totals} data={addJobData?.products}
                                                setBedroomPrice={bedroomPriceHandler}
                                                setBathroomPrice={bathroomPriceHandler}
                                                setBasePrice={basePriceHandler}
                                            />
                                        </View>
                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            {/* <JobPayments /> */}
                                        </View>

                                        {/* <View style={{ paddingHorizontal: Colors.spacing * 2, paddingBottom: Colors.spacing * 4 }}>
                                            <AssignTech />
                                        </View> */}
                                    </>
                                }


                            </ScrollView>
                        </View>
                    </View>
                </Modal >
            </View >
        </View >
    )
}

export default AddJob

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
    },
    modalView: {
        backgroundColor: "white",
        width: WIDTH,
        flex: 1,
        paddingTop: Colors.spacing,

    },


})