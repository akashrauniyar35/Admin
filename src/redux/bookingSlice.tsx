import { createSlice } from '@reduxjs/toolkit';

export interface initialState {
    dashboardLoading: boolean;
    bookingbyID: boolean;
    bookingLoading: boolean,
    deleteLoading: boolean;
    dashboardData: Array<[]>;
    filterLoading: boolean;
    id: Array<[]>
};

const initialState: initialState = {
    dashboardLoading: false,
    bookingLoading: false,
    bookingbyID: false,
    deleteLoading: false,
    id: [],
    dashboardData: [],
    filterLoading: false,

};

const bookingSlice = createSlice({
    name: 'bookingSlice',
    initialState,
    reducers: {


        getTodayBookingsPending(state,) {
            state.dashboardLoading = true;
        },
        getTodayBookingsSuccess(state, action: any) {
            console.log('payload', action.payload)
            state.dashboardData = action.payload
            state.dashboardLoading = false;
        },
        getTodayBookingsFail(state, action: any) {
            state.dashboardLoading = false;
        },

        getBookingbyIDPending(state,) {
            state.bookingbyID = true;
        },
        getBookingbyIDSuccess(state, action: any) {
            state.bookingbyID = false;
            console.log('payload', action.payload)
            state.id = action.payload
        },
        getBookingbyIDFail(state, action: any) {
            state.bookingbyID = false;
        },

        getAllBookingPending(state,) {
            state.bookingLoading = true;
        },
        getAllBookingSuccess(state,) {
            state.bookingLoading = false;
        },
        getAllBookingFail(state) {
            state.bookingLoading = false;
        },
        deleteBookingPending(state) {
            state.deleteLoading = true;
        },
        deleteBookingSuccess(state) {
            state.deleteLoading = false;
        },
        deleteBookingFail(state) {
            state.deleteLoading = false;
        },

        filterBookingPending(state) {
            state.filterLoading = true;
        },
        filterBookingSuccess(state) {
            state.filterLoading = false;
        },
        filterBookingFail(state) {
            state.filterLoading = false;

        },




    }
});

export const {
    getTodayBookingsPending, getTodayBookingsSuccess, getTodayBookingsFail,
    getBookingbyIDPending, getBookingbyIDSuccess, getBookingbyIDFail,
    getAllBookingPending, getAllBookingSuccess, getAllBookingFail,
    deleteBookingPending, deleteBookingSuccess, deleteBookingFail,
    filterBookingPending, filterBookingSuccess, filterBookingFail,

} = bookingSlice.actions;

export default bookingSlice.reducer;


