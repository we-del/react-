/* 
 * 2022/6/28 12:09
 * author: xxx
 * @description:
 */
import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {update} from "../../redux/slice/pageNav/pageNav";
import "./css/pageNav.less";

let count = 0;
export default () => {
    const pageStore = useSelector((state: any) => state.pageNav);
    const dispatch = useDispatch();

    function action(pageNum: number) {
        dispatch(update(pageNum));
    }

    return (
        <>
            <div id="page">
                <div className="pre-page" onClick={() => {
                    action(1)
                }}>上一页
                </div>
                <div className="exact-page">
                    <div>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                    </div>
                    <div></div>
                    <div></div>
                </div>
                <div className="next-page">下一页</div>
            </div>
        </>
    );
}