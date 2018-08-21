import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Card } from "antd";
import Rank from "../../components/Rank/Rank";
import PieChart from "../../components/PieChart/PieChart";
import {
    queryFuncLatestList,
    actions as summaryActions
} from "../../redux/modules/summary";

let ws;

class Home extends Component {
    componentDidMount() {
        this.props.queryFuncLatestList();
        // ws = new WebSocket("ws://139.24.217.56:8081/websocket/homepage");
        // ws.onopen = e => {
        //     console.log("ws connnection open ...");
        //     ws.send("You are my angel. --From queen");
        // };
        // ws.onmessage = e => {
        //     this.setState({ message: e.data });
        // };
        // ws.onclose = e => {
        //     console.log("connection closed.");
        // };
    }

    componentWillUnmount() {
        // ws.close();
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Card
                            title="Functional Test Ranking"
                            style={{
                                margin: "1em",
                                marginBottom: "0"
                            }}
                        >
                            <Rank data={this.props.funcLatestList} />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card
                            title="Performance Test Ranking"
                            style={{ margin: "1em", height: "100%" }}
                        >
                            {/* <Rank data={this.props.funcLatestList} /> */}
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Card
                            title="Latest Functional Test"
                            style={{ margin: "1em" }}
                        >
                            <PieChart data={this.props.funcLatestList} />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        funcLatestList: queryFuncLatestList(state)
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
)(Home);
