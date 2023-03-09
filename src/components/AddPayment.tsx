import { Dimensions, FlatList, Modal, Platform, Pressable, SafeAreaView, ActivityIndicator, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, HEIGHT, WIDTH } from '../assets/Colors';
import CheckListCard from './CheckListCard';
import AddCheckList from './AddCheckList';
import { useSelector } from 'react-redux';
const isAndroid = Platform.OS == 'android' ? true : false
const { width, height } = Dimensions.get('screen')



const AddPaymentModal = ({ loading, onPress, isOpen, title, onClose, id, paid, customerName, quoteReference, price, phone }: any) => {
    const outstanding = price - paid;

    return (

        <>

            <Modal
                animationType={"fade"}
                transparent={true}
                visible={isOpen}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.transparentGloss, }}>
                    <SafeAreaView />
                    <View style={{
                        backgroundColor: 'white',
                        width: width * .9,
                        borderTopRightRadius: Colors.spacing * 2,
                    }}>

                        <View style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white',
                            // borderBottomWidth: 1,
                            paddingHorizontal: Colors.spacing * 2,
                            paddingVertical: Colors.spacing * 1,
                            shadowRadius: 2,
                            shadowOffset: { width: 0, height: .5 },
                            shadowOpacity: .2,
                            elevation: 2,
                            shadowColor: Colors.grayOne,
                        }}>

                            <Pressable
                                style={{}}
                            ><Icon name="chevron-back" size={28} color={'white'} /></Pressable>
                            <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Bold', }}>{title}</Text><Icon name="chevron-back" size={28} color={'white'} />
                        </View>


                        <View style={styles.container}>


                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ fontFamily: "Outfit", width: '40%', fontSize: 12, color: Colors.grayOne, fontWeight: isAndroid ? "900" : "600" }}>Quote Ref </Text>
                                <Text style={{ fontFamily: "Outfit", fontSize: 12, color: Colors.madidlyThemeBlue, fontWeight: isAndroid ? "900" : "600" }}>{quoteReference}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing * 1, }}>
                                <Text style={{ fontFamily: "Outfit", width: '40%', fontSize: 12, color: Colors.grayOne, fontWeight: isAndroid ? "900" : "600" }}>Customer Name </Text>
                                <Text style={{ fontFamily: "Outfit", fontSize: 12, color: Colors.madidlyThemeBlue, fontWeight: isAndroid ? "900" : "600" }}>{customerName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing * 1, }}>
                                <Text style={{ width: '40%', fontSize: 12, color: Colors.grayOne, fontWeight: isAndroid ? "900" : "600", fontFamily: "Outfit", }}>Total </Text>
                                <Text style={{ fontFamily: "Outfit", fontSize: 12, color: Colors.madidlyThemeBlue, fontWeight: isAndroid ? "900" : "600" }}>$ {price}.00</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing * 1, }}>
                                <Text style={{ width: '40%', fontSize: 12, color: Colors.grayOne, fontWeight: isAndroid ? "900" : "600", fontFamily: "Outfit", }}>Paid </Text>
                                <Text style={{ fontFamily: "Outfit", fontSize: 12, color: Colors.madidlyThemeBlue, fontWeight: isAndroid ? "900" : "600" }}>$ {paid}.00</Text>
                            </View>
                            <View style={{ marginVertical: Colors.spacing * 1, borderBottomWidth: .35, borderColor: Colors.borderColor }} />

                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ width: '40%', fontSize: 12, color: Colors.grayOne, fontWeight: isAndroid ? "900" : "600", fontFamily: "Outfit", }}>Outstanding </Text>
                                <Text style={{ fontFamily: "Outfit", fontSize: 12, color: Colors.madidlyThemeBlue, fontWeight: isAndroid ? "900" : "600" }}>$ {outstanding}.00</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Pressable style={styles.save} onPress={onClose}>
                                    <Text style={{ fontFamily: "Outfit-Bold", color: 'white', fontSize: 14, fontWeight: isAndroid ? "900" : "600" }}>Cancel</Text>
                                </Pressable>
                                <Pressable style={[styles.save, { flexDirection: 'row', alignItems: 'center' }]} onPress={onPress}>
                                    {loading ? <ActivityIndicator color="white" size={'small'} animating={loading} style={{ transform: [{ scale: .7 }], marginLeft: Colors.spacing * .5, }} /> : <Text style={{ fontFamily: "Outfit-Bold", color: 'white', fontSize: 14, fontWeight: isAndroid ? "900" : "600" }}>Mark as paid</Text>}
                                </Pressable>
                            </View>

                        </View>


                    </View>


                </View>
            </Modal >
        </>




    )
}

export default AddPaymentModal

const styles = StyleSheet.create({

    container: {
        padding: Colors.spacing * 2,
    },
    textBox: {
        shadowRadius: 2,
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: .2,
        shadowColor: Colors.grayOne,
        elevation: 2,
        backgroundColor: 'white', padding: Colors.spacing,
        paddingVertical: Colors.spacing * 1,
    },

    input: {
        color: Colors.maidlyGrayText,
        textAlignVertical: "top",
    },
    save: {
        marginTop: Colors.spacing * 4,
        width: WIDTH * .35,
        height: 40,
        backgroundColor: Colors.madidlyThemeBlue, justifyContent: 'center', alignItems: 'center',
        paddingVertical: Colors.spacing * 1, borderRadius: Colors.spacing * Colors.spacing
    }

})