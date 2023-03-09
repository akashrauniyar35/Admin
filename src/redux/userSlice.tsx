import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    loading: false,
    detailsLoading: false,
};

const userSlice = createSlice({
    name: 'getAllQuotes',
    initialState,
    reducers: {
        getUserPending(state,) {
            state.loading = true;
        },
        getUserSuccess(state, action: any) {
            state.loading = false;
            state.data = action.payload;
        },
        getUserFail(state) {
            state.loading = false;
        },
        updateUserPending(state,) {
            state.detailsLoading = true;
        },
        updateUserSuccess(state,) {
            state.detailsLoading = false;
        },
        updateUserFail(state,) {
            state.detailsLoading = false;
        },

        getNewTokernPending() {
        },
        getNewTokernSuccess() {
        },
        getNewTokernFail() {
        },

    }
})



export const {
    getUserPending, getUserSuccess, getUserFail,
    updateUserPending, updateUserSuccess, updateUserFail,
    getNewTokernPending, getNewTokernSuccess, getNewTokernFail
} = userSlice.actions;
export default userSlice.reducer;