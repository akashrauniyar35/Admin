import { Dimensions, Modal, Pressable, TextInput, SafeAreaView, StyleSheet, TouchableWithoutFeedback, FlatList, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import AddButtonHeader from '../../components/AddButtonHeader';
import { Colors, isAndroid, WIDTH } from '../../assets/Colors';
import InputBox from '../../components/InputBox';
import SelectionCard from '../../components/SelectionCard';
import PriceInput from '../../components/PriceInput';

const statusData = [
    {
        id: '00',
        name: 'Inactive',
    },
    {
        id: '01',
        name: 'Active',
    },
]

const EditProduct = ({ loading, deleteHandler, isOpen, onClose, title, price, status, id, value, editHandler, onSave, deleteLoading }: any) => {

    const [amount, setAmount] = useState(price)

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

                        <AddButtonHeader loading={loading} onClose={onClose} lable={'Edit Product'} saveOption={true} onPress={onSave} />


                        <View style={styles.modalView}>

                            <View style={{}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                    <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Name</Text>
                                    <View style={{ width: "70%", }}>
                                        <InputBox value={value.title} onChange={(val: any) => editHandler({ ...value, title: val })} placeholder={title} size={40} rounded={true} placeholderSize={12} />
                                    </View>
                                </View>
                            </View>

                            <View style={{}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                    <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Total Net Price</Text>
                                    <View style={{ width: "70%", }}>

                                        <InputBox value={value.price} onChange={(val: any) => editHandler({ ...value, price: val })} placeholder={`$ ${price?.toString()}.00`} size={40} rounded={true} placeholderSize={12} keyboardType="numeric" />
                                    </View>
                                </View>

                            </View>

                            <View style={{}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                    <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>Status</Text>
                                    <View style={{ width: "70%", }}>
                                        <SelectionCard phColor={Colors.maidlyGrayText} data={statusData} placeholder={status} rounded={true} fontSize={12} onPress={(val: any) => editHandler({ ...value, status: val })} />
                                    </View>
                                </View>
                            </View>



                            <Pressable onPress={deleteHandler}>
                                <View style={[styles.buttonsFull, { backgroundColor: Colors.red, }]}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: 'white', fontWeight: isAndroid ? "900" : "700"
                                    }}>{deleteLoading ? 'Deleting' : 'Delete'}</Text>
                                    {deleteLoading && <ActivityIndicator color="white" size={'small'} animating={deleteLoading} style={{ transform: [{ scale: .7 }], marginLeft: Colors.spacing * .5, }} />}
                                </View>
                            </Pressable>
                        </View>

                    </View >
                </Modal >
            </View >

        </>
    )
}

export default EditProduct

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
        paddingHorizontal: Colors.spacing * 2,
        flex: 1,
        paddingTop: Colors.spacing * 2,

    },
    buttonsFull: {
        alignItems: "center",
        marginBottom: Colors.spacing * 2,
        justifyContent: "center",
        flexDirection: 'row',
        backgroundColor: Colors.madidlyThemeBlue,
        height: isAndroid ? 45 : 45,
        borderRadius: Colors.spacing * Colors.spacing,

    },


})
