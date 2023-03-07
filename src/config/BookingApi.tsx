import moment from 'moment';
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

export const fetchBookingCount = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.get(`booking/counts`)
            resolve(res);
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
};


export const fetchAppointments = () => {

    let today = new Date();
    let lastMonth = moment(new Date(today.getFullYear(), today.getMonth() - 1)).format("YYYY-MM-DD")
    let nextMonth = moment(new Date(today.getFullYear(), today.getMonth() + 2, 0)).format("YYYY-MM-DD")
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.get(`booking/all?page=1&limit=100&bookingDate=${lastMonth}&to=${nextMonth}`)
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

export const fetchFilteredBookings = (page: any, filterType: any, status: any, dateRange: any) => {

    let newAPI = filterType === "By Date" ? `booking/all?page=1&limit=10&bookingDate=${dateRange.from}&to=${dateRange.to}` : filterType === "Job Status" ? `booking/all?page=${page}&limit=20&filter=bookingStatus&word=${status}` : `booking/all?page=${page}&limit=20&filter=technician&word=${status}`

    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await endPoint.get(newAPI)
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
