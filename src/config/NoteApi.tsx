import { endPoint } from './index'

import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    deleteObject,
    uploadBytes
} from "firebase/storage";
import storage from "../config/firebaseConfig";

export const AddSystemNote = (id, previousNote, newNote) => {
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

export const DeleteSystemNote = (id, newNotes) => {
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

export const uploadFiles = async (file: any, previousFiles: any, id: any, refresh: any) => {
    const img = await fetch(file.uri)
    const bytes = await img.blob()
    const fileName = file.uri.substring(file.uri.lastIndexOf('/') + 1)
    const storageRef = ref(storage, `files/bookings/img/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, bytes);

    console.log("fileName", file)

    uploadTask.on(
        "state_changed",
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log("download url", downloadURL)
                downloadURL &&
                    (await endPoint.put(
                        `booking/${id}`,
                        {
                            files: [...previousFiles, downloadURL],
                        }
                    ));
            });
        }
    );
    refresh(id)
};

export const RemoveFile = (id: any, url: any, newFiles: any) => {
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(async () => {
        await endPoint.put(`booking/${id}`, {
            files: [...newFiles],
        });

    });
}


