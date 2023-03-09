import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native'
import { Colors, isAndroid, lightenColor, WIDTH } from '../../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import AddButtonHeader from '../../components/AddButtonHeader';
import { useDispatch, useSelector } from 'react-redux';
import {
    addJobCustomerEmail, addJobCustomerState, addJobCustomerPostcode,
    addJobCustomerUnit, addJobCustomerStreetAddress, addJobCustomerNumber, addJobCustomerSuburb, addJobBookingDate, addJobCustomerNotes, addJobCustomerService, addJobCustomerBathroom, addJobCustomerBedroom, addJobCustomerProperty, addJobStartTime, addJobEndTime, addJobAddAddons, addJobRemoveAddons, postJobPending, postJobSuccess, postJobFail, addJobCustomerFirstName, addJobCustomerLastName, addJobCompanyName, postEditPending, postEditSuccess, postEditFail, addJobIncreaseAddons, addJobBedroomPrice, addJobBathroomPrice, addBasePrice, addDiscountPrice, addExtraPrice
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


const AddJob = ({ isOpen, onClose, lable, id, refresh, from }: any) => {
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
    const [ref, setRef] = useState<any>(null);
    const [noProduct, setNoProduct] = useState(false)

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


    const getEditData = (data: any) => {
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
            },)
            setEditQuoteID(item._id)
            seteditQuoteReference(item.quoteReference)
        }, [data])
    }

    useEffect(() => {
        lable === "Edit Quote" ? getEditData(editQuoteData) : null
    }, [editQuoteData])

    useEffect(() => {
        lable === "Edit Booking" ? getEditData(editBookingData) : null
    }, [editBookingData])


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
            },
            {
                _id: 7,
                title: "Discount",
                amount: 0,
                quantity: 0
            },
            {
                _id: 8,
                title: "Payment received",
                amount: 0,
                quantity: 0
            }
        ]
    }

    const unitHandler = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, address1: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, address1: value })
            : lable === "Add Quote" && dispatch(addJobCustomerUnit(value))
    }
    const streetAddressHandler = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, address2: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, address2: value })
            : lable === "Add Quote" && dispatch(addJobCustomerStreetAddress(value))

    }
    const suburbHandler = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, city: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, city: value })
            : lable === "Add Quote" && dispatch(addJobCustomerSuburb(value))

    }
    const postCodeHandler = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, postcode: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, postcode: value })
            : lable === "Add Quote" && dispatch(addJobCustomerPostcode(value))
    }
    const stateHandler = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, state: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, state: value })
            : lable === "Add Quote" && dispatch(addJobCustomerState(value))

    }
    const customerFirstNameHander = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, firstName: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, firstName: value })
            : lable === "Add Quote" && dispatch(addJobCustomerFirstName(value))
    }
    const customerLastNameHander = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, lastName: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, lastName: value }) :
            lable === "Add Quote" && dispatch(addJobCustomerLastName(value))
    }

    const companyNameHandler = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, companyName: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, companyName: value }) :
            lable === "Add Quote" && dispatch(addJobCompanyName(value))
    }

    const customerPhoneHander = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, phone: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, phone: value }) :
            lable === "Add Quote" && dispatch(addJobCustomerNumber(value))
    }
    const customerEmailHander = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, email: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, email: value }) :
            lable === "Add Quote" && dispatch(addJobCustomerEmail(value))
    }

    const onDateChangeHandler = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, bookingDate: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, bookingDate: value }) :
            lable === "Add Quote" && dispatch(addJobBookingDate(value))

    }
    const startTimeHandler = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, startHour: value.substring(2, 0), startMin: value.substring(3, 5), startMode: value.substring(6, 8) }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, startHour: value.substring(2, 0), startMin: value.substring(3, 5), startMode: value.substring(6, 8) }) :
            lable === "Add Quote" && dispatch(addJobStartTime(value))
    }
    const endTimeHandler = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, endHour: value.substring(2, 0), endMin: value.substring(3, 5), endMode: value.substring(6, 8) }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, endHour: value.substring(2, 0), endMin: value.substring(3, 5), endMode: value.substring(6, 8) }) :
            lable === "Add Quote" && dispatch(addJobEndTime(value))
    }

    const jobNotesHandler = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, customerNotes: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, customerNotes: value }) :
            lable === "Add Quote" && dispatch(addJobCustomerNotes(value))
    }

    const serviceHandler = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, service: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, service: value }) : lable === "Add Quote" && dispatch(addJobCustomerService(value))
    }
    const propertyHandler = (value: any) => {
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, blinds: value }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, blinds: value }) :
            lable === "Add Quote" && dispatch(addJobCustomerProperty(value))
    }
    const bedroomHandler = (value: any) => {
        const newProduct: any = editJobData.products.map((x: any) => {
            if (x.title?.toLowerCase() === "bedrooms") {
                return { ...x, quantity: parseInt(value.slice(0)) };
            }
            return x;
        })

        const newState: any = editJobData.totals.map((x: any) => {
            if (x?.title?.toLowerCase().split(" ").pop() === "bedroom") {
                return { ...x, title: `${value.substring(0, 1)} Bedroom`, quantity: parseInt(value.slice(0)) };
            }
            return x;
        })
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, totals: newState, products: newProduct }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, totals: newState, products: newProduct }) :
            lable === "Add Quote" && dispatch(addJobCustomerBedroom(value))
    }

    const bedroomPriceHandler = (value: any) => {
        const newState: any = editJobData.totals.map((x: any) => {
            if (x?.title?.toLowerCase().split(" ").pop() === "bedroom") {
                return { ...x, amount: parseInt(value) };
            }
            return x;
        })

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, totals: newState }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, totals: newState }) :
            lable === "Add Quote" && dispatch(addJobBedroomPrice(value))
    }

    const bathroomHandler = (value: any) => {

        const newState: any = editJobData.products.map((x: any) => {
            if (x?.title?.toLowerCase().split(" ").pop() === "bathrooms") {
                return { ...x, quantity: parseInt(value.slice(0)) };
            }
            return x;
        })

        const newTotal: any = editJobData.totals.map((x: any) => {
            if (x.title?.toLowerCase().split(" ").pop() === "bathroom") {
                return { ...x, title: `${value.substring(0, 1)} Bathroom`, quantity: parseInt(value.slice(0)) };
            }
            return x;
        })
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, products: newState, totals: newTotal }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, products: newState, totals: newTotal }) :
            lable === "Add Quote" && dispatch(addJobCustomerBathroom(value))
    }


    const bathroomPriceHandler = (value: any) => {

        const newState: any = editJobData.totals.map((x: any) => {
            if (x?.title?.toLowerCase().split(" ").pop() === "bathroom") {
                return { ...x, amount: parseInt(value) };
            }
            return x;
        })

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, totals: newState }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, totals: newState }) :
            lable === "Add Quote" && dispatch(addJobBathroomPrice(value))
    }

    const basePriceHandler = (value: any) => {

        const newTotals: any = editJobData.totals.map((x: any) => {
            if (x?.title?.toLowerCase() === "base price") {
                return { ...x, quantity: 1, amount: parseInt(value) };
            }
            return x;
        })
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, totals: newTotals }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, totals: newTotals }) :
            lable === "Add Quote" && dispatch(addBasePrice(value))
    }

    const discountPriceHandler = (value: any) => {

        const newTotals: any = editJobData.totals.map((x: any) => {
            if (x?.title?.toLowerCase() === "discount") {
                return { ...x, quantity: 1, amount: parseInt(value) };
            } else {
                return x
            }
        })

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, totals: newTotals }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, totals: newTotals }) :
            lable === "Add Quote" && dispatch(addDiscountPrice(value))
    }

    const paymentReceivedHandler = (value: any) => {
        const newTotals: any = editJobData.totals.map((x: any) => {
            if (x?.title?.toLowerCase() === "payment received") {
                return { ...x, quantity: 1, amount: parseInt(value) };
            } else {
                return x
            }
        })

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, totals: newTotals }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, totals: newTotals }) : null
    }

    const AddOnsPriceHandler = (value: any) => {
        const newTotals: any = editJobData.totals.map((x: any) => {
            if (x?.title?.toLowerCase() === "extras") {
                return { ...x, title: "Extras", quantity: 1, amount: parseInt(value) };
            }
            return x;
        })

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, totals: newTotals }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, totals: newTotals }) :
            lable === "Add Quote" && dispatch(addExtraPrice(value))
    }

    const addOnsAddButtonHandler = (value: any) => {
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

    const addOnsRemoveButtonHandler = (value: any) => {
        const newState: any = editJobData.products.map((x: any) => {
            if (x.title === value.title) {
                return { ...x, quantity: 0 };
            }
            return x;
        })

        lable === "Edit Quote" ? seteditJobData({ ...editJobData, products: newState }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, products: newState }) :
            lable === "Add Quote" && dispatch(addJobRemoveAddons(value))
    }

    const addonsIncreaseHandler = (value: any) => {

        const newState: any = editJobData.products.map((x: any) => {
            if (x.title === value.title) {
                return { ...x, quantity: value.quantity };
            }
            return x;
        })
        lable === "Edit Quote" ? seteditJobData({ ...editJobData, products: newState }) : lable === "Edit Booking" ? seteditJobData({ ...editJobData, products: newState }) :
            lable === "Add Quote" && dispatch(addJobIncreaseAddons(value))
    }



    const onSaveJob = async () => {

        let bedroomsCount = addJobData?.products?.find((x: any) => x?.title?.toLowerCase() === "bedrooms")?.quantity
        let bathroomsCount = addJobData?.products?.find((x: any) => x?.title?.toLowerCase() === "bathrooms")?.quantity
        if (bedroomsCount <= 0 && bathroomsCount <= 0) {
            setNoProduct(true)
            ref?.scrollTo({
                x: 0,
                y: 1100,
                animated: true,
            });
        } else {
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
                dispatch(getAllJobPending())
                const y: any = await fetchAllJobs(1)
                if (x.data.status === "error") {
                    console.log('pressed save', x.data)
                    return dispatch(getAllJobFail(y.data.status));
                }
                setNoProduct(false)
                dispatch(getAllJobSuccess(y.data))
            }
            dispatch(postJobFail(x.data))
        }
    }
    const onEditSave = async () => {
        let location = lable === "Edit Quote" ? "quote" : "booking"
        dispatch(postEditPending())
        const x: any = await fetchEditJob(location, editQuoteId, editJobData)
        console.log('post success res', x)

        if (x.data.status === "success") {
            dispatch(postEditSuccess(x.data.status));
            onClose();
            Toast.show({
                type: from === "modal" ? "modalSuccessToast" : "successToast",
                visibilityTime: 3000,
                text1: `${editQuoteReference}`,
                props: { message: `${location[0].toUpperCase() + location.substring(1)} Updated Successfully` }
            });
            refresh(id)
        }
        dispatch(postEditFail(x.data))
    }

    return (
        <View>
            <View style={styles.centeredView}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isOpen}
                ><SafeAreaView />
                    <View style={styles.centeredView}>
                        <AddButtonHeader saveOption={true} onPress={lable === "Edit Quote" ? onEditSave : lable === "Edit Booking" ? onEditSave : onSaveJob} onClose={onClose} lable={lable} loading={lable === "Edit Quote" && editLoading || lable === "Edit Booking" ? editLoading : addjobLoading} />

                        <View style={styles.modalView}>
                            <ScrollView ref={(ref: any) => {
                                setRef(ref);
                            }}>
                                {/* */}

                                {lable === "Edit Quote" &&
                                    <>
                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <CustomerCard firstName={editJobData?.firstName} firstNameHandler={customerFirstNameHander} lastName={editJobData.lastName} lastNameHandler={customerLastNameHander} phone={editJobData.phone} phoneHandler={customerPhoneHander} email={editJobData.email} emailHandler={customerEmailHander} unit={editJobData.address1} companyName={editJobData.companyName} companyNameHandler={companyNameHandler} streetAddress={editJobData.address2} suburb={editJobData.city} postCode={editJobData.postcode} state={editJobData.state} unitHandler={unitHandler} streetAddressHandler={streetAddressHandler} suburbHandler={suburbHandler} postCodeHandler={postCodeHandler} stateHandler={stateHandler} />
                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <ScheduleCard date={editJobData.bookingDate} onDateChangeHandler={onDateChangeHandler} startHour={editJobData.startHour} startMin={editJobData.startMin} startMode={editJobData.startMode} endHour={editJobData.endHour} endMin={editJobData.endMin} endMode={editJobData.endMode} notes={editJobData.customerNotes} jobNotesHandler={jobNotesHandler} startTimeHandler={startTimeHandler} endTimeHandler={endTimeHandler} />
                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <PropertyDetails service={editJobData.service.substring(1, 0).toLowerCase()} serviceHandler={serviceHandler} property={property} propertyHandler={propertyHandler} bedroomHandler={bedroomHandler} bathroomHandler={bathroomHandler} addonsIncreaseHandler={addonsIncreaseHandler} addOnsRemoveButton={addOnsRemoveButtonHandler} addOnsAddButton={addOnsAddButtonHandler} data={editJobData.products} />

                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <JobTotals totals={editJobData?.totals}
                                                setBedroomPrice={bedroomPriceHandler}
                                                data={editJobData.products}
                                                setPaidPrice={paymentReceivedHandler}
                                                setBathroomPrice={bathroomPriceHandler}
                                                setBasePrice={basePriceHandler}
                                                setAddOnsPrice={AddOnsPriceHandler}
                                                setDiscountPrice={discountPriceHandler}
                                            />
                                        </View>
                                    </>
                                }
                                {lable === "Edit Booking" ?
                                    <>
                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <CustomerCard firstName={editJobData.firstName} firstNameHandler={customerFirstNameHander} lastName={editJobData.lastName} lastNameHandler={customerLastNameHander} phone={editJobData.phone} phoneHandler={customerPhoneHander} email={editJobData.email} emailHandler={customerEmailHander} unit={editJobData.address1} companyName={editJobData.companyName} companyNameHandler={companyNameHandler} streetAddress={editJobData.address2} suburb={editJobData.city} postCode={editJobData.postcode} state={editJobData.state} unitHandler={unitHandler} streetAddressHandler={streetAddressHandler} suburbHandler={suburbHandler} postCodeHandler={postCodeHandler} stateHandler={stateHandler} />
                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <ScheduleCard date={editJobData.bookingDate} onDateChangeHandler={onDateChangeHandler} startHour={editJobData.startHour} startMin={editJobData.startMin} startMode={editJobData.startMode} endHour={editJobData.endHour} endMin={editJobData.endMin} endMode={editJobData.endMode} notes={editJobData.customerNotes} jobNotesHandler={jobNotesHandler} startTimeHandler={startTimeHandler} endTimeHandler={endTimeHandler} />
                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <PropertyDetails service={editJobData.service.substring(1, 0).toLowerCase()} serviceHandler={serviceHandler} property={property} propertyHandler={propertyHandler} bedroomHandler={bedroomHandler} bathroomHandler={bathroomHandler} addonsIncreaseHandler={addonsIncreaseHandler} addOnsRemoveButton={addOnsRemoveButtonHandler} addOnsAddButton={addOnsAddButtonHandler} data={editJobData.products} />
                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <JobTotals totals={editJobData.totals}
                                                lable={lable}
                                                setPaidPrice={paymentReceivedHandler}
                                                data={editJobData.products}
                                                setBedroomPrice={bedroomPriceHandler}
                                                setBathroomPrice={bathroomPriceHandler}
                                                setBasePrice={basePriceHandler}
                                                setAddOnsPrice={AddOnsPriceHandler}
                                                setDiscountPrice={discountPriceHandler}
                                            />
                                        </View>
                                    </>
                                    : null}

                                {lable === "Add Quote" &&
                                    <>
                                        <View style={{ paddingHorizontal: Colors.spacing * 2 }}>
                                            <CustomerCard firstName={addJobData?.firstName} firstNameHandler={customerFirstNameHander} lastName={addJobData?.lastName} lastNameHandler={customerLastNameHander} phone={addJobData?.phone} phoneHandler={customerPhoneHander} email={addJobData?.email} emailHandler={customerEmailHander} unit={addJobData?.address1} companyName={addJobData?.companyName} companyNameHandler={companyNameHandler} streetAddress={addJobData?.address2} postCodeHandler={postCodeHandler} suburb={addJobData?.city} postCode={addJobData?.postcode} state={addJobData?.state} unitHandler={unitHandler} streetAddressHandler={streetAddressHandler} suburbHandler={suburbHandler} stateHandler={stateHandler} />
                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <ScheduleCard date={addJobData?.bookingDate} onDateChangeHandler={onDateChangeHandler} notes={addJobData?.customerNotes} jobNotesHandler={jobNotesHandler} startHour={addJobData?.startHour} startMin={addJobData?.startMin} startMode={addJobData?.startMode} endHour={addJobData?.endHour} endMin={addJobData?.endMin} endMode={addJobData?.endMode} startTimeHandler={startTimeHandler} endTimeHandler={endTimeHandler} />
                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <PropertyDetails service={service} serviceHandler={serviceHandler} property={property} propertyHandler={propertyHandler} bedroomHandler={bedroomHandler} bathroomHandler={bathroomHandler} addOns={addJobData?.addOns} addOnsAddButton={addOnsAddButtonHandler} addOnsRemoveButton={addOnsRemoveButtonHandler} data={addJobData?.products} addonsIncreaseHandler={addonsIncreaseHandler} noProduct={noProduct} />
                                        </View>

                                        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>
                                            <JobTotals totals={addJobData?.totals} data={addJobData?.products}
                                                setBedroomPrice={bedroomPriceHandler}
                                                setBathroomPrice={bathroomPriceHandler}
                                                setPaidPrice={paymentReceivedHandler}
                                                setBasePrice={basePriceHandler}
                                                setAddOnsPrice={AddOnsPriceHandler}
                                                setDiscountPrice={discountPriceHandler}
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