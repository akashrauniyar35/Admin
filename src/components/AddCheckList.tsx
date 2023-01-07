import { Dimensions, Modal, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../assets/Colors';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import PeriodSelector from './PeriodSelector';
import StatusCard from './Sc';
import SelectionCard from './SelectionCard';
import InputBox from './InputBox';
import AddImages from './AddImages';
import AddCategory from './AddCategory';

const isAndroid = Platform.OS == 'android' ? true : false
const { width, height } = Dimensions.get('screen')




const data = [
    {
        id: '00',
        name: 'Ninja Prasad',
    },
    {
        id: '01',
        name: 'Ashwin Nigga',
    },
    {
        id: '02',
        name: 'Milan Prasad',
    },
    {
        id: '03',
        name: 'Rajesh Hamal',
    },
];

const scheduleData = [
    {
        id: '00',
        name: 'Cancelled',
        color: "",
    },
    {
        id: '01',
        name: 'Scheduled',
        color: "",
    },
    {
        id: '02',
        name: 'In Progress',
        color: "",
    },
    {
        id: '03',
        name: 'Completed',
        color: "",
    },
]


const AddCheckList = ({ onPress, isOpen, title }) => {
    const checkList = "Checklist one"

    return (

        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isOpen}
            >
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: Colors.transparentGloss, justifyContent: 'center', }}>
                    <SafeAreaView />
                    <View style={{
                        flex: .85,
                        width: width * .9,

                    }}>

                        <View style={{
                            alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.madidlyThemeBlue,
                            paddingHorizontal: Colors.spacing * 2,
                            paddingVertical: Colors.spacing * 1.5,
                            shadowRadius: 2,
                            borderTopRightRadius: Colors.spacing,
                            borderTopLeftRadius: Colors.spacing,
                            shadowOffset: { width: 0, height: .5 },
                            shadowOpacity: .2,
                            elevation: 2,
                            shadowColor: Colors.grayOne,

                        }}>
                            <Text style={{ fontSize: 18, color: "white", fontWeight: isAndroid ? "900" : "600" }}>{title}</Text>
                        </View>


                        <View style={styles.container}>


                            <View style={{ marginBottom: Colors.spacing * 2 }}>
                                <InputBox  rounded={true} lable="Item name" placeholder="Add item name here..." />
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Colors.spacing }}>
                                    <IconM name="checkbox-blank-outline" size={20} color={Colors.maidlyGrayText} />
                                    <Text style={{ marginLeft: Colors.spacing, fontSize: 14, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600" }}>Required</Text>
                                    <Text style={{ fontSize: 14, color: Colors.red, fontWeight: isAndroid ? "900" : "600" }}>*</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: Colors.spacing }}>
                                <AddImages rounded={true} />
                            </View>

                            <View style={{ marginTop: Colors.spacing * 2 }}>
                                <SelectionCard
                                    placeholder={checkList.toUpperCase()}
                                    placeHolderTextColor={Colors.maidlyGrayText}
                                    rounded={true} data={scheduleData} type={'filter'} label="Status"
                                />
                            </View>



                            <View style={{ marginTop: Colors.spacing * 2, }}>
                                <AddCategory rounded={true} />
                            </View>


                            <View style={styles.footer}>
                                <Pressable onPress={onPress}>
                                    <Text style={{ fontSize: 13, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>Cancel</Text>
                                </Pressable>
                                <Pressable style={styles.applyButton} >
                                    <Text style={{ fontSize: 13, color: 'white', fontWeight: isAndroid ? "900" : "600", }}>Save</Text>
                                </Pressable>
                            </View>

                        </View>

                    </View>


                </View>
            </Modal >
        </>


    )
}

export default AddCheckList

const styles = StyleSheet.create({
    filterStyling: {
        backgroundColor: 'red', flexDirection: 'row', alignItems: 'center', marginVertical: Colors.spacing * 1.5, paddingHorizontal: Colors.spacing * 2, paddingVertical: Colors.spacing * 1.75,

    },

    container: {
        padding: Colors.spacing * 2,
        backgroundColor: 'white',
        borderBottomRightRadius: Colors.spacing,
        borderBottomLeftRadius: Colors.spacing,
    },
    applyButton: {
        backgroundColor: Colors.madidlyThemeBlue, flexDirection: 'row',
        paddingHorizontal: Colors.spacing * 2, marginLeft: Colors.spacing * 2,
        borderRadius: Colors.spacing * Colors.spacing, alignItems: 'center', justifyContent: 'center', paddingVertical: Colors.spacing * 1,
    },
    footer: {
        marginTop: Colors.spacing * 4,
        flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'flex-end'
    }

})