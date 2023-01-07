import { createSlice } from '@reduxjs/toolkit'





export interface initialState {

    searchValue: string,
    sealectedJobValue: string,
    JobPageData: {
        _id: string,
        email: string,
        name: string,
        phone: string,
        jobReference: string,
        jobtatus: string,
        service: string,
        subtotal: number,
    },
    jobData: [],
    jobByIdData: [],
    jobPageData: [],
    refreshLoading: boolean,
    statusUpdateLoading: boolean,
    searchResults: [],
    totalPages: number,
    listLoading: boolean,
    selectedJobLoading: boolean,
    selectedJobValue: string,
    deleteLoading: Boolean,
    deleteResponse: String,

}

const initialState: initialState = {
    searchValue: "",
    searchResults: [],
    selectedJobValue: '',
    jobPageData: [],
    jobByIdData: [],
    selectedJobLoading: false,
    statusUpdateLoading: false,
    jobData: [],
    totalPages: 1,
    listLoading: false,
    refreshLoading: false,
    deleteLoading: false,
    deleteResponse: "",
};




const getAllJobSlice = createSlice({
    name: 'getAllJob',
    initialState,
    reducers: {
        getAllJobPending(state, action: any) {
            state.listLoading = true;
            state.refreshLoading = true;
            state.searchValue = ""
            console.log("Login Pending Slice", action.payload)
        },
        getAllJobSuccess(state) {
            state.listLoading = false;
            state.refreshLoading = false;
            // state.totalPages = action.payload.totalPages;
            // state.jobData = action.payload.paginatedResults
            // console.log("Job success", action.payload.paginatedResults)
        },
        getAllJobFail(state, action: any) {
            state.listLoading = false;
            state.refreshLoading = false;
            console.log("Login Pending Slice", action.payload)
        },
        searchJobPending(state, action: any) {
            state.listLoading = true;
            state.searchValue = action.payload
            console.log("Login Pending Slice", action.payload)
        },
        searchJobuccess(state, action: any) {
            state.listLoading = false;
            // state.JobPageData = action.payload
            state.searchResults = action.payload
            console.log("Search success", action.payload)
        },
        searchJobFail(state, action: any) {
            state.listLoading = false;
            console.log("Login Pending Slice", action.payload)
        },
        viewJobPending(state, action: any) {
            state.selectedJobLoading = true,
                state.selectedJobValue = action.payload;
        },
        viewJobSuccess(state, action: any) {
            console.log('success job view')
            state.selectedJobLoading = false;
            state.jobByIdData = action.payload;

        },
        viewJobFail(state, action: any) {
            state.selectedJobLoading = false;
        },

        deleteJobPending(state,) {
            state.deleteLoading = true
        },
        deleteJobSuccess(state, action: any) {
            state.deleteLoading = false
        },
        deleteJobFail(state, action: any) {
            state.deleteLoading = false
        },

        confirmBookingPending(state,) {
            state.deleteLoading = true
        },
        confirmBookingSuccess(state, action: any) {
            state.deleteLoading = false
        },
        confirmBookingFail(state, action: any) {
            state.deleteLoading = false
        },

        quoteStatusPending(state) {
            state.statusUpdateLoading = true;
        },
        quoteStatusSuccess(state) {
            state.statusUpdateLoading = false;
        },
        quoteStatusFail(state) {
            state.statusUpdateLoading = false;
        },

    }
})



export const {
    getAllJobPending,
    getAllJobSuccess,
    getAllJobFail,
    searchJobuccess, searchJobFail, searchJobPending,
    viewJobPending, viewJobSuccess, viewJobFail, deleteJobPending, deleteJobSuccess, deleteJobFail,
    confirmBookingPending, confirmBookingSuccess, confirmBookingFail,
    quoteStatusPending, quoteStatusSuccess, quoteStatusFail,
} = getAllJobSlice.actions;
export default getAllJobSlice.reducer;