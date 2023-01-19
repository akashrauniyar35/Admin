import { View, Text, Platform, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../assets/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
const isAndroid = Platform.OS == 'android' ? true : false
const MapCard = ({ lable }) => {



    const CustomMarker = () => {
        return (
            <View>
                <Icon name="md-location" size={35} color={Colors.madidlyThemeBlue} />
            </View>
        )
    }

    return (
        <View>

            <View>

                <MapView
                    // showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: -33.867180,
                        longitude: 151.069140,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: -33.867180, longitude: 151.069140 }}
                    >
                        <CustomMarker />
                    </Marker>

                </MapView>
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

