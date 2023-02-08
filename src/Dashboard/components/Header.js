import { Avatar, Layout } from 'antd';
import Style from '../../App.css'
import { Input, Tooltip } from 'antd';
const { Search } = Input;
const { Header } = Layout;

function HeaderCom() {

  return (
    <>
      <Header style={{ background: '#50b996', padding: 22, height: 80 , minWidth:550 }}>
        <Tooltip title="jdiock">
          <Avatar className={Style.thestyle} style={{ color: '#50b996', fontWeight: 'bold', backgroundColor: '#ffffff', float: 'right' }} >
          sygj
          </Avatar>
        </Tooltip>


      </Header>
    </>
  )
}

export default HeaderCom