import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
import { AUTH_SERVER, USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${AUTH_SERVER}/login`, dataToSubmit)
                .then(response => response.data);
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const cookies = document.cookie;
    return {
        type: AUTH_USER,
        payload: cookies
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

