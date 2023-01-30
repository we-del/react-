/* 
 * 2022/5/9 19:05
 * author: xxx
 * @description:
 */
import React, {Component} from "react";
import MyContext,{Provider} from "../Context";
import B from "./B";
export default class A extends Component {
    public static contextType = MyContext;
    constructor(props:any) {
        super(props);
        this.state = {name :1};
    }
    render() {
        console.log(this);
        return (
            <>
                <h1>我是A组件</h1>
                <Provider value={this.state}>
                    <B/>
                </Provider>
            </>
        );
    }
}