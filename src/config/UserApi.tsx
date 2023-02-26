
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endPoint } from './index'

import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    deleteObject,
} from "firebase/storage";

import storage from "../config/firebaseConfig";
import { useSelector } from 'react-redux';

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



export const updatePrifileDetails = (u_id, data) => {
    return new Promise(async (resolve, reject) => {
        const access_token = await AsyncStorage.getItem('@access_Token')
        try {
            const res: any = await endPoint.put(`customer/${u_id}`, data, {
                headers: {
                    Authorization: access_token
                }
            })
            resolve(res.data)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
};

export const ssd = (data: any) => {
    return new Promise(async (resolve, reject) => {
        try {
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
};

export const updateProfilePic = async (file: any, pic: any, id: any, getUserProfile: any) => {
    const img = await fetch(file.uri)
    const bytes = await img.blob()
    const fileName = file.uri.substring(file.uri.lastIndexOf('/') + 1)
    const storageRef = ref(storage, `files/profilePic/${fileName}`);
    const deleteRef = ref(storage, pic);
    const uploadTask = uploadBytesResumable(storageRef, bytes);

    console.log("fileName", file)

    uploadTask.on(
        "state_changed",
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log("downloadURL", downloadURL)
                pic !== ""
                    ? deleteObject(deleteRef).then(async () => {
                        console.log("deleting", deleteRef)
                        await endPoint.put(
                            `customer/${id}`,
                            {
                                profilePic: {
                                    src: downloadURL,
                                },
                            }
                        );
                        getUserProfile()
                    }).catch(err => { console.log("delete err", err) })

                    : await endPoint.put(`customer/${id}`, {
                        profilePic: {
                            src: downloadURL,
                        },
                    })
                getUserProfile()
                console.log("upload success", downloadURL)
            }).catch(err => {
                console.log(err)
            })

        }
    )
};
