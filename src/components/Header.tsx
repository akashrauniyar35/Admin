import { Dimensions, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, isAndroid } from '../assets/Colors';
import SearchModal from './SearchModal';
import NotificationModal from './NotificationModal';



const Header = ({ nav, title, searchOption, route, searchEnabled }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [notificationVisible, setnotificationVisible] = useState(false)

    const toggleSearch = () => {
        setIsOpen(!isOpen)
    }

    const toggleNotification = () => {
        setnotificationVisible(!notificationVisible)
    }

    return (
        <>

            <View style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white',
                // borderBottomWidth: 1,
                paddingHorizontal: Colors.spacing * 2,
                shadowRadius: 2,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: .2,
                elevation: 2,
                height: 55,
                shadowColor: Colors.grayOne,

            }}>

                <Pressable onPress={!searchEnabled ? toggleSearch : null} >
                    <Icon name="search" size={22} color={!searchEnabled ? Colors.black : 'transparent'} />
                </Pressable>


                <View style={{ marginLeft: Colors.spacing * 3 }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "700", }}>{title}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Pressable onPress={toggleNotification}>
                        <IconM name="bell" size={22} color={Colors.black} style={{ marginRight: Colors.spacing * 1 }} />
                    </Pressable>
                    <Pressable onPress={() => nav.toggleDrawer()} >
                        <Icon name="menu" size={28} color={Colors.black} />
                    </Pressable>
                </View>
            </View>
            <SearchModal isOpen={isOpen} onClose={toggleSearch} route={route} />
            <NotificationModal isOpen={notificationVisible} onClose={toggleNotification} />

        </>
    )
}

export default Header

const styles = StyleSheet.create({})