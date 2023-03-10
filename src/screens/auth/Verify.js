import { useState } from "react"
import { useHistory } from "react-router-dom"
import toast from "../../common/toast"
import { verifyOtp } from "../../store/user"
import { forgotPasswordMail } from '../../store/user'
import { useDispatch } from 'react-redux'
import { Button } from "antd"

function Verify() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory()
    const [OTP, setOTP] = useState({
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
    })
    const otp = OTP.otp1 + OTP.otp2 + OTP.otp3 + OTP.otp4

    let email = localStorage.getItem("forgot_email")

    const handlevalue = (e, key) => {
        setOTP({ ...OTP, [key]: e.target.value })
    }

    const resend = async () => {
        setOTP("")
        setLoading(true)
        const successCB = (response) => {
            if (response?.status) {
                setLoading(false)

            } else {
                setLoading(false)
                toast.error(response?.message)
            }
        }
        dispatch(forgotPasswordMail({ email }, successCB))
    }

    const inputFocus = (elmnt) => {
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
            const next = elmnt.target.tabIndex - 2;
            if (next > -1) {
                elmnt.target.form.elements[next].focus()
            }
        } else {
            const next = elmnt.target.tabIndex;
            if (next < 4) {
                elmnt.target.form.elements[next].focus()
            }
        }
    }

    const handle_button = async (e) => {

        const successCB = (response) => {
            if (response?.status) {
                localStorage.setItem("OTP", otp)
                toast.success(response?.message)
                setTimeout(() => {
                    history.push('/ResetPassword')
                }, 2000)
            }
            else {
                setLoading(false)
                toast.error("Please Enter a valid OTP")
                return false
            }
        }
        dispatch(verifyOtp({ email, otp }, successCB))
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
                                Verification
                            </h2>
                            <p className="text-center">Please enter the 4-digit verification code sent on your  email ID</p>
                            <form className="p-2 " onSubmit={handle_button} >
                                <div className="form-group p-2 mb-3  form">
                                    <div className="row">
                                        <div className="col-md-3 col-sm-3">
                                            <input className=" form-control text-center"
                                                placeholder="*"
                                                maxlength="1"
                                                required
                                                autoComplete="off"
                                                tabIndex="1"
                                                onKeyUp={inputFocus}
                                                onChange={(e) => handlevalue(e, 'otp1')}
                                                value={OTP?.otp1 ?? ""}></input>
                                        </div>

                                        <div className="col-md-3 col-sm-3">
                                            <input className=" form-control text-center"
                                                placeholder="*"
                                                maxlength="1"
                                                required
                                                autoComplete="off"
                                                tabIndex="2"
                                                onKeyUp={inputFocus}
                                                onChange={(e) => handlevalue(e, 'otp2')}
                                                value={OTP?.otp2 ?? ""}></input>
                                        </div>

                                        <div className="col-md-3 col-sm-3">
                                            <input className=" form-control text-center"
                                                placeholder="*"
                                                maxlength="1"
                                                required
                                                autoComplete="off"
                                                tabIndex="3"
                                                onKeyUp={inputFocus}
                                                onChange={(e) => handlevalue(e, 'otp3')}
                                                value={OTP?.otp3 ?? ""}></input>
                                        </div>

                                        <div className="col-md-3 col-sm-3">
                                            <input className=" form-control text-center"
                                                placeholder="*"
                                                maxlength="1"
                                                required
                                                autoComplete="off"
                                                onKeyUp={inputFocus}
                                                tabIndex="4"
                                                onChange={(e) => handlevalue(e, 'otp4')}
                                                value={OTP?.otp4 ?? ""}>
                                            </input>
                                        </div>

                                    </div>
                                </div>

                                <div className="resend">
                                    <Button className="loader"
                                        loading={loading}
                                        disabled={loading}
                                        onClick={resend}>Resend OTP</Button>
                                </div>

                                <div className="pt-3 text-center pb">
                                    <button type="submit"
                                        className="rounded-pill">
                                        Next
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Verify