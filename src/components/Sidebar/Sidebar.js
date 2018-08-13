import React from "react";
import { Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";

const { SubMenu } = Menu;

function Sidebar(props) {
    const handleClickItem = ({ item, key, keyPath }) => {
        let path =
            keyPath.length === 2
                ? `/${keyPath[1]}/${keyPath[0]}`
                : `/${keyPath[0]}`;
        props.history.push(path);
        console.log(props);
        console.log(item);
        console.log(key);
        console.log(keyPath);
    };

    return (
        <Menu
            defaultSelectedKeys={["home"]}
            mode="inline"
            theme="dark"
            onClick={handleClickItem}
        >
            <Menu.Item key="home">
                <Icon type="home" />
                <span>Home</span>
            </Menu.Item>
            <SubMenu
                key="auto"
                title={
                    <span>
                        <Icon type="area-chart" />
                        <span>Automation Test</span>
                    </span>
                }
            >
                <Menu.Item key="core">Core</Menu.Item>
                <Menu.Item key="connection">Connection</Menu.Item>
                <Menu.Item key="iot">IoT</Menu.Item>
            </SubMenu>
            <Menu.Item key="perform">
                <Icon type="dashboard" />
                <span>Performance Test</span>
            </Menu.Item>
            <Menu.Item key="create">
                <Icon type="cloud-download" />
                <span>Create Test Project</span>
            </Menu.Item>
        </Menu>
    );
}

export default withRouter(Sidebar);
