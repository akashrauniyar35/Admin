import { StyleSheet, Text, Dimensions, View, TextInput, Animated, LayoutAnimation, Image, TouchableWithoutFeedback, Pressable, Switch } from 'react-native'
import React, { useState, useRef, useEffect, FC } from 'react'
import InputBox from './InputBox'
import { Colors, HEIGHT, isAndroid, WIDTH } from '../assets/Colors'
import SelectionCard from './SelectionCard'

import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { addProductsFail, addProductsSuccess } from '../redux/addJobSlice'
import { useDispatch, } from 'react-redux'
import { fetchAllProducts } from '../config/ProductsApi'

const bedroomsData = [
    {
        id: '00',
        name: '1  Bedrooms',
    },
    {
        id: '01',
        name: '2  Bedrooms',
    },
    {
        id: '02',
        name: '3  Bedrooms',
    },
    {
        id: '03',
        name: '4  Bedrooms',
    },
    {
        id: '04',
        name: '5  Bedrooms',
    },
    {
        id: '05',
        name: '6  Bedrooms',
    },
]
const bathroomsData = [
    {
        id: '00',
        name: '1  Bathrooms',
    },
    {
        id: '01',
        name: '2  Bathrooms',
    },
    {
        id: '02',
        name: '3  Bathrooms',
    },
    {
        id: '03',
        name: '4  Bathrooms',
    },
    {
        id: '04',
        name: '5  Bathrooms',
    },
    {
        id: '05',
        name: '6  Bathrooms',
    },
];


const services = [
    {
        id: "00",
        title: 'General',
    },
    {
        id: "01",
        title: 'End of Lease',
    },
]

const propertyTypes = [
    {
        id: "00",
        title: 'Studio',
    },
    {
        id: "01",
        title: 'Unit'
    },
    {
        id: "02",
        title: 'House'
    },
];



