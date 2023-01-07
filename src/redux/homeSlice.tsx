import { createSlice } from '@reduxjs/toolkit';

export interface initialState {
    loading: boolean;
    bookingData: []
};

const initialState: initialState = {
    loading: false,
    bookingData: []

};

const homeSlice = createSlice({
    name: 'homeSlice',
    initialState,

    reducers: {
        getTodaysBookingsPending(state, action: any) {
            state.loading = true;
        },
        getTodaysBookingsSuccess(state, action: any) {
            state.loading = false;
            state.bookingData = action.payload.paginatedResults
        },
        getTodaysBookingsFail(state, action: any) {
            state.loading = false;
            console.log("Login Pending Slice", action.payload)
        },

        getYesterdaysBookingsPending(state, action: any) {

        },
        getTomorrowBookingsPending(state, action: any) {

        },
        getThisWeekBookingsPending(state, action: any) {

        },
        getSample(state, action: any) {

        },
    }
});

export const {
    getTodaysBookingsPending, getTodaysBookingsSuccess, getTodaysBookingsFail
} = homeSlice.actions;

export default homeSlice.reducer;