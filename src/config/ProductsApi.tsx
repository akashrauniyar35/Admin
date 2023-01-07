import { endPoint } from './index';

export const fetchAllProducts = () => {
    return new Promise(async (resolve, reject) => {

        try {
            const res: any = await endPoint.get(`product`)
            resolve(res);
            console.log('PRODUCTS', res)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
}

export const fetchEditProducts = (id: string, data: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.put(`product/${id}`, data)
            resolve(res);
            console.log('PRODUCTS', res)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
}

export const createProduct = (data: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.post(`product`, data)
            resolve(res);
            console.log('PRODUCTS', res)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
}

export const fetchDeleteProducts = (id: string) => {

    return new Promise(async (resolve, reject) => {

        try {
            const res: any = await endPoint.delete(`product/${id}`)
            resolve(res);
            console.log('PRODUCTS', res)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
}