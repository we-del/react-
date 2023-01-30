/* 
 * 2022/5/9 20:16
 * author: xxx
 * @description:
 */
import React,{useState} from "react";
import {Provider} from "../Context";
import Fb from "./Fb";
export default () => {
    const [count,setCount] = useState(0);
    return (
        <>
            <h1>我是 Fa </h1>
            <Provider value={{count,setCount}}>
                <Fb/>
            </Provider>
            <h1>我是a页面，当前计数为{count}</h1>
        </>
    );
}