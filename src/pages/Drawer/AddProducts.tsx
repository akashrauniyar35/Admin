import {
    Dimensions, Modal, Pressable, TextInput, SafeAreaView, StyleSheet,
    TouchableWithoutFeedback, FlatList, Text, View, ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import AddButtonHeader from '../../components/AddButtonHeader';
import { Colors, isAndroid, WIDTH } from '../../assets/Colors';
import InputBox from '../../components/InputBox';
import SelectionCard from '../../components/SelectionCard';
import { createProduct } from '../../config/ProductsApi';
import { useDispatch, useSelector } from 'react-redux';
import { editProductFail, editProductPending, editProductSuccess } from '../../redux/productSlice';
import Toast from 'react-native-toast-message';
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

const AddProducts = ({ isOpen, onClose }: any) => {
    const [obj, setObj] = useState({ title: '', quantity: 0, price: 0, icon1: 'milan', status: 'Inactive' })
    const dispatch = useDispatch()
    const loading = useSelector((state: any) => state.productReducer.loading)

    const onSaveHandler = async () => {
        console.log('Product saved obj', obj)
        dispatch(editProductPending());
        const data: any = await createProduct(obj)
        if (data.data.status === "error") {
            dispatch(editProductFail())
        }
        dispatch(editProductSuccess());
        onClose()
        Toast.show({
            type: 'successToast',
            visibilityTime: 3000,
            text1: "Success",
            text2: Colors.green,
            props: { message: 'Product created successfully' }
        });
        setObj({ title: '', quantity: 0, price: 0, icon1: 'milan', status: 'Inactive' })
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

                        <AddButtonHeader onClose={() => {
                            onClose(); setObj({ title: '', quantity: 0, price: 0, icon1: 'milan', status: 'Inactive' })
                        }} lable={'Add Product'} loading={loading} saveOption={true} onPress={onSaveHandler} />

                        <View style={styles.modalView}>
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Name</Text>
                                    <View style={{ width: "70%", }}>
                                        <InputBox value={obj.title} capitalize={"words"} onChange={(val: any) => setObj({ ...obj, title: val })} placeholder={obj.title} size={40} rounded={true} placeholderSize={12} />
                                    </View>
                                </View>

                            </View>

                            <View style={{}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Total Net Price</Text>
                                    <View style={{ width: "70%", }}>
                                        <PriceInput bg="white" value={obj.price} onChange={(val: any) => setObj({ ...obj, price: parseInt(val) })} placeholderSize={14} size={40} placeholder={`0.00`} />
                                    </View>
                                </View>
                            </View>

                            <View style={{}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Status</Text>
                                    <View style={{ width: "70%", }}>
                                        <SelectionCard phColor={Colors.maidlyGrayText} data={statusData} placeholder={obj.status} rounded={true} fontSize={12} onPress={(val: any) => setObj({ ...obj, status: val })} />
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>
                </Modal>
            </View>


        </>
    )
}

export default AddProducts

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
        paddingHorizontal: Colors.spacing * 2,
        paddingTop: Colors.spacing * 1,

    },


})
