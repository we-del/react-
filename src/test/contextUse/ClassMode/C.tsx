/* 
 * 2022/5/9 19:05
 * author: xxx
 * @description:
 */
import React, {Component} from "react";
import MyContext from "../Context";

export default class C extends Component {
    public static contextType = MyContext;

    render() {
        const {name}: any = this.context;
        console.log(this);
        return (
            <>
                <h1>

                    我是c,{name}
                </h1>
            </>
        );
    }
}