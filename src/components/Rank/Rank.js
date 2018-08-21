import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    getRankBy,
    getRankOrder,
    actions as summaryActions
} from "../../redux/modules/summary";
import { Row, Col, Progress, Radio, Icon } from "antd";

const RadioGroup = Radio.Group;

class Rank extends Component {
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
        this.props.changeRankBy(e.target.value);
    };

    onChangeOrder = () => {
        this.props.changeRankOrder(-this.props.rankOrder);
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
        if (this.props.data.length !== 0) {
            let mappedData = this.handleMapping(
                this.props.data,
                this.props.rankBy
            );
            let sortedData = this.handleSort(
                mappedData,
                this.sortPercent,
                this.props.rankOrder
            );
            rank = sortedData.map(ele => {
                return (
                    <Row key={ele.testName} style={{ marginTop: "1em" }}>
                        <Col
                            span={5}
                            style={{
                                textAlign: "right",
                                marginRight: "1em",
                                wordWrap: "break-word"
                            }}
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
            <div style={{ textAlign: "center" }}>
                <RadioGroup
                    onChange={this.onChangeName}
                    value={this.props.rankBy}
                >
                    <Radio value="passed">Passed</Radio>
                    <Radio value="failed">Failed</Radio>
                    <Radio value="ignored">Ignored</Radio>
                </RadioGroup>
                <Icon
                    type={
                        this.props.rankOrder > 0 ? "down-circle" : "up-circle"
                    }
                    onClick={this.onChangeOrder}
                />
                <div style={{ overflow: "auto", height: "260px" }}>{rank}</div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        rankBy: getRankBy(state),
        rankOrder: getRankOrder(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(summaryActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rank);
