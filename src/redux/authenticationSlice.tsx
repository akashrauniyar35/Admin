import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    loading: false,
    isAuthenticated: false,
    logoutRequest: false,

}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginPending(state: any) {
            state.loading = true;
            state.isAuthenticated = false;
        },
        loginSuccess(state, action: any) {
            state.loading = false,
                state.isAuthenticated = true;
        },
        loginFail(state, action) {
            state.loading = false,
                state.isAuthenticated = false;
        },
        logoutPending(state) {
            state.logoutRequest = true,
                state.isAuthenticated = true;
        },
        logoutSuccess(state) {
            state.logoutRequest = false,
                state.isAuthenticated = false;
        },
        logoutFail(state) {
            state.logoutRequest = false,
                state.isAuthenticated = false;
        },

    }
})

export const { loginPending, loginSuccess, loginFail, logoutPending, logoutSuccess, logoutFail } = loginSlice.actions;
export default loginSlice.reducer;