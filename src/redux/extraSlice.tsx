import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    loading: false,
    searchValue: '',
};

const extraSlice = createSlice({
    name: 'getAllQuotes',
    initialState,
    reducers: {
        searchQuotePending(state, action: any) {
            state.loading = true;
            state.searchValue = action.payload
            console.log("Login Pending Slice", action.payload)
        },
        searchQuoteSuccess(state, action: any) {
            state.loading = false;
            console.log("Search success", action.payload)
        },
        searchQuoteFail(state, action: any) {
            state.loading = false;
            console.log("search success api", action.payload)
        },
        
    }
})



export const { searchQuotePending, searchQuoteSuccess, searchQuoteFail } = extraSlice.actions;
export default extraSlice.reducer;