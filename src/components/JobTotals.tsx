import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputBox from './InputBox'
import { Colors, HEIGHT, isAndroid, WIDTH } from '../assets/Colors'
import JobPayments from './JobPayments'
import { useDispatch, useSelector } from 'react-redux'
import { addJobBedroomPrice } from '../redux/addJobSlice'
import PriceInput from './PriceInput'



const JobTotals = ({ totals, setBedroomPrice, data, setPaidPrice, setBathroomPrice, setBasePrice, setAddOnsPrice, setDiscountPrice, lable }: any) => {

    const [subTotal, setSubTotal] = useState<any>()
    const base = totals?.find((x: any) => x?.title?.toLowerCase() === "base price")
    const extras = totals?.find((x: any) => x?.title?.toLowerCase() === "extras")
    const bd = totals?.find((x: any) => x?.title?.toLowerCase().split(" ").pop() === "bedroom")
    const discount = totals?.find((x: any) => x?.title?.toLowerCase() === "discount")
    const ba = totals?.find((x: any) => x?.title?.toLowerCase().split(" ").pop() === "bathroom")
    const paidAmount = totals?.find((x: any) => x?.title?.toLowerCase() === "payment received")

    const [baseP, setBaseP] = useState<any>(base?.amount)
    const [bedPrice, setBedPrice] = useState<any>(bd?.amount)
    const [bathPrice, setBathPrice] = useState<any>(ba?.amount)
    const [extraPrice, setExtraPrice] = useState<any>(extras?.amount)
    const [disPrice, setDisPrice] = useState<any>(discount?.amount)
    const [paid, setPaid] = useState<any>(paidAmount?.amount)
    const [outstanding, setOutstanding] = useState<any>()


    const filter = data?.filter((x: any) => x?.title?.toLowerCase() !== "bedrooms")
    const newFilter = filter?.filter((x: any) => x?.title?.toLowerCase() !== "bathrooms")


    useEffect(() => {
        setBasePrice(baseP)
    }, [baseP])

    useEffect(() => {
        setBedroomPrice(bedPrice)
    }, [bedPrice])

    useEffect(() => {
        setBathroomPrice(bathPrice)
    }, [bathPrice])

    useEffect(() => {
        setAddOnsPrice(extraPrice)
    }, [extraPrice])

    useEffect(() => {
        setDiscountPrice(disPrice)
    }, [disPrice])

    useEffect(() => {
        setPaidPrice(paid)
    }, [paid])


    useEffect(() => {
        let sub = bd?.amount + ba?.amount + base?.amount + extras?.amount - discount?.amount
        setSubTotal(sub)
    }, [bd, ba, extras, base, discount])

    useEffect(() => {
        let x = subTotal - paid
        setOutstanding(x)
    }, [subTotal, paid])

    return (
        <>

            <View>
                <Text style={{ fontSize: 18, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing * 2 }}>Totals</Text>
                <Text style={{ fontSize: 14, color: Colors.black, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing * 2 }}>Job details</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Base price</Text>
                    <View style={{ width: "50%" }}>

                        <PriceInput value={baseP} onChange={(val: any) => setBaseP(val)} placeholderSize={14} size={40} placeholder={base?.amount?.toFixed(2)} />

                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>{bd?.quantity}  Bedrooms</Text>
                    <View style={{ width: "50%" }}>
                        <PriceInput value={bedPrice} onChange={(val: any) => setBedPrice(val)} placeholderSize={14} size={40} placeholder={bd?.amount?.toFixed(2)} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>{ba?.quantity}  Bathrooms</Text>
                    <View style={{ width: "50%" }}>

                        <PriceInput value={bathPrice} onChange={(val: any) => setBathPrice(val)} placeholderSize={14} size={40} placeholder={ba?.amount?.toFixed(2)} />

                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <View>
                        <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing * .5 }}>Addons</Text>
                        {data.length ? newFilter?.map((item: any) => {
                            if (item.quantity >= 1) {
                                return <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ opacity: .5, backgroundColor: Colors.maidlyGrayText, width: 5, height: 5, marginHorizontal: Colors.spacing * .5, borderRadius: 100, }} />
                                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Regular' }}>{item.quantity} {item.title}</Text>
                                </View>
                            }
                        }) : null}
                    </View>

                    <View style={{ width: "50%" }}>
                        <PriceInput value={extraPrice} onChange={(val: any) => setExtraPrice(val)} placeholderSize={14} size={40} placeholder={extras?.amount?.toFixed(2)} />
                    </View>
                </View>

                <View style={{ marginVertical: Colors.spacing * 1, marginBottom: Colors.spacing * 3, borderBottomWidth: .35, borderColor: Colors.borderColor }} />



                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Sub total</Text>
                    <View style={{}}>
                        <Text style={{ fontSize: 22, color: Colors.black, fontFamily: 'Outfit-Bold', }}>$ {bd?.amount + ba?.amount + base?.amount + extras?.amount}.00</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Discount</Text>
                    <View style={{ width: "50%" }}>

                        <PriceInput value={disPrice} onChange={(val: any) => setDisPrice(val)} placeholderSize={14} size={40} placeholder={discount?.amount?.toFixed(2)} />

                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                    <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Total</Text>
                    <View style={{}}>
                        <Text style={{ fontSize: 22, color: Colors.black, fontFamily: 'Outfit-Bold', }}>$ {subTotal ? subTotal : 0}.00</Text>
                    </View>
                </View>

                <View style={{ opacity: .35, marginTop: Colors.spacing, marginBottom: Colors.spacing * 2, borderBottomWidth: 2, borderColor: Colors.borderColor }} />

                {lable ?
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Paid</Text>
                            <View style={{ width: "50%" }}>
                                <PriceInput value={paid} onChange={(val: any) => setPaid(val)} placeholderSize={14} size={40} placeholder={paidAmount?.amount?.toFixed(2)} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Outstanding</Text>
                            <View style={{ width: "50%" }}>
                                <PriceInput textColor="#fff" bg={outstanding > 0 ? Colors.red : Colors.paid} editable={false} placeholderSize={14} size={40} placeholder={outstanding?.toFixed(2)} />
                            </View>
                        </View>
                    </View> : null
                }

            </View>

        </>
    )
}

export default JobTotals

const styles = StyleSheet.create({

})