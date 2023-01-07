import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { isAndroid } from '../assets/Colors'
import { Colors } from 'react-native/Libraries/NewAppScreen'

{/* <ProgressBar step={10} steps={10} height={15} /> */}

const ProgressBar = ({ steps, step, height }) => {
    const [w, setW] = useState(0)
    const animatedValue = useRef(new Animated.Value(1000)).current;
    const reactive = useRef(new Animated.Value(1000)).current;



    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, []);


    useEffect(() => {
        reactive.setValue(-w + (w * step) / steps)
    }, [step, w, steps])

    return (
        <>
            <Text style={{ color: Colors.maidlyGrayText, fontSize: 12, fontWeight: isAndroid ? "900" : "600" }}>
                {step}/{steps}
            </Text>
            <View onLayout={e => {
                const newWidth = e.nativeEvent.layout.width;
                setW(newWidth)
            }} style={{
                height,
                backgroundColor: `rgba(0,0,0,0.1)`,
                borderRadius: height,
                overflow: 'hidden',
            }}>


                <Animated.View
                    style={{ height, width: "100%", backgroundColor: `rgba(0,0,0,0.5)`, borderRadius: height, position: 'absolute', right: 0, top: 0, transform: [{ translateX: animatedValue }] }}>
                </Animated.View>


            </View>
        </>
    )
}

export default ProgressBar

const styles = StyleSheet.create({


})