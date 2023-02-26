import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    fileLoading: false
};

const noteSlice = createSlice({
    name: 'getAllQuotes',
    initialState,
    reducers: {
        addNotePending(state) {
            state.loading = true;
        },
        addNoteSuccess(state) {
            state.loading = false;
        },
        addNoteFail(state) {
            state.loading = false;
        },
        deleteNotePending(state) {
            state.loading = true;
        },
        deleteNoteSuccess(state) {
            state.loading = false;
        },
        deleteNoteFail(state) {
            state.loading = false;
        },
        uploadFilePending(state) {
            state.fileLoading = true;
        },
        uploadFileSuccess(state) {
            state.fileLoading = false;
        },
        uploadFileFail(state) {
            state.fileLoading = false;
        },
        deleteFilePending(state) {
            state.fileLoading = true;
        },
        deleteFileSuccess(state) {
            state.fileLoading = false;
        },
        deleteFileFail(state) {
            state.fileLoading = false;
        },



    }
})



export const {
    addNotePending, addNoteSuccess, addNoteFail,
    deleteNotePending, deleteNoteSuccess, deleteNoteFail,
    uploadFilePending, uploadFileSuccess, uploadFileFail,
    deleteFilePending, deleteFileSuccess, deleteFileFail
} = noteSlice.actions;
export default noteSlice.reducer;