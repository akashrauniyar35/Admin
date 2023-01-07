import { createSlice } from '@reduxjs/toolkit'
import { jobsData } from '../interfaces/jobInterfaces';



const today = new Date();

const jobData: any = {

    email: "email@email.com",
    companyName: "WeDo Cleaning Pty Ltd",
    firstName: "",
    lastName: "last",
    address1: "s",
    address2: "s",
    city: "s",
    state: "s",
    postcode: "1234",
    startHour: "10",
    startMin: "30",
    startMode: "AM",
    endHour: "01",
    endMin: "30",
    endMode: "PM",
    bookingDate: today.toISOString(),
    subscription: "One Time Cleaning",
    customerNotes: "",
    service: "EOL",
    notes: [],
    phone: "041589987",
    products: [],
    quoteStatus: "",
}


const initialState = {
    data: [],
    loading: false,
    searchValue: '',
    quoteDate: '',
    quoteTime: '',
    postJobLoading: false,
    editLoading: false,
    addJobData: jobData
};

console.log('jobData.products', jobData.products)

const addJobSlice = createSlice({
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

        addJobCustomerFirstName(state, action: any) {
            state.addJobData.firstName = action.payload;
        },
        addJobCustomerLastName(state, action: any) {
            state.addJobData.lastName = action.payload;
        },
        addJobCustomerNumber(state, action: any) {
            state.addJobData.phone = action.payload;
        },
        addJobCustomerEmail(state, action: any) {
            state.addJobData.email = action.payload;
        },
        addJobCustomerUnit(state, action: any) {
            state.addJobData.address1 = action.payload;
        },
        addJobCustomerSuburb(state, action: any) {
            state.addJobData.city = action.payload;
        },
        addJobCustomerPostcode(state, action: any) {
            state.addJobData.postcode = action.payload;
        },
        addJobCustomerState(state, action: any) {
            state.addJobData.state = action.payload;
        },
        addJobCustomerStreetAddress(state, action: any) {
            state.addJobData.address2 = action.payload;
        },
        addJobCustomerNotes(state, action: any) {
            state.addJobData.customerNotes = action.payload;
        },
        addJobCustomerService(state, action: any) {
            state.addJobData.service = action.payload;
        },
        addJobCompanyName(state, action: any) {
            state.addJobData.companyName = action.payload;
        },
        addJobCustomerProperty(state, action: any) {
            // state.addJobData.service = action.payload;
        },
        addJobCustomerBedroom(state, action: any) {
            const newState: any = state.addJobData.products.map((x: any) => {
                if (x.title.toLowerCase() === "bedrooms") {
                    return { ...x, quantity: parseInt(action.payload) };
                }
                return x;
            })
            state.addJobData.products = newState;

        },
        addJobCustomerBathroom(state, action: any) {
            const newState: any = state.addJobData.products.map((x: any) => {
                if (x.title.toLowerCase() === "bathrooms") {
                    return { ...x, quantity: parseInt(action.payload) };
                }
                return x;
            })
            state.addJobData.products = newState;
        },
        addJobBookingDate(state, action: any) {
            state.addJobData.bookingDate = action.payload;
        },
        addJobStartTime(state, action: any) {
            state.addJobData.startHour = action.payload.substring(2, 0);
            state.addJobData.startMin = action.payload.substring(3, 5);
            state.addJobData.startMode = action.payload.substring(6, 8);
        },
        addJobEndTime(state, action: any) {
            state.addJobData.endHour = action.payload.substring(2, 0);
            state.addJobData.endMin = action.payload.substring(3, 5);
            state.addJobData.endMode = action.payload.substring(6, 8);
        },
        addProductsSuccess(state, action: any) {
            console.log(" action.payload;", action.payload)
            state.addJobData.products = action.payload;
            // state.addJobData.products.push(action.payload);
        },
        addProductsFail(state, action: any) {
            state.addJobData.products = action.payload;
        },

        addJobAddAddons(state, action: any) {
            const newState: any = state.addJobData.products.map((x: any) => {
                if (x.title === action.payload.title) {
                    return { ...x, quantity: 1 };
                }
                return x;
            })
            state.addJobData.products = newState;
        },
        addJobRemoveAddons(state, action: any) {

            const newState: any = state.addJobData.products.map((x: any) => {
                if (x.title === action.payload.title) {
                    return { ...x, quantity: 0 };
                }
                return x;
            })
            state.addJobData.products = newState;
        },

        addJobIncreaseAddons(state, action: any) {

            console.log('action.payload.addonsIncrease',action.payload)

            const newState: any = state.addJobData.products.map((x: any) => {
                if (x.title === action.payload.title) {
                    return { ...x, quantity: action.payload.quantity };
                }
                return x;
            })
            state.addJobData.products = newState;
        },

        postJobPending(state, action: any) {
            state.postJobLoading = true;
        },
        postJobSuccess(state, action: any) {
            state.postJobLoading = false;
        },
        postJobFail(state, action: any) {
            state.postJobLoading = false;
        },

        postEditPending(state, action: any) {
            state.editLoading = true;
        },
        postEditSuccess(state, action: any) {
            state.editLoading = false;
        },
        postEditFail(state, action: any) {
            state.editLoading = false;
        },

    }
})



export const {
    postJobPending, postJobSuccess, postJobFail,

    addJobCustomerFirstName, addJobCustomerLastName, addJobCompanyName, addJobCustomerEmail, addJobCustomerState, addJobCustomerPostcode,
    addJobCustomerUnit, addJobCustomerStreetAddress, addJobCustomerNumber, addJobCustomerSuburb, addJobCustomerNotes, addJobCustomerService, addJobCustomerProperty, addJobCustomerBedroom, addJobCustomerBathroom, addJobBookingDate, addJobStartTime, addJobEndTime, addJobAddAddons, addJobIncreaseAddons,
    addJobRemoveAddons, addProductsSuccess, addProductsFail, postEditPending, postEditSuccess, postEditFail


} = addJobSlice.actions;
export default addJobSlice.reducer;