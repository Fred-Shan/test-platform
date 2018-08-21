import React, { Component } from "react";
import echarts from "echarts";
import { Row, Col, DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

class History extends Component {
    componentDidMount() {
        this.drawChart(this.props.data);
    }

    componentDidUpdate() {
        this.drawChart(this.props.data);
    }

    drawChart = data => {
        let myChart = echarts.init(document.getElementById("funcHistoryChart"));
        myChart.setOption({
            tooltip: {
                trigger: "axis"
            },
            legend: {
                data: ["Passed", "Failed", "Ignored"]
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: data.map(ele =>
                    dayjs(ele.timestamp).format("MM/DD HH:mm:ss")
                )
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    name: "Passed",
                    type: "line",
                    data: data.map(ele => ele.passed),
                    itemStyle: { color: "#52c41a" }
                },
                {
                    name: "Failed",
                    type: "line",
                    data: data.map(ele => ele.failed),
                    itemStyle: { color: "#f5222d" }
                },
                {
                    name: "Ignored",
                    type: "line",
                    data: data.map(ele => ele.ignored),
                    itemStyle: { color: "#595959" }
                }
            ]
        });

        myChart.on("click", params => {
            if (params.componentType === "series") {
                console.log(data[params.seriesIndex]);
            }
        });
    };

    onChange = (value, dateString) => {
        console.log("Selected Time: ", value);
        console.log("Formatted Selected Time: ", dateString);
    };

    onOk = value => {
        console.log("onOk: ", value);
    };

    render() {
        return (
            <div>
                <Row>
                    <Col span={24} style={{ paddingLeft: "2em" }}>
                        <RangePicker
                            showTime={{ format: "HH:mm" }}
                            format="YYYY-MM-DD HH:mm"
                            placeholder={["Start Time", "End Time"]}
                            onChange={this.onChange}
                            onOk={this.onOk}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col
                        span={24}
                        id="funcHistoryChart"
                        style={{ height: "550px" }}
                    />
                </Row>
            </div>
        );
    }
}

export default History;
