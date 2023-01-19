import { Animated, LayoutAnimation, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors, isAndroid } from '../assets/Colors'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

const CheckListCard = ({ status, category, lable, name, date, required }) => {
    const [visible, setVisible] = useState(false);

    const animationController = useRef(new Animated.Value(0)).current

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


    const arrowTransform = () => {
        const config = {
            duration: 300,
            toValue: visible ? 0 : 1,
            useNativeDriver: true
        };

        Animated.timing(animationController, config).start();
        LayoutAnimation.configureNext(dropDownAnimation);
        setVisible(true);
    }


    const arrowRotateAnimation = animationController.interpolate({
        inputRange: [0, .5,],
        outputRange: ['0deg', '180deg',],
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconM name="drag" size={20} color={Colors.maidlyGrayText} />
                <Text style={{ marginLeft: Colors.spacing, fontSize: 16, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Bold', }}>{category}</Text>
            </View>


            <View style={styles.body}>



                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <IconM name="dots-vertical" size={20} color={Colors.maidlyGrayText} />
                        <Text style={{ marginLeft: Colors.spacing, fontSize: 16, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Medium', }}>{lable}</Text>
                    </View>

                    <Icon name={status === "Completed" ? "radio-button-on" : "radio-button-off"} size={20} color={Colors.maidlyGrayText} />
                </View>


                <View style={{ height: .35, width: '100%', marginVertical: Colors.spacing, backgroundColor: Colors.maidlyGrayText }} />

                <Pressable onPress={() => { arrowTransform(), setVisible(!visible) }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", marginBottom: visible ? Colors.spacing : 0 }}>

                        <View style={{}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <View style={{ backgroundColor: status === "In Progress" ? Colors.inProgreessOrangeBG : Colors.completedGreenBG, padding: Colors.spacing * .55, borderRadius: Colors.spacing * .5, paddingHorizontal: Colors.spacing }}>
                                    <Text style={{ fontSize: 10, color: status === "In Progress" ? Colors.inProgreessOrange : Colors.completedGreen, fontFamily: 'Outfit-ExtraBold', }}>{status}</Text>
                                </View>
                                {date !== "" && <Text style={{ fontSize: 10, marginLeft: Colors.spacing, color: Colors.grayText, fontFamily: 'Outfit-Medium', }}>on {date} at {'03:10 PM'}</Text>}
                            </View>

                            {name !== "" && <View style={{ marginTop: Colors.spacing }}>
                                <Text style={{ fontSize: 10, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Bold', }}>{name}</Text>
                            </View>}
                        </View>

                        <Pressable onPress={() => { arrowTransform(), setVisible(!visible) }}>
                            <Animated.View style={{ transform: [{ rotateZ: arrowRotateAnimation }] }}>
                                <Icon color={Colors.grayOne} style={{}} name={visible ? "chevron-up" : "chevron-down"} size={22} />
                            </Animated.View>
                        </Pressable>

                    </View>
                </Pressable>

                {required && visible &&
                    <View style={styles.dropDown}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <IconM name="checkbox-blank-outline" size={20} color={Colors.maidlyGrayText} />
                            <Text style={{ marginLeft: Colors.spacing, fontSize: 14, color: Colors.maidlyGrayText, fontFamily: 'Outfit-Light', }}>Required task</Text>
                        </View>
                    </View>}
            </View>


        </View>
    )
}

export default CheckListCard

const styles = StyleSheet.create({

    container: { marginBottom: Colors.spacing * 2 },
    header: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.grayBG, borderRadius: Colors.spacing * .5,
        padding: Colors.spacing,
    },
    body: {
        marginVertical: Colors.spacing,
        borderWidth: .35,
        overflow: 'hidden',
        padding: Colors.spacing,
        borderRadius: Colors.spacing * .5,
        borderColor: Colors.maidlyGrayText
    },
    dropDown: {
        marginVertical: Colors.spacing,
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between',
    }
})