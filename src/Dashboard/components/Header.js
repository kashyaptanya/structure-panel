
import { useHistory } from "react-router-dom"
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Image, Space, Modal, Avatar, Layout } from 'antd';
import logo from "../../Images/logo.png"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../../store/user'
import toast from "../../common/toast"

const { Header } = Layout;

function HeaderCom() {
  const avtar = useSelector((state) => state.auth.user)
  const dispatch =  useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changeEmail, setChangeMail] = useState("")
    const [popup, setPopup] = useState(false)
    const [popup1, setPopup1] = useState(false)
    const history = useHistory()
    // let userData = localStorage.getItem("users_email")
    // let userToken = localStorage.getItem("token")
    let  admin_id = localStorage.getItem("admin_id")
    const items = [
        {
            label: `${avtar}`,
            disabled: true
        },
        {
            label: 'Email Setting',
            key: 'email',
        },
        {
            label: 'Logout',
            key: 'logout',
        },

    ];

    const cancel = () => {
        setIsModalOpen(false);
        setChangeMail("")
    };

    const onClick = ({ key }) => {
        if (key === 'logout') {
            logout()
        }
        else if (key === 'email') {
            setIsModalOpen(true);
        }
    };

    const logout = async () => {
      console.log("bhghiumjjk")
    const successCB = (response)=>{
        if(response?.status){
            toast.success(response?.message) 
            setTimeout(()=>{
                history.push('/')    
            },2000)
             
        } 
    }
    dispatch(logout({ admin_id }, successCB))
        // let admin_id = localStorage.getItem("admin_id")
        // const payload = {
        //     admin_id: admin_id
        // }

        // const api = await axios.post("https://biofamily.solidappmaker.ml/api/v1/admin/logout", payload);

        // if (api.data.status === true) {
        //     localStorage.removeItem("token")
        //     localStorage.removeItem("admin_id")
        //     localStorage.removeItem("users_email")
        //     window.location.reload()
        // }
    }
    const save = async () => {
        // let token = localStorage.getItem("token")
        // let payload = {
        //     email: changeEmail.trim()
        // }

        // if (changeEmail === userData) {
        //     setIsModalOpen(false)
        //     setChangeMail("")
        //     setPopup(true)
        //     setTimeout(() => {
        //         setPopup(false)
        //     }, 2000)
        // }

        // let apiHit = await axios.post("https://biofamily.solidappmaker.ml/api/v1/admin/change_email", payload
        //     , {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     }
        // )
        // if (apiHit.data.status === true) {
        //     localStorage.setItem("users_email", changeEmail)
        //     setIsModalOpen(false)
        //     setPopup1(true)
        //     setTimeout(() => {
        //         setPopup1(false)
        //         setChangeMail("")
        //     }, 2000)
        // }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setChangeMail("")
    };

    return (
        <>
            {
                popup ?
                    <div className="toast show ">
                        <div className="toast-body toast_style1 set">
                            Email already exist, please use different email
                        </div>
                    </div> : null
            }

            {
                popup1 ?
                    <div className="toast show ">
                        <div className="toast-body toast_style1 set">
                            Email Successfully changed
                        </div>
                    </div> : null
            }

            <Header style={{ background: '#388d65', height: 80 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ padding: 10 }}>
                        <Image width={70} height={60} src={logo} />
                    </div>
                    <div style={{ padding: 22 }}>
                        <Dropdown
                            menu={{
                                items,
                                onClick,
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <Avatar  style={{ color: '#388d65', fontWeight: 'bold', backgroundColor: '#ffffff', float: 'right' }} >
                                        {avtar?.[0]?.toUpperCase()}
                                    </Avatar>
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </Header>

            <Modal title="Change Your Email" open={isModalOpen} footer={null} onCancel={handleCancel}>
                <input placeholder="Enter email" required className="form-control" value={changeEmail} onChange={(e) => setChangeMail(e.target.value)}></input>
                <br></br>
                <div className="text-center">
                    <button className="save" onClick={save}>Save</button>
                    <button className="cancel" onClick={cancel}>Cancel</button>
                </div>
            </Modal>
        </>
    )
}

export default HeaderCom

// import { Avatar, Layout } from 'antd';
// import Style from '../../App.css'
// import { Input, Tooltip } from 'antd';
// const { Search } = Input;
// const { Header } = Layout;

// function HeaderCom() {

//   return (
//     <>
//       <Header style={{ background: '#50b996', padding: 22, height: 80 , minWidth:550 }}>
//         <Tooltip title="jdiock">
//           <Avatar className={Style.thestyle} style={{ color: '#50b996', fontWeight: 'bold', backgroundColor: '#ffffff', float: 'right' }} >
//           sygj
//           </Avatar>
//         </Tooltip>


//       </Header>
//     </>
//   )
// }

// export default HeaderCom