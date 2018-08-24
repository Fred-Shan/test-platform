import React, { Component } from "react";
import echarts from "echarts";
import { Row, Col, DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

class History extends Component {
    componentDidMount() {
        this.drawChart(this.props.data);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.props.data === nextProps.data &&
            this.props.range.from === nextProps.range.from &&
            this.props.range.to === nextProps.range.to
        ) {
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        console.log("update history");
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
                    moment(ele.timestamp).format("MM/DD HH:mm:ss")
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

        myChart.off("click");
        myChart.on("click", params => {
            if (params.componentType === "series") {
                console.log(data[params.dataIndex]);
                this.props.jumpToOverview(
                    data[params.dataIndex].testName,
                    data[params.dataIndex].timestamp
                );
            }
        });
    };

    onChange = (value, dateString) => {
        this.props.setRange(value[0].toISOString(), value[1].toISOString());
    };

    onOk = value => {
        this.props.submit();
    };

    render() {
        return (
            <div>
                <Row>
                    <Col span={24} style={{ paddingLeft: "2em" }}>
                        <RangePicker
                            value={[
                                moment(this.props.range.from),
                                moment(this.props.range.to)
                            ]}
                            allowClear={false}
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
