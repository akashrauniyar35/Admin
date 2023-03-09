import { endPoint } from './index'
import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    deleteObject,
} from "firebase/storage";

import storage from "../config/firebaseConfig";

export const fetchAllTechnician = () => {
    return new Promise(async (resolve, reject) => {

        try {
            const res: any = await endPoint.get(`technician/all?page=${1}&limit=10`)
            resolve(res);
            console.log('PRODUCTS', res)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
};


export const fetchTecByID = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.get(`technician/${id}`)
            resolve(res)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
};

export const fetchEditTech = (id: string, data: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.put(`technician/${id}`, data)
            resolve(res)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
};

export const removeTech = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.delete(`technician/${id}`)
            resolve(res.data)
            console.log('delete res', res)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
};

export const addTech = (data: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.post(`technician`, data)
            resolve(res.data)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
};
export const assignTechnician = (id: string, tech: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.put(`booking/${id}`, {
                assignedTech: [
                    tech
                ],
            })
            console.log("notes api res", res)
            resolve(res.data)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
}

export const clearAssignTechnician = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.put(`booking/${id}`, {
                assignedTech: [],
            })
            resolve(res.data)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
}


export const uploadTechPicture = async (file: any, pic: any, id: any, viewTechHandler: any, setUploading: any) => {
    setUploading(true)
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
            setUploading(false)
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);
                pic !== ""
                    ? deleteObject(deleteRef).then(async () => {
                        console.log("deleting", deleteRef)
                        await endPoint.put(
                            `technician/${id}`,
                            {
                                profilePic: {
                                    src: downloadURL,
                                },
                            }
                        );
                        viewTechHandler(id)
                        setUploading(false)
                    }).catch(err => { console.log("delete err", err) })

                    : await endPoint.put(`technician/${id}`, {
                        profilePic: {
                            src: downloadURL,
                        },
                    })
                viewTechHandler(id)
                setUploading(false)
            });
        }
    );
};


