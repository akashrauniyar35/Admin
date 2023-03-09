import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../components/SplashScreen';
import Home from './Drawer'
import AuthStack from './AuthenticationStack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, getNewAccessTolken } from '../config/UserApi';
import { getUserFail, getUserPending, getUserSuccess } from '../redux/userSlice';
const Stack = createStackNavigator();


const RootStack = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState<null | string>(null)

    const isAuthenticated = useSelector((state: any) => state.authReducer.isAuthenticated)
    async function getAccessToken() {
        try {
            const value: any = await AsyncStorage.getItem('@access_Token')
            if (value !== undefined) {
                const x: any = await getNewAccessTolken()
                if (x.status === "success") {

                    dispatch(getUserPending());
                    const y: any = await fetchUserProfile(x.accessJWT)
                    if (y.message === "") {
                        dispatch(getUserFail());
                        console.log("--user access token expired --", y)
                    } else {
                        dispatch(getUserSuccess(y))
                        setToken(x.accessJWT)
                        setIsLoading(false)
                    }
                }
                else {
                    console.log("New Token Fail")
                    setToken(null)
                }
            } else {
                setIsLoading(false)
                setToken(null)
                console.log("async access token", value)
            }
        } catch (e) {
            setIsLoading(false)
            setToken(null)
            console.log("No previously saved token")
        }
    }
    useEffect(() => {
        getAccessToken()
    }, [isAuthenticated])


    if (isLoading) {
        // We haven't finished checking for the token yet
        return <SplashScreen />;
    }
    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false,
            tabBarShowLabel: false,
            backgroundColor: 'white'
        })}>
            {token == null ? (
                // No token found, user isn't signed in
                <Stack.Screen name="authStack" component={AuthStack} />
            ) : (
                // User is signed in
                <Stack.Screen name="Drawer" component={Home} />
            )}
        </Stack.Navigator >
    );
}

export default RootStack;


