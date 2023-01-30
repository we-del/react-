/* 
 * 2022/4/28 21:26
 * author: xxx
 * @description:
 */
import {configureStore} from "@reduxjs/toolkit";
import todoReducer from "./slice/sliceTest/todolistSlice";
import asyncReducer from "./slice/sliceTest/asyncModeSlice";
import sendReqReducer from "./slice/sliceTest/sendReqSlice";
import loginStateReducer from "./slice/projectSlice/loginStateSlice";
import detailReducer from "./slice/projectSlice/detailOfMerchandise";
import pageNavReducer from "./slice/pageNav/pageNav";

export default configureStore({
    reducer: {
        todo: todoReducer,
        async: asyncReducer,
        resMsg: sendReqReducer,
        loginState: loginStateReducer,
        detail: detailReducer,
        pageNav: pageNavReducer

    }
})