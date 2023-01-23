import { View, Text, Platform, Image, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../assets/Colors'
import Icon from 'react-native-vector-icons/Ionicons';

import fetchLatLong from '../config/MapsApi'
import MapView, { Marker, PROVIDER_GOOGLE, AnimatedRegion, Animated, MarkerAnimated } from 'react-native-maps'
const isAndroid = Platform.OS == 'android' ? true : false

const MapCard = ({ address }: any) => {
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034
    })
    const [loading, setLoading] = useState(true)

    const getLatLong = async () => {
        let data: any = await fetchLatLong(address)
        console.log("promise res", data)
        setRegion({ ...region, latitude: data.latitude, longitude: data.longitude })
    }

    useEffect(() => {
        getLatLong()
        setTimeout(() => setLoading(false), 1500)
    }, [address])

    const CustomMarker = () => {
        return (
            <View>
                <Icon name="md-location" size={35} color={Colors.red} />
            </View>
        )
    }

    return (
        <View>
            <View>
                {loading ?
                    <View style={[styles.map, { alignItems: 'center', justifyContent: 'center' }]}>
                        <ActivityIndicator color={Colors.madidlyThemeBlue} animating={loading} />
                    </View> :
                    <View>
                        <MapView
                            initialRegion={region}
                            region={region}
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                        >
                            <Marker
                                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                            >
                                <CustomMarker />
                            </Marker>
                        </MapView>
                    </View>
                }

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },

    map: {
        height: 250,
    },
})

export default MapCard

