import { Dimensions, Modal, Pressable, TextInput, SafeAreaView, StyleSheet, TouchableWithoutFeedback, FlatList, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import IconM from 'react-native-vector-icons/MaterialIcons';


const { width, height } = Dimensions.get('screen')

const w = width * .95;
const colorOne = '#01151A';
const colorTwo = '';
const colorThree = '';
const textColor = 'white';
const grayText = '#2e2e2e'
const grayTextTwo = '#6e6e6e'
const spacing = 10;
const red = '#C10000'
const green = '#48a14d'
const blue = '#007792'
const orange = '#E05500'
const borderColor = '#7E7E7E'



const schedule = [
    {
        id: '00',
        title: 'Urgent',
        color: red,
    },
    {
        id: '02',
        title: 'Today',
        color: blue,
    },
    {
        id: '03',
        title: 'Schedule',
        color: green,
    },
];

const PayTypeData = [

    {
        id: '00',
        title: 'AMC',
    },
    {
        id: '01',
        title: 'Rate',
    },

];
const techniciansList = [
    {
        id: '00',
        label: 'Ritesh Timsina',
    },
    {
        id: '01',
        label: 'Prakash Sahsher',
    },
    {
        id: '02',
        label: 'Ritesh Timsina',
    },

];


const data = [

]


const ViewAppointmentModal = ({ isOpen, onPress, onClose }) => {


    const [addQuote, setAddQuote] = useState(isOpen);


    const toggleModal = () => {
        setAddQuote(!addQuote)
    }



    return (
        <>
            <View style={{}}>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={addQuote}
                >
                    <View style={{ flex: 1, backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center', }}>

                        <View style={{
                            flex: 1,
                            backgroundColor: textColor, width: width,
                            padding: spacing * 2,
                        }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: spacing * 2.5 }}>

                                <Text style={{ fontSize: 18, fontWeight: '600', color: colorOne, }}>Edit Task</Text>
                                <Pressable
                                    style={{ alignSelf: 'flex-end' }}
                                    onPress={() => onPress()}
                                >
                                    <IconM color={colorOne} name="cancel" size={25} />
                                </Pressable>

                            </View>



                            {/* 
                            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'> */}

                            <View style={{ marginVertical: spacing * 2 }}>
                                <TextInput
                                    style={styles.taskTitle}
                                    // onChangeText={onChangeNumber}
                                    // value={number}
                                    placeholderTextColor={grayText}
                                    placeholder="Fan Fix Burwood"
                                />
                                <View style={styles.taskTitleBadge}><Text style={{ fontSize: 12, color: grayText, paddingHorizontal: 6, padding: 2, backgroundColor: 'white' }}>Task Title *</Text></View>
                            </View>







                            <TouchableWithoutFeedback onPress={() => onClose()}>
                                <View style={{ backgroundColor: colorOne, marginBottom: spacing * 2, borderRadius: 5, padding: 14, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>UPDATE</Text>
                                </View>
                            </TouchableWithoutFeedback>


                            {/* </ScrollView> */}

                        </View>
                    </View >
                </Modal >
            </View >


        </>
    )
}

export default ViewAppointmentModal

const styles = StyleSheet.create({

    taskTitle: {
        padding: 14,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#7E7E7E',
        fontSize: 18,
        position: 'relative',
    },
    taskTitleBadge: {

        position: 'absolute',
        backgroundColor: 'white',
        top: -8
    },
    scheduleBox: {
        padding: 8,
        paddingHorizontal: spacing * 2,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContentjustifyContent: 'center'
    },


})
