import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from "antd";
import Rank from "../../components/Rank/Rank";
import PieChart from "../../components/PieChart/PieChart";
import {
    getFuncLatestList,
    actions as summaryActions
} from "../../redux/modules/summary";

let ws;

class Home extends Component {
    componentDidMount() {
        this.props.getFuncLatestList();
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
                    <Col span={8}>
                        <h3 style={{ textAlign: "center", margin: "2em 0" }}>
                            Function Test Ranking
                        </h3>
                    </Col>
                    <Col span={16}>
                        <h3 style={{ textAlign: "center", margin: "2em 0" }}>
                            Performance Test Ranking
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} style={{ padding: "1em 3em" }}>
                        <Rank data={this.props.funcLatestList} />
                    </Col>
                    <Col span={8} style={{ padding: "1em 3em" }} />
                    <Col span={8} style={{ padding: "1em 3em" }} />
                </Row>
                <PieChart data={this.props.funcLatestList} />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        funcLatestList: getFuncLatestList(state)
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
