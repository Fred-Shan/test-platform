import React from "react";
import { Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";
import "./Sidebar.css";

const { SubMenu } = Menu;

function Sidebar(props) {
    const handleClickItem = ({ keyPath }) => {
        let path = resolveKeyPathToUrlPath(keyPath);
        props.history.push(path);
    };

    const resolveKeyPathToUrlPath = keyPath => {
        return keyPath.length === 2
            ? `/${keyPath[1]}/${keyPath[0]}`
            : `/${keyPath[0]}`;
    };

    const resolveUrlPathToKeyPath = () => {
        let arr = props.history.location.pathname.split("/");
        console.log(arr);
        //当url的path为空时，使其默认选中Home页，因为Menu组件的defaultSelectedKeys好像只能被赋值一次
        if (arr[0] === "" && arr[1] === "") {
            return ["home"];
        }

        return arr.length === 2 ? [arr[1]] : [arr[2], arr[1]];
    };

    return (
        <Menu
            defaultSelectedKeys={resolveUrlPathToKeyPath()}
            defaultOpenKeys={resolveUrlPathToKeyPath()}
            mode="inline"
            theme="dark"
            onClick={handleClickItem}
            style={{ marginBottom: "48px" }}
        >
            <Menu.Item key="home">
                <Icon type="home" />
                <span>Home</span>
            </Menu.Item>
            <SubMenu
                key="func"
                title={
                    <span>
                        <Icon type="area-chart" />
                        <span>Functional Test</span>
                    </span>
                }
            >
                {props.data.funcNameList
                    ? props.data.funcNameList.map(ele => (
                          <Menu.Item key={ele}>{ele}</Menu.Item>
                      ))
                    : null}
            </SubMenu>
            <SubMenu
                key="perform"
                title={
                    <span>
                        <Icon type="dashboard" />
                        <span>Performance Test</span>
                    </span>
                }
            >
                {props.data.performNameList.map(ele => (
                    <Menu.Item key={ele}>{ele}</Menu.Item>
                ))}
            </SubMenu>
            <Menu.Item key="create">
                <Icon type="cloud-download" />
                <span>Create Test Project</span>
            </Menu.Item>
        </Menu>
    );
}

export default withRouter(Sidebar);
