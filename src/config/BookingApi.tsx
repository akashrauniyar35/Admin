import { endPoint } from './index';

export const fetchTodayBookings = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.get(`booking/all?page=1&limit=10&bookingDate=${'2023-01-01'}&to=${'2023-01-27'}`)
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
            const res: any = await endPoint.get(`booking/all?page=1&limit=10&bookingDate=${'2023-01-01'}&to=${'2023-01-31'}`)
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

// http://localhost:3001/v1/booking/all?page=1&limit=2&filter=bookingStatus&word=Completed

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