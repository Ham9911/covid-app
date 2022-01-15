import React,{useState} from 'react'
import {Link } from "react-router-dom";
import {Menu} from "antd";
import {HomeOutlined, FileOutlined} from "@ant-design/icons";
const NavforUser = () => {
    const [current, setCurrent] = useState("home");
    const handleClick = e => {
        setCurrent( e.key );
    }; 
    return (
        <div>
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          style={{ justifyContent: "center" }}
        >
          <Menu.Item key="adminhome" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="survey" icon={<FileOutlined /> }>
            <Link to="/survey">Survey</Link>
          </Menu.Item>
        </Menu>
      </div>
    )
}

export default NavforUser
