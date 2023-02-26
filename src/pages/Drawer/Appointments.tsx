import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Colors } from '../../assets/Colors'
import Agenda from '../../components/Agenda'
import ShowToast from '../../components/ShowToast'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAppointments, fetchTodayBookings } from '../../config/BookingApi'
import { getAppointmentsFail, getAppointmentsPending, getAppointmentsSuccess } from '../../redux/appointmentSlice'
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

const Appointments = ({ navigation }) => {
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.appointmentReducer.data)
    const loadings = useSelector((state: any) => state.appointmentReducer.loading)
    const isFocused = useIsFocused()
    const [loading, setLoading] = useState(true)

    const getAllAppointments = async () => {
        console.log("refresg")
        dispatch(getAppointmentsPending())
        const x: any = await fetchAppointments()
        if (x.data.status === "error") {
            return dispatch(getAppointmentsFail(x.data.status));
        }
        dispatch(getAppointmentsSuccess(x.data.paginatedResults))
    }



    useEffect(() => {
        getAllAppointments()
        setTimeout(() => setLoading(false), 1000)
    }, [data.length])

    return (
        <>
            <View>
                <SafeAreaView />
                <View style={{ backgroundColor: Colors.madlyBGBlue, }}>
                    <Header nav={navigation} title="Appointments" />
                    <View style={{ marginBottom: Colors.spacing * 1 }} />

                    <View style={{ backgroundColor: Colors.madlyBGBlue, }}>
                        <Agenda nav={navigation} data={data} refresh={getAllAppointments} />
                    

                        {loading &&
                            <View style={{ position: 'absolute', zIndex: 1, top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator color={Colors.madidlyThemeBlue} animating={loading} />
                            </View>
                        }

                    </View>

                </View>
            </View>
            <ShowToast />

        </>
    )
}

export default Appointments

const styles = StyleSheet.create({})