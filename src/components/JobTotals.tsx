import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputBox from './InputBox'
import { Colors, HEIGHT, isAndroid, WIDTH } from '../assets/Colors'
import JobPayments from './JobPayments'
import { useSelector } from 'react-redux'

const JobTotals = ({ total, data }) => {

    const [bdBaPrice, setBdBaPrice] = useState(Number)
    const [discount, setDiscount] = useState(0)
    const [basePrice, setBasePrice] = useState("0")
    const [addCharges, setAddCharges] = useState("0")

    let xp: any = []

    const x = String(total).slice(0, 3);
    const jobPrice = Number(x).toFixed(2);


    const bd = data.find((x: any) => x.title.toLowerCase() === "bedrooms")
    const ba = data.find((x: any) => x.title.toLowerCase() === "bathrooms")




    useEffect(() => {
        let priceOne: number = bd?.quantity * bd?.price + ba?.quantity * ba?.price
        setBdBaPrice(priceOne)
    }, [data])


    const calculateAddonsPrice = data.slice(2).reduce((preValue, calValue) => {
        return preValue + calValue.quantity * calValue.price
    }, 0)
    const addOnPrice = parseInt(calculateAddonsPrice)


    // const price: any = (addOnPrice + bdBaPrice + addCharges) - discount
    const totalPrice = addOnPrice + bdBaPrice + parseInt(addCharges) - discount + parseInt(basePrice)
    // + (basePrice + addCharges) - discount
    return (
        <>

            {
                data.slice(2).map((item) => {
                    xp.push(item)
                    return (
                        <View key={item._id} style={{}}>
                            <Text style={{ color: 'black' }}>{`${item.title} - ${item.quantity} x ${item.price} - Total ${item.quantity * item.price}`}</Text>
                        </View>
                    )
                })

            }

            <View>
                <Text style={{ fontSize: 18, color: Colors.black, fontWeight: isAndroid ? "900" : "700", marginBottom: Colors.spacing * 2 }}>{bd?.quantity + " " + ba?.quantity}</Text>
                <Text style={{ fontSize: 18, color: Colors.black, fontWeight: isAndroid ? "900" : "700", marginBottom: Colors.spacing * 2 }}>Totals</Text>
                <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", marginBottom: Colors.spacing * 2 }}>Job details</Text>

                {/* <Text style={{ fontSize: 14, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", marginBottom: Colors.spacing * 2 }}>{`$${totalPrice.toFixed(2)} ${" base-"} ${basePrice}  ${" dis-"} ${discount} ${" add-"} ${addCharges}`}</Text> */}

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>Base price</Text>
                    <View style={{ width: "50%" }}>

                        <InputBox  keyboardType={'numeric'} onChange={(val: any) => setBasePrice(val)} bold={true} placeholderSize={14} size={40} rounded={true} placeholder={"$ 0.00"} bg={Colors.grayBG} itemsCenter={true} isPrice={true} />

                        {/* <InputBox bold={true} keyboardType={'phone-pad'} value={basePrice} placeholderSize={14} size={40} onChange={(val: any) => setBasePrice(val)} rounded={true} placeholder={`$ 0.00`} bg={Colors.grayBG} itemsCenter={true} /> */}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <View style={{ alignSelf: "flex-start", marginTop: -Colors.spacing * .5 }}>
                        <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", marginBottom: Colors.spacing * .5 }}>{bd?.quantity}  Bedroom</Text>
                        <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>{ba?.quantity}  Bathroom</Text>
                    </View>
                    <View style={{ width: "50%" }}>
                        <InputBox bold={true} editable={false} placeholderSize={14} size={40} rounded={true} placeholder={`$ ${bdBaPrice.toFixed(2)}`} bg={Colors.grayBG} itemsCenter={true} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>Addons</Text>
                    <View style={{ width: "50%" }}>
                        <InputBox bold={true} editable={false} placeholderSize={14} bold={true} size={40} rounded={true} placeholder={`$ ${addOnPrice.toFixed(2)}`} bg={Colors.grayBG} itemsCenter={true} />
                    </View>
                </View>

                <View style={{ marginVertical: Colors.spacing * 1, marginBottom: Colors.spacing * 3, borderBottomWidth: .35, borderColor: Colors.maidlyGrayText }} />


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>Discount</Text>
                    <View style={{ width: "50%" }}>
                        <InputBox  keyboardType={'numeric'} onChange={(val: any) => setDiscount(val)} bold={true} placeholderSize={14} size={40} rounded={true} placeholder={"$ 0.00"} bg={Colors.grayBG} itemsCenter={true} isPrice={true} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>Additional charges</Text>
                    <View style={{ width: "50%" }}>

                    <InputBox  keyboardType={'numeric'} onChange={(val: any) => setAddCharges(val)} bold={true} placeholderSize={14} size={40} rounded={true} placeholder={"$ 0.00"} bg={Colors.grayBG} itemsCenter={true} isPrice={true} />

                        {/* 
                        <InputBox bold={true} value={addCharges} keyboardType={'phone-pad'} onChange={(val: any) => setAddCharges(val)} placeholderSize={14} size={40} rounded={true} placeholder="$ 0.00" bg={Colors.grayBG} itemsCenter={true} /> */}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>Total Addons</Text>
                    <View style={{}}>
                        <Text style={{ fontSize: 22, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>{`$ ${addOnPrice.toFixed(2)}`}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>Tax</Text>
                    <View style={{ width: "50%" }}>
                        <InputBox bold={true} placeholderSize={14} size={40} rounded={true} placeholder="$ 0.00" bg={Colors.grayBG} itemsCenter={true} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>Total</Text>
                    <View style={{}}>
                        <Text style={{ fontSize: 22, color: Colors.maidlyGrayText, fontWeight: isAndroid ? "900" : "600", }}>$ {totalPrice.toFixed(2)}</Text>
                    </View>
                </View>


            </View>

            <View style={{ opacity: .35, marginTop: Colors.spacing, marginBottom: Colors.spacing * 2, borderBottomWidth: 2, borderColor: Colors.maidlyGrayText }} />

        </>
    )
}

export default JobTotals

const styles = StyleSheet.create({

})