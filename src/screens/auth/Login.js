import { useState } from "react"
import { Button } from "antd"
import {  Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import axios from "axios";

function Login() {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [popup, setPopup] = useState(false)
    const [popup1, setPopup1] = useState(false)
    const [popup2, setPopup2] = useState(false)
    const [passwordType, setPasswordType] = useState("password");
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const toggle = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const handlevalue = (e, key) => {
        setUser({ ...user, [key]: e.target.value })
    }

    const handle_button = async (e) => {
        if (user.email === "" || user.password === "") {
            setPopup2(true)
            setTimeout(() => {
                setPopup2(false)
            }, 2000)
        }

        let payload = {
            email: user.email.trim(),
            password: user.password.trim(),
        }

        // let result = await axios.post("https://biofamily.solidappmaker.ml/api/v1/admin/login", payload);
        // console.log("result", result?.data?.data?._id)
        // console.log("result", result?.data)

        // if (result.data.status === true) {
        //     localStorage.setItem("admin_id", result?.data?.data?._id)
        //     localStorage.setItem("users_email", payload.email)
        //     localStorage.setItem("token", result?.data?.data?.token)
        //     setLoading(true)
        //     setPopup(true)
        //     setTimeout(() => {
        //     history.push("/Panel")
        //         window.location.reload()
        //     }, "500")
        // }
        // else {
        //     setPopup1(true)
        //     setTimeout(() => {
        //         setPopup1(false)
        //     }, 2000)
        // }
    }

    return (
        <>
            {popup ?
                <div className="toast show ">
                    <div className="toast-body toast_style">
                        Successfully logged-In
                    </div>
                </div> : null
            }
            {popup1 ?
                <div className="toast show ">
                    <div className="toast-body toast_style">
                        Invalid Details
                    </div>
                </div> : null
            }
            {popup2 ?
                <div className="toast show ">
                    <div className="toast-body toast_style">
                        Following fields are required : email,password
                    </div>
                </div> : null
            }

            <div className="row for_margin" >
                <div className="col-md-6 for_padding">
                    <div className=" bg ">
                    </div>
                </div>

                <div className="col-md-6 bg-white ">
                    <div className="postion">
                        <div className="child1">
                            <h2 className="color text-center font-effect-shadow-multiple">
                                Welcome back
                            </h2>
                            <p className="text-center">Welcome back ! please enter your details</p>
                            <div className="p-2 "  >
                                <div className="form-group p-2 mb-3  form">
                                    <input className="textbox"
                                        required
                                        type="text"
                                        value={user?.email ?? ""}
                                        onChange={(e) => handlevalue(e, 'email')}
                                        placeholder=""
                                    />
                                    <label className="form-label">Email</label>
                                </div>

                                <div className="form-group p-2 mb-3  form toggle_parent">
                                    <input className="textbox"
                                        required
                                        type={passwordType}
                                        value={user.password}
                                        onChange={(e) => handlevalue(e, 'password')}
                                        placeholder=""
                                    />
                                    <label className="form-label">Password</label>
                                    <span onClick={toggle} className="toggle_child">
                                        {passwordType === "password" ?
                                            <i class="fa-regular fa-eye-slash"></i>
                                            : <i class="fa-regular fa-eye"></i>

                                        }
                                    </span>
                                </div>

                                <div className="pt-3 text-center">
                                    <Button type="submit"
                                        loading={loading}
                                        disabled={loading}
                                        onClick={handle_button}
                                        className="rounded-pill btn_color text-white">
                                        Log in
                                    </Button>
                                </div>

                            </div>
                            <div className="text-center pb">
                                <Link className="link" to="/ForgotPassword">Forgot Password</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login