import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Settings from './Settings';
import PersonalInfo from './PersonalInfo';
import Password from './Password';



const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerShown: false,
                tabBarShowLabel: false,
                backgroundColor: 'white'
            })}>
            <Stack.Screen name="setting" component={Settings} />
            <Stack.Screen name="personalInfo" component={PersonalInfo} />
            <Stack.Screen name="updatePassword" component={Password} />
        </Stack.Navigator>
    );
}

export default MyStack;