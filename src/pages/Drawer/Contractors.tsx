import { Image, Pressable, SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Header from '../../components/Header'
import { Colors, isAndroid } from '../../assets/Colors'
import EditContractor from './EditContractor'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTechFail, getAllTechPending, getAllTechSuccess, viewTechIDFail, viewTechIDPending, viewTechIDSuccess } from '../../redux/technicianSlice'
import { fetchAllTechnician, fetchTecByID } from '../../config/TechApi'
import worker from "../../assets/worker.png"

const Contractors = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [Id, setID] = useState(String)
    const [techOnj, setTechObj] = useState({})
    const [data, setData] = useState([]);
    const loading = useSelector((state: any) => state.technicianReducer.loading)
    const editLoading = useSelector((state: any) => state.technicianReducer.editLoading)
    const deleteLoading = useSelector((state: any) => state.technicianReducer.deleteLoading)

    const dispatch = useDispatch()


    // getAllTechPending, getAllTechSuccess, getAllTechFail,
    // addTechPending, addTechSuccess, addTechFail,
    // editTechPending, editTechSuccess, editTechFail,
    // deleteTechPending, deleteTechSuccess, deleteTechFail

    const getAllTech = async () => {
        dispatch(getAllTechPending())
        const x: any = await fetchAllTechnician()
        if (x.data.status === "error") {
            dispatch(getAllTechFail())
        } else {
            dispatch(getAllTechSuccess())
            setData(x.data.paginatedResults)
        }
    }


    const editHandler = async () => {
        // viewTechIDPending, viewTechIDFail, viewTechIDSuccess,
        // dispatch(viewTechIDPending())
        // const x: any = await fetchTecByID(ID)
        // if (x.data.status === "error") {
        //     dispatch(viewTechIDFail())
        // } else {
        //     dispatch(viewTechIDSuccess())
        //     setData(x.data.paginatedResults)
        // }
    }

    const deleteHandler = async () => {

    }

    useEffect(() => {
        getAllTech()
    }, [])

    useEffect(() => {
        getAllTech()
    }, [Id])


    const TechCard = ({ id, firstName, lastName, phone, email, address, pic }) => {
        return (
            <Pressable onPress={() => { setID(id); setIsOpen(!isOpen) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: Colors.spacing, borderRadius: 5, marginBottom: Colors.spacing * 2 }}>
                    <View style={{ alignSelf: 'center', borderRadius: 100, alignItems: 'center', borderWidth: 5, borderColor: Colors.madidlyThemeBlue, justifyContent: 'center', padding: 2, }}>
                        <Image source={pic !== "" ? { uri: pic } : worker} style={{ width: 60, height: 60, borderRadius: 100 }} />
                    </View>
                    <View style={{ marginLeft: Colors.spacing }}>
                        <Text style={{ fontSize: 14, color: Colors.black, fontWeight: isAndroid ? "900" : "700", marginBottom: Colors.spacing }}>{`${firstName} ${lastName}`}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "400" }}>{phone}</Text>
                            < View style={{ backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, marginHorizontal: Colors.spacing * .5, borderRadius: 100, }} />
                            <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "400" }}>{email}</Text>
                        </View>
                        <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "400", }}>{address}</Text>
                    </View>
                </View>
            </Pressable>
        )
    }

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />
                <Header nav={navigation} title="Contractors" />
                <View style={{ flex: 1, marginTop: Colors.spacing * 2 }}>
                    <FlatList
                        refreshing={loading}
                        showsVerticalScrollIndicator={false}
                        onRefresh={() => getAllTech()}
                        contentContainerStyle={{ paddingHorizontal: Colors.spacing * 2 }}
                        data={data}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => { return <TechCard id={item?._id} firstName={item?.firstName} address={item?.address} lastName={item?.lastName} email={item?.email} phone={item?.phone} pic={item.profilePic.src} /> }}
                    />
                </View>
            </View>
            <EditContractor id={Id} isOpen={isOpen} onClose={() => { setIsOpen(false); getAllTech() }} editHandler={editHandler} loading={editLoading} />
        </>
    )
}

export default Contractors

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.madlyBGBlue, },
})