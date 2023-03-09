import { Text, View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Colors, isAndroid } from '../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
/*
  1. Create the config
*/
const toastConfig = {

    deleteToast: ({ text1, props, bg }: any) => (
        <View style={{ height: 60, width: '100%', backgroundColor: bg ? bg : Colors.red, justifyContent: 'center', paddingHorizontal: Colors.spacing * 2, position: 'absolute', top: -40, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Icon name={'checkmark-circle'} size={28} color="#fff" />
                <View style={{ marginLeft: Colors.spacing * 2, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * .5 }}>
                        <Text style={{ fontSize: 12, color: 'white', fontWeight: isAndroid ? "600" : "300" }}>Quote Reference : </Text>
                        <Text style={{ fontSize: 12, color: 'white', fontWeight: isAndroid ? "900" : "600" }}>{text1}</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: 'white', fontWeight: isAndroid ? "900" : "600", marginRight: Colors.spacing }}>{props.message}</Text>
                </View>
            </View>
        </View >
    ),
    modalDeleteToast: ({ text1, props, bg }: any) => (
        <View style={{ height: 60, width: '100%', backgroundColor: bg ? bg : Colors.red, justifyContent: 'center', paddingHorizontal: Colors.spacing * 2, position: 'absolute', top: -105, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Icon name={'checkmark-circle'} size={28} color="#fff" />
                <View style={{ marginLeft: Colors.spacing * 2, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * .5 }}>
                        <Text style={{ fontSize: 12, color: 'white', fontWeight: isAndroid ? "600" : "300" }}>Quote Reference : </Text>
                        <Text style={{ fontSize: 12, color: 'white', fontWeight: isAndroid ? "900" : "600" }}>{text1}</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: 'white', fontWeight: isAndroid ? "900" : "600", marginRight: Colors.spacing }}>{props.message}</Text>
                </View>
            </View>
        </View >
    ),

    successToast: ({ text1, props, }: any) => {
        return (
            <View style={{ height: 60, width: '100%', backgroundColor: Colors.green, justifyContent: 'center', paddingHorizontal: Colors.spacing * 2, position: 'absolute', top: -40, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Icon name={'checkmark-circle'} size={28} color="#fff" />
                    <View style={{ marginLeft: Colors.spacing * 2, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * .5 }}>
                            <Text style={{ fontFamily: 'Outfit-Light', fontSize: 12, color: 'white', fontWeight: isAndroid ? "600" : "300" }}>Quote Reference : </Text>
                            <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 12, color: 'white', fontWeight: isAndroid ? "900" : "600" }}>{text1}</Text>
                        </View>
                        <Text style={{ fontFamily: 'Outfit-Medium', fontSize: 12, color: 'white', fontWeight: isAndroid ? "900" : "600", marginRight: Colors.spacing }}>{props.message}</Text>
                    </View>
                </View>
            </View >
        )
    },

    modalSuccessToast: ({ text1, props, }: any) => {
        return (
            <View style={{ height: 60, width: '100%', backgroundColor: Colors.green, justifyContent: 'center', paddingHorizontal: Colors.spacing * 2, top: -105, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Icon name={'checkmark-circle'} size={28} color="#fff" />
                    <View style={{ marginLeft: Colors.spacing * 2, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * .5 }}>
                            <Text style={{ fontFamily: 'Outfit-Light', fontSize: 12, color: 'white', fontWeight: isAndroid ? "600" : "300" }}>Quote Reference : </Text>
                            <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 12, color: 'white', fontWeight: isAndroid ? "900" : "600" }}>{text1}</Text>
                        </View>
                        <Text style={{ fontFamily: 'Outfit-Medium', fontSize: 12, color: 'white', fontWeight: isAndroid ? "900" : "600", marginRight: Colors.spacing }}>{props.message}</Text>
                    </View>
                </View>
            </View >
        )
    },

    success: ({ text1, text2, props, }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: text2, justifyContent: 'center', paddingHorizontal: Colors.spacing * 2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Icon name={'checkmark-circle'} size={28} color="#fff" />
                <View style={{ marginLeft: Colors.spacing * 2, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * .5 }}>
                        <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 12, color: 'white', fontWeight: isAndroid ? "900" : "600" }}>{text1}</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: 'white', fontWeight: isAndroid ? "900" : "600", marginRight: Colors.spacing }}>{props.message}</Text>
                </View>
            </View>
        </View >
    ),
    addToast: ({ text1, props, }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: Colors.green, justifyContent: 'center', paddingHorizontal: Colors.spacing * 2, position: 'absolute', top: -40, }}><View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Icon name={'checkmark-circle'} size={28} color="#fff" />
            <View style={{ marginLeft: Colors.spacing * 2, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * .5 }}>
                    <Text style={{ fontSize: 12, color: 'white', fontWeight: isAndroid ? "600" : "300" }}></Text>
                    <Text style={{ fontSize: 12, color: 'white', fontWeight: isAndroid ? "900" : "600" }}>{text1}</Text>
                </View>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: isAndroid ? "900" : "600", marginRight: Colors.spacing }}>{props.message}</Text>
            </View>
        </View>
        </View >
    )


};

/*
  2. Pass the config as prop to the Toast component instance
*/
export default function ShowToast() {
    return <Toast config={toastConfig} />
}