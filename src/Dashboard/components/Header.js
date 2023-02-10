
import { useHistory } from "react-router-dom"
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Image, Space, Modal, Avatar, Layout } from 'antd';
import logo from "../../Images/logo.png"
import { logout } from "../../store/user";
import toast from "../../common/toast"
import { emailChange } from "../../store/user";
// import { emailChange } from "../../store/panel";
import { useDispatch, useSelector } from 'react-redux'
const { Header } = Layout;

function HeaderCom() {
    const avtar = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changeEmail, setChangeMail] = useState("")
    let email = changeEmail.trim()
    const history = useHistory()
    let admin_id = localStorage.getItem("admin_id")

    const user = useSelector((state) => state.auth.user)
    const token = useSelector((state) => state.auth.token)

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
            key: 'logoutkey',
        },

    ];

    const cancel = () => {
        setIsModalOpen(false);
        setChangeMail("")
    };

    const onClick = ({ key }) => {
        if (key === 'logoutkey') {
            logoutkey()
        }
        else if (key === 'email') {
            setIsModalOpen(true);
        }
    };

    const logoutkey = async () => {
        dispatch(logout({ admin_id }))
        history.push("/")
    }

    const save = async () => {
        if (user === email) {
            toast.error("Email already exist, please use different email")
            setIsModalOpen(false);
            setChangeMail("")
        }
        else if (!email) {
            toast.error("following feild are required")
        }
        else {
            
        }
       
        const successCB = (response) => {
            console.log("ressss",response)
            if (response?.status) {
                setIsModalOpen(false)
                setChangeMail("")
                toast.success(response?.message)
            }
        }
        dispatch(emailChange({ email }, successCB))
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setChangeMail("")
    };

    return (
        <>
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
                                    <Avatar style={{ color: '#388d65', fontWeight: 'bold', backgroundColor: '#ffffff', float: 'right' }} >
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

