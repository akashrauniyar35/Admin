
import { Platform, Dimensions } from 'react-native';

export const Colors = {
    spacing: 10,
    green: '#48a14d',
    red: "#f7575b",
    redBG: "#ffe9ea",
    orange: '#f2a010',
    // orange: '#F6BD59',
    orangeBG: '#fff8ed',
    skyColor: '#A8D0DA',
    lightGlass: "#D8E8E8",
    lightRed: "#F56A79",
    black: "#0F0F0F",
    darkBlue: "#1D3557",
    unPaid: '#C10000',
    paid: '#52e85b',
    paidBG: '#eaffec',
    grayText: "#858585",
    grayBG: '#f5f5f5',
    littleGray: '#333333',
    transparentGloss: 'rgba(0,0,0,0.6)',
    grayOne: '#454545',
    madlyBGBlue: '#F2F7F8',
    // madidlyThemeBlue: '#013F80',
    madidlyThemeBlue: '#452F70',
    maidlyGrayText: "#5A5A5A",
    dartTextGray: '#333333',
    completedGreen: "#27b82f",
    completedGreenBG: '#daf9dc',
    inProgreessOrange: '#F6BD59',
    inProgreessOrangeBG: '#fff8ed',
    cancelledRed: '#E2474B',
    cancelledRedBG: '#f7d1d2',
    borderColor:'#cecece'

    
}

export const isAndroid = Platform.OS == 'android' ? true : false
export const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen')

export var lightenColor = function (color, percent) {
    var num = parseInt(color.substring(1, 10), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        B = (num >> 8 & 0x00FF) + amt,
        G = (num & 0x0000FF) + amt;

    return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
};