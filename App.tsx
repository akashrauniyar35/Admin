/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import store from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthenticationStack from './src/navigation/AuthenticationStack';
import Drawer from './src/navigation/Drawer'


const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};




const App = () => {

  const [savedToken, setSavedToken] = useState();

  const getAccessToken = async () => {
    console.log('trying')
    try {
      const value = await AsyncStorage.getItem('@refresh_Token')
      // const value = await AsyncStorage.getItem('@access_Token')
      if (value !== undefined) {
        console.log("GET ASYNC STORAGE ACCESS", value);
        setSavedToken(value)
        console.log("ASYNC STORAGE ACCESS", value, 'sssss', savedToken);
        // value previously stored
      } else {
        setSavedToken(value)
        console.log("async access token", value)
      }


    } catch (e) {
      // error reading value
    }
  }



  useEffect(() => {
    getAccessToken()
  }, [savedToken])

  const AppView = () => {
    let isAuth = useSelector((state: any) => state.authReducer.isAuthenticated);
    // console.log("SLELCTOR APP", savedToken, isAuth)
    // return <Text>Hello</Text>
    return isAuth ? <Drawer /> : <AuthenticationStack />
  }


  return (
    <>
      <NavigationContainer theme={navTheme}>
        <Provider store={store}>
          <StatusBar barStyle='dark-content' />
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <AppView />
          </View>

        </Provider>
      </NavigationContainer>
    </>
  )
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
