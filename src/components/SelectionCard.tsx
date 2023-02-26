import { ActivityIndicator, Alert, FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, isAndroid, lightenColor, WIDTH } from '../assets/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';




const SelectionCard = ({ onPress, data, label, size, fontSize, icon, type, placeholder, rounded, border, phColor, loading }) => {
    const [selected, setSelected] = useState();
    const [isOpen, setIsOpen] = useState(false)

    const onClickHandle = (visible) => {
        setIsOpen(visible)
    }

    const onSelectHandler = (value) => {
        setIsOpen(false)
        setSelected(value)
        onPress(value)
    }


    return (
        <>
            <Pressable onPress={() => onClickHandle(true)}>
                {label && <Text style={{ fontSize: 16, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Bold', marginBottom: Colors.spacing }}>{label}</Text>}
                <View style={[styles.box, { height: size, paddingHorizontal: rounded === true ? Colors.spacing * 2 : Colors.spacing, borderRadius: rounded === true ? Colors.spacing * Colors.spacing : Colors.spacing * .75, borderWidth: isAndroid ? .35 : 0, borderColor: Colors.borderColor }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            {type === "schedule" && <View style={{ borderRadius: 100, backgroundColor: (selected ? selected : placeholder) === "Cancelled" ? Colors.red : (selected ? selected : placeholder) === "Scheduled" ? Colors.orange : (selected ? selected : placeholder) === "In Progress" ? Colors.orange : (selected ? selected : placeholder) === "Completed" ? Colors.paid : (selected ? selected : placeholder) === "Recall" ? Colors.red : Colors.orange, width: 16, height: 16, marginRight: Colors.spacing, }} />}

                            <Text style={{ fontSize: fontSize ? fontSize : 14, color: phColor, fontFamily: 'Outfit-Light', }}>{selected ? selected : placeholder}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            {loading ? <ActivityIndicator style={{ transform: [{ scale: .5 }] }} color={Colors.madidlyThemeBlue} animating={loading} /> : <Icon name={icon ? icon : "chevron-down"} style={{ marginTop: 2 }} size={14} color={Colors.maidlyGrayText} />}

                        </View>
                    </View>
                </View>
                {border === true && <View style={{ height: .25, width: '100%', marginVertical: Colors.spacing * 2, backgroundColor: Colors.maidlyGrayText }} />}
            </Pressable>

            <Modal style={{ flex: 1, }} animationType="fade" transparent={true} visible={isOpen} >
                <View style={styles.container}>
                    <View style={styles.selectonContainer}>

                        <FlatList showsVerticalScrollIndicator={false} data={data} keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => {
                                return (
                                    <Pressable onPress={() => onSelectHandler(item.name)}>
                                        <View key={item.id} style={{ flexDirection: 'row', borderColor: 'white', alignItems: 'center', justifyContent: 'space-between', paddingVertical: Colors.spacing * 1.5 }}>
                                            <Text style={{ fontSize: 16, color: 'white', fontFamily: 'Outfit-Medium', }}>{item.name}</Text>
                                            <Icon name={(selected ? selected : placeholder) === item.name ? "radio-button-on" : "radio-button-off"} size={22} color={'white'} />
                                        </View>
                                    </Pressable>
                                )
                            }} />

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