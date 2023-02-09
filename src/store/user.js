import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api"
const initialToken = localStorage.getItem('token') ? localStorage.getItem('token') : null
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: initialToken,
        loginMessage: '',
        adminId: ""
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.admin_data;
            state.adminId = action.payload.response.data._id
            state.loginMessage = action.payload.response.message;
            localStorage.setItem('token', state.token)
            localStorage.setItem("admin_id", state.adminId)
        },
        loginFailure: (state, action) => {
            state.loginMessage = action.payload.response.message;

        },
        userData: (state, action) => {
            const userData = action.payload.user;
            state.user = userData;
        },

        logoutSuccess: (state, action) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token')
            localStorage.removeItem("admin_id")
        },
    }
})
const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions



export const login = ({ email, password }, successCB) => async dispatch => {
    let loginResponse = await api.post('admin/login', { email, password })
    if (loginResponse.data.status) {
        let token = loginResponse.data.data.token
        let admin_data = loginResponse.data.data.email
        let msg = loginResponse.data.status
        dispatch(loginSuccess({ token, admin_data, msg, response: loginResponse.data }));
        successCB(loginResponse?.data)
    } else {
        dispatch(loginFailure({ response: loginResponse.data }))
    }
}

export const forgotPasswordMail = (data, successCB) => async dispatch => {
    try {
        let forgotResponse = await api.post('admin/forget_password', data)
        if (forgotResponse?.data) {
            successCB(forgotResponse?.data)

        }
    } catch (e) {
        successCB({ status: false, message: e })
    }
}

export const verifyOtp = (data, successCB) => async dispatch => {
    try {
        let verifyResponse = await api.post('admin/verify_otp', data)
        if (verifyResponse?.data) {
            successCB(verifyResponse?.data)

        }
    } catch (e) {
        successCB({ status: false, message: e })
    }
}



export const reset_password = (data, successCB) => async dispatch => {
    try {
        let resetResponse = await api.post('admin/reset_password', data)
        if (resetResponse?.data) {
            successCB(resetResponse?.data)
        }
    } catch (e) {
        successCB({ status: false, message: e })
    }
}
export const logout = (data,successCB) => async dispatch => {
    try {
        let logoutResponse = await api.post("admin/logout",data)
        if(logoutResponse?.data){
            successCB(logoutResponse?.data)  
            return dispatch(logoutSuccess())
        }
        
    } catch (e) {
        successCB({ status: false, message: e })
        // return console.error(e.message);
    }
}





export default authSlice.reducer  