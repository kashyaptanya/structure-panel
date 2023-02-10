// import {loginSuccess, loginFailure, logoutSuccess} from "../store/user"
// import api from "../utils/api"

// export const login = ({ email, password }, successCB) => async dispatch => {
//     let loginResponse = await api.post('admin/login', { email, password })
//     if (loginResponse.data.status) {
//         let token = loginResponse.data.data.token
//         let admin_data = loginResponse.data.data.email
//         let msg = loginResponse.data.status
//         dispatch(loginSuccess({ token, admin_data, msg, response: loginResponse.data }));
//         successCB(loginResponse?.data)
//     } else {
//         dispatch(loginFailure({ response: loginResponse.data }))
//     }
// }

// export const forgotPasswordMail = (data, successCB) => async dispatch => {
//     try {
//         let forgotResponse = await api.post('admin/forget_password', data)
//         if (forgotResponse?.data) {
//             successCB(forgotResponse?.data)

//         }
//     } catch (e) {
//         successCB({ status: false, message: e })
//     }
// }

// export const verifyOtp = (data, successCB) => async dispatch => {
//     try {
//         let verifyResponse = await api.post('admin/verify_otp', data)
//         if (verifyResponse?.data) {
//             successCB(verifyResponse?.data)

//         }
//     } catch (e) {
//         successCB({ status: false, message: e })
//     }
// }



// export const reset_password = (data, successCB) => async dispatch => {
//     try {
//         let resetResponse = await api.post('admin/reset_password', data)
//         if (resetResponse?.data) {
//             successCB(resetResponse?.data)
//         }
//     } catch (e) {
//         successCB({ status: false, message: e })
//     }
// }
// export const logout = (admin_id, successCB) => async dispatch => {
//     let logoutResponse = await api.post("admin/logout", admin_id)
//      console.log("logout",logoutResponse)
//     if (logoutResponse?.data) {
//         dispatch(logoutSuccess({response: logoutResponse.data}))
//         successCB(logoutResponse?.data)
//     }
// }
