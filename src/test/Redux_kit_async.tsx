/* 
 * 2022/5/11 8:41
 * author: xxx
 * @description:
 */
import React from "react";
import {fetchSend} from "../redux/slice/sliceTest/sendReqSlice";
import {useDispatch} from "react-redux";

export default  () => {
    const dispatch = useDispatch();
    // 发送异步async 到并维护到redux中
    console.log(  dispatch(fetchSend("v")));
    return (
        <>
            <h1>发送请求</h1>
        </>
    );
}