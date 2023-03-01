import { View, Text, Modal, Pressable, Image, Dimensions, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import AddButtonHeader from './AddButtonHeader'
import { Colors } from '../assets/Colors'
import { FlatList } from 'react-native-gesture-handler'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
    onClose: () => void;
    isOpen: boolean;
    onOpen: () => void;
    data: Array<[]>;
    onDelete: (value: any) => void
    onDownload: (value: any) => void;
    loading: boolean
}


const ViewFiles = ({ onClose, isOpen, onOpen, data, onDelete, onDownload, loading }: Props) => {
    const [selectedFile, setSelectedFile] = useState("")
    const images = data.map((image, index) => ({
        key: String(index),
        photo: image,
    }));


    const renderItem = ({ item }: any) => (
        <View style={{ marginBottom: Colors.spacing * 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Pressable style={{ width: "90%" }} onPress={() => onDownload(item.photo)}>
                <Text numberOfLines={1} style={{ color: 'blue', }}>{item.photo}</Text>
            </Pressable>
            {item.photo === selectedFile ?
                <ActivityIndicator color={"red"} size={'small'} animating={true} style={{ transform: [{ scale: .8 }], }} /> : <Pressable onPress={() => { setSelectedFile(item.photo), onDelete(item.photo) }}>
                    <IconM name="delete-circle" color={Colors.red} size={24} />
                </Pressable>
            }
        </View >
    )

    return (
        <>
            <View style={{ flex: 1 }}>
                <Pressable onPress={onOpen}>
                    <Text style={{ fontSize: 20, color: Colors.madidlyThemeBlue, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing * 1 }}>View files</Text>
                </Pressable>

                <Modal
                    animationType={"slide"}
                    visible={isOpen}
                >
                    <SafeAreaView style={{ backgroundColor: Colors.madlyBGBlue }} />
                    <View style={{ flex: 1, }}>
                        <View style={{ backgroundColor: 'white', flex: 1, }}>
                            <AddButtonHeader saveOption={false} onClose={onClose} lable={'Files'} />

                            {data.length > 0 ?

                                <FlatList
                                    contentContainerStyle={{ paddingHorizontal: Colors.spacing * 2, paddingTop: Colors.spacing * 1, paddingBottom: Colors.spacing * 2 }}
                                    showsVerticalScrollIndicator={true}
                                    data={images}
                                    keyExtractor={item => item.key}
                                    renderItem={renderItem}
                                /> :
                                <View style={{ backgroundColor: Colors.red, alignItems: "center", justifyContent: "center", padding: Colors.spacing * 2, marginTop: Colors.spacing * 2 }}>
                                    <Text style={{ fontFamily: 'Outfit-Medium', color: "white", fontSize: 20 }}>No files found!</Text>
                                </View>
                            }

                        </View>
                    </View>

                </Modal>
            </View>
        </>
    )
}

export default ViewFiles