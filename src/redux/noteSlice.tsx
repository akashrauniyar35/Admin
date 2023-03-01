import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    deleteLoading: false,
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
            state.deleteLoading = true;
        },
        deleteNoteSuccess(state) {
            state.deleteLoading = false;
        },
        deleteNoteFail(state) {
            state.deleteLoading = false;
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