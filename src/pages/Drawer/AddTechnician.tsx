import { Dimensions, Modal, Pressable, TextInput, SafeAreaView, StyleSheet, TouchableWithoutFeedback, FlatList, Text, View, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import AddButtonHeader from '../../components/AddButtonHeader';
import { Colors, isAndroid, WIDTH } from '../../assets/Colors';
import InputBox from '../../components/InputBox';
import SelectionCard from '../../components/SelectionCard';
import Divider from '../../components/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { addTechFail, addTechPending, addTechSuccess } from '../../redux/technicianSlice';
import { addTech } from '../../config/TechApi';
import Toast from 'react-native-toast-message';


const stateData = [
    {
        id: '00',
        name: 'NSW',
    },
    {
        id: '01',
        name: 'VIC',
    },
    {
        id: '02',
        name: 'TAS',
    },
    {
        id: '03',
        name: 'WA',
    },
    {
        id: '04',
        name: 'SA',
    },
    {
        id: '05',
        name: 'QLD',
    },
];


const AddTechnician = ({ isOpen, onClose }: any) => {
    const [addData, setAddData] = useState({ firstName: "", lastName: "", email: "", phone: 0, address1: "", address2: "", city: "", postcode: 0, state: "" })
    const dispatch = useDispatch()
    const loading = useSelector((state: any) => state.technicianReducer.loading)

    const onSaveHandler = () => {
        let data = {
            firstName: addData.firstName,
            lastName: addData.lastName,
            email: addData.email,
            phone: addData.phone,
            address: addData.address2,
            postcode: addData.postcode,
            state: addData.state
        }
        dispatch(addTechPending())
        const x: any = addTech(data)
        if (x.status === "error") {
            dispatch(addTechFail())
        } else {
            dispatch(addTechSuccess())
            onClose()
            Toast.show({
                type: 'successToast',
                visibilityTime: 3000,
                text1: "Success",
                text2: Colors.green,
                props: { message: 'Technician created successfully' }
            });
            setAddData({ firstName: "", lastName: "", email: "", phone: 0, address1: "", address2: "", city: "", postcode: 0, state: "" })
        }
    }

    return (
        <>
            <View style={{}}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isOpen}
                >
                    <SafeAreaView />
                    <View style={styles.centeredView}>

                        <AddButtonHeader loading={loading} saveOption={true} onClose={onClose} lable={'Add Technician'} onPress={onSaveHandler} />

                        <View style={styles.modalView}>
                            <ScrollView style={{}}>
                                <View style={[{ paddingHorizontal: Colors.spacing * 2 }]}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, marginTop: Colors.spacing }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>First Name</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox value={addData.firstName} placeholder={addData.firstName} onChange={(val: any) => setAddData({ ...addData, firstName: val })} size={40} rounded={true} placeholderSize={12} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Last Name</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox placeholder={addData.lastName} value={addData.lastName} size={40} rounded={true} placeholderSize={12} onChange={(val: any) => setAddData({ ...addData, lastName: val })} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Phone number</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox maxLength={10} value={addData.phone} onChange={(val: any) => setAddData({ ...addData, phone: val })} placeholder={""} size={40} rounded={true} placeholderSize={12} keyboardType="numeric" />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Email</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox keyboardType={"email-address"} value={addData.email} onChange={(val: any) => setAddData({ ...addData, email: val })} placeholder={addData.email} size={40} rounded={true} placeholderSize={12} capitalize={"none"} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', width: "30%", }}>Street address</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox value={addData.address2} placeholder={addData.address2} onChange={(val) => setAddData({ ...addData, address2: val })} size={40} rounded={true} placeholderSize={12} />
                                        </View>
                                    </View>


                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * 1, }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "22%", }}>
                                            <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Post code</Text>
                                        </View>

                                        <View style={{ marginLeft: Colors.spacing * 3, marginRight: Colors.spacing * .25, width: '70%', flexDirection: 'row', alignItems: 'center', }}>

                                            <View style={{ width: "40%", marginRight: Colors.spacing * 2 }}>
                                                <InputBox value={addData.postcode} size={40} onChange={(val) => setAddData({ ...addData, postcode: parseInt(val) })} rounded={true} placeholder={""} keyboardType="numeric" placeholderSize={12} maxLength={4} />
                                            </View>
                                            <View style={{ width: "40%" }}>
                                                <SelectionCard size={40} onPress={(val) => setAddData({ ...addData, state: val })} fontSize={12} phColor={Colors.maidlyGrayText} rounded={true} data={stateData} type={'filter'} placeholder={'State'} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>

                        </View>


                    </View >
                </Modal >
            </View >


        </>
    )
}

export default AddTechnician

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
        marginTop: Colors.spacing,

    },
    buttonsFull: {
        alignItems: "center",
        marginBottom: Colors.spacing,
        justifyContent: "center",
        backgroundColor: Colors.madidlyThemeBlue,
        height: isAndroid ? 45 : 45,
        borderRadius: Colors.spacing * Colors.spacing,

    },

})
