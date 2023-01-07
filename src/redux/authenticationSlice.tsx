import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    loading: false,
    isAuthenticated: false,
    logoutRequest: false
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginPending(state, action: any) {
            console.log("Login Pending Slice", action.payload)
            state.loading = true
        },
        loginSuccess(state, action: any) {
            console.log("Login Success Slice", action.payload)
            state.loading = false,
                state.isAuthenticated = true;
        },
        loginFail(state, action) {
            console.log("Login Success Slice", action.payload)
            state.loading = false, state.isAuthenticated = true;
        },
        logoutPending(state, action) {
            state.logoutRequest = true
        },
        logoutSuccess(state, action) {
            console.log('logout success', action.payload)
            state.logoutRequest = false,
                state.isAuthenticated = false;
        },
        logoutFail(state, action) {
            state.logoutRequest = false
        },

    }
})

export const { loginPending, loginSuccess, loginFail, logoutPending, logoutSuccess, logoutFail } = loginSlice.actions;
export default loginSlice.reducer;