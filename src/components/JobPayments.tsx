import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, isAndroid } from '../assets/Colors'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

const PaymentCard = ({ lable, selected, onPress }) => {
    return (
        <Pressable onPress={onPress(lable)} style={[styles.paymentCard, { borderWidth: isAndroid ? .35 : 0, borderColor: Colors.maidlyGrayText }]}>
            <IconM name={selected == "" ? "checkbox-marked-outline" : "checkbox-blank-outline"} size={28} color={Colors.maidlyGrayText} />
            <Text style={{ marginLeft: Colors.spacing, fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "600" : "300", }}>{lable}</Text>
        </Pressable>
    )
}

const JobPayments = () => {

    const [paymentMethod, setPaymentMethod] = useState(String)

    const onPaymentSelect = (value) => {
        setPaymentMethod(value)
    }

    const data = [
        {
            id: '00',
            title: 'Credit card',
            selected: paymentMethod
        },
        {
            id: '01',
            title: 'Cash',
            selected: paymentMethod
        },
        {
            id: '02',
            title: 'Check',
            selected: paymentMethod
        },
        {
            id: '03',
            title: 'Invoice',
            selected: paymentMethod
        },
    ]



    return (
        <View>
            <Text style={{ fontSize: 18, color: Colors.black, fontWeight: isAndroid ? "900" : "700", marginBottom: Colors.spacing * 2 }}>Payment</Text>
            <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", marginBottom: Colors.spacing * 2 }}>How the customer will be charged</Text>

            {data.map((item) => <PaymentCard onPress={onPaymentSelect} key={item.id} lable={item.title} selected={item.selected} />)}

        </View>
    )
}

export default JobPayments

const styles = StyleSheet.create({

    paymentCard: {
        flexDirection: 'row', alignItems: 'center',
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