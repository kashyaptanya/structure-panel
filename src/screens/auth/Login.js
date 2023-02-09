import { useState } from "react"
import { Button } from "antd"
import {  Link } from "react-router-dom";
import { login } from "../../store/user";
import toast from "../../common/toast"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

function Login() {
    const history = useHistory()
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    // const [popup, setPopup] = useState(false)
    const [passwordType, setPasswordType] = useState("password");
    const [emailid,setEmail] = useState("")
    const [password, setPassowrd] = useState("")
      let email = emailid.trim()

    const loginMessage = useSelector((state) => state.auth.loginMessage)

    const toggle = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const handle_button = async (e) => {
     {
            if (emailid === "" || password === "") {
                toast.error("Please Enter Email and Password to Proceed")
                return false
            }
            const successCB = (response) => {
                if(response?.status){
                    toast.success("Login Success")
                    setTimeout(()=>{
                        history.push("/PanelContainer")
                    },2000)
                   
                }
            }
            dispatch(login({ email, password }, successCB))
        }
    }

    return (
        <>
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
                            <p className='text-center text-danger' >{loginMessage}</p>
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

                                <div className="form-group p-2 mb-3  form toggle_parent">
                                    <input className="textbox"
                                        required
                                        type={passwordType}
                                        value={password}
                                        onChange={(e) =>setPassowrd(e.target.value)}
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
                                <Link className="link" to="/Forgot">Forgot Password ?</Link>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    )
}
export default Login