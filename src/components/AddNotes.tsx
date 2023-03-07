import { ActivityIndicator, Dimensions, FlatList, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../assets/Colors';
const isAndroid = Platform.OS == 'android' ? true : false
const { width } = Dimensions.get('screen')



const AddNotes = ({ onPress, animation, isOpen, onClose, id, loading }: any) => {
    const [text, setText] = useState<string>("")

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

                            <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Bold', }}>{"Add note"}</Text>
                            <Icon name="chevron-back" size={28} color={'transparent'} />
                        </View>


                        <View style={styles.container}>

                            <Text style={{ fontFamily: "Outfit-Medium", alignSelf: 'center', fontSize: 16, color: Colors.maidlyGrayText, marginBottom: Colors.spacing * 2 }}>{`Add a note to job #${id}`}</Text>

                            <View style={[styles.textBox, { borderWidth: isAndroid ? .35 : 0, borderColor: Colors.maidlyGrayText, borderRadius: Colors.spacing * 1 }]}>
                                <TextInput multiline style={[styles.input, { height: isAndroid ? 180 : 250 }]} maxLength={500} onChangeText={(value) => setText(value)} />
                            </View>

                            <Pressable style={styles.save} onPress={() => onPress(text)}>
                                {loading ?
                                    <ActivityIndicator color="#fff" size={'small'} animating={loading} style={{ transform: [{ scale: .8 }], }} />
                                    : <Text style={{ color: 'white', fontSize: 16, fontWeight: isAndroid ? "900" : "600" }}>Save</Text>
                                }

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
        fontFamily: "Outfit-Light"
    },
    save: {
        marginTop: Colors.spacing * 4,
        backgroundColor: Colors.madidlyThemeBlue, justifyContent: 'center', alignItems: 'center',
        paddingVertical: Colors.spacing * 1, borderRadius: Colors.spacing * Colors.spacing
    }

})