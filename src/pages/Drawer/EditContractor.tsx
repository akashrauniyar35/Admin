import { Dimensions, Modal, Pressable, TextInput, SafeAreaView, StyleSheet, TouchableWithoutFeedback, FlatList, Text, View, ScrollView, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import AddButtonHeader from '../../components/AddButtonHeader';
import { Colors, isAndroid, WIDTH } from '../../assets/Colors';
import InputBox from '../../components/InputBox';
import SelectionCard from '../../components/SelectionCard';
import worker from "../../assets/worker.png"

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


const EditContractor = ({ id, uploadImage, updating, isOpen, deleteLoading, onClose, onSave, editedData, loading, data, setEditedData, deleteHandler, refresh }: any) => {
    const pic = data?.profilePic?.src

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

                        <AddButtonHeader onPress={onSave} loading={updating} saveOption={true} onClose={onClose} lable={'Edit Technician'} />

                        <View style={styles.modalView}>
                            <ScrollView style={{}}>
                                <View style={[{ paddingHorizontal: Colors.spacing * 2 }]}>

                                    <View style={[{ marginBottom: Colors.spacing * 2, position: 'relative', alignItems: 'center', justifyContent: 'center' }]}>


                                        {loading ?

                                            <View style={{ alignSelf: 'center', borderRadius: 100, width: 100, height: 100, alignItems: 'center', borderWidth: 5, borderColor: Colors.madidlyThemeBlue, justifyContent: 'center', padding: 4, }}>
                                                <ActivityIndicator color={Colors.madidlyThemeBlue} animating={loading} size={'small'} style={{}} />
                                            </View> : <View style={{ alignSelf: 'center', borderRadius: 100, width: 100, height: 100, alignItems: 'center', borderWidth: 5, borderColor: Colors.madidlyThemeBlue, justifyContent: 'center', padding: 4, }}>

                                                <Image source={pic !== "" ? { uri: pic } : worker} style={{ width: 80, height: 80, borderRadius: 100 }} />
                                                <Pressable onPress={() => uploadImage(id, pic)} style={{ backgroundColor: '#fff', position: 'absolute', bottom: 0, right: 0, borderRadius: 100, borderColor: '#fff', }}>
                                                    <IconM name="plus-circle" style={{ color: Colors.madidlyThemeBlue }} size={25} />
                                                </Pressable>
                                            </View>
                                        }

                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, marginTop: Colors.spacing }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>First Name</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox value={data.firstName} placeholder={data?.firstName} onChange={(val: any) => setEditedData({ ...editedData, firstName: val })} size={40} rounded={true} placeholderSize={12} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Last Name</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox value={data.lastName} placeholder={data?.lastName} size={40} rounded={true} placeholderSize={12} onChange={(val: any) => setEditedData({ ...editedData, lastName: val })} />
                                        </View>
                                    </View>


                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Phone number</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox value={data?.phone} maxLength={10} onChange={(val: any) => setEditedData({ ...editedData, phone: val })} placeholder={data?.phone?.toString()} size={40} rounded={true} placeholderSize={12} keyboardType="numeric" />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Email</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox value={data.email} keyboardType={"email-address"} onChange={(val: any) => setEditedData({ ...editedData, email: val })} placeholder={data?.email} size={40} rounded={true} placeholderSize={12} capitalize={"none"} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", width: "30%", }}>Street address</Text>
                                        <View style={{ width: "70%", }}>
                                            <InputBox value={data.address} placeholder={data?.address} onChange={(val: any) => setEditedData({ ...editedData, address: val })} capitalize={"words"} size={40} rounded={true} placeholderSize={12} />
                                        </View>
                                    </View>


                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * 1, }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "22%", }}>
                                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Post code</Text>
                                        </View>

                                        <View style={{ marginLeft: Colors.spacing * 3, marginRight: Colors.spacing * .25, width: '70%', flexDirection: 'row', alignItems: 'center', }}>

                                            <View style={{ width: "40%", marginRight: Colors.spacing * 2 }}>
                                                <InputBox value={editedData.postcode} size={40} onChange={(val: any) => setEditedData({ ...editedData, postcode: val })} rounded={true} placeholder={data?.postcode} keyboardType="numeric" placeholderSize={12} maxLength={4} />
                                            </View>
                                            <View style={{ width: "40%" }}>
                                                <SelectionCard size={40} onPress={(val: any) => setEditedData({ ...editedData, state: val })} fontSize={12} phColor={Colors.maidlyGrayText} rounded={true} data={stateData} type={'filter'} placeholder={data?.state} />
                                            </View>
                                        </View>
                                    </View>


                                    <Pressable onPress={deleteHandler}>
                                        <View style={[styles.buttonsFull, { backgroundColor: Colors.red, }]}>
                                            {deleteLoading ? <ActivityIndicator color="white" size={'small'} animating={deleteLoading} style={{ transform: [{ scale: .7 }], marginLeft: Colors.spacing * .5, }} /> : <Text style={{
                                                fontSize: 12,
                                                color: 'white', fontWeight: isAndroid ? "900" : "700"
                                            }}>{'Delete'}</Text>}
                                        </View>
                                    </Pressable>

                                </View>
                            </ScrollView>
                        </View>
                    </View >
                </Modal >
            </View >

        </>
    )
}

export default EditContractor

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
        paddingTop: Colors.spacing
    },
    buttonsFull: {
        alignItems: "center",
        marginTop: Colors.spacing * 2,
        justifyContent: "center",
        flexDirection: 'row',
        backgroundColor: Colors.madidlyThemeBlue,
        height: 45,
        borderRadius: Colors.spacing * Colors.spacing,

    },


})