const PropertyDetails = ({ serviceHandler, service, propertyHandler, bedroomHandler, bathroomHandler, addOnsAddButton, data, addOnsRemoveButton, addonsIncreaseHandler, noProduct }: any) => {

    const [addCheckList, setAddChecklist] = useState(false);
    const [error, setError] = useState(false);
    const animationController = useRef(new Animated.Value(0)).current
    const [selectedService, setSelectedService] = useState(service ? service === "e" ? services[1].title : services[0].title : "")
    const [selectedProperty, setSelectedProperty] = useState(String)

    const [datas, setData] = useState<any>()
    const dispatch = useDispatch()

    const bd = data?.find((x: any) => x?.title?.toLowerCase() === "bedrooms")?.quantity
    const ba = data?.find((x: any) => x?.title?.toLowerCase() === "bathrooms")?.quantity


    const filter = data?.filter((x: any) => x?.title?.toLowerCase() !== "bedrooms")
    const newFilter = filter?.filter((x: any) => x?.title?.toLowerCase() !== "bathrooms")



    const getProducts = async () => {
        let data: any = await fetchAllProducts()
        if (data.data.status === "error") {
            dispatch(addProductsFail(data.data.status))
        }
        console.log('DaTA Producrs', data.data.result)
        dispatch(addProductsSuccess(data.data.result));
    }


    const dropDownAnimation = {
        duration: 500,
        update: {
            duration: 300,
            property: LayoutAnimation.Properties.opacity,
            type: LayoutAnimation.Types.easeInEaseOut
        },
        delete: {
            duration: 200,
            property: LayoutAnimation.Properties.opacity,
            type: LayoutAnimation.Types.easeInEaseOut
        },
    }

    const dropdown = () => {

        const config = {
            duration: 300,
            toValue: addCheckList ? 0 : 1,
            useNativeDriver: true
        };

        Animated.timing(animationController, config).start();
        LayoutAnimation.configureNext(dropDownAnimation);
        setAddChecklist(!addCheckList)
    }

    const toggleDefaultChecklist = () => {
        dropdown()
    }

    const jobServiceHandler = (value: any) => {
        serviceHandler(value)
        setSelectedService(value)
    }

    const jobPropertyTypesHandler = (value: any) => {
        propertyHandler(value)
        setSelectedProperty(value)
    }

    const jobBedroomHandler = (value: string) => {

        // const x = value.substring(0, 1)
        bedroomHandler(value)
    }
    const jobBathroomHandler = (value: string) => {
        bathroomHandler(value)
    }

    const increaseAddonsHandler = (value: string) => {
        const x: any = value.substring(0, 1)
        const quantity = parseInt(x)
        const title = value.slice(4)
        let p = { quantity, title }
        addonsIncreaseHandler(p)
    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        bd <= 0 && ba <= 0 ? setError(true) : setError(false)
    }, [ba, bd])


    return (
        <View style={{ overflow: 'hidden' }}>

            <Text style={{ fontSize: 18, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium', marginBottom: Colors.spacing * 2 }}>Job</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2 }}>
                <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Service</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', width: "70%", justifyContent: "flex-start", }}>
                    {services.map((item) => {
                        return (
                            <View style={{ marginRight: "7%", }} key={item.id}>
                                <Pressable onPress={() => jobServiceHandler(item.title)} style={[styles.serviceButton, { backgroundColor: item.title === selectedService ? Colors.madidlyThemeBlue : 'white', }]}>
                                    <Text style={{ fontSize: 12, color: item.title === selectedService ? 'white' : Colors.maidlyGrayText, fontFamily: item.title === selectedService ? 'Outfit-Bold' : 'Outfit-Light' }}>{item.title}</Text>
                                </Pressable>
                            </View>
                        )
                    })}
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2 }}>
                <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Property</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', width: "69%", justifyContent: 'space-between', marginRight: 5, }}>
                    {propertyTypes.map((item) => {
                        return (
                            <View style={{}} key={item.id}>
                                <Pressable onPress={() => jobPropertyTypesHandler(item.title)} style={[styles.serviceButton, { backgroundColor: item.title === selectedProperty ? Colors.madidlyThemeBlue : 'white', }]}>
                                    <Text style={{ fontSize: 12, color: item.title === selectedProperty ? 'white' : Colors.maidlyGrayText, fontFamily: item.title === selectedProperty ? 'Outfit-Bold' : 'Outfit-Light' }}>{item.title}</Text>
                                </Pressable>
                            </View>
                        )
                    })}
                </View>
            </View>

            {error && noProduct ? <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * 2 }}>
                <IconM name="alert-circle-outline" size={18} style={{ color: Colors.red }} />
                <Text style={{ color: Colors.red, fontFamily: 'Outfit-medium', fontSize: 12, marginLeft: Colors.spacing * .5 }}>Please add atleast one bedroom or bathroom</Text>
            </View> : null}

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "600", }}>Bedrooms</Text>
                <View style={{ width: "70%", marginRight: Colors.spacing * .25, }}>
                    <SelectionCard onPress={jobBedroomHandler} size={40} fontSize={12} phColor={Colors.maidlyGrayText} rounded={true} data={bedroomsData} type={'filter'} placeholder={bd + " " + "Bedrooms"} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "600", }}>Bathrooms</Text>
                <View style={{ width: "70%", marginRight: Colors.spacing * .25, }}>
                    <SelectionCard onPress={jobBathroomHandler} size={40} fontSize={12} phColor={Colors.maidlyGrayText} rounded={true} data={bathroomsData} type={'filter'} placeholder={ba + " " + "Bathrooms"} />
                </View>
            </View>

            {
                newFilter?.map((item: any) => {
                    if (item.quantity >= 1) {

                        let newData = [
                            {
                                id: '00',
                                name: `1 ${" "} ${item.title}`,
                            },
                            {
                                id: '01',
                                name: `2 ${" "} ${item.title}`,
                            },
                            {
                                id: '02',
                                name: `3 ${" "} ${item.title}`,
                            },
                            {
                                id: '03',
                                name: `4 ${" "} ${item.title}`
                            },
                            {
                                id: '04',
                                name: `5 ${" "} ${item.title}`
                            },
                            {
                                id: '05',
                                name: `6 ${" "} ${item.title}`
                            },
                        ];

                        return (
                            <>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing * 2, }}>
                                    <Text style={{ fontSize: 12, color: Colors.black, fontWeight: isAndroid ? "900" : "600", }}>{item.title}</Text>
                                    <View style={{ width: "70%", marginRight: Colors.spacing * .25, }}>
                                        <SelectionCard onPress={increaseAddonsHandler} size={40} fontSize={12} phColor={Colors.maidlyGrayText} rounded={true} data={newData} type={'filter'} placeholder={item.quantity + " " + item.title} />
                                    </View>
                                </View>
                            </>
                        )
                    }
                })
            }



            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Colors.spacing, }}>
                <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Medium', }}>Addons</Text>
                <View style={{}}>
                    <Switch
                        trackColor={{ false: "#767577", true: Colors.black }}
                        thumbColor={'white'}
                        onValueChange={toggleDefaultChecklist}
                        value={addCheckList}
                    />
                </View>
            </View>

            {
                addCheckList &&
                <View style={styles.productsContainer}>
                    {newFilter?.map((item: any) => {
                        return (
                            <View style={[styles.productsCard, {}]} key={item._id}>
                                <Text style={{ fontSize: 12, color: Colors.black, fontFamily: 'Outfit-Light', }}>{item.title}</Text>
                                <Pressable onPress={() => { item.quantity >= 1 ? addOnsRemoveButton(item) : addOnsAddButton(item) }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, height: 25, paddingVertical: Colors.spacing * .5, borderRadius: Colors.spacing * .5, backgroundColor: Colors.madidlyThemeBlue, width: 80 }}>
                                        <IconM name={item.quantity >= 1 ? "close-circle-outline" : 'plus-circle-outline'} size={14} style={{ color: "#fff" }} />
                                        <Text style={{ alignSelf: 'center', fontSize: 12, color: 'white', fontFamily: 'Outfit-Bold', }}>{item.quantity >= 1 ? "Remove" : 'Add'}</Text>
                                    </View>
                                </Pressable>
                            </View>
                        )
                    })}
                </View >
            }
            
            <View style={{ opacity: .35, marginTop: Colors.spacing, marginBottom: Colors.spacing * 2, borderBottomWidth: 2, borderColor: Colors.borderColor }} />
        </View >

    )

}



export default PropertyDetails

const styles = StyleSheet.create({
    productsCard: {
        marginBottom: Colors.spacing * 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: Colors.spacing * 1,
        borderColor: Colors.black,

    },
    productsContainer: {
        justifyContent: "space-between",
        marginTop: Colors.spacing,
        overflow: 'hidden'
    },
    serviceButton: {
        // marginRight: Colors.spacing * 1,
        backgroundColor: 'white',
        borderColor: Colors.borderColor,
        paddingHorizontal: Colors.spacing * 2,
        height: 40,
        justifyContent: 'center',
        shadowRadius: 2,
        borderRadius: Colors.spacing * Colors.spacing,
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: .2,
        elevation: 2,
        shadowColor: Colors.madidlyThemeBlue,
        borderWidth: isAndroid ? .35 : 0,
    }
})