import { endPoint } from './index';

export const fetchTodayBookings = (from, to) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.get(`booking/all?page=1&limit=10&bookingDate=${from}&to=${to}`)
            console.log(res)
            resolve(res);
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
};


export const fetchBookingByID = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.get(`booking/${id}`)
            resolve(res);
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
};




export const fetchAppointments = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.get(`booking/all?page=1&limit=20&bookingDate=${'2023-01-01'}&to=${'2023-01-31'}`)
            console.log(res)
            resolve(res);
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
};


export const fetchAllBookings = (page: number) => {
    console.log("page fetch", page)
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.get(`booking/all?page=${page}&limit=10`);
            console.log(res)
            resolve(res);
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
};


export const fetchDeleteJobBooking = (id: String) => {
    return new Promise(async (resolve, reject) => {

        try {
            const res: any = await endPoint.delete(`booking/${id}`)
            resolve(res);
            console.log('DELETE', res)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
}

export const fetchFilteredBookings = (status: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.get(`booking/all?page=1&limit=10&filter=bookingStatus&word=${status}`)
            resolve(res);
            console.log('status', res)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
};

export const ABCD = (data: any) => {
    return new Promise(async (resolve, reject) => {
        try {
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
};