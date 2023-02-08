import { UserOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { LogoutOutlined, ContactsOutlined, PhoneOutlined,LockOutlined,SolutionOutlined, DatabaseOutlined, SlackOutlined, ProfileOutlined, CalendarOutlined, ChromeOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useHistory } from "react-router-dom";
import { Typography } from 'antd';
import axios from 'axios';
const { Title } = Typography;
const { Sider } = Layout;

function MenuCom() {

    const history = useHistory()
    let payload = {
        device_id:"6D0FA124-00D2-4217-8730-59F1102F1353",
        admin_id:"6384a9abe84dfb95611d012d"
    }
    const data =async ()=>{
        let result = await axios.post("https://frontlineapi.solidappmaker.ml/api/v1/admin/logout", payload);
        console.log("result", result.data.status)
        if(result.data.status){
            history("/")
        }
    }

    return (

        <Sider style={{ background: 'white' }}>
            {/* <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 32 }}  */}
            <div style={{ display: "flex" }}>
                <div style={{ padding: 20 }}>
                    <Title style={{ color: 'black' }} level={3}>SALESA</Title></div>
            </div>
            <Menu style={{ color: "#0c2e02" }}

                onClick={({ key }) => {
   
                    if (key === "logout") {
                        data()                      
                    }
                   
                }}
                mode="inline"
                items={[
                    {
                        label: "User", key: "/user", icon: <UserOutlined />,
                    },
                    {
                        label: "Profile Details", key: "profile", icon: <ProfileOutlined />,
                    },
                   
                ]}>
            </Menu>
        </Sider>
    )
}
export default MenuCom