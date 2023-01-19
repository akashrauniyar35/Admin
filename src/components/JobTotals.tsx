import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputBox from './InputBox'
import { Colors, HEIGHT, isAndroid, WIDTH } from '../assets/Colors'
import JobPayments from './JobPayments'
import { useDispatch, useSelector } from 'react-redux'
import { addJobBedroomPrice } from '../redux/addJobSlice'



const JobTotals = ({ totals, data, setBedroomPrice, setBathroomPrice, setBasePrice }) => {

    const [bdBaPrice, setBdBaPrice] = useState(Number)
    const [discount, setDiscount] = useState(0)
    // const [basePrice, setBasePrice] = useState("0")
    const [addCharges, setAddCharges] = useState("0")
    // const totals = useSelector((state: any) => state.addJobReducer.addJobData.totals)
    const dispatch = useDispatch()
    let xp: any = []

    // const x = String(total).slice(0, 3);
    // const jobPrice = Number(x).toFixed(2);
    const bd = data.find((x: any) => x.title.toLowerCase().split(" ").pop() === "bedrooms")
    const ba = data.find((x: any) => x.title.toLowerCase().split(" ").pop() === "bathrooms")

    useEffect(() => {
        let priceOne: number = bd?.quantity * bd?.price + ba?.quantity * ba?.price
        setBdBaPrice(priceOne)
    }, [data])


    console.log("ba------", ba)

    return (
        <>

            {/* {
                totals?.map((item) => {
                    xp.push(item)
                    return (
                        <View key={item._id} style={{}}>
                            <Text style={{ color: 'black' }}>{`${item.title} - ${item.quantity} x ${item.amount} - Total ${item.quantity * item.amount}`}</Text>
                        </View>
                    )
                })
            } */}

            <View>
                {/* <Text style={{ fontSize: 18, color: Colors.black, fontWeight: isAndroid ? "900" : "700", marginBottom: Colors.spacing * 2 }}>{bd?.quantity + " " + ba?.quantity}</Text> */}
                <Text style={{ fontSize: 18, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing * 2 }}>Totals</Text>
                <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing * 2 }}>Job details</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Base price</Text>
                    <View style={{ width: "50%" }}>
                        <InputBox keyboardType={'numeric'} onChange={(val: any) => setBasePrice(val)} bold={true} placeholderSize={14} size={40} rounded={true} placeholder={"$0.00"} bg={Colors.grayBG} itemsCenter={true} isPrice={true} />
                        {/* <InputBox keyboardType={'numeric'} onChange={(val: any) => setBasePrice(val)} bold={true} placeholderSize={14} size={40} rounded={true} placeholder={totals[0].amount > 0 ? `$ ${totals[0].amount.toString()}.00` : "$0.00"} bg={Colors.grayBG} itemsCenter={true} isPrice={true} /> */}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>{bd?.quantity}  Bedrooms</Text>
                    <View style={{ width: "50%" }}>
                        <InputBox bold={true} onChange={(val) => setBedroomPrice(val)} placeholderSize={14} size={40} rounded={true} placeholder={`$ ${bdBaPrice.toFixed(2)}`} bg={Colors.grayBG} itemsCenter={true} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>{ba?.quantity}  Bathrooms</Text>
                    <View style={{ width: "50%" }}>
                        <InputBox bold={true} onChange={(val) => setBathroomPrice(val)} placeholderSize={14} size={40} rounded={true} placeholder={`$ ${bdBaPrice.toFixed(2)}`} bg={Colors.grayBG} itemsCenter={true} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Addons</Text>
                    <View style={{ width: "50%" }}>
                        <InputBox bold={true} editable={false} placeholderSize={14} bold={true} size={40} rounded={true} placeholder={`$ ${"0.00"}`} bg={Colors.grayBG} itemsCenter={true} />
                    </View>
                </View>

                <View style={{ marginVertical: Colors.spacing * 1, marginBottom: Colors.spacing * 3, borderBottomWidth: .35, borderColor: Colors.borderColor }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Discount</Text>
                    <View style={{ width: "50%" }}>
                        <InputBox keyboardType={'numeric'} onChange={(val: any) => setDiscount(val)} bold={true} placeholderSize={14} size={40} rounded={true} placeholder={"$ 0.00"} bg={Colors.grayBG} itemsCenter={true} isPrice={true} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Additional charges</Text>
                    <View style={{ width: "50%" }}>

                        <InputBox keyboardType={'numeric'} onChange={(val: any) => setAddCharges(val)} bold={true} placeholderSize={14} size={40} rounded={true} placeholder={"$ 0.00"} bg={Colors.grayBG} itemsCenter={true} isPrice={true} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Total Addons</Text>
                    <View style={{}}>
                        <Text style={{ fontSize: 22, color: Colors.black, fontFamily: 'Outfit-Bold', }}>{`$ ${"0.00"}`}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Tax</Text>
                    <View style={{ width: "50%" }}>
                        <InputBox bold={true} placeholderSize={14} size={40} rounded={true} placeholder="$ 0.00" bg={Colors.grayBG} itemsCenter={true} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Total</Text>
                    <View style={{}}>
                        <Text style={{ fontSize: 22, color: Colors.black, fontFamily: 'Outfit-Bold', }}>$ {"0.00"}</Text>
                    </View>
                </View>


            </View>

            <View style={{ opacity: .35, marginTop: Colors.spacing, marginBottom: Colors.spacing * 2, borderBottomWidth: 2, borderColor: Colors.borderColor }} />

        </>
    )
}

export default JobTotals

const styles = StyleSheet.create({

})