import { View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

export default function DonutOne({
    percentage = 75,
    radius = 40,
    strokeWidth = 10,
    duration = 500,
    color = "",
    delay = 0,
    textColor,
    max = 100,
}) {
    const halfCircle = radius + strokeWidth;
    const circumference = 2 * Math.PI * radius;
    return (
        <View>
            <Svg width={radius * 2}
                height={radius * 2}
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
            >
                <G rotation="-90"
                    origin={`${halfCircle}, ${halfCircle}`}>
                    <Circle
                        cx="50%"
                        cy="50%"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill="transparent"
                        strokeOpacity=".2"
                    />
                    <Circle />
                    <Circle
                        cx="50%"
                        cy="50%"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference / 2}
                    />
                    <Circle />
                </G>
            </Svg>
        </View>
    )
}