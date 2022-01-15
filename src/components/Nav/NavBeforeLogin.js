import React,{useState} from 'react'
import {Link } from "react-router-dom";
import {Menu} from "antd";
import {UserAddOutlined , LoginOutlined} from "@ant-design/icons";
const NavBeforeLogin = () => {
    const [current, setCurrent] = useState("signin");

    const handleClick = e => {
        setCurrent( e.key );
    };
    return (
        <div>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" style={{justifyContent: 'center'}}>
            <Menu.Item key="signin" icon={<LoginOutlined />}>
                <Link to="/">Sign in</Link>
            </Menu.Item>
            <Menu.Item key="signup" icon={<UserAddOutlined /> }>
                <Link to="/signup">Signup</Link>
            </Menu.Item>
        </Menu>
        </div>
    )
}

export default NavBeforeLogin
