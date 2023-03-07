import { ActivityIndicator, Alert, FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, isAndroid, lightenColor, WIDTH } from '../assets/Colors'
import Icon from 'react-native-vector-icons/Ionicons';




const SelectionCard = ({ onPress, data, placeholder, loading, clearTech, rounded, clearEnabled }: any) => {
    const [selected, setSelected] = useState("");
    const [isOpen, setIsOpen] = useState(false)

    const onClickHandle = (visible) => {
        setIsOpen(visible)
    }

    const onSelectHandler = (item) => {
        const fullName = item.firstName + " " + item.lastName
        setIsOpen(false)
        setSelected(fullName)
        onPress(item)
    }

    const onClear = () => {
        setIsOpen(false)
        setSelected("")
        clearTech()
    }


    return (
        <>
            <Pressable onPress={() => onClickHandle(true)}>

                <View style={[styles.box, { paddingHorizontal: Colors.spacing, borderRadius: rounded ? 100 : Colors.spacing * .75, borderWidth: isAndroid ? .35 : 0, borderColor: Colors.borderColor }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Light', }}>{selected ? selected : placeholder}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            {loading ? <ActivityIndicator style={{ transform: [{ scale: .5 }] }} color={Colors.madidlyThemeBlue} animating={loading} /> : <Icon name={"chevron-down"} style={{ marginTop: 2 }} size={14} color={Colors.maidlyGrayText} />}

                        </View>
                    </View>
                </View>
            </Pressable>

            <Modal style={{ flex: 1, }} animationType="fade" transparent={true} visible={isOpen} >
                <View style={styles.container}>
                    <View style={styles.selectonContainer}>

                        <FlatList showsVerticalScrollIndicator={false} initialNumToRender={2} data={data} keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => {
                                return (
                                    <Pressable onPress={() => onSelectHandler(item)}>
                                        <View key={item.id} style={{ flexDirection: 'row', borderColor: 'white', alignItems: 'center', justifyContent: 'space-between', paddingVertical: Colors.spacing * 1.5 }}>
                                            <Text style={{ fontSize: 16, color: 'white', fontFamily: 'Outfit-Medium', }}>{item.firstName + " " + item.lastName}</Text>
                                            <Icon name={selected === item.firstName + " " + item.lastName ? "radio-button-on" : "radio-button-off"} size={22} color={'white'} />
                                        </View>
                                    </Pressable>
                                )
                            }} />

                        {!clearEnabled ?
                            <Pressable onPress={() => onClear()} style={{ position: 'absolute', marginTop: Colors.spacing, bottom: Colors.spacing * 1.5, right: Colors.spacing * 8, }}>
                                <Text style={{ color: 'white', fontFamily: 'Outfit-Bold', }}>Clear</Text>
                            </Pressable>
                            : null}


                        <Pressable onPress={() => setIsOpen(false)} style={{ position: 'absolute', marginTop: Colors.spacing, bottom: Colors.spacing * 1.5, right: Colors.spacing * 1.5, }}>
                            <Text style={{ color: 'white', fontFamily: 'Outfit-Bold', }}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal >

        </>)
}

export default SelectionCard

const styles = StyleSheet.create({


    box: {
        backgroundColor: 'white',
        borderColor: Colors.maidlyGrayText,
        padding: Colors.spacing * 1,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: .2,
        elevation: 2,
        shadowColor: Colors.madidlyThemeBlue,
    },
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', },
    selectonContainer: {
        backgroundColor: Colors.maidlyGrayText,
        width: WIDTH * .8,
        padding: Colors.spacing * 2,
        position: 'relative',
        paddingVertical: Colors.spacing * 4,

    },


})