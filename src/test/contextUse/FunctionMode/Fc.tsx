/* 
 * 2022/5/9 20:17
 * author: xxx
 * @description:
 */
import React from "react";
import {Consumer} from "../Context";

export default () => {
    return (
        <>
            <h1>Fc页面</h1>
            <Consumer>
                {

                    ({count, setCount}: any) => {

                        return (
                            <>
                                <h1>{count}</h1>
                                <button onClick={() => {
                                    setCount(count + 1)
                                }}> 我是c的按钮我来操作a的状态
                                </button>
                            </>
                        )
                    }
                }
            </Consumer>
        </>
    );
}