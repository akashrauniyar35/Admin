import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import authenticationSlice from './authenticationSlice';
import jobSlice from './jobSlice';
// import quoteSearchSlice from './extraSlice';
import addJobSlice from './addJobSlice';
import homeSlice from './homeSlice';
import bookingSlice from './bookingSlice';
import appointmentSlice from './appointmentSlice';
import productSlice from './productSlice';
import userSlice from './userSlice';

const middlewares = getDefaultMiddleware({
    // https://github.com/reduxjs/redux-toolkit/issues/415
    immutableCheck: false,
});

if (__DEV__) {
    const createDebugger = require("redux-flipper").default;
    middlewares.push(createDebugger());
}

export default configureStore({
    reducer: {
        authReducer: authenticationSlice,
        jobReducer: jobSlice,
        addJobReducer: addJobSlice,
        homeReducer: homeSlice,
        bookingReducer: bookingSlice,
        appointmentReducer: appointmentSlice,
        productReducer: productSlice,
        userReducer: userSlice,
        // quoteSearchReducer: quoteSearchSlice
    },
    middleware: middlewares,
    // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()]
})

