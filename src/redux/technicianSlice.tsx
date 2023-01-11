import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    loading: false,
    editLoading: false,
    searchValue: '',
    deleteLoading: false,
    viewIDLoading: false,
};

const technicianSlice = createSlice({
    name: 'getAllQuotes',
    initialState,
    reducers: {
        getAllTechPending(state) {
            state.loading = true;
        },
        getAllTechSuccess(state) {
            state.loading = false;
        },
        getAllTechFail(state,) {
            state.loading = false;
        },
        viewTechIDPending(state,) {
            state.viewIDLoading = true;
        },
        viewTechIDSuccess(state,) {
            state.viewIDLoading = false;
        },
        viewTechIDFail(state,) {
            state.viewIDLoading = false;
        },
        addTechPending(state,) {
            state.loading = true;
        },
        addTechSuccess(state,) {
            state.loading = false;
        },
        addTechFail(state,) {
            state.loading = false;
        },
        editTechPending(state) {
            state.editLoading = true;
        },
        editTechSuccess(state) {
            state.editLoading = false;
        },
        editTechFail(state) {
            state.editLoading = false;
        },
        deleteTechPending(state) {
            state.deleteLoading = true;
        },
        deleteTechSuccess(state) {
            state.deleteLoading = false;
        },
        deleteTechFail(state) {
            state.deleteLoading = false;
        },
    }
})



export const {
    getAllTechPending, getAllTechSuccess, getAllTechFail,
    addTechPending, addTechSuccess, addTechFail,
    editTechPending, editTechSuccess, editTechFail,
    deleteTechPending, deleteTechSuccess, deleteTechFail,
    viewTechIDPending, viewTechIDFail, viewTechIDSuccess,

} = technicianSlice.actions;
export default technicianSlice.reducer;