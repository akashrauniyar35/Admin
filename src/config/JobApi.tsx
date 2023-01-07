import AsyncStorage from '@react-native-async-storage/async-storage';
import { endPoint } from './index';

export const fetchAllJobs = (page: number) => {
    console.log("page fetch", page)
    return new Promise(async (resolve, reject) => {

        try {
            const res: any = await endPoint.get(`quote/all?page=${page}&limit=${10}`);
            console.log(res)
            resolve(res);

        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
}


export const fetchQuoteSearch = (route: string, data: String) => {

    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.get(`${route}/all?page=1&search=${data}`)
            // console.log(res)
            resolve(res);
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
}

export const fetchJobByID = (quoteID: any) => {
    console.log("fetch triggered", quoteID)
    return new Promise(async (resolve, reject) => {

        try {
            const res: any = await endPoint.get(`quote/${quoteID}`)
            resolve(res);
            console.log('RESPOND', res)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
}

export const fetchPostJob = (data: any) => {
    console.log('post data API', data)

    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.post(`quote`, data,);
            resolve(res);
            console.log('post data mmmpp', res)
        }
        catch (err) {
            console.log('err data API', err)
            reject(err)
        }

    })
}
export const fetchEditJob = (lable: string, id: any, data: any) => {
    console.log('Edit success prop', lable)

    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.put(`${lable}/${id}`, data,);
            resolve(res);
            console.log('Edit success', res)
        }
        catch (err) {
            console.log('err data API', err)
            reject(err)
        }

    })
}


export const fetchDeleteJob = (id: String, lable) => {
    return new Promise(async (resolve, reject) => {

        try {
            const res: any = await endPoint.delete(`quote/${id}`)
            resolve(res);
            console.log('DELETE', res)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
}

export const fetchConfirmBooking = (id: any) => {
    console.log("IDDD", id)
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.post(`booking/${id}`)
            resolve(res);
            console.log('Convert', res)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
};

export const fetchStatusUpdate = (id: string, data: any, lable: string) => {
    console.log('fetchStatusUpdate', id, data, lable)
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.put(`${lable}/${id}`, data)
            resolve(res);
            console.log('Convert', res)
        }
        catch (err) {
            console.log(err)
            reject(err)
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

