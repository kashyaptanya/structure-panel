import { useState } from "react"
import { Button } from "antd"
import { useHistory } from "react-router-dom"
import axios from "axios"

function ResetPassword() {
    const [passwordType, setPasswordType] = useState("password");
    const [popup, setPopup] = useState(false)
    const [popup1, setPopup1] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [user, setUser] = useState({
        pass: "",
        password: ""
    })
    const handlevalue = (e, key) => {
        setUser({ ...user, [key]: e.target.value })
    }

    const toggle = () => {
        console.log("toggle")
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
    }

    const handle_button = async (e) => {
        e.preventDefault()
        let userData = localStorage.getItem("users_email")
        let userotp = localStorage.getItem("users_OTP")

        let payload = {
            otp: userotp,
            email: userData,
            password: user.password.trim()
        }

        if (user.password === user.pass) {
            // let result = await axios.post("https://biofamily.solidappmaker.ml/api/v1/admin/reset_password", payload);
 
            // if (result.data.status === true) {
            //     localStorage.removeItem("users_OTP")
            //     localStorage.setItem("users_password", user.password)
            //     setPopup1(true)
            //     setLoading(true)
            //     setTimeout(() => {
            //         setPopup1(false)
            //         history,push("/")
            //     }, 2000)
            // }
            // else {
            //     return
            // }
        }
        else {
            setPopup(true)
            setTimeout(() => {
                setPopup(false)
            }, "2000")
        }
    }

    return (
        <>
            {
            popup ?
                <div className="toast show ">
                    <div className="toast-body toast_style">
                        Your password and confirmation password do not match.
                    </div>
                </div> : null
            }

            {
            popup1 ?
                <div className="toast show ">
                    <div className="toast-body toast_style">
                        Successfully Reset your Password
                    </div>
                </div> : null
            }

                <div className="row for_margin">
                    <div className="col-md-6  ">
                        <div className=" bg ">
                        </div>
                    </div>

                    <div className="col-md-6 bg-white ">
                        <div className="postion">
                            <div className="child1">
                                <h2 className="color text-center font-effect-shadow-multiple">
                                    Reset Password
                                </h2>
                                <p className="text-center">Please create a new password </p>
                                <div className="p-2 "  >

                                    <div className="form-group p-2 mb-3  form">
                                        <input className="textbox"
                                            required
                                            type="text"
                                            value={user?.pass ?? ""}
                                            onChange={(e) => handlevalue(e, 'pass')}
                                            placeholder=""
                                        />
                                        <label className="form-label">Password</label>
                                    </div>

                                    <div className="form-group p-2 mb-3  form">
                                        <input className="textbox"
                                            required
                                            type={passwordType}
                                            value={user.password}
                                            onChange={(e) => handlevalue(e, 'password')}
                                            placeholder=""
                                        />
                                        <label className="form-label">Confirm password</label>
                                        <span onClick={toggle} className="toggle_child">
                                        {passwordType === "password" ?
                                             <i class="fa-regular fa-eye-slash"></i>
                                             :<i class="fa-regular fa-eye"></i>
                                        }
                                    </span>
                                    </div>

                                    <div className="pt-3 text-center pb">
                                        <Button
                                            loading={loading}
                                            type="submit"
                                            onClick={handle_button}
                                            disabled={loading}
                                            className="rounded-pill btn_color text-white ">
                                            Next
                                        </Button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
export default ResetPassword