import React, { Component } from "react";
import { Tabs } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import {
    queryFuncLatestList,
    getFuncLatestSingle,
    getFuncHistorySingle,
    queryFuncHistoryList,
    getFuncHistoryRange,
    setFuncHistoryRange,
    actions as summaryActions
} from "../../redux/modules/summary";
import {
    isLatestFuncResults,
    getFuncLatestFailed,
    getFuncHistoryFailed,
    getTestCaseList,
    actions as resultsActions
} from "../../redux/modules/results";
import { getFuncTabKey, actions as uiActions } from "../../redux/modules/ui";
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
            moment()
                .subtract(1, "months")
                .toISOString(),
            moment().toISOString(),
            2000
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
                moment()
                    .subtract(1, "months")
                    .toISOString(),
                moment().toISOString(),
                2000
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
        this.props.switchFuncTab(key);
        if (key === "3") {
            !this.props.testCaseList &&
                this.props.queryTestCaseList(this.props.match.params.name);
        }
    };

    render() {
        return (
            <Tabs
                activeKey={this.props.activeKey}
                onChange={this.callback}
                style={{ margin: "1em", marginTop: 0 }}
            >
                <TabPane tab="Overview" key="1">
                    <Overview
                        overviewData={
                            this.props.isLatestFuncResults
                                ? this.props.funcLatestSingle
                                : this.props.funcHistorySingle
                        }
                        isLatestFunc={this.props.isLatestFuncResults}
                        failedData={
                            this.props.isLatestFuncResults
                                ? this.props.funcLatestFailed
                                : this.props.funcHistoryFailed
                        }
                    />
                </TabPane>
                <TabPane tab="History" key="2">
                    <History
                        data={this.props.funcHistoryList}
                        range={this.props.range}
                        setRange={this.props.setFuncHistoryRange}
                        submit={this.props.queryFuncHistoryList.bind(
                            null,
                            this.props.match.params.name,
                            moment(this.props.range.from).toISOString(),
                            moment(this.props.range.to).toISOString(),
                            2000
                        )}
                        jumpToOverview={(testName, timestamp) => {
                            this.props.switchFuncTab("1");
                            this.props.queryFuncHistorySingle(
                                testName,
                                timestamp
                            );
                            this.props.queryFuncHistoryFailed(
                                testName,
                                timestamp
                            );
                        }}
                    />
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
        funcHistorySingle: getFuncHistorySingle(state),
        isLatestFuncResults: isLatestFuncResults(state),
        funcLatestFailed: getFuncLatestFailed(state),
        funcHistoryFailed: getFuncHistoryFailed(state),
        testCaseList: getTestCaseList(state),
        funcHistoryList: queryFuncHistoryList(state),
        range: getFuncHistoryRange(state),
        activeKey: getFuncTabKey(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(summaryActions, dispatch),
        ...bindActionCreators(resultsActions, dispatch),
        ...bindActionCreators(uiActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FuncTest);
