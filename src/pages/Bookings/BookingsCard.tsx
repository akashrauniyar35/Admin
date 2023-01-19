import { View, Text, StyleSheet, Platform, Dimensions, Pressable, Animated, ActivityIndicator, Linking } from 'react-native'
import React, { useRef, useState } from 'react'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux'


import Toast from 'react-native-toast-message';
import { Swipeable, } from 'react-native-gesture-handler';

import DeleteModal from './DeletetModal';
import ConfirmBookingModal from './ConfirmBookingModal';
import { Colors, isAndroid } from '../../assets/Colors';
import ViewBookingModal from './ViewBookingModal';
import AddJob from '../Add/AddJob';


const BookingsCard = ({ toggleNotes, editBookingHandler, item, index, onPress, swipeableOptions, toggleDelete, selectedBooking }) => {

    const swipeableRef = useRef<Swipeable | null>(null);
    const street = item.address1?.split(" ")

    const swipeableOpen = (text: string) => {
        console.log(text)
        if (swipeableRef.current) {
            swipeableRef.current.openLeft()
        }
    }

    const onSwipeablePress = (value: string) => {
        selectedBooking()

        if (value === "editBooking") {
            // toggleEdit()
            editBookingHandler(item)
            // editJobHandler()
        }
        if (value === "addNotes") {
            toggleNotes()
        }
        if (value === "delete") {
            toggleDelete()
        }
        if (value === "viewPDF") {

        }
        if (value === "confirmBooking") {
            // setConfirmBookingVisible(true);
        }

        if (swipeableRef.current) {
            swipeableRef.current.close();
        }
    }




    const phoneNumber = [item.phone.slice(0, 4), " ", item.phone.slice(4, 7), " ", item.phone.
        slice(7)].join('')

    const price = [item.subtotal.toString().slice(0, 3), ".", item.subtotal.toString().slice(2)].join('')
    const bookingDate = new Date(item.createdAt)



    const leftSwipe = (progress, dragX) => {

        const lastIndex = swipeableOptions.length - 1
        const lastItemID = swipeableOptions[lastIndex].id
        const scale = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
            extrapolate: 'clamp'
        });

        return (
            <View style={[styles.leftContainer, { backgroundColor: index % 2 === 0 ? 'white' : "transparent", }]} >
                {swipeableOptions.map((x: any) => {
                    return (
                        <Pressable
                            onPress={() => onSwipeablePress(x.type)} key={x.id} style={[styles.leftCard, { borderBottomWidth: x.id === lastItemID ? 0 : .35, borderColor: 'white' }]}>
                            <Animated.View style={{ transform: [{ scale: scale }], flexDirection: 'row', alignItems: 'center', paddingHorizontal: Colors.spacing * 2, justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 12, color: 'white', fontWeight: isAndroid ? "900" : "600" }}>{x.title}</Text>
                                <IconM name={x.icon} size={18} color="white" />
                            </Animated.View>
                        </Pressable>
                    )
                })
                }

            </View >
        )
    }


    return (
        <>
            <Swipeable renderLeftActions={leftSwipe} ref={swipeableRef}
                friction={1}
            >
                <Pressable onPress={onPress}>


                    <View style={[styles.container, { backgroundColor: index % 2 === 0 ? 'white' : "transparent", elevation: index % 2 === 0 ? 0 : 1 },]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                            <View style={{}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 20, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Bold', }}>#{item.bookingReference}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing * .5 }}>
                                    <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium'}}>{bookingDate.toDateString()}</Text>
                                    <View style={{ backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, marginHorizontal: Colors.spacing * .5, borderRadius: 100, }} />
                                    <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium',}}>${price}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <View style={{ backgroundColor: item.bookingStatus.toLowerCase() === "in progress" ? Colors.orangeBG : item.bookingStatus.toLowerCase() === "completed" ? Colors.paidBG : item.bookingStatus.toLowerCase() === "cancelled" ? Colors.redBG : Colors.orangeBG, padding: Colors.spacing * .55, borderRadius: Colors.spacing, marginRight: Colors.spacing, width: Colors.spacing * 7, alignItems: 'center' }}>

                                    <Text style={{ fontSize: 10, color: item.bookingStatus.toLowerCase() === "in progress" ? Colors.orange : item.bookingStatus.toLowerCase() === "completed" ? Colors.green : item.bookingStatus.toLowerCase() === "cancelled" ? Colors.red : Colors.orange, fontFamily: 'Outfit-ExtraBold', }}>{item.bookingStatus}</Text>
                                </View>
                                <Pressable onPress={() => swipeableOpen('text')}>
                                    <IconM name="dots-horizontal" size={28} color={Colors.maidlyGrayText} />
                                </Pressable>
                            </View>

                        </View>

                        <View style={{ width: '100%', marginVertical: Colors.spacing * 2, borderBottomWidth: .35, borderColor: Colors.borderColor }} />

                        <View style={{}}>

                            <Text style={{ fontSize: 16, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Medium'}}>{item.firstName} {item.lastName}</Text>
                            <View style={{ marginTop: Colors.spacing * .5, marginBottom: Colors.spacing * .5 }}>
                                <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium' }}>{item.address1} {street[1]?.slice(0, 1).toUpperCase() + street[1]?.slice(1) + " " + street[2]?.slice(0, 1).toUpperCase() + street[2]?.slice(1)}</Text>
                                <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium' }}>{item.city.toUpperCase()} {item.postcode}</Text>
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

            {/* <AddJob isOpen={editBooking} onClose={() => setEditBooking(false)} lable={"Edit Booking"} id={item._id} /> */}

            {/*  <AddNotes animation="slide" title="Add notes" onClose={() => setAddNotesVisible(false)} isOpen={addNotesVisible} />
            <DeleteModal id={item._id} phone={phoneNumber} price={price} animation="slide" quoteReference={item.quoteReference} customerName={item.firstName + " " + item.lastName} title="Delete Job" onClose={() => setDeleteJob(false)} isOpen={deleteJob} onPress={deleteJobHandler} />
            <ConfirmBookingModal id={item._id} phone={phoneNumber} price={price} animation="slide" quoteReference={item.quoteReference} customerName={item.firstName + " " + item.lastName} title="Confirm Job" onClose={() => setConfirmBookingVisible(false)} isOpen={confirmBookingVisible} onPress={confirmBookingVisibleHandler} /> */}

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
        justifyContent: 'center',
        overflow: 'hidden'
    },
    leftCard: {
        width: 200,
        paddingVertical: Colors.spacing * 1,
        backgroundColor: Colors.madidlyThemeBlue,
        overflow: 'hidden'
    }

})

export default BookingsCard