import { useState } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "antd"
import axios from "axios";

function Forgot() {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [popup, setPopup] = useState(false)
    const [popup1, setPopup1] = useState(false)
    const [popup2, setPopup2] = useState(false)
    const [user, setUser] = useState({
        email: ""
    })

    const handlevalue = (e, key) => {
        setUser({ ...user, [key]: e.target.value })
    }

    const handle_button = async (e) => {
        if (user.email === "") {
            setPopup2(true)
            setTimeout(() => {
                setPopup2(false)
            }, 2000)
            return false
        }

        localStorage.removeItem("users_OTP")
        const emailObj = {
            email: user.email
        }

        const payload = {
            email: user.email.trim()
        }
        setLoading(true)

        // const result = await axios.post("https://biofamily.solidappmaker.ml/api/v1/admin/forget_password", payload);
        // console.log("result", result)
        // if (result.data.status === true) {
        //     localStorage.setItem("users_email", emailObj.email)
        //     setPopup(true)
        //     setTimeout(() => {
        //         history.push("/Verify")
        //     }, "2000")
        // }
        // else {
        //     setPopup1(true)
        //     setTimeout(() => {
        //         setLoading(false)
        //         setPopup1(false)
        //     }, 2000)
        // }
    }

    return (
        <>
            {
                popup ?
                    <div className="toast show ">
                        <div className="toast-body toast_style">
                            To reset password OTP sent on your email address!!
                        </div>
                    </div> : null
            }

            {
                popup1 ?
                    <div className="toast show ">
                        <div className="toast-body toast_style">
                            Mentioned email is not registered with us
                        </div>
                    </div> : null
            }

            {
                popup2 ?
                    <div className="toast show ">
                        <div className="toast-body toast_style">
                            Following fields are required : Email
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
                                Forgot Password
                            </h2>
                            <p className="text-center">Enter the email associated with your account</p>
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
                                <div className="pt-3 text-center pb">
                                    <Button type="submit"
                                        loading={loading}
                                        disabled={loading}
                                        onClick={handle_button}
                                        className="rounded-pill btn_color text-white">
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
export default Forgot