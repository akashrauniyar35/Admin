
export const rootUrl = "https://wedo-backend.herokuapp.com/v1/";
export const loginUrl = rootUrl + "customer/login";
export const newAccessJWT = rootUrl + "customer/tokens";
export const userProfileUrl = rootUrl + "customer"
export const logoutUrl = rootUrl + "customer/logout";
export const passwordUrl = rootUrl + "customer/passwordChange"



import axios from 'axios';

const url = 'https://wedo-backend.herokuapp.com/v1/';


export const endPoint = axios.create({
    baseURL: url,
});

