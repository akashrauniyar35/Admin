import { endPoint } from './index'


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
