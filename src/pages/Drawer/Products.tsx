import { Pressable, SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../../components/Header'
import { Colors, HEIGHT, isAndroid } from '../../assets/Colors'
import EditProduct from './EditProduct';
import AddProducts from './AddProducts';
import Divider from '../../components/Divider';
import { getInitials } from '../../components/dataConverters';
import { fetchAllProducts, fetchDeleteProducts, fetchEditProducts } from '../../config/ProductsApi';
import { deleteProductFail, deleteProductPending, deleteProductSuccess, editProductFail, editProductPending, editProductSuccess, getAllProductsFail, getAllProductsPending, getAllProductsSuccess } from '../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import ShowToast from '../../components/ShowToast';
import Toast from 'react-native-toast-message';



const Expenses = ({ navigation }) => {
    const [editProduct, seteditProduct] = useState(false);
    const [selected, setSelected] = useState<any>({})
    const [data, setData] = useState([]);
    const loading = useSelector((state: any) => state.productReducer.loading)
    const deleteLoading = useSelector((state: any) => state.productReducer.deleteLoading)

    const dispatch = useDispatch()

    const getAllProducts = async () => {
        dispatch(getAllProductsPending())
        let data: any = await fetchAllProducts()
        if (data.data.status === "error") {
            dispatch(getAllProductsFail())
        }
        dispatch(getAllProductsSuccess());
        setData(data.data.result)
    }


    function toggleEditProduct(item: any) {
        seteditProduct(!editProduct)
        setSelected(item)
    }


    const onSaveHandler = async () => {
        let id = selected?._id

        const x: any = {
            title: selected?.title,
            price: selected?.price,
            status: selected?.status
        }
        dispatch(editProductPending());

        const data: any = await fetchEditProducts(id, x)
        if (data.data.status === "error") {
            dispatch(editProductFail())
        }
        dispatch(editProductSuccess());
        console.log('getAllProductsSuccess', data)
        seteditProduct(false)
        getAllProducts()
        Toast.show({
            type: 'successToast',
            visibilityTime: 3000,
            text1: "Success",
            text2: Colors.green,
            props: { message: 'Product updated successfully' }
        });
    }

    const onDeleteHandler = async () => {
        let id = selected?._id

        dispatch(deleteProductPending());

        const data: any = await fetchDeleteProducts(id)
        if (data.data.status === "error") {
            dispatch(deleteProductFail())
        }
        dispatch(deleteProductSuccess());
        console.log('getAllProductsSuccess', data)
        seteditProduct(false)
        getAllProducts()
        Toast.show({
            type: 'successToast',
            visibilityTime: 3000,
            text1: "Success",
            text2: Colors.red,
            props: { message: 'Product deleted successfully' }
        });
    }


    useEffect(() => {
        getAllProducts()
    }, [data.length])

    const ProductsCard = ({ item }: any) => {
        return (
            <Pressable onPress={() => toggleEditProduct(item)}>
                <View style={{ backgroundColor: 'white', padding: Colors.spacing, borderRadius: 5, marginBottom: Colors.spacing * 2 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                        <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: Colors.madidlyThemeBlue, borderRadius: Colors.spacing * Colors.spacing, marginRight: Colors.spacing }}>
                            <Text style={{ fontSize: 18, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Bold', }}>{item.title === "Bedroom" ? "BD" : item.title === "Bathroom" ? "BR" : getInitials(item.title)}</Text>
                        </View>

                        <View style={{}}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontWeight: isAndroid ? "900" : "700", marginBottom: Colors.spacing }}>Per {item.title}</Text>

                            {item.title === 'Base Price' ?
                                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>Base price for all products</Text> :
                                <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>Cost per {item.title.toLowerCase()}</Text>}
                        </View>

                    </View>

                    <View style={{ marginTop: Colors.spacing * 2, marginBottom: Colors.spacing }}>
                        <Divider height={.5} colors={'gray'} width="110%" opacity={.1} />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>


                        <View style={{}}>

                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing * .5 }}>$ {item.price.toFixed(2)}</Text>
                            <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>Price</Text>
                        </View>

                        <View style={{}}>

                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing * .5 }}>{'Standard'}</Text>
                            <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>Type</Text>
                        </View>

                        <View style={{ position: 'relative', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ position: 'absolute', marginLeft: -Colors.spacing * 1.5, borderRadius: 100, backgroundColor: item.status === "Inactive" ? Colors.red : Colors.green, width: 10, height: 10, }}></View>
                                <Text style={{ position: 'relative', fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', }}>{item.status}</Text>
                            </View>

                            <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>Status</Text>
                        </View>
                    </View>

                </View>
            </Pressable >
        )
    }

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />
                <Header nav={navigation} title="Products" searchEnabled={true} />
                <View style={{ flex: .96, paddingHorizontal: Colors.spacing * 2, marginTop: Colors.spacing * 2 }}>
                    <FlatList
                        refreshing={loading}
                        onRefresh={() => getAllProducts()}
                        showsVerticalScrollIndicator={false}
                        data={data}
                        contentContainerStyle={{ paddingBottom: Colors.spacing * 4 }}
                        keyExtractor={(item: any) => item.id}
                        renderItem={({ item }) => (<ProductsCard item={item} />)}
                    />
                </View>
            </View>

            <EditProduct loading={loading} onSave={onSaveHandler} value={selected} id={selected?._id} title={selected?.title} price={selected?.price} status={selected?.status} isOpen={editProduct} onClose={() => { seteditProduct(false); getAllProducts() }} editHandler={setSelected} deleteHandler={onDeleteHandler} deleteLoading={deleteLoading} />
            <ShowToast />
        </>
    )
}

export default Expenses

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.madlyBGBlue, },
})