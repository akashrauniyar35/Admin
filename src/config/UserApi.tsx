
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endPoint } from './index'





export const userLogin = (data: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.post("customer/login", data)
            resolve(res.data);
            if ((res.data.status === "success")) {
                try {
                    await AsyncStorage.setItem('@access_Token', res.data.accessJWT)
                    await AsyncStorage.setItem('@refresh_Token', res.data.refreshJWT)
                } catch (e) {
                    console.log('async storage error', e)
                }
            }
        } catch (error: any) {
            reject(error.data);

        }
    })
};


export const fetchUserProfile = (value: any) => {
    return new Promise(async (resolve, reject) => {

        try {
            const res: any = await endPoint.get("customer", {
                headers: {
                    Authorization: value
                }
            })
            resolve(res.data.user._doc);
        }
        catch (err: any) {
            reject(err.message)
        }

    })
};

export const ABC = (data: any) => {
    return new Promise(async (resolve, reject) => {
        try {
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
};

