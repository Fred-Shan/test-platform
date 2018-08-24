import React from "react";
import { Table, Card } from "antd";

function Overview(props) {
    const OverviewTablecolumns = [
        {
            title: "TestName",
            dataIndex: "testName",
            key: "testName"
        },
        {
            title: "Passed",
            dataIndex: "passed",
            key: "passed"
        },
        {
            title: "Failed",
            dataIndex: "failed",
            key: "failed"
        },
        {
            title: "Ignored",
            key: "ignored",
            dataIndex: "ignored"
        },
        {
            title: "Duration",
            key: "duration",
            dataIndex: "duration"
        },
        {
            title: "Timestamp",
            key: "timestamp",
            dataIndex: "timestamp"
        },
        {
            title: "User",
            key: "user",
            dataIndex: "user"
        }
    ];

    let OverviewTabledata = [];
    if (props.overviewData) {
        let overviewData = {
            ...props.overviewData,
            key: props.overviewData.testName
        };
        OverviewTabledata.push(overviewData);
    }

    const FailedTablecolumns = [
        {
            title: "TestName",
            dataIndex: "testName",
            key: "testName"
        },
        {
            title: "TestMethodName",
            dataIndex: "testMethodName",
            key: "testMethodName"
        },
        {
            title: "TestStatus",
            dataIndex: "testStatus",
            key: "testStatus"
        },
        {
            title: "Timestamp",
            key: "timestamp",
            dataIndex: "timestamp"
        },
        {
            title: "FailedReason",
            key: "failedReason",
            dataIndex: "failedReason"
        },
        {
            title: "User",
            key: "user",
            dataIndex: "user"
        }
    ];

    let FailedTabledata = [];
    if (props.failedData) {
        let failedData = props.failedData.map(ele => {
            ele.key = ele.testMethodName;
            return ele;
        });
        FailedTabledata = failedData;
    }

    const showTotal = (total, range) => {
        return `Total ${total} items`;
    };

    return (
        <div>
            <Card
                title="Overview"
                extra={
                    <span
                        style={{
                            color: props.isLatestFunc ? "#52c41a" : "#f5222d"
                        }}
                    >
                        {props.isLatestFunc ? "Latest" : "Not Latest"}
                    </span>
                }
            >
                <Table
                    columns={OverviewTablecolumns}
                    dataSource={OverviewTabledata}
                    pagination={false}
                />
            </Card>
            <Card title="Failed Cases" style={{ marginTop: "1em" }}>
                <Table
                    columns={FailedTablecolumns}
                    dataSource={FailedTabledata}
                    pagination={{
                        pageSize: 20,
                        showSizeChanger: true,
                        showTotal: showTotal
                    }}
                />
            </Card>
        </div>
    );
}

export default Overview;
