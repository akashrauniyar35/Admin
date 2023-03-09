import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login/Login';
import RecoverPassword from '../pages/Login/RecoverPassword';
import OTP from '../pages/Login/OTP';
import PasswordInput from '../pages/Login/PasswordInput';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerShown: false,
                tabBarShowLabel: false,
                backgroundColor: 'white'
            })}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="otp" component={OTP} />
            <Stack.Screen name="recoverPassword" component={RecoverPassword} />
            <Stack.Screen name="passwordInput" component={PasswordInput} />
        </Stack.Navigator>
    );
}

export default MyStack;