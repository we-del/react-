/* 
 * 2022/5/9 19:38
 * author: xxx
 * @description:
 */
import React, {Component} from "react";
import {Provider} from "../Context";
import A from "./A";
export default class AA extends Component {
    constructor(props:any) {
        super(props);
        this.state = {age:18};
    }
    render() {
        return (
            <>
                <Provider value={this.state}>
                    <h1>AA ,page</h1>
                    <A/>
                </Provider>
            </>
        );
    }
}