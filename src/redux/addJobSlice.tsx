import { createSlice } from '@reduxjs/toolkit'

const today = new Date();

const jobData: any = {

    email: "Akash",
    companyName: "WeDo Cleaning Pty Ltd",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "NSW",
    postcode: "",
    startHour: "",
    startMin: "",
    startMode: "",
    endHour: "",
    endMin: "",
    endMode: "",
    bookingDate: today.toISOString(),
    subscription: "One Time Cleaning",
    customerNotes: "",
    service: "EOL",
    notes: [],
    phone: "",
    products: [],
    quoteStatus: "",
    totals: [
        {
            _id: 1,
            title: "Base Price",
            amount: 0,
            quantity: 0
        },
        {
            _id: 2,
            title: "1 Bathroom",
            amount: 0,
            quantity: 0
        },
        {
            _id: 3,
            title: "1 Bedroom",
            amount: 0,
            quantity: 0
        },
        {
            _id: 4,
            title: "Extras",
            amount: 0,
            quantity: 0
        },
        {
            _id: 5,
            title: "Tip",
            amount: 0,
            quantity: 0
        },
        {
            _id: 6,
            title: "To be paid by customer",
            amount: 0,
            quantity: 0
        },
        {
            _id: 7,
            title: "Discount",
            amount: 0,
            quantity: 0
        },
        {
            _id: 8,
            title: "Payment received",
            amount: 0,
            quantity: 0
        },

    ]
}


const initialState = {
    data: [],
    loading: false,
    searchValue: '',
    quoteDate: '',
    quoteTime: '',
    postJobLoading: false,
    editLoading: false,
    addJobData: jobData,
};


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

            let count = action.payload.substring(0, 1)
            const newState: any = state.addJobData.products.map((x: any) => {
                if (x.title.toLowerCase() === "bedrooms") {
                    return { ...x, quantity: parseInt(action.payload) };
                }
                return x;
            })

            const newTotals: any = state.addJobData.totals.map((x: any) => {
                if (x.title.toLowerCase().split(" ").pop() === "bedroom") {
                    return { ...x, title: `${count} Bedroom`, quantity: parseInt(count), };
                }
                return x;
            })

            state.addJobData.products = newState;
            state.addJobData.totals = newTotals;

        },
        addJobBedroomPrice(state, action: any) {
            const newTotals: any = state.addJobData.totals.map((x: any) => {
                if (x.title.toLowerCase().split(" ").pop() === "bedroom") {
                    return { ...x, amount: parseInt(action.payload), };
                }
                return x;
            })
            state.addJobData.totals = newTotals;
        },

        addJobBathroomPrice(state, action: any) {
            const newTotals: any = state.addJobData.totals.map((x: any) => {
                if (x.title.toLowerCase().split(" ").pop() === "bathroom") {
                    return { ...x, amount: parseInt(action.payload), };
                }
                return x;
            })
            state.addJobData.totals = newTotals;
        },

        addJobCustomerBathroom(state, action: any) {
            let count = action.payload.substring(0, 1)
            const newState: any = state.addJobData.products.map((x: any) => {
                if (x.title.toLowerCase() === "bathrooms") {
                    return { ...x, quantity: parseInt(action.payload.slice(0)) };
                }
                return x;
            })


            const newTotals: any = state.addJobData.totals.map((x: any) => {
                if (x.title.toLowerCase().split(" ").pop() === "bathroom") {
                    return { ...x, title: `${count} Bathroom`, quantity: parseInt(count), };
                }
                return x;
            })

            state.addJobData.products = newState;
            state.addJobData.totals = newTotals;
        },

        addBasePrice(state, action: any) {

            const newTotals: any = state.addJobData.totals.map((x: any) => {
                if (x.title.toLowerCase() === "base price") {
                    return { ...x, quantity: 1, amount: parseInt(action.payload), };
                }
                return x;
            })
            state.addJobData.totals = newTotals;
        },

        addDiscountPrice(state, action: any) {
            const newTotals: any = state.addJobData.totals.map((x: any) => {
                if (x.title.toLowerCase() === "discount") {
                    return { ...x, quantity: 1, amount: parseInt(action.payload), };
                }
                return x;
            })
            state.addJobData.totals = newTotals;
        },

        addExtraPrice(state, action: any) {
            const newTotals: any = state.addJobData.totals.map((x: any) => {
                if (x.title.toLowerCase() === "extras") {
                    return { ...x, quantity: 1, amount: parseInt(action.payload), };
                }
                return x;
            })
            state.addJobData.totals = newTotals;
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
            const newState: any = state.addJobData.products.map((x: any) => {
                if (x.title === action.payload.title) {
                    return { ...x, quantity: action.payload.quantity };
                }
                return x;
            })
            state.addJobData.products = newState;
        },

        postJobPending(state) {
            state.postJobLoading = true;
        },
        postJobSuccess(state, action: any) {
            state.postJobLoading = false;
            state.addJobData = action.payload
        },
        postJobFail(state, action: any) {
            state.postJobLoading = false;
        },

        postEditPending(state) {
            state.editLoading = true;
        },
        postEditSuccess(state) {
            state.editLoading = false;
        },
        postEditFail(state) {
            state.editLoading = false;
        },

    }
})

export const {
    postJobPending, postJobSuccess, postJobFail,
    addJobCustomerFirstName, addJobCustomerLastName, addJobCompanyName, addJobCustomerEmail, addJobCustomerState, addJobCustomerPostcode,
    addJobCustomerUnit, addJobCustomerStreetAddress, addJobCustomerNumber, addJobCustomerSuburb, addJobCustomerNotes, addJobCustomerService, addJobCustomerProperty, addJobCustomerBedroom, addJobCustomerBathroom, addJobBookingDate, addJobStartTime, addJobEndTime, addJobAddAddons, addJobIncreaseAddons, addJobBathroomPrice, addBasePrice,
    addJobRemoveAddons, addProductsSuccess, addProductsFail, postEditPending, postEditSuccess, postEditFail, addJobBedroomPrice, addDiscountPrice, addExtraPrice

} = addJobSlice.actions;
export default addJobSlice.reducer;