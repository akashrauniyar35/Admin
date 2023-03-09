import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Provider, } from 'react-redux';
import store from './src/redux/store';


import { LogBox } from "react-native";
import { getNewAccessTolken } from './src/config/UserApi';
import RootStack from './src/navigation/RootStack';
LogBox.ignoreLogs(["Sending `onAnimatedValueUpdate` with no listeners registered.",]);

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const App = () => {

  const getNewAccessToken = async () => {
    const x: any = await getNewAccessTolken()
    if (x.status === "success") {
      console.log("New Token Success")
    }
    else {
      console.log("New Token Fail")
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getNewAccessToken()
    }, 885000);
    return () => clearInterval(interval);
  }, []);


  return (
    <NavigationContainer theme={navTheme}>
      <Provider store={store}>
        <StatusBar barStyle='dark-content' />
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <RootStack />
        </View>
      </Provider>
    </NavigationContainer>
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
