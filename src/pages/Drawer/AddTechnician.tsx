import { Dimensions, Modal, Pressable, TextInput, SafeAreaView, StyleSheet, TouchableWithoutFeedback, FlatList, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import AddButtonHeader from '../../components/AddButtonHeader';
import { Colors, isAndroid, WIDTH } from '../../assets/Colors';
import InputBox from '../../components/InputBox';
import SelectionCard from '../../components/SelectionCard';
import Divider from '../../components/Divider';





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


const AddTechnician = ({ isOpen, onClose }) => {
    const [addData, setAddData] = useState({ firstName: "", lastName: "", email: "", phone: "", address1: "", address2: "", city: "", postcode: "", state: "" })

    const onSaveHandler = () => {
        console.log('tech saved', addData)
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

                        <AddButtonHeader saveOption={true} onClose={onClose} lable={'Add Technician'} onPress={onSaveHandler} />

                        <View style={styles.modalView}>
                            <ScrollView style={{}}>
                                <View style={[{ paddingHorizontal: Colors.spacing * 2 }]}>


                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, marginTop: Colors.spacing }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>First Name</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox placeholder={addData.firstName} value={addData.firstName} onChange={(val) => setAddData({ ...addData, firstName: val })} size={40} rounded={true} placeholderSize={12} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Last Name</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox placeholder={addData.lastName} value={addData.lastName} size={40} rounded={true} placeholderSize={12} onChange={(val) => setAddData({ ...addData, lastName: val })} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Phone number</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox maxLength={10} value={addData.phone} onChange={(val) => setAddData({ ...addData, phone: val })} placeholder={addData.phone} size={40} rounded={true} placeholderSize={12} keyboardType="numeric" />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Email</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox keyboardType={"email-address"} value={addData.email} onChange={(val) => setAddData({ ...addData, email: val })} placeholder={addData.email} size={40} rounded={true} placeholderSize={12} capitalize={"none"} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Unit</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox value={addData.address1} placeholder={addData.address1} onChange={(val) => setAddData({ ...addData, address1: val })} size={40} capitalize={"characters"} rounded={true} placeholderSize={12} maxLength={4} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", width: "30%", }}>Street address</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox value={addData.address2} placeholder={addData.address2} onChange={(val) => setAddData({ ...addData, address2: val })} size={40} rounded={true} placeholderSize={12} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Suburb</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox value={addData.city} onChange={(val) => setAddData({ ...addData, city: val })} placeholder={addData.city} size={40} rounded={true} placeholderSize={12} />
                                        </View>
                                    </View>


                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * 1, }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "22%", }}>
                                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Post code</Text>
                                        </View>

                                        <View style={{ marginLeft: Colors.spacing * 3, marginRight: Colors.spacing * .25, width: '70%', flexDirection: 'row', alignItems: 'center', }}>

                                            <View style={{ width: "40%", marginRight: Colors.spacing * 2 }}>
                                                <InputBox value={addData.postcode} size={40} onChange={(val) => setAddData({ ...addData, postcode: val })} rounded={true} placeholder={addData.postcode} keyboardType="numeric" placeholderSize={12} maxLength={4} />
                                            </View>
                                            <View style={{ width: "40%" }}>
                                                <SelectionCard size={40} onPress={(val) => setAddData({ ...addData, state: val })} fontSize={12} phColor={Colors.maidlyGrayText} rounded={true} data={stateData} type={'filter'} placeholder={'state'} />
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
        paddingBottom: Colors.spacing,

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
