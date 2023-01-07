import { Dimensions, FlatList, Modal, Platform, Pressable, SafeAreaView, ActivityIndicator, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, HEIGHT, WIDTH } from '../assets/Colors';
import CheckListCard from './CheckListCard';
import AddCheckList from './AddCheckList';
import { useSelector } from 'react-redux';
const isAndroid = Platform.OS == 'android' ? true : false
const { width, height } = Dimensions.get('screen')



const DeleteModal = ({ loading, onPress, animation, isOpen, title, onClose, id, customerName, quoteReference, price, phone }) => {


    return (

        <>

            <Modal
                animationType={animation ? animation : "fade"}
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
                            <Text style={{ fontSize: 16, color: Colors.grayOne, fontWeight: isAndroid ? "900" : "600" }}>{title}</Text><Icon name="chevron-back" size={28} color={'white'} />
                        </View>


                        <View style={styles.container}>

                            <Text style={{ fontSize: 12, color: Colors.grayOne, fontWeight: isAndroid ? "900" : "600" }}>Are you sure you want to delete this job?</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing * 2, }}>
                                <Text style={{ width: '40%', fontSize: 12, color: Colors.grayOne, fontWeight: isAndroid ? "900" : "600" }}>Quote Ref </Text>
                                <Text style={{ fontSize: 12, color: Colors.madidlyThemeBlue, fontWeight: isAndroid ? "900" : "600" }}>{quoteReference}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing * 1, }}>
                                <Text style={{ width: '40%', fontSize: 12, color: Colors.grayOne, fontWeight: isAndroid ? "900" : "600" }}>Customer Name </Text>
                                <Text style={{ fontSize: 12, color: Colors.madidlyThemeBlue, fontWeight: isAndroid ? "900" : "600" }}>{customerName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing * 1, }}>
                                <Text style={{ width: '40%', fontSize: 12, color: Colors.grayOne, fontWeight: isAndroid ? "900" : "600" }}>Phone Number </Text>
                                <Text style={{ fontSize: 12, color: Colors.madidlyThemeBlue, fontWeight: isAndroid ? "900" : "600" }}>{phone}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing * 1, }}>
                                <Text style={{ width: '40%', fontSize: 12, color: Colors.grayOne, fontWeight: isAndroid ? "900" : "600" }}>Total </Text>
                                <Text style={{ fontSize: 12, color: Colors.madidlyThemeBlue, fontWeight: isAndroid ? "900" : "600" }}>$ {price}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Pressable style={styles.save} onPress={onClose}>
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: isAndroid ? "900" : "600" }}>Cancel</Text>
                                </Pressable>
                                <Pressable style={[styles.save, { flexDirection: 'row', alignItems: 'center' }]} onPress={() => onPress(id)}>
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: isAndroid ? "900" : "600" }}>{loading ? 'Deleting' : 'Delete'}</Text>
                                    {loading && <ActivityIndicator color="white" size={'small'} animating={loading} style={{ transform: [{ scale: .7 }], marginLeft: Colors.spacing * .5, }} />}
                                </Pressable>
                            </View>

                        </View>


                    </View>


                </View>
            </Modal >
        </>




    )
}

export default DeleteModal

const styles = StyleSheet.create({
    filterStyling: {
        backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', marginVertical: Colors.spacing * 1.5, paddingHorizontal: Colors.spacing * 2, paddingVertical: Colors.spacing * 1.75,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: .2,
        shadowColor: Colors.grayOne, elevation: 2,
    },

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
        backgroundColor: Colors.madidlyThemeBlue, justifyContent: 'center', alignItems: 'center',
        paddingVertical: Colors.spacing * 1, borderRadius: Colors.spacing * Colors.spacing
    }

})