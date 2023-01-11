import * as React from 'react';
import {
    Easing,
    TextInput,
    Animated,
    Text,
    View,
    StyleSheet,
} from 'react-native';
import Svg, { G, Circle, Rect } from 'react-native-svg';
import { isAndroid, Colors } from '../assets/Colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function Donut({
    radius,
    percentage,
    max,
    lable,
    color,
    textColor = color,
    strokeWidth = 10,
    duration = 500,

}) {
    const animated = React.useRef(new Animated.Value(0)).current;
    const circleRef = React.useRef();
    const inputRef = React.useRef();
    const circumference = 2 * Math.PI * radius;
    const halfCircle = radius + strokeWidth;

    const animation = (toValue) => {
        return Animated.timing(animated, {
            delay: 1000,
            toValue,
            duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start(() => {
            animation(toValue);
        });
    };

    React.useEffect(() => {
        animation(percentage);
        animated.addListener((v) => {
            const maxPerc = 100 * v.value / max;
            const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
            if (inputRef?.current) {
                inputRef.current.setNativeProps({
                    text: `${Math.round(v.value)}`,
                });
            }
            if (circleRef?.current) {
                circleRef.current.setNativeProps({
                    strokeDashoffset,
                });
            }
        }, [max, percentage]);

        return () => {
            animated.removeAllListeners();
        };
    });

    return (
        <View style={{ width: radius * 3, height: radius * 3, }}>
            <Svg
                height={radius * 3}
                width={radius * 3}
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
                <G
                    rotation="-90"
                    origin={`${halfCircle}, ${halfCircle}`}>
                    <Circle
                        ref={circleRef}
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDashoffset={circumference}
                        strokeDasharray={circumference}
                    />
                    <Circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinejoin="round"
                        strokeOpacity=".1"
                    />
                </G>
            </Svg>
            {/* <View style={{}}> */}
            <AnimatedTextInput
                ref={inputRef}
                underlineColorAndroid="transparent"
                editable={false}
                defaultValue="0"
                style={[
                    StyleSheet.absoluteFillObject,
                    { fontSize: radius / 2, color: textColor ?? color },
                    styles.text,
                ]}
            />
            <Text style={{ position: "absolute", alignSelf: 'center', marginTop: radius * 1.8, color, fontWeight: isAndroid ? "900" : "600", fontSize: 8 }}>{lable}</Text>

            {/* </View> */}

        </View>
    );
}

const styles = StyleSheet.create({
    text: { fontWeight: '900', textAlign: 'center', },
});

// donutMAP
// const data = [
//     {
//         percentage: 8,
//         color: 'tomato',
//         max: 10
//     },
//     {
//         percentage: 14,
//         color: 'skyblue',
//         max: 20
//     },
//     {
//         percentage: 92,
//         color: 'gold',
//         max: 100
//     },
//     {
//         percentage: 240,
//         color: '#222',
//         max: 500
//     },
// ]
//     < View style = {{ flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'center' }}>
//     {
//         data.map((p, i) => {
//             return <Donut key={i} percentage={p.percentage} color={p.color} delay={500 + 100 * i} max={p.max} />
//         })
//     }
// </View >