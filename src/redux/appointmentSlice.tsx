import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    loading: false,
    searchValue: '',
};

const appointmentSlice = createSlice({
    name: 'getAllQuotes',
    initialState,
    reducers: {

        getAppointmentsPending(state) {
            state.loading = true;
        },
        getAppointmentsSuccess(state, action: any) {
            state.loading = false;
            state.data = action.payload;
        },
        getAppointmentsFail(state, action: any) {
            state.loading = false;
        },

        Pending(state, action: any) {
            state.loading = true;
            state.searchValue = action.payload
            console.log("Login Pending Slice", action.payload)
        },
        Success(state, action: any) {
            state.loading = false;
            console.log("Search success", action.payload)
        },
        Fail(state, action: any) {
            state.loading = false;
            console.log("search success api", action.payload)
        },
    }
})



export const {
    getAppointmentsPending, getAppointmentsSuccess, getAppointmentsFail,
    Pending, Success, Fail,

} = appointmentSlice.actions;
export default appointmentSlice.reducer;