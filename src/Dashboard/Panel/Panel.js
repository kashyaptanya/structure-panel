import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd"
import { useHistory } from "react-router-dom"
import { Breadcrumb, Card, Layout } from 'antd';
import HeaderCom from "../components/Header";
import FooterCom from "../components/Footer";
import MenuCom from "../components/Menu";
const { Content } = Layout;

function PanelContainer() {
    return (
        <>
            <Layout>
                <MenuCom />
                <Layout>
                    <HeaderCom />
                    <Panel />
                    <FooterCom />
                </Layout>
            </Layout>
        </>
    )
}
export default PanelContainer;

function Panel() {

    const history = useHistory()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imgpop, setImgpop] = useState(false);
    const [msgpop, setMsgpop] = useState(false);
    const [loading, setLoading] = useState(false)

    let userToken = localStorage.getItem("token")


    const [user, setUser] = useState({
        Title: "",
        body: "",
    })
    const [imgPath, setImgPath] = useState("")
    const [imgShoUrl, setImgShoUrl] = useState("")

    const handlevalue = (e, key) => {
        setUser({ ...user, [key]: e.target.value })
    }
    const handle_button = async (e) => {
        if (user.Title === "" || user.body === "" || imgPath === "") {
            setMsgpop(true)
            setTimeout(() => {
                setMsgpop(false)
            }, 1000)
            return false
        }
        setLoading(true)

        var formData = new FormData();
        formData.append("text", user.Title);
        formData.append("body", user.body);
        formData.append("img_upload", imgPath);
        let apiHit = await axios.post("https://biofamily.solidappmaker.ml/api/v1/user/fire_notification_users", formData)
        if (apiHit.data.status === true) {
            setUser("")
            setImgShoUrl("")
            setLoading(false)
            // modal show here
            setIsModalOpen(true);
            setTimeout(() => {
                // modal close here
                setIsModalOpen(false);
            }, 3000)
        } else {
            setLoading(false)
        }
    }

    const handleImg = (e) => {
        let file = e.target.files[0]
        if (e.target.files[0].size <= 300000) {
            setImgPath(file)
            setImgShoUrl(URL.createObjectURL(file))
        }
        else {
            setImgpop(true)
            setTimeout(() => {
                setImgpop(false)
            }, 1000)
            return false
        }
    }
    const handleCancel = () => {
        setIsModalOpen(false);
        setMsgpop(false)
        setImgpop(false)
    };

    // useEffect(() => {
    //     if (!userToken) {
    //         history.push("/")
    //     }
    // }, userToken);

    return (
        <>
            <Content style={{ padding: '0 50px', minWidth: 500 }}>
                <Breadcrumb style={{ margin: '16px 0', minWidth: 500 }}>
                    <Breadcrumb.Item>Salesa</Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content" style={{ background: "#fff", padding: 24, minHeight: 430 }}>
                    <Card title="Admin" bordered={false}>
                    <div className=" container  ">
                <div className="postion">
                    <div className="child ">
                        <div className="shadow p-4 rounded">

                            <div class="input-group my-3">
                                <span class="input-group-text label bg-white">Title :</span>
                                <input my-3
                                    class="form-control"
                                    placeholder={"Enter Title..."}
                                    maxLength={80}
                                    value={user?.Title ?? ""}
                                    onChange={(e) => handlevalue(e, 'Title')}
                                />
                            </div>

                            <div class="input-group my-3">
                                <span class="input-group-text label bg-white">Body :</span>
                                <textarea class="form-control"
                                    value={user?.body ?? ""}
                                    placeholder={"Message..."}
                                    rows={6}
                                    onChange={(e) => handlevalue(e, 'body')}>
                                </textarea>
                            </div>

                            <div className="row d-flex justify-content-between">
                                <div className="upload">
                                    <span class="input-group-text label bg-white">Image :<div className="vl"></div>
                                        <button type="button" className="btn-warning">
                                            <i className="fa fa-upload"></i> Upload File
                                            <input type="file" onChange={handleImg} />
                                        </button>
                                    </span>  </div>
                                <div className="imageupload ">
                                    <img class=" img-fluid rounded" src={imgShoUrl}></img>
                                </div>
                            </div>

                            <div className="text-center buttonsend my-3 ">
                                <Button
                                    loading={loading}
                                    onClick={handle_button}
                                    disabled={loading}
                                    className="text-white btn_color" id="btnFetch">
                                    Send
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


                    </Card>
                </div>
            </Content>

            <Modal title="Notification has been sent" open={isModalOpen} footer={null} onCancel={handleCancel}>
            </Modal>
            <Modal title=" Please select file less than 300 kb." open={imgpop} footer={null} onCancel={handleCancel} >
            </Modal>
            <Modal title=" Please fill all the required fields" open={msgpop} footer={null} onCancel={handleCancel}  >
            </Modal>
         
        </>
    )
}
