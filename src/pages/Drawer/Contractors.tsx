import { Image, Pressable, SafeAreaView, FlatList, StyleSheet, Text, View, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'

import Header from '../../components/Header'
import { Colors, isAndroid } from '../../assets/Colors'
import EditContractor from './EditContractor'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTechFail, deleteTechPending, deleteTechSuccess, editTechFail, editTechPending, editTechSuccess, getAllTechFail, getAllTechPending, getAllTechSuccess, viewTechIDFail, viewTechIDPending, viewTechIDSuccess } from '../../redux/technicianSlice'
import { fetchAllTechnician, fetchEditTech, fetchTecByID, removeTech, uploadTechPicture } from '../../config/TechApi'
import worker from "../../assets/worker.png"
import Toast from 'react-native-toast-message';
import ShowToast from '../../components/ShowToast'
import { launchImageLibrary } from 'react-native-image-picker'

const Contractors = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [Id, setID] = useState(String)
    const [techObj, setTechObj] = useState<any>({})
    const [data, setData] = useState([]);
    const loading = useSelector((state: any) => state.technicianReducer.loading)
    const techLoading = useSelector((state: any) => state.technicianReducer.viewIDLoading)
    const editLoading = useSelector((state: any) => state.technicianReducer.editLoading)
    const deleteLoading = useSelector((state: any) => state.technicianReducer.deleteLoading)
    const [uploading, setUploading] = useState<any>(false);

    const dispatch = useDispatch()

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

    const updateTechHandler = async (id: string) => {
        dispatch(editTechPending());
        let data: any = {
            firstName: techObj?.firstName,
            lastName: techObj?.lastName,
            phone: techObj?.phone,
            email: techObj?.email,
            address: techObj?.address,
            postcode: techObj?.postcode,
            state: techObj?.state,
        }
        const x: any = await fetchEditTech(Id, data)
        if (x.data.status === "success") {
            dispatch(editTechSuccess())
            setIsOpen(false)
            Toast.show({
                type: 'successToast',
                visibilityTime: 3000,
                text1: "Success",
                text2: Colors.green,
                props: { message: 'Technician updated successfully' }
            });
            getAllTech()
        } else {
            dispatch(editTechFail())
        }
    }

    const deleteHandler = async () => {
        dispatch(deleteTechPending())
        const x: any = await removeTech(Id)
        if (x.status === "error") {
            dispatch(deleteTechFail())
        } else {
            dispatch(deleteTechSuccess())
            setIsOpen(false)
            Toast.show({
                type: 'successToast',
                visibilityTime: 3000,
                text1: "Success",
                text2: Colors.red,
                props: { message: 'Technician deleted successfully' }
            });
            getAllTech()
        }
    }


    const uploadImageHandler = async (id: any, pic: any) => {
        const options: any = {
            mediaType: 'photo',
            maxWidth: 1024,
            maxHeight: 1024,
            quality: 1,
        }
        const result: any = await launchImageLibrary(options)
        const file = result?.assets[0]
        uploadTechPicture(file, pic, id, ViewTechHandler, setUploading)
    }

    const ViewTechHandler = async (id: any) => {
        dispatch(viewTechIDPending)
        setIsOpen(true)
        const x: any = await fetchTecByID(id)
        if (x.data.status === "success") {
            dispatch(viewTechIDSuccess())
            console.log('xxxx', x.data.result)
            setTechObj(x.data.result[0])
        }
        dispatch(viewTechIDFail())
    }

    useEffect(() => {
        getAllTech()
    }, [])


    const TechCard = ({ id, firstName, lastName, phone, email, address, pic, item }: any) => {
        return (
            <Pressable onPress={() => { setID(id); ViewTechHandler(id) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: Colors.spacing, borderRadius: 5, marginBottom: Colors.spacing * 2 }}>
                    <View style={{ alignSelf: 'center', borderRadius: 100, alignItems: 'center', borderWidth: 5, borderColor: Colors.madidlyThemeBlue, justifyContent: 'center', padding: 2, }}>
                        <Image source={pic !== "" ? { uri: pic } : worker} style={{ width: 60, height: 60, borderRadius: 100 }} />
                    </View>
                    <View style={{ marginLeft: Colors.spacing }}>
                        <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing }}>{`${firstName} ${lastName}`}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Pressable onPress={() => Linking.openURL(`tel:0${phone}`)}>
                                <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>0{phone}</Text>
                            </Pressable>
                            < View style={{ backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, marginHorizontal: Colors.spacing * .5, borderRadius: 100, }} />
                            <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{email}</Text>
                        </View>
                        <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>{address}</Text>
                    </View>
                </View>
            </Pressable>
        )
    }
    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />
                <Header nav={navigation} title="Technicians" route="technician" searchEnabled={true} />
                <View style={{ flex: .96, marginTop: Colors.spacing * 2 }}>
                    <FlatList
                        refreshing={loading}
                        showsVerticalScrollIndicator={false}
                        onRefresh={() => getAllTech()}
                        contentContainerStyle={{ paddingHorizontal: Colors.spacing * 2, paddingBottom: Colors.spacing * 4 }}
                        data={data}
                        keyExtractor={(item: any) => item._id}
                        renderItem={({ item }) => { return <TechCard item={item} id={item?._id} firstName={item?.firstName} address={item?.address} lastName={item?.lastName} email={item?.email} phone={item?.phone} pic={item.profilePic.src} /> }}
                    />
                </View>
            </View>
            <EditContractor uploadImage={uploadImageHandler} id={Id} isOpen={isOpen} onClose={() => { setIsOpen(false); getAllTech() }} updating={editLoading} deleteLoading={deleteLoading} refresh={techLoading} loading={uploading} data={techObj} editedData={techObj} setEditedData={setTechObj} onSave={updateTechHandler} deleteHandler={deleteHandler} />
            <ShowToast />
        </>
    )
}

export default Contractors
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.madlyBGBlue, },
})