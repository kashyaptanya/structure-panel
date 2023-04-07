import { useState } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "antd"
import { forgotPasswordMail } from '../../store/user'
import toast from "../../common/toast"
import { useDispatch } from 'react-redux'

function Forgot() {
    const history = useHistory()
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [emailid, setEmail] = useState("")
    let email = emailid.trim()

    const handle_button = () => {
        if (emailid === "") {
            toast.error("Please Enter Your Registered Email to Proceed")
            return false
        }
        setLoading(true)
        const successCB = (response) => {
            if (response?.status) {
                localStorage.setItem("forgot_email", email)
                toast.success(response?.message)
                setTimeout(() => {
                    history.push('/Verify')
                }, 2000)

            } else {
                setLoading(false)
                toast.error(response?.message)
            }
        }
        dispatch(forgotPasswordMail({ email }, successCB))
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
                                Forgot Password
                            </h2>
                            <p className="text-center">Enter the email associated with your account</p>
                            <div className="p-2 "  >
                                <div className="form-group p-2 mb-3  form">
                                    <input className="textbox"
                                        required
                                        type="text"
                                        value={emailid}
                                        onChange={(e) => setEmail(e.target.value)}
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