import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ShowCard from '../pages/Login/ShowCard';
import Login from '../pages/Login/Login';
import RecoverPassword from '../pages/Login/RecoverPassword';
import OTP from '../pages/Login/OTP';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerShown: false,
                tabBarShowLabel: false,
                backgroundColor: 'white'
            })}>
            <Stack.Screen name="showCard" component={ShowCard} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="otp" component={OTP} />
            <Stack.Screen name="recoverPassword" component={RecoverPassword} />
        </Stack.Navigator>
    );
}

export default MyStack;