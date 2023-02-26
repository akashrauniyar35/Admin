import { View, Text, Modal, Pressable, Image, Dimensions, SafeAreaView } from 'react-native'
import React from 'react'
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
}


const ViewFiles = ({ onClose, isOpen, onOpen, data, onDelete }: Props) => {

    const images = data.map((image, index) => ({
        key: String(index),
        photo: image,
    }));



    const renderItem = ({ item }: any) => (
        <View style={{ marginBottom: Colors.spacing * 2, position: 'relative' }}>
            <Image source={{ uri: item.photo }} resizeMode="cover" style={{
                width: "100%",
                height: 400,
                borderRadius: 10,
            }} />

            <View style={{ flexDirection: 'row', position: "absolute", right: Colors.spacing * 2, top: Colors.spacing * 2 }}>
                <IconM name="download-circle" color={Colors.green} size={24} style={{ marginRight: Colors.spacing * 1 }} />
                <Pressable onPress={() => onDelete(item.photo)}>
                    <IconM name="delete-circle" color={Colors.red} size={24} />
                </Pressable>
            </View>
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
                            <FlatList
                                contentContainerStyle={{ paddingHorizontal: Colors.spacing * 2, paddingTop: Colors.spacing * 1, paddingBottom: Colors.spacing * 2 }}
                                showsVerticalScrollIndicator={true}
                                data={images}
                                keyExtractor={item => item.key}
                                renderItem={renderItem}
                            />
                        </View>
                    </View>

                </Modal>
            </View>
        </>
    )
}

export default ViewFiles