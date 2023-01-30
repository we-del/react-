/* 
 * 2022/5/9 19:05
 * author: xxx
 * @description:
 */
import React, {Component} from "react";
import MyContext from "../Context";
import C from "./C";

export default class B extends Component {

    public static contextType: any = MyContext;

    render() {
        console.log(this);
        const {name}:any = this.context;
        return (
            <>
                <h1>我是b组件，
                    {name}</h1>
                <C/>
            </>
        );
    }
}