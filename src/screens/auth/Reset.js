import { useState } from "react"
import { Button } from "antd"
import { useHistory } from "react-router-dom"
import { reset_password } from '../../store/user'
import toast from "../../common/toast"
import { useDispatch } from 'react-redux'

function ResetPassword() {
    const [passwordType, setPasswordType] = useState("password");
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const [user, setUser] = useState({
        pass: "",
        password: ""
    })
    let password = user.password
    let otp = localStorage.getItem("OTP")
    let email = localStorage.getItem("forgot_email")
    const handlevalue = (e, key) => {
        setUser({ ...user, [key]: e.target.value })
    }
    
    const toggle = () => {
        console.log("toggle")
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const handle_button = async (e) => {
        e.preventDefault()
        if (user.pass === "" && user.password === "") {
            toast.error("Please fill all the required fields to proceed")
            return false
        }
        if (user.password !== user.pass) {
            toast.error("Password and Confirm Password should be same ")
            return false
        }

        setLoading(true)
        const successCB = (response) => {
            console.log("response=>", response)
            if (response?.status) {
                toast.success("Password Changed Successfully")
                localStorage.removeItem("forgot_email")
                localStorage.removeItem("OTP")
                setTimeout(() => {
                    history.push('/')
                }, 1000)
            }
        }
        dispatch(reset_password({ email, otp, password }, successCB))
    }

    return (
        <>
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
                            <div className="p-2 ">

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
                                            : <i class="fa-regular fa-eye"></i>
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