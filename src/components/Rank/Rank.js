import React, { Component } from "react";
import { Row, Col, Progress, Radio, Icon } from "antd";

const RadioGroup = Radio.Group;

let originData;

class Rank extends Component {
    state = {
        data: [],
        rankName: "",
        order: 1
    };

    componentDidMount() {
        originData = this.props.data;
        let mapData = this.handleMapping(originData, "passed");
        let sortedData = this.handleSort(
            mapData,
            this.sortPercent,
            this.state.order
        );
        this.setState({ data: sortedData, rankName: "passed" });
    }

    handleSort = (data, sortby, order) => {
        let sortedData = data.sort(sortby);
        if (order > 0) {
            return sortedData.reverse();
        }
        return sortedData;
    };

    sortPercent = (a, b) => {
        return a.percent - b.percent;
    };

    onChangeName = e => {
        let mapData = this.handleMapping(originData, e.target.value);
        let sortedData = this.handleSort(
            mapData,
            this.sortPercent,
            this.state.order
        );
        this.setState({ data: sortedData, rankName: e.target.value });
    };

    onChangeOrder = () => {
        let newOrder = -this.state.order;
        let mapData = this.handleMapping(originData, this.state.rankName);
        let sortedData = this.handleSort(mapData, this.sortPercent, newOrder);
        this.setState({ data: sortedData, order: newOrder });
    };

    handleMapping = (data, rankName) => {
        return data.map(ele => {
            let total =
                parseInt(ele.passed, 10) +
                parseInt(ele.failed, 10) +
                parseInt(ele.ignored, 10);
            let percent = +(
                (parseInt(ele[rankName], 10) / total) *
                100
            ).toFixed(1);
            return { testName: ele.testName, percent: percent };
        });
    };

    render() {
        let rank = null;
        if (this.state.data.length !== 0) {
            rank = this.state.data.map(ele => {
                return (
                    <Row key={ele.testName} style={{ marginTop: "1em" }}>
                        <Col
                            span={5}
                            style={{ textAlign: "right", marginRight: "1em" }}
                        >
                            {ele.testName}
                        </Col>
                        <Col span={16}>
                            <Progress
                                percent={ele.percent}
                                strokeWidth={15}
                                strokeLinecap="square"
                            />
                        </Col>
                    </Row>
                );
            });
        }
        return (
            <div>
                <RadioGroup
                    onChange={this.onChangeName}
                    value={this.state.rankName}
                >
                    <Radio value="passed">Passed</Radio>
                    <Radio value="failed">Failed</Radio>
                    <Radio value="ignored">Ignored</Radio>
                </RadioGroup>
                <Icon
                    type={this.state.order > 0 ? "down-circle" : "up-circle"}
                    onClick={this.onChangeOrder}
                />
                {rank}
            </div>
        );
    }
}

export default Rank;
