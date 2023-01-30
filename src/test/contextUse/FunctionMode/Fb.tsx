/* 
 * 2022/5/9 20:17
 * author: xxx
 * @description:
 */
import React from "react";
import Fc from "./Fc";
import {Consumer} from "../Context";
export default () => {
    return (
        <>
            <h1>Fb页面</h1>
            <Consumer>
                {
                    (value:any) =>{
                        console.log(value);
                        return <h1>我是b页面，当前计数为 {value.count}</h1>
                    }
                }
            </Consumer>
            <Fc/>
        </>
    );
}