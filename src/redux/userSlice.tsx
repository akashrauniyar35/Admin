import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    loading: false,
};

const userSlice = createSlice({
    name: 'getAllQuotes',
    initialState,
    reducers: {
        getUserPending(state, action: any) {
            state.loading = true;
            console.log("Login Pending Slice", action.payload)
        },
        getUserSuccess(state, action: any) {
            state.loading = false;
            state.data = action.payload;
        },
        getUserFail(state, action: any) {
            state.loading = false;
            console.log("search success api", action.payload)
        },

    }
})



export const { getUserPending, getUserSuccess, getUserFail } = userSlice.actions;
export default userSlice.reducer;