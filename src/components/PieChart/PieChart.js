import React, { Component } from "react";
import echarts from "echarts";
import { Row, Col } from "antd";

class PieChart extends Component {
    componentDidUpdate() {
        this.props.data.forEach(ele => this.drawChart(ele));
    }

    drawChart = data => {
        let myChart = echarts.init(document.getElementById(data.testName));
        myChart.setOption({
            title: {
                text: data.testName,
                x: "center"
            },
            tooltip: {
                trigger: "item",
                formatter: "{b} : {c} ({d}%)"
            },
            series: [
                {
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "50%"],
                    data: [
                        {
                            value: data.passed,
                            name: "passed",
                            itemStyle: { color: "#52c41a" }
                        },
                        {
                            value: data.failed,
                            name: "failed",
                            itemStyle: { color: "#f5222d" }
                        },
                        {
                            value: data.ignored,
                            name: "ignored",
                            itemStyle: { color: "#bfbfbf" }
                        }
                    ],
                    itemStyle: {
                        color: "green",
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                }
            ]
        });
    };

    render() {
        let columns = null;
        if (this.props.data.length !== 0) {
            let sortedData = this.props.data.sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
            });
            columns = sortedData.map(ele => {
                return (
                    <Col
                        span={8}
                        key={ele.testName}
                        id={ele.testName}
                        style={{ height: 200, minWidth: 300 }}
                    />
                );
            });
        }
        return <Row>{columns}</Row>;
    }
}

export default PieChart;
