import React, { Component } from "react";
import { Tabs } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {
    queryFuncLatestList,
    getFuncLatestSingle,
    queryFuncHistoryList,
    actions as summaryActions
} from "../../redux/modules/summary";
import {
    isLatestFuncResults,
    getFuncLatestFailed,
    getTestCaseList,
    actions as resultsActions
} from "../../redux/modules/results";
import Overview from "./Overview/Overview";
import History from "./History/History";
import Cases from "./Cases/Cases";

const { TabPane } = Tabs;

class FuncTest extends Component {
    componentDidMount() {
        let funcLatestSingle = this.props.funcLatestList.find(
            test => test.testName === this.props.match.params.name
        );
        //获取overview页上部summary数据
        if (funcLatestSingle) {
            this.props.setFuncLatestSingle(funcLatestSingle);
        } else {
            this.props.queryFuncLatestSingle(this.props.match.params.name);
        }
        //获取overview页下部failed case数据
        this.props.queryFuncLatestFailed(this.props.match.params.name);
        //获取test case页的数据
        this.props.queryTestCaseList(this.props.match.params.name);

        this.props.queryFuncHistoryList(
            this.props.match.params.name,
            dayjs()
                .subtract(1, "month")
                .toISOString(),
            dayjs().toISOString(),
            100
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.name !== this.props.match.params.name) {
            let funcLatestSingle = nextProps.funcLatestList.find(
                test => test.testName === nextProps.match.params.name
            );
            //获取overview页上部summary数据
            if (funcLatestSingle) {
                nextProps.setFuncLatestSingle(funcLatestSingle);
            } else {
                nextProps.queryFuncLatestSingle(nextProps.match.params.name);
            }
            //获取overview页下部failed case数据
            nextProps.queryFuncLatestFailed(nextProps.match.params.name);
            //获取test case页的数据
            nextProps.queryTestCaseList(nextProps.match.params.name);

            nextProps.queryFuncHistoryList(
                nextProps.match.params.name,
                dayjs()
                    .subtract(1, "month")
                    .toISOString(),
                dayjs().toISOString(),
                100
            );
        }
    }

    // componentDidUpdate() {
    //     if (
    //         this.props.funcLatestSingle &&
    //         this.props.funcLatestSingle.testName !==
    //             this.props.match.params.name
    //     ) {
    //         let funcLatestSingle = this.props.funcLatestList.find(
    //             test => test.testName === this.props.match.params.name
    //         );
    //         //获取overview页上部summary数据
    //         if (funcLatestSingle) {
    //             this.props.setFuncLatestSingle(funcLatestSingle);
    //         } else {
    //             this.props.queryFuncLatestSingle(this.props.match.params.name);
    //         }
    //     }
    //     if (
    //         this.props.funcLatestFailed &&
    //         this.props.funcLatestFailed[0].testName !==
    //             this.props.match.params.name
    //     ) {
    //         //获取overview页下部failed case数据
    //         this.props.queryFuncLatestFailed(this.props.match.params.name);
    //     }
    // }

    callback = key => {
        if (key === "3") {
            !this.props.testCaseList &&
                this.props.queryTestCaseList(this.props.match.params.name);
        }
    };

    render() {
        return (
            <Tabs
                defaultActiveKey="1"
                onChange={this.callback}
                style={{ margin: "1em", marginTop: 0 }}
            >
                <TabPane tab="Overview" key="1">
                    <Overview
                        overviewData={this.props.funcLatestSingle}
                        isLatestFunc={this.props.isLatestFuncResults}
                        failedData={this.props.funcLatestFailed}
                    />
                </TabPane>
                <TabPane tab="History" key="2">
                    <History data={this.props.funcHistoryList} />
                </TabPane>
                <TabPane tab="Cases" key="3">
                    <Cases data={this.props.testCaseList} />
                </TabPane>
            </Tabs>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        funcLatestList: queryFuncLatestList(state),
        funcLatestSingle: getFuncLatestSingle(state),
        isLatestFuncResults: isLatestFuncResults(state),
        funcLatestFailed: getFuncLatestFailed(state),
        testCaseList: getTestCaseList(state),
        funcHistoryList: queryFuncHistoryList(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(summaryActions, dispatch),
        ...bindActionCreators(resultsActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FuncTest);
