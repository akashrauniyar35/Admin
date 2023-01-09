
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

export const updateProfilePic = async (file, pic, id) => {
    console.log("user", file, pic, id)
    const storageRef = ref(storage, `files/profilePic/${file.fileName}`);
    const deleteRef = ref(storage, pic);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log("downloadURL", downloadURL)
                await endPoint.put(`customer/${id}`, {
                    profilePic: {
                        src: downloadURL,
                    },
                });
                // pic !== ""
                //     ? deleteObject(deleteRef).then(async () => {
                //         console.log("deleting", deleteRef)
                //         await endPoint.put(
                //             `customer/${id}`,
                //             {
                //                 profilePic: {
                //                     src: downloadURL,
                //                 },
                //             }
                //         );
                //         console.log("delete error", pic, downloadURL)

                //         // setSelectedFile(undefined);
                //         // dispatch(getUserProfile());
                //     })
                //     : await endPoint.put(`customer/${id}`, {
                //         profilePic: {
                //             src: downloadURL,
                //         },
                //     });
                console.log("upload success", downloadURL)

                // setSelectedFile(undefined);
                // dispatch(getUserProfile());
            });
        }
    );
};

// user?.profilePic.src !== ""
//             ? deleteObject(deleteRef).then(async () => {
//                 await axios.put(
//                   `http://localhost:3001/v1/customer/${user._id}`,
//                   {
//                     profilePic: {
//                       src: downloadURL,
//                     },
//                   }
//                 );
//                 setSelectedFile(undefined);
//                 dispatch(getUserProfile());
//               })
//             : await axios.put(`http://localhost:3001/v1/customer/${user._id}`, {
//                 profilePic: {
//                   src: downloadURL,
//                 },
//               });