// import api from "../utils/api"

// export const emailChange = (email,successCB)=> async dispatch =>{
//     let changedResponse = await api.post("admin/change_email",email, { headers: { Authorization: `Bearer ${initialToken}` } })
//   let convert = JSON.parse(changedResponse.config.data)
//     if (changedResponse?.data) {
//         let admin_data = convert.email
//         dispatch(emailChangeSuccess({ admin_data,response: changedResponse.email }))
//         successCB(changedResponse?.data)
//     }
// }
