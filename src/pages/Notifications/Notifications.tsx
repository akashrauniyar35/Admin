import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';


import { Colors, isAndroid } from '../../assets/Colors'
import Header from '../../components/Header'
import Divider from '../../components/Divider';
import Icon from 'react-native-vector-icons/Ionicons';


const NoNotificationsCard = () => {
    return (
        <View style={{ opacity: .5, alignSelf: 'center', alignItems: 'center', }}>
            <IconM name="message-text" size={60} color={Colors.maidlyGrayText} />
            <Text style={{ marginTop: Colors.spacing * 1, fontSize: 16, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "700", }}>All clear!  No notifications!</Text>
        </View>
    )
}

const Card = () => {
    return (
        <View style={{}}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ backgroundColor: Colors.madidlyThemeBlue, width: 65, height: 65, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <IconM name="bullhorn-outline" size={40} color={'white'} />
                </View>

                <View style={{ marginLeft: -Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 14, color: Colors.black, fontWeight: isAndroid ? "900" : "700", marginBottom: Colors.spacing }}>New Quote Created</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * .5 }}>

                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "600" : "300", }}>Samsung Chaudhary</Text>
                        <View style={{ backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, marginHorizontal: Colors.spacing, borderRadius: 100, }} />
                        <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "400" }}>$ 400.00</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * .5 }}>
                        <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "600" : "300", }}>Strathfield NSW 2135</Text>
                        <View style={{ backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, marginHorizontal: Colors.spacing, borderRadius: 100, }} />
                        <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "400" }}>EOL</Text>
                    </View>

                </View>


                <Pressable>
                    <View style={{ opacity: .7}}>
                        <Icon name="close-circle" color={Colors.red} size={20} style={{ marginRight: Colors.spacing, }} />
                    </View>
                </Pressable>

            </View>

            <View style={{ marginVertical: Colors.spacing * 2 }}>
                <Divider height={.6} colors={'gray'} width="120%" opacity={.1} />
            </View>
        </View>
    )
}


const Notifications = ({ navigation }) => {


    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />
                <Header nav={navigation} title="Notifications" />

                <View style={{ paddingHorizontal: Colors.spacing * 2, marginTop: Colors.spacing * 2 }}>

                    <ScrollView style={{}}>
                        {/* <NoNotificationsCard /> */}

                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </ScrollView>

                </View>

            </View>


        </>
    )
}

export default Notifications

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.madlyBGBlue, },

}) 