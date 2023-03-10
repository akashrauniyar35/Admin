import { ActivityIndicator, Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../assets/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import { loginPending, loginFail, loginSuccess } from '../../redux/authenticationSlice';
import { fetchUserProfile, userLogin } from '../../config/UserApi'
import { useSelector, useDispatch } from 'react-redux'
import google from "../../assets/newlogo.png";
import { getUserSuccess } from '../../redux/userSlice';


const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState<any>("")
  const [password, setPassword] = useState<any>("")
  const [hiddenPassword, setHiddenPassword] = useState(false)
  const [error, setError] = useState("")
  const dispatch = useDispatch();

  const rootUrl = "https://wedo-backend.herokuapp.com/v1/";

  const loading = useSelector((state: any) => state.authReducer.loading)

  function toggleHiddenPassword() {
    setHiddenPassword(!hiddenPassword)
  }

  const loginHandle = async () => {

    const data = { "email": email, "password": password }
    dispatch(loginPending());
    try {
      const isAuth: any = await userLogin(data);

      if (isAuth.status === "error") {
        dispatch(loginFail(isAuth.message));
        setError(isAuth.message)
      }
      dispatch(loginSuccess(isAuth));
      const res: any = await fetchUserProfile(isAuth.accessJWT);
      dispatch(getUserSuccess(res));
    } catch (e: any) {
      dispatch(loginFail(e.message));
    }
  }

  return (
    <>
      <StatusBar barStyle='light-content' />
      <SafeAreaView style={{ backgroundColor: Colors.skyColor }} />
      <View style={{ backgroundColor: Colors.skyColor, flex: 1 }}>
        <View style={{ paddingHorizontal: Colors.spacing * 2, }}>

          <View style={{ alignItems: 'center', justifyContent: 'center', top: Colors.spacing * 6 }}>
            <Text style={{ color: Colors.black, fontFamily: 'Outfit-Bold', fontSize: 26 }}>Hello Again!</Text>
            <Text style={{ color: Colors.grayOne, fontSize: 14, width: '45%', paddingTop: Colors.spacing * .5, textAlign: 'center', fontFamily: 'Outfit-Light', }}>Welcome back you've been missed!</Text>
          </View>


          <View style={{ marginTop: Colors.spacing * 10 }}>

            {error === "" ? null : <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Colors.spacing * 1 }}>
              <IconM name="alert-circle-outline" size={18} style={{ color: Colors.red }} />
              <Text style={{ color: Colors.red, fontFamily: 'Outfit-medium', fontSize: 12, marginLeft: Colors.spacing * .5 }}>{error}</Text>
            </View>}

            <TextInput
              autoCapitalize='none'
              style={{ fontSize: 16, backgroundColor: '#fff', padding: Colors.spacing, borderRadius: 5, color: Colors.black, fontFamily: 'Outfit-Light', }}
              placeholderTextColor={Colors.grayText}
              placeholder={'Enter your email'}
              onChangeText={value => setEmail(value)}
              defaultValue={email}
              keyboardType="email-address"
            />

            <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderRadius: 5, alignItems: 'center', justifyContent: 'space-between', marginTop: Colors.spacing * 1 }}>
              <TextInput
                autoCapitalize='none'
                secureTextEntry={!hiddenPassword}
                style={{
                  fontSize: 16,
                  color: Colors.black,
                  width: '85%',
                  fontFamily: 'Outfit-Light',
                  backgroundColor: '#fff', borderRadius: 5, padding: Colors.spacing,
                }}
                placeholderTextColor={Colors.grayText}
                placeholder={'Password'}
                onChangeText={value => setPassword(value)}
                defaultValue={password}
              />
              <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                <Pressable onPress={toggleHiddenPassword}>
                  <Icon name={!hiddenPassword ? "ios-eye-off" : "ios-eye"} size={24} color={Colors.black} />
                </Pressable>
              </View>
            </View>
          </View>



          <Pressable onPress={() => navigation.navigate('recoverPassword')}>
            <Text style={{ color: Colors.grayOne, fontSize: 12, alignSelf: 'flex-end', marginTop: Colors.spacing, fontFamily: 'Outfit-Light' }}>Recover Password</Text>
          </Pressable>


          <View style={{ marginBottom: Colors.spacing * 6 }} />


          <Pressable onPress={loginHandle}>
            <View style={{ flexDirection: 'row', height: 40, alignItems: 'center', backgroundColor: Colors.madidlyThemeBlue, borderRadius: 5, padding: Colors.spacing, justifyContent: 'center' }}>
              {loading ? <ActivityIndicator animating={loading} color="white" size={20} /> : <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'Outfit-Bold', }}>Sign In</Text>
              }
            </View>
          </Pressable>

        </View>

      </View >

      {/* <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: Colors.spacing * 4, alignSelf: 'center' }}>

        <Text style={{ color: Colors.black, fontSize: 14, marginRight: 5 }}>Not a member?</Text>

        <Pressable >
          <Text style={{ color: Colors.darkBlue, fontSize: 14, fontWeight: '600' }}>Register Now</Text>
        </Pressable>
      </View> */}

    </>
  )
}

export default Login

const styles = StyleSheet.create({})