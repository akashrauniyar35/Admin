import { Dimensions, FlatList, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, HEIGHT } from '../assets/Colors';
import CheckListCard from './CheckListCard';
import AddCheckList from './AddCheckList';
const isAndroid = Platform.OS == 'android' ? true : false
const { width, height } = Dimensions.get('screen')



const AddNotes = ({ onPress, animation, isOpen, title, onClose, id, reference }) => {
    const [defaultChecklist, setDefaultChecklist] = useState(true);
    const [addCheckList, setAddChecklist] = useState(false);


    return (

        <>

            <Modal
                animationType={animation ? animation : "fade"}
                transparent={true}
                visible={isOpen}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <SafeAreaView />
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white',
                        width: width,
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


                            <Pressable onPress={onClose} style={{}}>
                                <Icon name="chevron-back" size={22} color={Colors.black} />
                            </Pressable>

                            <Text style={{ fontSize: 14, color: Colors.grayOne, fontWeight: isAndroid ? "900" : "600" }}>{"Add note"}</Text>
                            <Icon name="chevron-back" size={28} color={'transparent'} />
                        </View>


                        <View style={styles.container}>

                            <Text style={{ alignSelf: 'center', fontSize: 16, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", marginBottom: Colors.spacing * 2 }}>{`Add a note to job #${reference}`}</Text>

                            <View style={[styles.textBox, { borderWidth: isAndroid ? .35 : 0, borderColor: Colors.maidlyGrayText, borderRadius: Colors.spacing * 1 }]}>
                                <TextInput multiline style={[styles.input, { height: isAndroid ? 180 : 250 }]} maxLength={500} />
                            </View>



                            <Pressable style={styles.save}>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: isAndroid ? "900" : "600" }}>Save</Text>
                            </Pressable>

                        </View>


                    </View>


                </View>
            </Modal >
        </>




    )
}

export default AddNotes

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
        backgroundColor: Colors.madidlyThemeBlue, justifyContent: 'center', alignItems: 'center',
        paddingVertical: Colors.spacing * 1, borderRadius: Colors.spacing * Colors.spacing
    }

})