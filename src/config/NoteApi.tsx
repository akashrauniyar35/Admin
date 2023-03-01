import { endPoint } from './index'

import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    deleteObject,
    uploadBytes
} from "firebase/storage";
import storage from "../config/firebaseConfig";
import { useDispatch } from 'react-redux';
import { uploadFileFail, uploadFilePending, uploadFileSuccess } from '../redux/noteSlice';



export const AddSystemNote = (id: any, previousNote: any, newNote: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.put(`booking/${id}`, {
                notes: [
                    ...previousNote, newNote
                ],
            })
            console.log("notes api res", res, id, previousNote, newNote)
            resolve(res.data)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
};

export const DeleteSystemNote = (id: any, newNotes: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.put(`booking/${id}`, {
                notes: [...newNotes],
            })
            console.log("notes api res", res)
            resolve(res.data)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
};

export const uploadFiles = async (file: any, previousFiles: any, id: any, refresh: any, dispatch: any) => {
    dispatch(uploadFilePending())
    const metaData = {
        contentType: 'image/jpeg'
    }

    const img = await fetch(file.uri)
    const bytes = await img.blob()
    const fileName = file.uri.substring(file.uri.lastIndexOf('/') + 1)
    const storageRef = ref(storage, `files/bookings/img/` + Date.now());

    const uploadTask = uploadBytesResumable(storageRef, bytes, metaData);
    return uploadTask.on('state_changed',
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
            dispatch(uploadFileFail())
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
            return getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);
                downloadURL ?
                    (await endPoint.put(
                        `booking/${id}`,
                        {
                            files: [...previousFiles, downloadURL],
                        }
                    )) : null;
                dispatch(uploadFileSuccess())
                refresh(id)
            });


        }
    );
};

export const RemoveFile = (id: any, url: any, newFiles: any, refresh: any,) => {
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(async () => {
        await endPoint.put(`booking/${id}`, {
            files: [...newFiles],
        });
        refresh(id)
    });
}


