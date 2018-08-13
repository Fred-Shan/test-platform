import React, { Component } from "react";
import { Row, Col } from "antd";
import Rank from "../Rank/Rank";
import PieChart from "../PieChart/PieChart";

let ws;

class Home extends Component {
    state = {
        message: "",
        funcTest: [
            {
                testName: "core",
                passed: "100",
                failed: "2",
                ignored: "5",
                duration: "500",
                timestamp: "2018-08-09 16:20:08"
            },
            {
                testName: "iot",
                passed: "232",
                failed: "21",
                ignored: "32",
                duration: "500",
                timestamp: "2018-08-10 16:20:08"
            },
            {
                testName: "connection",
                passed: "543",
                failed: "96",
                ignored: "53",
                duration: "500",
                timestamp: "2018-08-09 18:20:08"
            }
        ]
    };

    componentDidMount() {
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
                        <Rank data={this.state.funcTest} />
                    </Col>
                    <Col span={8} style={{ padding: "1em 3em" }} />
                    <Col span={8} style={{ padding: "1em 3em" }} />
                </Row>
                <PieChart data={this.state.funcTest} />
            </div>
        );
    }
}

export default Home;
