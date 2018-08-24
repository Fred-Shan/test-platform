import React from "react";
import { Table } from "antd";

function Cases(props) {
    const columns = [
        {
            title: "FeatureName",
            dataIndex: "featureName",
            key: "featureName"
        },
        {
            title: "TestMethod",
            dataIndex: "testMethod",
            key: "testMethod"
        },
        {
            title: "TestSteps",
            dataIndex: "testSteps",
            key: "testSteps"
        },
        {
            title: "TestName",
            key: "testName",
            dataIndex: "testName"
        },
        {
            title: "User",
            key: "user",
            dataIndex: "user"
        }
    ];

    let data = [];
    if (props.data) {
        data = props.data.map(ele => {
            ele.key = ele.testMethod;
            return ele;
        });
    }

    const showTotal = (total, range) => {
        return `Total ${total} items`;
    };

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={{
                pageSize: 20,
                showSizeChanger: true,
                showTotal: showTotal
            }}
        />
    );
}

export default Cases;
