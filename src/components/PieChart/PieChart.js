import React, { Component } from "react";
import echarts from "echarts";
import { Row, Col } from "antd";

class PieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data.sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
            })
        };
    }

    componentDidMount() {
        this.state.data.forEach(ele => this.drawChart(ele));
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
                        { value: data.passed, name: "passed" },
                        { value: data.failed, name: "failed" },
                        { value: data.ignored, name: "ignored" }
                    ],
                    itemStyle: {
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
        if (this.state.data.length !== 0) {
            columns = this.state.data.map(ele => {
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