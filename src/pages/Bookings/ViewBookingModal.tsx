import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native'
import { Colors, isAndroid, lightenColor, WIDTH } from '../../assets/Colors';

import HeaderComponent from '../../components/AddButtonHeader';


import { quoteStatusFail, quoteStatusPending, quoteStatusSuccess, } from '../../redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatusUpdate } from '../../config/JobApi';
import ViewBookingModalComponent from './ViewBookingModalComponent'
import ShowToast from '../../components/ShowToast';

const ViewBookingModal = ({ isOpen, onClose, id, refresh, deleteOpen, toggleDelete, deleteHandler }: any) => {

    const data: any = useSelector((state: any) => state.bookingReducer.id)
    const loading = useSelector((state: any) => state.bookingReducer.bookingbyID)

    const dispatch = useDispatch()

    const statusHandler = async (value: string) => {
        let data = { bookingStatus: value }
        let lable = "booking"
        dispatch(quoteStatusPending())
        const x: any = await fetchStatusUpdate(id, data, lable)
        if (x.data.status === "error") {
            return dispatch(quoteStatusFail());
        }
        dispatch(quoteStatusSuccess())
        refresh(id)
    }


    return (
        <>
            < View >
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isOpen}
                        onRequestClose={onClose}

                    ><SafeAreaView />
                        <View style={styles.centeredView}>
                            <Pressable>
                                <HeaderComponent saveOption={false} onClose={onClose} lable={`#${id?.substring(0)}`} />
                            </Pressable>

                            {loading && <ActivityIndicator color={Colors.madidlyThemeBlue} animating={loading} size={'small'} style={{}} />}

                            <View style={styles.modalView}>
                                {data.map((item: any) => {
                                    return (
                                        <ViewBookingModalComponent
                                            statusHandler={statusHandler} key={item._id} id={id} item={item} refresh={refresh}
                                            deleteOpen={deleteOpen}
                                            toggleDelete={toggleDelete}
                                            deleteHandler={deleteHandler} />
                                    )
                                })}
                            </View>

                        </View>
                    </Modal >
                </View >
            </View>
        </>
    )
}

export default ViewBookingModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
    },
    modalView: {
        backgroundColor: "white",
        width: WIDTH,
        flex: 1,
        paddingVertical: Colors.spacing * 1,
    },


})