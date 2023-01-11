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
