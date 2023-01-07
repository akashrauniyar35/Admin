import { View, Text, Platform, Image } from 'react-native'
import React from 'react'
import { Colors } from '../assets/Colors'
import { sub } from 'react-native-reanimated'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
const isAndroid = Platform.OS == 'android' ? true : false
const MapCard = ({ lable }) => {
    return (
        <View>
            {lable && <Text style={{ fontWeight: isAndroid ? "900" : "600", marginBottom: Colors.spacing, color: Colors.green, fontSize: 16, marginRight: Colors.spacing }}>Map</Text>
            }
            <View style={{
                backgroundColor: 'white',
            }}>

                <View style={{}}>
                    <Image source={{ uri: 'https://pp.walk.sc/apartments/e/1/460x400/AU-NSW/Sydney/Strathfield.png' }} style={{ width: '100%', height: 200 }} />
                </View>



            </View>
        </View>
    )
}

export default MapCard