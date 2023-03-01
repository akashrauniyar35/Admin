
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endPoint } from './index'

import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    deleteObject,
} from "firebase/storage";

import storage from "../config/firebaseConfig";

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


export const updateProfilePic = async (file: any, pic: any, id: any, getUserProfile: any) => {
    const metaData = {
        contentType: 'image/jpeg'
    }
    const img = await fetch(file.uri)
    const bytes = await img.blob()
    const fileName = file.uri.substring(file.uri.lastIndexOf('/') + 1)
    const storageRef = ref(storage, `files/profilePic/${fileName}`);
    const deleteRef = ref(storage, pic);


    const uploadTask = uploadBytesResumable(storageRef, bytes, metaData);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);
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
            });
        }
    );
};

export const getNewRefreshTolken = () => {
    return new Promise(async (resolve, reject) => {
        const refresh_token = await AsyncStorage.getItem('@refresh_Token')
        try {
            const res: any = await endPoint.get(`/tokens`, {
                headers: {
                    Authorization: refresh_token
                }
            })
            resolve(res.data)
            if ((res.data.status === "success")) {
                try {
                    await AsyncStorage.setItem('@access_Token', res.data.accessJWT)
                } catch (e) {
                    console.log('async storage error', e)
                }
            }
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
};
