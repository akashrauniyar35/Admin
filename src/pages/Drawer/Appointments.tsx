import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../components/Header'
import { Colors } from '../../assets/Colors'
import Agenda from '../../components/Agenda'
import ShowToast from '../../components/ShowToast'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAppointments, fetchTodayBookings } from '../../config/BookingApi'
import { getAppointmentsFail, getAppointmentsPending, getAppointmentsSuccess } from '../../redux/appointmentSlice'



const Appointments = ({ navigation }) => {
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.appointmentReducer.data)


    const getAllAppointments = async () => {
        dispatch(getAppointmentsPending())
        const x: any = await fetchAppointments()
        if (x.data.status === "error") {
            return dispatch(getAppointmentsFail(x.data.status));
        }
        dispatch(getAppointmentsSuccess(x.data.paginatedResults))
    }


    useEffect(() => {
        getAllAppointments()
    }, [data.length])

    return (
        <>
            <View>
                <SafeAreaView />
                <View style={{ backgroundColor: Colors.madlyBGBlue, }}>
                    <Header nav={navigation} title="Appointments" />
                    <View style={{ marginBottom: Colors.spacing * 1 }} />

                    <View style={{}} />
                    <View style={{ backgroundColor: Colors.madlyBGBlue, }}>
                        <Agenda nav={navigation} data={data} />
                    </View>
                </View>
            </View>
            <ShowToast />

        </>
    )
}

export default Appointments

const styles = StyleSheet.create({})