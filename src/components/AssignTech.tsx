import { Pressable, StyleSheet, Text, View,  } from 'react-native'
import React, { useState } from 'react'
import { Colors, isAndroid } from '../assets/Colors'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

const PaymentCard = ({ lable, selected, onPress }) => {
    return (
        <Pressable onPress={onPress(lable)} style={[styles.paymentCard, { borderWidth: isAndroid ? .35 : 0, borderColor: Colors.maidlyGrayText }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <IconM name={selected == "" ? "checkbox-marked-outline" : "checkbox-blank-outline"} size={28} color={Colors.maidlyGrayText} />
                <Text style={{ marginLeft: Colors.spacing, fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "600" : "300", }}>{lable}</Text>
            </View>
            <IconM name={"account-hard-hat"} size={28} color={Colors.maidlyGrayText} />
        </Pressable>
    )
}

const AssignTech = () => {

    const [paymentMethod, setPaymentMethod] = useState(String)



    const data = [
        {
            id: '00',
            title: 'Umesh Ji',
            selected: paymentMethod
        },
        {
            id: '01',
            title: 'Narayan Kumar',
            selected: paymentMethod
        },
        {
            id: '02',
            title: 'Sukhveendar Shing',
            selected: paymentMethod
        },
    ]



    return (
        <View>
            <Text style={{ fontSize: 18, color: Colors.black, fontWeight: isAndroid ? "900" : "700", marginBottom: Colors.spacing * 2 }}>Assign technician</Text>
            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", marginBottom: Colors.spacing * 2 }}>Available technician</Text>

            {data.map((item) => <PaymentCard onPress={setPaymentMethod} key={item.id} lable={item.title} selected={item.selected} />)}

        </View>
    )
}

export default AssignTech

const styles = StyleSheet.create({

    paymentCard: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: 'white',
        marginBottom: Colors.spacing * 1,
        borderColor: Colors.maidlyGrayText,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: .2,
        elevation: 2,
        borderRadius: Colors.spacing * .5,
        padding: Colors.spacing * 2,
        shadowColor: Colors.maidlyGrayText,

    },
})