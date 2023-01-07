import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    deleteLoading: false,
};

const extraSlice = createSlice({
    name: 'getAllQuotes',
    initialState,
    reducers: {

        getAllProductsPending(state) {
            state.loading = true
        },
        getAllProductsSuccess(state) {
            state.loading = false
        },
        getAllProductsFail(state) {
            state.loading = false
        },

        editProductPending(state) {
            state.loading = true
        },
        editProductSuccess(state) {
            state.loading = false
        },
        editProductFail(state) {
            state.loading = false
        },
        deleteProductPending(state) {
            state.deleteLoading = true
        },
        deleteProductSuccess(state) {
            state.deleteLoading = false
        },
        deleteProductFail(state) {
            state.deleteLoading = false
        },


    }
})



export const {
    getAllProductsPending, getAllProductsSuccess, getAllProductsFail,
    editProductFail, editProductSuccess, editProductPending,
    deleteProductPending, deleteProductSuccess, deleteProductFail,

} = extraSlice.actions;
export default extraSlice.reducer;